// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title SpearEscrowV2
 * @dev Sistema de escrow avanzado para freelancers con protección dual y administración
 * @author Spear Team
 */
contract SpearEscrowV2 {
    // Estado de los proyectos
    enum ProjectStatus {
        Open, // 0: Proyecto abierto para aplicaciones
        Pending, // 1: Developer asignado, esperando ambas partes confirmen start
        InProgress, // 2: Proyecto en progreso (ambas partes confirmaron)
        Completed, // 3: Proyecto completado exitosamente
        Cancelled, // 4: Proyecto cancelado
        Expired, // 5: Proyecto expirado sin asignación
        Disputed // 6: En disputa, requiere intervención admin
    }

    // Tipos de protección
    enum ProtectionType {
        Basic, // 0: Protección básica
        Premium // 1: Protección premium para empresas (0.5% para 15k+)
    }

    // Estructura del proyecto
    struct Project {
        address payable client; // Cliente que crea el proyecto
        address payable developer; // Developer asignado
        uint256 totalAmount; // Monto total del proyecto
        uint256 riskFund; // Fondo de riesgo definido por el cliente
        uint256 platformFee; // Comisión de la plataforma (calculada)
        uint256[] milestoneAmounts; // Montos de cada milestone
        bool[] milestoneCompleted; // Estado de completado de cada milestone
        bool[] milestoneApprovedByClient; // Aprobación del cliente por milestone
        bool[] milestoneApprovedByDeveloper; // Aprobación del developer por milestone
        ProtectionType protection; // Tipo de protección
        ProjectStatus status; // Estado actual del proyecto
        uint256 createdAt; // Timestamp de creación
        uint256 expiresAt; // Timestamp de expiración
        string description; // Descripción del proyecto
        bool clientConfirmedStart; // Cliente confirmó inicio
        bool developerConfirmedStart; // Developer confirmó inicio
        bool riskFundClaimed; // Si el fondo de riesgo fue reclamado
        bool isCompletedByBoth; // Ambas partes marcaron como completado
    }

    // Variables de estado
    mapping(uint256 => Project) public projects;
    mapping(uint256 => address[]) public projectApplicants;
    mapping(address => uint256) public developerActiveProjects;
    mapping(address => uint256) public totalEscrowBalance;
    mapping(address => bool) public admins; // Administradores autorizados

    uint256 public projectCounter;
    uint256 public constant MIN_PROJECT_AMOUNT = 10 * 10 ** 18; // 10 PAS (18 decimales)
    uint256 public constant GAS_RESERVE = 50 * 10 ** 18; // 50 PAS para cubrir gas ✅
    uint256 public constant PREMIUM_THRESHOLD = 15000 * 10 ** 18; // 15,000 PAS
    uint256 public constant MAX_DEVELOPER_PROJECTS = 5;
    uint256 public constant PROJECT_EXPIRATION_TIME = 7 days;

    // Constantes para cálculo de comisión (fórmula de calculadora)
    uint256 public constant BASE_FEE_PERCENTAGE = 300; // 3% base
    uint256 public constant PREMIUM_DISCOUNT = 50; // 0.5% descuento para premium
    uint256 public constant MAX_FEE_PERCENTAGE = 500; // 5% máximo
    uint256 public constant MIN_FEE_PERCENTAGE = 100; // 1% mínimo

    address public owner;
    uint256 public platformBalance;

    // Eventos
    event ProjectCreated(
        uint256 indexed projectId,
        address indexed client,
        uint256 amount,
        uint256 riskFund,
        uint256 platformFee
    );
    event DeveloperApplied(
        uint256 indexed projectId,
        address indexed developer
    );
    event DeveloperApproved(
        uint256 indexed projectId,
        address indexed developer
    );
    event ProjectStartConfirmed(
        uint256 indexed projectId,
        address indexed confirmer,
        bool isClient
    );
    event ProjectStarted(uint256 indexed projectId);
    event MilestoneCompleted(
        uint256 indexed projectId,
        uint256 milestone,
        uint256 amount
    );
    event MilestoneApproved(
        uint256 indexed projectId,
        uint256 milestone,
        address approver,
        bool isClient
    );
    event ProjectCompleted(uint256 indexed projectId);
    event ProjectCancelled(uint256 indexed projectId, string reason);
    event RiskFundReleased(
        uint256 indexed projectId,
        address recipient,
        uint256 amount
    );
    event AdminFundsReleased(
        uint256 indexed projectId,
        address recipient,
        uint256 amount,
        string reason
    );
    event PlatformFeeCharged(uint256 indexed projectId, uint256 amount);
    event AdminAdded(address indexed admin);
    event AdminRemoved(address indexed admin);

    // Modificadores
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlyAdmin() {
        require(
            msg.sender == owner || admins[msg.sender],
            "Only admin can call this function"
        );
        _;
    }

    modifier projectExists(uint256 _projectId) {
        require(
            _projectId > 0 && _projectId <= projectCounter,
            "Project does not exist"
        );
        _;
    }

    modifier onlyClient(uint256 _projectId) {
        require(
            projects[_projectId].client == msg.sender,
            "Only client can call this function"
        );
        _;
    }

    modifier onlyDeveloper(uint256 _projectId) {
        require(
            projects[_projectId].developer == msg.sender,
            "Only assigned developer can call this function"
        );
        _;
    }

    modifier onlyProjectParties(uint256 _projectId) {
        require(
            projects[_projectId].client == msg.sender ||
                projects[_projectId].developer == msg.sender,
            "Only client or developer can call this function"
        );
        _;
    }

    constructor() {
        owner = msg.sender;
        admins[msg.sender] = true; // Owner es admin por defecto
    }

    /**
     * @dev Calcular comisión de la plataforma usando la fórmula de la calculadora
     * @param _amount Monto total del proyecto
     * @return Comisión calculada
     */
    function _calculatePlatformFee(
        uint256 _amount
    ) internal pure returns (uint256) {
        // Fórmula simplificada:
        // Premium (15k+ PAS): 2.5%
        // Normal: 3%

        uint256 feePercentage;

        if (_amount >= 15000 * 10 ** 18) {
            // 15k+ PAS
            feePercentage = BASE_FEE_PERCENTAGE - PREMIUM_DISCOUNT; // 2.5%
        } else {
            feePercentage = BASE_FEE_PERCENTAGE; // 3%
        }

        return (_amount * feePercentage) / 10000;
    }

    /**
     * @dev Crear un nuevo proyecto con milestones y fondo de riesgo personalizado
     * @param _description Descripción del proyecto
     * @param _milestoneAmounts Array con los montos de cada milestone
     * @param _riskFund Monto del fondo de riesgo definido por el cliente
     * @param _protection Tipo de protección (Basic = sin comisión, Premium = con comisión)
     */
    function createProject(
        string memory _description,
        uint256[] memory _milestoneAmounts,
        uint256 _riskFund,
        ProtectionType _protection
    ) external payable {
        require(
            _milestoneAmounts.length > 0,
            "At least one milestone required"
        );
        require(
            _milestoneAmounts.length <= 10,
            "Maximum 10 milestones allowed"
        );
        require(bytes(_description).length > 0, "Description cannot be empty");
        require(_riskFund > 0, "Risk fund must be greater than 0");

        uint256 totalMilestones = 0;
        for (uint256 i = 0; i < _milestoneAmounts.length; i++) {
            require(
                _milestoneAmounts[i] > 0,
                "Milestone amount must be greater than 0"
            );
            totalMilestones += _milestoneAmounts[i];
        }

        require(
            totalMilestones >= MIN_PROJECT_AMOUNT,
            "Minimum 10 PAS required"
        );

        // Calcular comisión SOLO si se elige protección Premium
        uint256 platformFee = 0;
        if (_protection == ProtectionType.Premium) {
            platformFee = _calculatePlatformFee(totalMilestones);
        }
        // Si es Basic, platformFee = 0 (sin comisión)

        // ✅ Agregar 50 PAS para cubrir costos de gas
        uint256 totalRequired = totalMilestones +
            _riskFund +
            platformFee +
            GAS_RESERVE;
        require(msg.value == totalRequired, "Incorrect payment amount");

        projectCounter++;

        // Inicializar arrays de aprobación
        bool[] memory milestoneCompletedArray = new bool[](
            _milestoneAmounts.length
        );
        bool[] memory milestoneApprovedByClientArray = new bool[](
            _milestoneAmounts.length
        );
        bool[] memory milestoneApprovedByDeveloperArray = new bool[](
            _milestoneAmounts.length
        );

        projects[projectCounter] = Project({
            client: payable(msg.sender),
            developer: payable(address(0)),
            totalAmount: totalMilestones,
            riskFund: _riskFund,
            platformFee: platformFee,
            milestoneAmounts: _milestoneAmounts,
            milestoneCompleted: milestoneCompletedArray,
            milestoneApprovedByClient: milestoneApprovedByClientArray,
            milestoneApprovedByDeveloper: milestoneApprovedByDeveloperArray,
            protection: _protection, // Usar el tipo de protección elegido por el cliente
            status: ProjectStatus.Open,
            createdAt: block.timestamp,
            expiresAt: block.timestamp + PROJECT_EXPIRATION_TIME,
            description: _description,
            clientConfirmedStart: false,
            developerConfirmedStart: false,
            riskFundClaimed: false,
            isCompletedByBoth: false
        });

        totalEscrowBalance[msg.sender] += msg.value;

        // Transferir comisión de plataforma
        if (platformFee > 0) {
            platformBalance += platformFee;
            emit PlatformFeeCharged(projectCounter, platformFee);
        }

        emit ProjectCreated(
            projectCounter,
            msg.sender,
            totalMilestones,
            _riskFund,
            platformFee
        );
    }

    /**
     * @dev Aplicar como developer a un proyecto
     * @param _projectId ID del proyecto
     */
    function applyToProject(
        uint256 _projectId
    ) external projectExists(_projectId) {
        Project storage project = projects[_projectId];

        require(
            project.status == ProjectStatus.Open,
            "Project is not open for applications"
        );
        require(block.timestamp < project.expiresAt, "Project has expired");
        require(
            msg.sender != project.client,
            "Client cannot apply to own project"
        );
        require(
            developerActiveProjects[msg.sender] < MAX_DEVELOPER_PROJECTS,
            "Maximum active projects reached"
        );

        // Verificar que el developer no haya aplicado ya
        address[] storage applicants = projectApplicants[_projectId];
        for (uint256 i = 0; i < applicants.length; i++) {
            require(
                applicants[i] != msg.sender,
                "Already applied to this project"
            );
        }

        applicants.push(msg.sender);

        emit DeveloperApplied(_projectId, msg.sender);
    }

    /**
     * @dev Aprobar un developer para el proyecto
     * @param _projectId ID del proyecto
     * @param _developer Dirección del developer a aprobar
     */
    function approveDeveloper(
        uint256 _projectId,
        address _developer
    ) external projectExists(_projectId) onlyClient(_projectId) {
        Project storage project = projects[_projectId];

        require(project.status == ProjectStatus.Open, "Project is not open");
        require(_developer != address(0), "Invalid developer address");
        require(
            developerActiveProjects[_developer] < MAX_DEVELOPER_PROJECTS,
            "Developer has too many active projects"
        );

        // Verificar que el developer aplicó al proyecto
        address[] storage applicants = projectApplicants[_projectId];
        bool hasApplied = false;
        for (uint256 i = 0; i < applicants.length; i++) {
            if (applicants[i] == _developer) {
                hasApplied = true;
                break;
            }
        }
        require(hasApplied, "Developer has not applied to this project");

        project.developer = payable(_developer);
        project.status = ProjectStatus.Pending; // Cambio: Ahora es Pending hasta que ambos confirmen
        developerActiveProjects[_developer]++;

        emit DeveloperApproved(_projectId, _developer);
    }

    /**
     * @dev Confirmar inicio del proyecto (ambas partes deben confirmar)
     * @param _projectId ID del proyecto
     */
    function confirmProjectStart(
        uint256 _projectId
    ) external projectExists(_projectId) onlyProjectParties(_projectId) {
        Project storage project = projects[_projectId];

        require(
            project.status == ProjectStatus.Pending,
            "Project is not in pending status"
        );
        require(project.developer != address(0), "No developer assigned");

        if (msg.sender == project.client) {
            require(
                !project.clientConfirmedStart,
                "Client already confirmed start"
            );
            project.clientConfirmedStart = true;
            emit ProjectStartConfirmed(_projectId, msg.sender, true);
        } else if (msg.sender == project.developer) {
            require(
                !project.developerConfirmedStart,
                "Developer already confirmed start"
            );
            project.developerConfirmedStart = true;
            emit ProjectStartConfirmed(_projectId, msg.sender, false);
        }

        // Si ambos confirmaron, el proyecto inicia
        if (project.clientConfirmedStart && project.developerConfirmedStart) {
            project.status = ProjectStatus.InProgress;
            emit ProjectStarted(_projectId);
        }
    }

    /**
     * @dev Marcar milestone como completado por el developer
     * @param _projectId ID del proyecto
     * @param _milestone Índice del milestone (0-based)
     */
    function markMilestoneCompleted(
        uint256 _projectId,
        uint256 _milestone
    ) external projectExists(_projectId) onlyDeveloper(_projectId) {
        Project storage project = projects[_projectId];

        require(
            project.status == ProjectStatus.InProgress,
            "Project is not in progress"
        );
        require(
            _milestone < project.milestoneAmounts.length,
            "Invalid milestone index"
        );
        require(
            !project.milestoneCompleted[_milestone],
            "Milestone already completed"
        );

        project.milestoneCompleted[_milestone] = true;
        emit MilestoneCompleted(
            _projectId,
            _milestone,
            project.milestoneAmounts[_milestone]
        );
    }

    /**
     * @dev Aprobar milestone completado (ambas partes deben aprobar)
     * @param _projectId ID del proyecto
     * @param _milestone Índice del milestone (0-based)
     */
    function approveMilestone(
        uint256 _projectId,
        uint256 _milestone
    ) external projectExists(_projectId) onlyProjectParties(_projectId) {
        Project storage project = projects[_projectId];

        require(
            project.status == ProjectStatus.InProgress,
            "Project is not in progress"
        );
        require(
            _milestone < project.milestoneAmounts.length,
            "Invalid milestone index"
        );
        require(
            project.milestoneCompleted[_milestone],
            "Milestone not marked as completed yet"
        );

        if (msg.sender == project.client) {
            require(
                !project.milestoneApprovedByClient[_milestone],
                "Already approved by client"
            );
            project.milestoneApprovedByClient[_milestone] = true;
            emit MilestoneApproved(_projectId, _milestone, msg.sender, true);
        } else if (msg.sender == project.developer) {
            require(
                !project.milestoneApprovedByDeveloper[_milestone],
                "Already approved by developer"
            );
            project.milestoneApprovedByDeveloper[_milestone] = true;
            emit MilestoneApproved(_projectId, _milestone, msg.sender, false);
        }

        // Si ambos aprobaron, liberar fondos
        if (
            project.milestoneApprovedByClient[_milestone] &&
            project.milestoneApprovedByDeveloper[_milestone]
        ) {
            _releaseMilestoneFunds(_projectId, _milestone);
        }
    }

    /**
     * @dev Función interna para liberar fondos de milestone
     */
    function _releaseMilestoneFunds(
        uint256 _projectId,
        uint256 _milestone
    ) internal {
        Project storage project = projects[_projectId];
        uint256 milestoneAmount = project.milestoneAmounts[_milestone];

        // Transferir pago al developer (sin comisión, ya fue descontada en createProject)
        project.developer.transfer(milestoneAmount);
        totalEscrowBalance[project.client] -= milestoneAmount;

        // Verificar si todos los milestones están completados y aprobados
        bool allMilestonesComplete = true;
        for (uint256 i = 0; i < project.milestoneAmounts.length; i++) {
            if (
                !project.milestoneApprovedByClient[i] ||
                !project.milestoneApprovedByDeveloper[i]
            ) {
                allMilestonesComplete = false;
                break;
            }
        }

        if (allMilestonesComplete) {
            project.status = ProjectStatus.Completed;
            project.isCompletedByBoth = true;
            developerActiveProjects[project.developer]--;
            emit ProjectCompleted(_projectId);
        }
    }

    /**
     * @dev Cancelar proyecto con sistema de fondo de riesgo
     * @param _projectId ID del proyecto
     * @param _reason Razón de la cancelación
     */
    function cancelProject(
        uint256 _projectId,
        string memory _reason
    ) external projectExists(_projectId) onlyClient(_projectId) {
        Project storage project = projects[_projectId];

        require(
            project.status == ProjectStatus.Open ||
                project.status == ProjectStatus.Pending ||
                project.status == ProjectStatus.InProgress,
            "Cannot cancel completed project"
        );

        project.status = ProjectStatus.Cancelled;

        if (project.developer != address(0)) {
            developerActiveProjects[project.developer]--;

            // Si hay developer asignado, el 30% del fondo de riesgo va al developer
            if (project.riskFund > 0 && !project.riskFundClaimed) {
                project.developer.transfer(project.riskFund);
                project.riskFundClaimed = true;
                emit RiskFundReleased(
                    _projectId,
                    project.developer,
                    project.riskFund
                );
            }
        }

        // Calcular reembolso al cliente (milestones no completados)
        uint256 refundAmount = 0;
        for (uint256 i = 0; i < project.milestoneAmounts.length; i++) {
            if (
                !project.milestoneApprovedByClient[i] ||
                !project.milestoneApprovedByDeveloper[i]
            ) {
                refundAmount += project.milestoneAmounts[i];
            }
        }

        // Si no hay developer asignado, devolver también el fondo de riesgo
        if (
            project.developer == address(0) &&
            project.riskFund > 0 &&
            !project.riskFundClaimed
        ) {
            refundAmount += project.riskFund;
            project.riskFundClaimed = true;
        }

        if (refundAmount > 0) {
            project.client.transfer(refundAmount);
            totalEscrowBalance[project.client] -= refundAmount;
        }

        emit ProjectCancelled(_projectId, _reason);
    }

    /**
     * @dev Función administrativa para liberar fondos en caso de disputa
     * @param _projectId ID del proyecto
     * @param _recipient Destinatario de los fondos (client o developer)
     * @param _amount Monto a liberar
     * @param _reason Razón de la liberación
     */
    function adminReleaseFunds(
        uint256 _projectId,
        address payable _recipient,
        uint256 _amount,
        string memory _reason
    ) external projectExists(_projectId) onlyAdmin {
        Project storage project = projects[_projectId];

        require(
            _recipient == project.client || _recipient == project.developer,
            "Recipient must be client or developer"
        );
        require(_amount > 0, "Amount must be greater than 0");
        require(
            address(this).balance >= _amount,
            "Insufficient contract balance"
        );

        _recipient.transfer(_amount);
        totalEscrowBalance[project.client] -= _amount;

        emit AdminFundsReleased(_projectId, _recipient, _amount, _reason);
    }

    /**
     * @dev Agregar administrador
     */
    function addAdmin(address _admin) external onlyOwner {
        require(_admin != address(0), "Invalid admin address");
        require(!admins[_admin], "Already an admin");

        admins[_admin] = true;
        emit AdminAdded(_admin);
    }

    /**
     * @dev Remover administrador
     */
    function removeAdmin(address _admin) external onlyOwner {
        require(_admin != address(0), "Invalid admin address");
        require(admins[_admin], "Not an admin");
        require(_admin != owner, "Cannot remove owner");

        admins[_admin] = false;
        emit AdminRemoved(_admin);
    }

    /**
     * @dev Calcular comisión de la plataforma (función pública)
     * @param _amount Monto total del proyecto
     * @return Comisión calculada
     */
    function calculatePlatformFee(
        uint256 _amount
    ) external pure returns (uint256) {
        return _calculatePlatformFee(_amount);
    }

    /**
     * @dev Obtener aplicantes de un proyecto
     * @param _projectId ID del proyecto
     */
    function getProjectApplicants(
        uint256 _projectId
    ) external view projectExists(_projectId) returns (address[] memory) {
        return projectApplicants[_projectId];
    }

    /**
     * @dev Obtener detalles completos de un proyecto
     * @param _projectId ID del proyecto
     */
    function getProjectDetails(
        uint256 _projectId
    )
        external
        view
        projectExists(_projectId)
        returns (
            address client,
            address developer,
            uint256 totalAmount,
            uint256 riskFund,
            uint256 platformFee,
            uint256[] memory milestoneAmounts,
            bool[] memory milestoneCompleted,
            ProtectionType protection,
            ProjectStatus status,
            uint256 createdAt,
            uint256 expiresAt,
            string memory description
        )
    {
        Project storage project = projects[_projectId];
        return (
            project.client,
            project.developer,
            project.totalAmount,
            project.riskFund,
            project.platformFee,
            project.milestoneAmounts,
            project.milestoneCompleted,
            project.protection,
            project.status,
            project.createdAt,
            project.expiresAt,
            project.description
        );
    }

    /**
     * @dev Retirar comisiones acumuladas (solo owner)
     */
    function withdrawPlatformBalance() external onlyOwner {
        require(platformBalance > 0, "No balance to withdraw");

        uint256 amount = platformBalance;
        platformBalance = 0;

        payable(owner).transfer(amount);
    }

    // Función para recibir Ether
    receive() external payable {
        // Permitir recibir Ether para casos especiales
    }
}
