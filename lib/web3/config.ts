export const NETWORKS = {
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
    chainId: '0x7a69',
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

export const CONTRACT_ADDRESSES = {
  SEPOLIA: '0xeda2FdE00141C5453fBaf3c6856222A289ba3BE6',
  MAINNET: '', // Por determinar cuando se despliegue
  LOCALHOST: '', // Por determinar para desarrollo local
} as const;

// Configuración por defecto
export const DEFAULT_NETWORK = NETWORKS.SEPOLIA;
export const DEFAULT_CONTRACT_ADDRESS = CONTRACT_ADDRESSES.SEPOLIA;

// Tipos de protección
export enum ProtectionType {
  Basic = 0,
  Premium = 1,
}

// Estados de proyecto
export enum ProjectStatus {
  Open = 0,
  InProgress = 1,
  Completed = 2,
  Cancelled = 3,
  Expired = 4,
}

// Constantes del contrato
export const CONTRACT_CONSTANTS = {
  MIN_PROJECT_AMOUNT: 10 * 10 ** 6, // 10 USDT (6 decimales)
  MAX_DEVELOPER_PROJECTS: 5,
  PROJECT_EXPIRATION_TIME: 7 * 24 * 60 * 60, // 7 días en segundos
  BASIC_COMMISSION: 0, // 0%
  PREMIUM_COMMISSION_MIN: 100, // 1%
  PREMIUM_COMMISSION_MAX: 300, // 3%
} as const;

// Tipos TypeScript para el contrato
export interface Project {
  client: string;
  developer: string;
  totalAmount: bigint;
  riskFund: bigint;
  milestoneAmounts: bigint[];
  milestoneCompleted: boolean[];
  protection: ProtectionType;
  status: ProjectStatus;
  createdAt: bigint;
  expiresAt: bigint;
  description: string;
  riskFundClaimed: boolean;
}

export interface ProjectDetails {
  client: string;
  developer: string;
  totalAmount: bigint;
  riskFund: bigint;
  milestoneAmounts: bigint[];
  milestoneCompleted: boolean[];
  protection: ProtectionType;
  status: ProjectStatus;
  createdAt: bigint;
  expiresAt: bigint;
  description: string;
}

export interface CreateProjectParams {
  description: string;
  milestoneAmounts: string[]; // En ETH como strings
  riskFund: string; // En ETH como string
  protection: ProtectionType;
}

// Eventos del contrato
export interface ProjectCreatedEvent {
  projectId: bigint;
  client: string;
  amount: bigint;
}

export interface DeveloperAppliedEvent {
  projectId: bigint;
  developer: string;
}

export interface MilestoneCompletedEvent {
  projectId: bigint;
  milestone: bigint;
  amount: bigint;
}

// Utility functions
export function getNetworkByChainId(chainId: string) {
  return Object.values(NETWORKS).find(network => network.chainId === chainId);
}

export function getContractAddressByChainId(chainId: string): string {
  switch (chainId) {
    case NETWORKS.SEPOLIA.chainId:
      return CONTRACT_ADDRESSES.SEPOLIA;
    case NETWORKS.MAINNET.chainId:
      return CONTRACT_ADDRESSES.MAINNET;
    case NETWORKS.LOCALHOST.chainId:
      return CONTRACT_ADDRESSES.LOCALHOST;
    default:
      return CONTRACT_ADDRESSES.SEPOLIA; // Fallback a Sepolia
  }
}

export function formatProjectStatus(status: ProjectStatus): string {
  switch (status) {
    case ProjectStatus.Open:
      return 'Abierto';
    case ProjectStatus.InProgress:
      return 'En Progreso';
    case ProjectStatus.Completed:
      return 'Completado';
    case ProjectStatus.Cancelled:
      return 'Cancelado';
    case ProjectStatus.Expired:
      return 'Expirado';
    default:
      return 'Desconocido';
  }
}

export function formatProtectionType(protection: ProtectionType): string {
  switch (protection) {
    case ProtectionType.Basic:
      return 'Básica (0% comisión)';
    case ProtectionType.Premium:
      return 'Premium (1-3% comisión)';
    default:
      return 'Desconocido';
  }
}