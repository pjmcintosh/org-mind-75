"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

type TiloState = "idle" | "listening" | "alert"

interface TiloContextType {
  tiloState: TiloState
  setTiloState: React.Dispatch<React.SetStateAction<TiloState>>
}

export const TiloContext = createContext<TiloContextType | null>(null)

export const TiloProvider = ({ children }: { children: ReactNode }) => {
  const [tiloState, setTiloState] = useState<TiloState>("idle")

  return (
    <TiloContext.Provider
      value={{
        tiloState,
        setTiloState,
      }}
    >
      {children}
    </TiloContext.Provider>
  )
}

export function useTilo() {
  const context = useContext(TiloContext)
  if (context === null) {
    throw new Error("useTilo must be used within a TiloProvider")
  }
  return context
}
