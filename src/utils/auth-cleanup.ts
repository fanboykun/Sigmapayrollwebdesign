/**
 * Auth Cleanup Utilities
 *
 * Utility functions untuk membersihkan session data yang corrupt
 * atau bermasalah, terutama untuk mengatasi issue di Chrome.
 */

/**
 * Membersihkan semua auth-related data dari localStorage
 * Berguna untuk mengatasi corrupt session state di Chrome
 */
export function clearAuthStorage(): void {
  try {
    // Clear all supabase auth keys
    const keysToRemove: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('supabase.auth')) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach(key => {
      console.log('Clearing auth key:', key);
      localStorage.removeItem(key);
    });

    // Also clear any legacy keys
    localStorage.removeItem('sb-access-token');
    localStorage.removeItem('sb-refresh-token');

    console.log('✅ Auth storage cleared successfully');
  } catch (error) {
    console.error('❌ Error clearing auth storage:', error);
  }
}

/**
 * Validate localStorage availability
 * Chrome sometimes blocks localStorage in certain scenarios
 */
export function isLocalStorageAvailable(): boolean {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    console.error('❌ localStorage not available:', error);
    return false;
  }
}

/**
 * Get debug info about current auth state in storage
 */
export function getAuthStorageDebugInfo(): Record<string, any> {
  const debugInfo: Record<string, any> = {
    localStorageAvailable: isLocalStorageAvailable(),
    authKeys: [],
    timestamp: new Date().toISOString(),
  };

  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('supabase.auth')) {
        debugInfo.authKeys.push({
          key,
          hasValue: !!localStorage.getItem(key),
        });
      }
    }
  } catch (error) {
    debugInfo.error = String(error);
  }

  return debugInfo;
}
