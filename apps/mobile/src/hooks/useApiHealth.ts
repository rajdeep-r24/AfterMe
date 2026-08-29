import { useState, useEffect, useCallback } from 'react';
import { ApiClient } from '../services/api';
import { ApiHealthStatus } from '../types';

export function useApiHealth(autoCheck = true) {
  const [status, setStatus] = useState<ApiHealthStatus>({
    connected: false,
    checkedAt: null,
    endpoint: '',
  });
  const [isChecking, setIsChecking] = useState(false);

  const check = useCallback(async () => {
    setIsChecking(true);
    try {
      const res = await ApiClient.checkHealth();
      setStatus(res);
      return res;
    } finally {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    if (autoCheck) {
      check();
    }
  }, [autoCheck, check]);

  return { status, isChecking, check };
}
