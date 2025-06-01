export const APP_NAME = "Tilo - Organizational Mind"
export const APP_DESCRIPTION = "AI-powered organizational intelligence platform"

export const ROUTES = {
  HOME: "/",
  ADMIN: "/admin",
  CLIENT: "/client",
  SELECT_ROLE: "/select-role",
  UNAUTHORIZED: "/unauthorized",
} as const

export const API_ENDPOINTS = {
  BOB: "/api/bob",
} as const

export const TILO_CONFIG = {
  DEFAULT_ROLE: "client",
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  MAX_CHAT_HISTORY: 100,
} as const
