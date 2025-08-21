/**
 * SUI Client - Core client for interacting with SUI blockchain
 */

import { SuiClientConfig, NetworkConfig } from '../types';
import { RpcClient } from './rpc-client';
import { WebSocketClient } from './websocket-client';

/**
 * Main SUI Client class for blockchain interactions
 */
export class SuiClient {
  private config: SuiClientConfig;
  private rpcClient: RpcClient;
  private wsClient?: WebSocketClient;

  constructor(config: SuiClientConfig) {
    this.config = this.validateAndNormalizeConfig(config);
    this.rpcClient = new RpcClient(this.config.rpcUrl);
    
    if (this.config.websocketUrl) {
      this.wsClient = new WebSocketClient(this.config.websocketUrl);
    }
  }

  /**
   * Get the current network configuration
   */
  getNetwork(): NetworkConfig {
    return {
      rpcUrl: this.config.rpcUrl,
      websocketUrl: this.config.websocketUrl,
      faucetUrl: this.config.faucetUrl
    };
  }

  /**
   * Check if the client is connected to the network
   */
  async isConnected(): Promise<boolean> {
    try {
      await this.rpcClient.call('sui_getChainIdentifier', []);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get chain identifier
   */
  async getChainId(): Promise<string> {
    return this.rpcClient.call('sui_getChainIdentifier', []);
  }

  /**
   * Get latest checkpoint sequence number
   */
  async getLatestCheckpointSequenceNumber(): Promise<string> {
    return this.rpcClient.call('sui_getLatestCheckpointSequenceNumber', []);
  }

  private validateAndNormalizeConfig(config: SuiClientConfig): SuiClientConfig {
    if (!config.rpcUrl) {
      throw new Error('RPC URL is required');
    }

    return {
      ...config,
      rpcUrl: config.rpcUrl.endsWith('/') ? config.rpcUrl.slice(0, -1) : config.rpcUrl,
      timeout: config.timeout ?? 30000,
      retries: config.retries ?? 3
    };
  }
}

export * from './rpc-client';
export * from './websocket-client';