/**
 * useTiloMood - DEPRECATED
 *
 * Tilo avatar is now restricted to sidebar-only usage with static state.
 * This hook is no longer needed but kept for potential future use.
 */

export function useTiloMood() {
  return {
    tiloState: "idle" as const,
  }
}
