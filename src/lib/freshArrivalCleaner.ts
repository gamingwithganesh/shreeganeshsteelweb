/**
 * Fresh Arrival Cleaner Utility
 * Automatically clears all browser cookies, CacheStorage, Service Workers,
 * and stale temporary cache whenever a user newly comes to the web app.
 */

export function clearAllCookies() {
  if (typeof document === 'undefined') return;

  try {
    const cookies = document.cookie.split(';');
    const hostname = window.location.hostname;
    const path = '/';

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      
      if (!name) continue;

      // 1. Expire without domain
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path}`;
      document.cookie = `${name}=;max-age=0;path=${path}`;

      // 2. Expire with exact hostname
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path};domain=${hostname}`;
      document.cookie = `${name}=;max-age=0;path=${path};domain=${hostname}`;

      // 3. Expire with dot-prefixed hostname (subdomains)
      if (hostname.includes('.')) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path};domain=.${hostname}`;
        document.cookie = `${name}=;max-age=0;path=${path};domain=.${hostname}`;
      }
    }
  } catch (err) {
    console.warn('[SGWWSP] Error clearing cookies:', err);
  }
}

export async function clearAllCaches() {
  if (typeof window === 'undefined') return;

  try {
    // 1. Clear CacheStorage (browser cache API)
    if ('caches' in window) {
      const cacheNames = await window.caches.keys();
      await Promise.all(
        cacheNames.map((name) => {
          console.log(`[SGWWSP] Deleting cache storage: ${name}`);
          return window.caches.delete(name);
        })
      );
    }

    // 2. Unregister any service workers
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        console.log('[SGWWSP] Unregistering service worker');
        await registration.unregister();
      }
    }
  } catch (err) {
    console.warn('[SGWWSP] Error clearing CacheStorage / ServiceWorker:', err);
  }
}

/**
 * Checks if the user is newly arriving at the web app (i.e. new browser tab/window/session).
 * If new arrival:
 *   - Clears all cookies
 *   - Clears CacheStorage and ServiceWorkers
 *   - Clears stale temporary storage
 *   - Marks the session as active for the duration of this browser session
 */
export async function handleFreshArrivalCleanup(): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  const SESSION_FLAG = 'sgwwsp_session_arrival_active';

  try {
    const isExistingSession = sessionStorage.getItem(SESSION_FLAG);

    if (!isExistingSession) {
      console.log('🚀 [SGWWSP] Newly arrived at web app: Clearing cookies, cache & stale sessions...');
      
      // Clear cookies
      clearAllCookies();

      // Clear browser cache API & service workers
      await clearAllCaches();

      // Reset stale user session token if desired so new visitor starts 100% clean
      localStorage.removeItem('sgwwsp_user');

      // Set session flag so in-session navigation doesn't wipe active actions
      sessionStorage.setItem(SESSION_FLAG, Date.now().toString());

      console.log('✅ [SGWWSP] Cookies & cache successfully cleared for new session.');
      return true;
    }
  } catch (err) {
    console.warn('[SGWWSP] Error in fresh arrival cleanup:', err);
  }

  return false;
}

/**
 * Manual trigger to wipe everything (cookies, cache, localStorage) on user demand
 */
export async function manualFullReset() {
  if (typeof window === 'undefined') return;

  clearAllCookies();
  await clearAllCaches();

  try {
    sessionStorage.clear();
    localStorage.removeItem('sgwwsp_user');
    localStorage.removeItem('sgwwsp_cart_v2');
    localStorage.removeItem('sgwwsp_current_admin');
  } catch (e) {
    console.warn('Storage clear error', e);
  }

  window.location.href = '/';
}
