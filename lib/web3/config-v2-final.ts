// Web3 Configuration for Spear Platform V2 - Updated
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

// Contract Constants (matching SpearEscrowV2.sol updated)
export const CONTRACT_CONSTANTS = {
  MIN_PROJECT_AMOUNT: 10 * 10 ** 6, // 10 USDT (6 decimals)
  PREMIUM_THRESHOLD: 15000 * 10 ** 6, // 15,000 USDT for premium protection
  MAX_DEVELOPER_PROJECTS: 5,
  PROJECT_EXPIRATION_TIME: 7 * 24 * 60 * 60, // 7 days in seconds

  // Platform Fee Constants (Calculator Formula)
  BASE_FEE_PERCENTAGE: 300, // 3% base
  PREMIUM_DISCOUNT: 50, // 0.5% discount for premium
  MAX_FEE_PERCENTAGE: 500, // 5% maximum
  MIN_FEE_PERCENTAGE: 100, // 1% minimum
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

/**
 * Calcular comisión de la plataforma usando la fórmula de la calculadora
 * @param amount Monto total del proyecto en wei
 * @returns Comisión calculada en wei
 */
export function calculatePlatformFee(amount: number): number {
  // Convertir constants a números para cálculos
  const basePercentage = CONTRACT_CONSTANTS.BASE_FEE_PERCENTAGE; // 300 = 3%
  const premiumDiscount = CONTRACT_CONSTANTS.PREMIUM_DISCOUNT; // 50 = 0.5%
  const maxPercentage = CONTRACT_CONSTANTS.MAX_FEE_PERCENTAGE; // 500 = 5%
  const minPercentage = CONTRACT_CONSTANTS.MIN_FEE_PERCENTAGE; // 100 = 1%
  const premiumThreshold = CONTRACT_CONSTANTS.PREMIUM_THRESHOLD; // 15k USDT

  let feePercentage: number;

  if (amount >= premiumThreshold) {
    // Proyectos premium: 3% - 0.5% = 2.5%
    feePercentage = basePercentage - premiumDiscount; // 250 = 2.5%
  } else {
    // Proyectos normales: 3%
    feePercentage = basePercentage; // 300 = 3%
  }

  // Aplicar límites min/max
  if (feePercentage > maxPercentage) {
    feePercentage = maxPercentage;
  }
  if (feePercentage < minPercentage) {
    feePercentage = minPercentage;
  }

  return Math.floor((amount * feePercentage) / 10000); // Base 10000 para porcentajes
}

/**
 * Calcular costos totales del proyecto
 * @param milestoneAmounts Array de montos de milestones
 * @param riskFund Fondo de riesgo definido por el cliente
 * @returns Objeto con costos calculados
 */
export function calculateProjectCosts(milestoneAmounts: number[], riskFund: number) {
  const totalAmount = milestoneAmounts.reduce((sum, amount) => sum + amount, 0);
  const platformFee = calculatePlatformFee(totalAmount);

  let protectionType = ProtectionType.Basic;
  if (totalAmount >= CONTRACT_CONSTANTS.PREMIUM_THRESHOLD) {
    protectionType = ProtectionType.Premium;
  }

  return {
    totalAmount,
    riskFund, // Definido por el cliente
    platformFee, // Calculado automáticamente
    totalRequired: totalAmount + riskFund + platformFee,
    protectionType,
    feePercentage: (platformFee / totalAmount) * 100, // Para mostrar al usuario
  };
}