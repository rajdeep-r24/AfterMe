import { Platform } from 'react-native';

/**
 * Resolves the appropriate default backend URL based on execution environment.
 * On Android emulator, 'localhost' points to the emulator itself,
 * so '10.0.2.2' is used to loop back to the host machine.
 */
export function getDefaultApiUrl(): string {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL.replace(/\/+$/, '');
  }

  if (Platform.OS === 'android') {
    // Android emulator loopback to host PC
    return 'http://10.0.2.2:3001';
  }

  // iOS Simulator or Web preview
  return 'http://localhost:3001';
}

export function isAndroid(): boolean {
  return Platform.OS === 'android';
}

export function isIOS(): boolean {
  return Platform.OS === 'ios';
}
