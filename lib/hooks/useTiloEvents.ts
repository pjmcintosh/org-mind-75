/**
 * useTiloEvents - DEPRECATED
 *
 * Tilo avatar is now restricted to sidebar-only usage.
 * Event system is no longer needed but kept for potential future use.
 */

export function useTiloEvents() {
  // No-op functions for backward compatibility
  return {
    triggerListening: () => {},
    triggerAlert: () => {},
    triggerThinking: () => {},
    triggerNotification: () => {},
    reset: () => {},
  }
}
