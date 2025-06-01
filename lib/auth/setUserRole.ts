/**
 * Sets the user role in both localStorage and cookies for consistent access
 * across client-side components and server middleware
 */
export function setUserRole(role: string): void {
  // Normalize the role to lowercase for consistency
  const normalizedRole = role.toLowerCase()

  // Set in localStorage for client-side access
  if (typeof window !== "undefined") {
    localStorage.setItem("tilo-current-role", normalizedRole)
    localStorage.setItem("tilo-test-role", normalizedRole)
    localStorage.setItem("ephrya-user-role", normalizedRole)

    // Set mobile demo flag for mobile CEO
    if (normalizedRole === "mobile ceo") {
      localStorage.setItem("tilo-mobile-demo", "true")
    } else {
      localStorage.removeItem("tilo-mobile-demo")
    }
  }

  // Set cookie for middleware access
  // Use SameSite=Lax for security while allowing cross-page navigation
  document.cookie = `ephrya-user-role=${normalizedRole}; path=/; SameSite=Lax; max-age=86400`

  console.log(`🔐 Role set to "${normalizedRole}" in both localStorage and cookies`)
}

/**
 * Gets the current user role from cookies first (for middleware consistency)
 * then falls back to localStorage
 */
export function getUserRole(): string {
  // Try to get from cookie first (what middleware sees)
  const cookieMatch = typeof document !== "undefined" ? document.cookie.match(/ephrya-user-role=([^;]+)/) : null

  const cookieRole = cookieMatch?.[1]

  // Fall back to localStorage
  const localRole =
    typeof window !== "undefined"
      ? localStorage.getItem("tilo-current-role") ||
        localStorage.getItem("tilo-test-role") ||
        localStorage.getItem("ephrya-user-role")
      : null

  return cookieRole || localRole || "unknown"
}

/**
 * Clears all role data (for logout)
 */
export function clearUserRole(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("tilo-current-role")
    localStorage.removeItem("tilo-test-role")
    localStorage.removeItem("ephrya-user-role")
    localStorage.removeItem("tilo-mobile-demo")
  }

  document.cookie = "ephrya-user-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"

  console.log("🧹 Role cleared from localStorage and cookies")
}
