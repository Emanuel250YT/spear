// Web3 Configuration for Spear Platform V2
export const NETWORKS = {
  localhost: {
    chainId: 1337,
    name: 'Localhost',
    rpcUrl: 'http://127.0.0.1:8545',
    contractAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3', // Default Hardhat address
  },
  sepolia: {
    chainId: 11155111,
    name: 'Sepolia Testnet',
    rpcUrl: 'https://sepolia.infura.io/v3/',
    contractAddress: '0xeda2FdE00141C5453fBaf3c6856222A289ba3BE6', // Deployed V1 address
    contractAddressV2: '', // Will be updated after V2 deployment
  },
  mainnet: {
    chainId: 1,
    name: 'Ethereum Mainnet',
    rpcUrl: 'https://mainnet.infura.io/v3/',
    contractAddress: '', // Production address
  },
} as const;

export const DEFAULT_NETWORK = 'sepolia';

// Contract Constants (matching SpearEscrowV2.sol)
export const CONTRACT_CONSTANTS = {
  MIN_PROJECT_AMOUNT: 10 * 10 ** 6, // 10 USDT (6 decimals)
  PREMIUM_THRESHOLD: 15000 * 10 ** 6, // 15,000 USDT for premium protection
  MAX_DEVELOPER_PROJECTS: 5,
  PROJECT_EXPIRATION_TIME: 7 * 24 * 60 * 60, // 7 days in seconds
  RISK_FUND_PERCENTAGE: 30, // 30% of project amount
  PREMIUM_FEE_PERCENTAGE: 50, // 0.5% for projects 15k+
} as const;

// Project Status Enum (matching contract)
export enum ProjectStatus {
  Open = 0,           // Proyecto abierto para aplicaciones
  Pending = 1,        // Developer asignado, esperando confirmación dual
  InProgress = 2,     // Proyecto en progreso (ambas partes confirmaron)
  Completed = 3,      // Proyecto completado exitosamente
  Cancelled = 4,      // Proyecto cancelado
  Expired = 5,        // Proyecto expirado sin asignación
  Disputed = 6        // En disputa, requiere intervención admin
}

// Protection Type Enum (matching contract)
export enum ProtectionType {
  Basic = 0,          // Protección básica
  Premium = 1         // Protección premium para empresas
}

// MetaMask Network Configuration
export const METAMASK_NETWORKS = {
  SEPOLIA: {
    chainId: '0xaa36a7',
    chainName: 'Sepolia Testnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://sepolia.infura.io/v3/'],
    blockExplorerUrls: ['https://sepolia.etherscan.io/'],
  },
  MAINNET: {
    chainId: '0x1',
    chainName: 'Ethereum Mainnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://mainnet.infura.io/v3/'],
    blockExplorerUrls: ['https://etherscan.io/'],
  },
  LOCALHOST: {
    chainId: '0x539', // 1337 in hex
    chainName: 'Localhost 8545',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['http://localhost:8545'],
    blockExplorerUrls: [],
  },
} as const;

// Helper functions
export function getNetworkConfig(chainId: number) {
  return Object.values(NETWORKS).find(network => network.chainId === chainId);
}

export function isValidNetwork(chainId: number): boolean {
  return Object.values(NETWORKS).some(network => network.chainId === chainId);
}

export function formatProjectStatus(status: ProjectStatus): string {
  const statusMap = {
    [ProjectStatus.Open]: 'Abierto',
    [ProjectStatus.Pending]: 'Pendiente',
    [ProjectStatus.InProgress]: 'En Progreso',
    [ProjectStatus.Completed]: 'Completado',
    [ProjectStatus.Cancelled]: 'Cancelado',
    [ProjectStatus.Expired]: 'Expirado',
    [ProjectStatus.Disputed]: 'En Disputa',
  };
  return statusMap[status] || 'Desconocido';
}

export function calculateProjectCosts(milestoneAmounts: number[]) {
  const totalAmount = milestoneAmounts.reduce((sum, amount) => sum + amount, 0);
  const riskFund = Math.floor((totalAmount * CONTRACT_CONSTANTS.RISK_FUND_PERCENTAGE) / 100);

  let premiumFee = 0;
  let protectionType = ProtectionType.Basic;

  if (totalAmount >= CONTRACT_CONSTANTS.PREMIUM_THRESHOLD) {
    premiumFee = Math.floor((totalAmount * CONTRACT_CONSTANTS.PREMIUM_FEE_PERCENTAGE) / 10000); // 0.5%
    protectionType = ProtectionType.Premium;
  }

  return {
    totalAmount,
    riskFund,
    premiumFee,
    totalRequired: totalAmount + riskFund + premiumFee,
    protectionType,
  };
}