/**
 * Constants and configuration values for SUI SDK
 */

// Network endpoints
export const NETWORK_ENDPOINTS = {
  MAINNET: {
    rpcUrl: 'https://fullnode.mainnet.sui.io',
    websocketUrl: 'wss://fullnode.mainnet.sui.io',
    faucetUrl: undefined
  },
  TESTNET: {
    rpcUrl: 'https://fullnode.testnet.sui.io',
    websocketUrl: 'wss://fullnode.testnet.sui.io', 
    faucetUrl: 'https://faucet.testnet.sui.io/gas'
  },
  DEVNET: {
    rpcUrl: 'https://fullnode.devnet.sui.io',
    websocketUrl: 'wss://fullnode.devnet.sui.io',
    faucetUrl: 'https://faucet.devnet.sui.io/gas'
  },
  LOCALNET: {
    rpcUrl: 'http://127.0.0.1:9000',
    websocketUrl: 'ws://127.0.0.1:9001',
    faucetUrl: 'http://127.0.0.1:9123/gas'
  }
} as const;

// Gas constants
export const GAS_CONSTANTS = {
  DEFAULT_GAS_BUDGET: 10000000,
  MIN_GAS_BUDGET: 1000,
  MAX_GAS_BUDGET: 50000000000,
  GAS_PRICE_STEP: 1000
} as const;

// Transaction constants
export const TRANSACTION_CONSTANTS = {
  MAX_TRANSACTION_SIZE: 128 * 1024, // 128KB
  MAX_INPUT_OBJECTS: 2048,
  MAX_COMMANDS: 1024,
  DEFAULT_TIMEOUT: 30000
} as const;

// SUI coin constants
export const SUI_COIN = {
  COIN_TYPE: '0x2::sui::SUI',
  DECIMALS: 9,
  SYMBOL: 'SUI'
} as const;

// Address constants
export const ADDRESS_CONSTANTS = {
  SUI_FRAMEWORK_ADDRESS: '0x2',
  SUI_SYSTEM_ADDRESS: '0x3',
  CLOCK_OBJECT_ID: '0x6',
  SUI_RANDOM_ID: '0x8'
} as const;

// Move stdlib constants
export const MOVE_STDLIB = {
  ADDRESS: '0x1',
  OPTION_MODULE: '0x1::option',
  STRING_MODULE: '0x1::string',
  VECTOR_MODULE: '0x1::vector'
} as const;

// RPC method names
export const RPC_METHODS = {
  // Read API
  GET_OBJECT: 'sui_getObject',
  GET_OBJECTS: 'sui_multiGetObjects',
  GET_OWNED_OBJECTS: 'sui_getOwnedObjects',
  GET_DYNAMIC_FIELDS: 'sui_getDynamicFields',
  GET_DYNAMIC_FIELD_OBJECT: 'sui_getDynamicFieldObject',
  
  // Transaction API
  GET_TRANSACTION_BLOCK: 'sui_getTransactionBlock',
  GET_MULTI_TRANSACTION_BLOCKS: 'sui_multiGetTransactionBlocks',
  EXECUTE_TRANSACTION_BLOCK: 'sui_executeTransactionBlock',
  DRY_RUN_TRANSACTION_BLOCK: 'sui_dryRunTransactionBlock',
  
  // Network API
  GET_CHAIN_IDENTIFIER: 'sui_getChainIdentifier',
  GET_REFERENCE_GAS_PRICE: 'sui_getReferenceGasPrice',
  GET_PROTOCOL_CONFIG: 'sui_getProtocolConfig',
  
  // Governance API
  GET_STAKES: 'suix_getStakes',
  GET_COMMITTEE_INFO: 'sui_getCommitteeInfo',
  GET_LATEST_SUI_SYSTEM_STATE: 'sui_getLatestSuiSystemState'
} as const;

export type NetworkType = keyof typeof NETWORK_ENDPOINTS;