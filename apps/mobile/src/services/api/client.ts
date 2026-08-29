import { ApiConfiguration } from './config';
import { ApiHealthStatus } from '../../types';

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface RequestOptions extends RequestInit {
  timeout?: number;
  params?: Record<string, string | number | boolean | undefined>;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { timeout = ApiConfiguration.timeoutMs, params, headers, ...restOptions } = options;

  let url = ApiConfiguration.getApiEndpoint(path);
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined) {
        searchParams.append(key, String(val));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...restOptions,
      headers: {
        ...ApiConfiguration.getDefaultHeaders(),
        ...(headers as Record<string, string>),
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorData: unknown;
      try {
        errorData = await response.json();
      } catch {
        errorData = await response.text();
      }
      throw new ApiError(`Request failed with status ${response.status}`, response.status, errorData);
    }

    return (await response.json()) as T;
  } catch (error: unknown) {
    clearTimeout(timeoutId);
    if (error instanceof ApiError) {
      throw error;
    }
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError(`Request timed out after ${timeout}ms`);
    }
    throw new ApiError(error instanceof Error ? error.message : 'Network error');
  }
}

export const ApiClient = {
  get: <T>(path: string, options?: RequestOptions) => request<T>(path, { ...options, method: 'GET' }),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'POST', body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'PATCH', body: body ? JSON.stringify(body) : undefined }),
  delete: <T>(path: string, options?: RequestOptions) => request<T>(path, { ...options, method: 'DELETE' }),

  /**
   * Health & connectivity verification check against backend.
   */
  async checkHealth(): Promise<ApiHealthStatus> {
    const start = Date.now();
    const endpoint = ApiConfiguration.getApiEndpoint('/memories');
    try {
      await ApiClient.get<{ memories?: unknown[] }>('/memories', {
        params: { user_id: ApiConfiguration.getUserId() },
        timeout: 5000,
      });
      return {
        connected: true,
        checkedAt: new Date().toISOString(),
        endpoint,
        latencyMs: Date.now() - start,
      };
    } catch (err: unknown) {
      return {
        connected: false,
        checkedAt: new Date().toISOString(),
        endpoint,
        latencyMs: Date.now() - start,
        error: err instanceof Error ? err.message : 'Connection failed',
      };
    }
  },
};
