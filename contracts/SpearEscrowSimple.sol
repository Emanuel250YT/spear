// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title SpearEscrowSimple
 * @dev Simplified escrow contract for Polkadot Hub TestNet deployment
 */
contract SpearEscrowSimple {
    address public owner;
    uint256 public projectCounter;
    
    enum ProjectStatus { Open, InProgress, Completed, Cancelled }
    
    struct Project {
        address client;
        address developer;
        uint256 amount;
        ProjectStatus status;
    }
    
    mapping(uint256 => Project) public projects;
    
    event ProjectCreated(uint256 indexed projectId, address indexed client, uint256 amount);
    event ProjectCompleted(uint256 indexed projectId);
    
    constructor() {
        owner = msg.sender;
    }
    
    function createProject() external payable {
        require(msg.value > 0, "Amount must be greater than 0");
        
        projectCounter++;
        projects[projectCounter] = Project({
            client: msg.sender,
            developer: address(0),
            amount: msg.value,
            status: ProjectStatus.Open
        });
        
        emit ProjectCreated(projectCounter, msg.sender, msg.value);
    }
    
    function completeProject(uint256 _projectId) external {
        Project storage project = projects[_projectId];
        require(project.client == msg.sender, "Only client can complete");
        require(project.status == ProjectStatus.InProgress, "Project not in progress");
        
        project.status = ProjectStatus.Completed;
        emit ProjectCompleted(_projectId);
    }
    
    function getProject(uint256 _projectId) external view returns (
        address client,
        address developer,
        uint256 amount,
        ProjectStatus status
    ) {
        Project storage project = projects[_projectId];
        return (project.client, project.developer, project.amount, project.status);
    }
}
