/**
 * Browser Notification & Audio Chime Utility for Shree Ganesh Steel Workshop
 */

// Play a subtle, pleasant workshop chime using Web Audio API (no external MP3 required)
export function playNotificationChime() {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    // Primary chime tone
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc1.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5

    gain1.gain.setValueAtTime(0.12, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    osc1.start();
    osc1.stop(ctx.currentTime + 0.45);
  } catch (e) {
    // AudioContext might be restricted until user gesture; safely ignore
  }
}

export type NotificationStatus = 'granted' | 'denied' | 'default' | 'unsupported';

export function getNotificationPermission(): NotificationStatus {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }
  return Notification.permission;
}

export async function requestBrowserNotificationPermission(): Promise<NotificationStatus> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }
  try {
    const result = await Notification.requestPermission();
    return result;
  } catch (err) {
    console.warn('Error requesting notification permission:', err);
    return 'unsupported';
  }
}

export async function sendBrowserNotification(
  title: string,
  options?: NotificationOptions
): Promise<boolean> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return false;
  }

  try {
    let perm = Notification.permission;
    if (perm === 'default') {
      perm = await Notification.requestPermission();
    }

    if (perm === 'granted') {
      playNotificationChime();
      const n = new Notification(title, {
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        ...options,
      });

      // Auto close after 5 seconds
      setTimeout(() => {
        try {
          n.close();
        } catch (e) {}
      }, 5000);

      return true;
    }
  } catch (err) {
    console.warn('Failed to send browser notification:', err);
  }

  return false;
}
