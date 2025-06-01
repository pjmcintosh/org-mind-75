"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, AlertCircle } from "lucide-react"
import { useSpeechRecognition } from "./useSpeechRecognition"

interface MicButtonProps {
  onTranscript: (text: string) => void
  onListeningChange?: (isListening: boolean) => void
  onError?: (error: string) => void
  disabled?: boolean
  className?: string
  size?: "sm" | "md" | "lg"
}

export default function MicButton({
  onTranscript,
  onListeningChange,
  onError,
  disabled = false,
  size = "md",
  className = "",
}: MicButtonProps) {
  const { isListening, transcript, startListening, stopListening, isSupported, error } = useSpeechRecognition()

  useEffect(() => {
    if (transcript) {
      onTranscript(transcript)
    }
  }, [transcript, onTranscript])

  useEffect(() => {
    if (onError && error) {
      onError(error)
    }
  }, [error, onError])

  useEffect(() => {
    if (onListeningChange) {
      onListeningChange(isListening)
    }
  }, [isListening, onListeningChange])

  const handleToggleMic = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  }

  const iconSizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  return (
    <Button
      onClick={handleToggleMic}
      disabled={disabled || !isSupported}
      className={`rounded-full transition-all duration-300 ${
        isListening ? "bg-red-500 hover:bg-red-600 text-white" : "bg-cyan-400 hover:bg-cyan-500 text-white"
      } ${sizeClasses[size]} ${className}`}
      type="button"
      aria-label={isListening ? "Stop listening" : "Start voice input"}
    >
      {isSupported ? (
        isListening ? (
          <MicOff className={iconSizeClasses[size]} />
        ) : (
          <Mic className={iconSizeClasses[size]} />
        )
      ) : (
        <AlertCircle className={iconSizeClasses[size]} />
      )}
    </Button>
  )
}
