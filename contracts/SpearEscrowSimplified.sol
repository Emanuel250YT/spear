// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title SpearEscrowSimplified
 * @dev Sistema de escrow simplificado con protección opcional
 */
contract SpearEscrowSimplified {
    // Estados
    enum Status {
        Open,
        Active,
        Completed,
        Cancelled
    }
    enum Protection {
        Basic,
        Premium
    }

    // Proyecto
    struct Project {
        address payable client;
        address payable developer;
        uint256 amount;
        uint256 riskFund;
        uint256 platformFee;
        uint256[] milestones;
        bool[] completed;
        Protection protection;
        Status status;
        string description;
    }

    // Storage
    mapping(uint256 => Project) public projects;
    mapping(uint256 => address[]) public applicants;

    uint256 public projectCounter;
    uint256 public platformBalance;
    address public owner;

    // Constantes
    uint256 public constant MIN_AMOUNT = 10 ether; // 10 PAS mínimo
    uint256 public constant GAS_RESERVE = 50 ether; // 50 PAS para gas ✅
    uint256 public constant BASE_FEE = 300; // 3%
    uint256 public constant PREMIUM_FEE = 250; // 2.5%
    uint256 public constant PREMIUM_THRESHOLD = 15000 ether; // 15k PAS

    // Eventos
    event ProjectCreated(
        uint256 indexed id,
        address indexed client,
        uint256 amount
    );
    event DeveloperApplied(uint256 indexed id, address indexed dev);
    event DeveloperApproved(uint256 indexed id, address indexed dev);
    event MilestoneCompleted(uint256 indexed id, uint256 milestone);
    event ProjectCompleted(uint256 indexed id);
    event ProjectCancelled(uint256 indexed id);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier onlyClient(uint256 _id) {
        require(projects[_id].client == msg.sender, "Not client");
        _;
    }

    modifier onlyDeveloper(uint256 _id) {
        require(projects[_id].developer == msg.sender, "Not developer");
        _;
    }

    /**
     * @dev Calcular comisión
     */
    function _calculateFee(
        uint256 _amount,
        Protection _protection
    ) internal pure returns (uint256) {
        if (_protection == Protection.Basic) {
            return 0; // Sin comisión
        }

        // Premium
        uint256 feeRate = _amount >= PREMIUM_THRESHOLD ? PREMIUM_FEE : BASE_FEE;
        return (_amount * feeRate) / 10000;
    }

    /**
     * @dev Crear proyecto
     */
    function createProject(
        string memory _description,
        uint256[] memory _milestones,
        uint256 _riskFund,
        Protection _protection
    ) external payable {
        require(
            _milestones.length > 0 && _milestones.length <= 10,
            "Invalid milestones"
        );
        require(bytes(_description).length > 0, "Empty description");
        require(_riskFund > 0, "Risk fund required");

        uint256 total = 0;
        for (uint256 i = 0; i < _milestones.length; i++) {
            require(_milestones[i] > 0, "Invalid milestone amount");
            total += _milestones[i];
        }

        require(total >= MIN_AMOUNT, "Minimum 10 PAS");

        uint256 platformFee = _calculateFee(total, _protection);
        // ✅ Agregar 50 PAS para cubrir costos de gas
        uint256 required = total + _riskFund + platformFee + GAS_RESERVE;

        require(msg.value == required, "Incorrect amount");

        projectCounter++;

        bool[] memory completed = new bool[](_milestones.length);

        projects[projectCounter] = Project({
            client: payable(msg.sender),
            developer: payable(address(0)),
            amount: total,
            riskFund: _riskFund,
            platformFee: platformFee,
            milestones: _milestones,
            completed: completed,
            protection: _protection,
            status: Status.Open,
            description: _description
        });

        if (platformFee > 0) {
            platformBalance += platformFee;
        }

        emit ProjectCreated(projectCounter, msg.sender, total);
    }

    /**
     * @dev Aplicar a proyecto
     */
    function applyToProject(uint256 _id) external {
        require(_id > 0 && _id <= projectCounter, "Invalid project");
        require(projects[_id].status == Status.Open, "Not open");
        require(projects[_id].client != msg.sender, "Client cannot apply");

        applicants[_id].push(msg.sender);
        emit DeveloperApplied(_id, msg.sender);
    }

    /**
     * @dev Aprobar developer
     */
    function approveDeveloper(
        uint256 _id,
        address _dev
    ) external onlyClient(_id) {
        require(projects[_id].status == Status.Open, "Not open");
        require(_dev != address(0), "Invalid developer");

        projects[_id].developer = payable(_dev);
        projects[_id].status = Status.Active;

        emit DeveloperApproved(_id, _dev);
    }

    /**
     * @dev Completar milestone
     */
    function completeMilestone(
        uint256 _id,
        uint256 _milestone
    ) external onlyDeveloper(_id) {
        require(projects[_id].status == Status.Active, "Not active");
        require(
            _milestone < projects[_id].milestones.length,
            "Invalid milestone"
        );
        require(!projects[_id].completed[_milestone], "Already completed");

        projects[_id].completed[_milestone] = true;
        emit MilestoneCompleted(_id, _milestone);
    }

    /**
     * @dev Aprobar y pagar milestone
     */
    function approveMilestone(
        uint256 _id,
        uint256 _milestone
    ) external onlyClient(_id) {
        Project storage project = projects[_id];
        require(project.status == Status.Active, "Not active");
        require(_milestone < project.milestones.length, "Invalid milestone");
        require(project.completed[_milestone], "Not completed");

        uint256 amount = project.milestones[_milestone];
        project.milestones[_milestone] = 0; // Marcar como pagado

        project.developer.transfer(amount);

        // Verificar si es el último milestone
        bool allPaid = true;
        for (uint256 i = 0; i < project.milestones.length; i++) {
            if (project.milestones[i] > 0) {
                allPaid = false;
                break;
            }
        }

        if (allPaid) {
            project.status = Status.Completed;
            // Devolver risk fund al cliente
            project.client.transfer(project.riskFund);
            emit ProjectCompleted(_id);
        }
    }

    /**
     * @dev Cancelar proyecto
     */
    function cancelProject(
        uint256 _id,
        string memory /* _reason */
    ) external onlyClient(_id) {
        Project storage project = projects[_id];
        require(
            project.status == Status.Open || project.status == Status.Active,
            "Cannot cancel"
        );

        project.status = Status.Cancelled;

        // Devolver fondos
        uint256 remaining = 0;
        for (uint256 i = 0; i < project.milestones.length; i++) {
            remaining += project.milestones[i];
        }

        if (project.status == Status.Open) {
            // No hay developer, devolver todo menos la comisión
            project.client.transfer(remaining + project.riskFund);
        } else {
            // Hay developer, risk fund va al developer
            project.client.transfer(remaining);
            project.developer.transfer(project.riskFund);
        }

        emit ProjectCancelled(_id);
    }

    /**
     * @dev Retirar fondos de plataforma
     */
    function withdrawPlatformFees() external onlyOwner {
        uint256 amount = platformBalance;
        platformBalance = 0;
        payable(owner).transfer(amount);
    }

    /**
     * @dev Ver aplicantes
     */
    function getApplicants(
        uint256 _id
    ) external view returns (address[] memory) {
        return applicants[_id];
    }

    /**
     * @dev Ver detalles del proyecto
     */
    function getProject(
        uint256 _id
    )
        external
        view
        returns (
            address client,
            address developer,
            uint256 amount,
            uint256 riskFund,
            uint256 platformFee,
            Protection protection,
            Status status,
            string memory description
        )
    {
        Project storage p = projects[_id];
        return (
            p.client,
            p.developer,
            p.amount,
            p.riskFund,
            p.platformFee,
            p.protection,
            p.status,
            p.description
        );
    }

    /**
     * @dev Ver milestones
     */
    function getMilestones(
        uint256 _id
    ) external view returns (uint256[] memory, bool[] memory) {
        Project storage p = projects[_id];
        return (p.milestones, p.completed);
    }
}
