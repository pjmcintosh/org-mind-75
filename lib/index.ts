// Re-export common utilities and constants
export { cn } from "./utils"
export { humanLabels } from "./constants/humanLabels"
export { getCurrentUser, getCurrentUserRole, isAdmin, isClient, isCEO, hasCompletedOnboarding } from "./auth"

// Re-export types
export type { UserRole, User } from "./auth"

// Re-export context providers
export { useRole } from "./context/role-context"
export { useMockData } from "./context/mock-data-context"

// Re-export constants
export { AVAILABLE_ROLES } from "./context/role-context"
export { entityTypes } from "./constants/entityTypes"
