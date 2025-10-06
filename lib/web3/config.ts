export const NETWORKS = {
  POLKADOT_HUB: {
    chainId: '0x190f1b46', // 420420422 en decimal
    chainName: 'Polkadot Asset Hub TestNet',
    nativeCurrency: {
      name: 'PAS',
      symbol: 'PAS',
      decimals: 18,
    },
    rpcUrls: ['https://testnet-passet-hub-eth-rpc.polkadot.io'],
    blockExplorerUrls: ['https://blockscout-passet-hub.parity-testnet.parity.io']
  }
} as const;

export const CONTRACT_ADDRESSES = {
  POLKADOT_HUB: '0xf90f46345E09Bd8C6c265EdEbFa30269891EC259'
} as const;

export const DEFAULT_NETWORK = NETWORKS.POLKADOT_HUB;
export const DEFAULT_CONTRACT_ADDRESS = CONTRACT_ADDRESSES.POLKADOT_HUB;

// Tipos de protección
export enum ProtectionType {
  Basic = 0,
  Premium = 1,
}

// Estados de proyecto (deben coincidir con el contrato SpearEscrowV2)
export enum ProjectStatus {
  Open = 0,        // Proyecto abierto para aplicaciones
  Pending = 1,     // Developer asignado, esperando confirmación de inicio
  InProgress = 2,  // Proyecto en progreso (ambas partes confirmaron)
  Completed = 3,   // Proyecto completado exitosamente
  Cancelled = 4,   // Proyecto cancelado
  Expired = 5,     // Proyecto expirado sin asignación
  Disputed = 6     // En disputa, requiere intervención admin
}

// Constantes del contrato
export const CONTRACT_CONSTANTS = {
  MIN_PROJECT_AMOUNT: 10 * 10 ** 18, // 10 PAS (18 decimales)
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
  milestoneAmounts: string[]; // En PAS como strings
  riskFund: string; // En PAS como string
  protection: ProtectionType; // Basic = sin comisión, Premium = con comisión
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
  return CONTRACT_ADDRESSES.POLKADOT_HUB;
}

export function formatProjectStatus(status: ProjectStatus): string {
  switch (status) {
    case ProjectStatus.Open:
      return 'Abierto';
    case ProjectStatus.Pending:
      return 'Pendiente';
    case ProjectStatus.InProgress:
      return 'En Progreso';
    case ProjectStatus.Completed:
      return 'Completado';
    case ProjectStatus.Cancelled:
      return 'Cancelado';
    case ProjectStatus.Expired:
      return 'Expirado';
    case ProjectStatus.Disputed:
      return 'En Disputa';
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
