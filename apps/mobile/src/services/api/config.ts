import { getDefaultApiUrl } from '../../utils/platform';
import { APP_METADATA } from '../../constants';

export interface ApiConfig {
  baseUrl: string;
  defaultUserId: string;
  timeoutMs: number;
}

let activeBaseUrl: string = getDefaultApiUrl();
let activeUserId: string = APP_METADATA.defaultUserId;

export const ApiConfiguration = {
  getBaseUrl: (): string => activeBaseUrl,
  setBaseUrl: (url: string): void => {
    activeBaseUrl = url.replace(/\/+$/, '');
  },

  getUserId: (): string => activeUserId,
  setUserId: (userId: string): void => {
    activeUserId = userId;
  },

  getApiEndpoint: (path: string): string => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${activeBaseUrl}/api${cleanPath}`;
  },

  getDefaultHeaders: (): Record<string, string> => ({
    'Content-Type': 'application/json',
    'x-user-id': activeUserId,
  }),

  timeoutMs: 10000,
};
