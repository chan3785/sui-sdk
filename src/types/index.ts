/**
 * Core type definitions for SUI SDK
 */

// Network and Client Configuration
export interface NetworkConfig {
  rpcUrl: string;
  websocketUrl?: string;
  faucetUrl?: string;
}

export interface SuiClientConfig extends NetworkConfig {
  timeout?: number;
  retries?: number;
  headers?: Record<string, string>;
}

// Basic SUI Types
export type ObjectId = string;
export type TransactionDigest = string;
export type SuiAddress = string;
export type EpochId = string;

// Object Related Types
export interface SuiObjectRef {
  objectId: ObjectId;
  version: string;
  digest: string;
}

export interface SuiObjectData {
  objectId: ObjectId;
  version: string;
  digest: string;
  type?: string;
  owner?: ObjectOwner;
  previousTransaction?: TransactionDigest;
  content?: any;
}

export type ObjectOwner =
  | { AddressOwner: SuiAddress }
  | { ObjectOwner: SuiAddress }
  | { Shared: { initial_shared_version: string } }
  | 'Immutable';

// Transaction Related Types
export interface TransactionEffects {
  status: ExecutionStatus;
  gasUsed: GasCostSummary;
  modifiedAtVersions?: Array<{
    objectId: ObjectId;
    sequenceNumber: string;
  }>;
  sharedObjects?: SuiObjectRef[];
  transactionDigest: TransactionDigest;
  created?: SuiObjectRef[];
  mutated?: SuiObjectRef[];
  unwrapped?: SuiObjectRef[];
  deleted?: SuiObjectRef[];
  gasObject: SuiObjectRef;
  events?: SuiEvent[];
}

export interface ExecutionStatus {
  status: 'success' | 'failure';
  error?: string;
}

export interface GasCostSummary {
  computationCost: string;
  storageCost: string;
  storageRebate: string;
  nonRefundableStorageFee: string;
}

// Event Types
export interface SuiEvent {
  id: {
    txDigest: TransactionDigest;
    eventSeq: string;
  };
  packageId: ObjectId;
  transactionModule: string;
  sender: SuiAddress;
  type: string;
  parsedJson?: any;
  bcs?: string;
  timestampMs?: string;
}

// Wallet and Authentication
export interface WalletAdapter {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  signTransaction(transaction: any): Promise<string>;
  signMessage(message: Uint8Array): Promise<string>;
  getAccounts(): Promise<SuiAddress[]>;
}

// RPC Response Types
export interface RpcResponse<T = any> {
  jsonrpc: string;
  id: string | number;
  result?: T;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
}

// Export all types
export * from './transaction';
export * from './events';