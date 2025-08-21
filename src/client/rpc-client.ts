/**
 * RPC Client for SUI blockchain HTTP requests
 */

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { RpcResponse } from '../types';

export class RpcClient {
  private client: AxiosInstance;
  private requestId: number = 0;

  constructor(rpcUrl: string, timeout: number = 30000) {
    this.client = axios.create({
      baseURL: rpcUrl,
      timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request/response interceptors for logging and error handling
    this.setupInterceptors();
  }

  /**
   * Make an RPC call to the SUI node
   */
  async call<T = any>(method: string, params: any[] = []): Promise<T> {
    const requestId = ++this.requestId;
    
    const payload = {
      jsonrpc: '2.0',
      id: requestId,
      method,
      params,
    };

    try {
      const response = await this.client.post<RpcResponse<T>>('/', payload);
      
      if (response.data.error) {
        throw new Error(
          `RPC Error (${response.data.error.code}): ${response.data.error.message}`
        );
      }

      return response.data.result as T;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Network error: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Make multiple RPC calls in batch
   */
  async batchCall(requests: Array<{ method: string; params: any[] }>): Promise<any[]> {
    const batch = requests.map((request) => ({
      jsonrpc: '2.0',
      id: ++this.requestId,
      method: request.method,
      params: request.params,
    }));

    try {
      const response = await this.client.post<RpcResponse[]>('/', batch);
      return response.data.map((res) => {
        if (res.error) {
          throw new Error(`RPC Error (${res.error.code}): ${res.error.message}`);
        }
        return res.result;
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Network error: ${error.message}`);
      }
      throw error;
    }
  }

  private setupInterceptors(): void {
    // Request interceptor for logging
    this.client.interceptors.request.use(
      (config) => {
        console.debug(`[SUI SDK] RPC Request: ${config.method?.toUpperCase()} ${config.url}`, {
          data: config.data
        });
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for logging
    this.client.interceptors.response.use(
      (response) => {
        console.debug(`[SUI SDK] RPC Response:`, {
          status: response.status,
          data: response.data
        });
        return response;
      },
      (error) => {
        console.error(`[SUI SDK] RPC Error:`, {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data
        });
        return Promise.reject(error);
      }
    );
  }
}