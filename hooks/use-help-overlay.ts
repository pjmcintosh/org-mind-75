"use client"

import { useState } from "react"
import { useUser } from "./use-user"

export function useHelpOverlay() {
  const [isHelpVisible, setIsHelpVisible] = useState(false)
  const currentUser = useUser()

  const toggleHelp = () => {
    setIsHelpVisible(!isHelpVisible)
    console.log(`Help overlay ${!isHelpVisible ? "activated" : "deactivated"} for ${currentUser.role}`)
  }

  const hideHelp = () => {
    setIsHelpVisible(false)
    console.log("Help overlay hidden")
  }

  const showHelp = () => {
    setIsHelpVisible(true)
    console.log("Help overlay shown")
  }

  const markHelpAsSeen = () => {
    localStorage.setItem("help-seen", "true")
    setIsHelpVisible(false)
    console.log("Help overlay marked as seen")
  }

  return {
    isHelpVisible,
    toggleHelp,
    hideHelp,
    showHelp,
    markHelpAsSeen,
    currentUser,
  }
}
