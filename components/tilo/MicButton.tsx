"use client"

import React from "react"
import { Mic, MicOff, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSpeechRecognition } from "./useSpeechRecognition"

export interface MicButtonProps {
  onTranscript: (text: string) => void
  onError?: (error: string) => void
  onListeningChange?: (isListening: boolean) => void
  disabled?: boolean
  className?: string
  size?: "sm" | "md" | "lg"
}

export default function MicButton({
  onTranscript,
  onError,
  onListeningChange,
  disabled = false,
  className = "",
  size = "md",
}: MicButtonProps) {
  const { isListening, isSupported, startListening, stopListening, error, isProcessing } = useSpeechRecognition({
    onResult: (transcript) => {
      console.log("Transcript received:", transcript)
      onTranscript(transcript)
    },
    onError: (errorMessage) => {
      console.error("Speech error:", errorMessage)
      if (onError) {
        onError(errorMessage)
      }
    },
  })

  // Notify parent when listening state changes
  React.useEffect(() => {
    if (onListeningChange) {
      onListeningChange(isListening)
    }
  }, [isListening, onListeningChange])

  // Size classes based on the size prop
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-14 h-14",
    lg: "w-16 h-16",
  }

  const iconSizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  // Handle button click
  const handleClick = () => {
    console.log("Mic button clicked, isListening:", isListening)

    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  // If speech recognition is not supported, show a disabled button
  if (!isSupported) {
    return (
      <div className="flex flex-col items-center">
        <Button
          disabled
          className={`rounded-full bg-gray-500 text-white shadow-lg opacity-50 ${sizeClasses[size]} ${className}`}
          aria-label="Voice input not supported"
          title="Voice input not supported. Please use Chrome or Edge browser."
        >
          <AlertCircle className={iconSizeClasses[size]} />
        </Button>
        <p className="text-xs text-gray-400 mt-1 text-center max-w-[120px]">Use Chrome/Edge</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <Button
        onClick={handleClick}
        disabled={disabled}
        className={`rounded-full transition-all duration-300 ${
          isListening
            ? isProcessing
              ? "bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/50"
              : "bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/50 animate-pulse"
            : "bg-cyan-400 hover:bg-cyan-500 shadow-lg shadow-cyan-400/30"
        } ${sizeClasses[size]} ${className}`}
        aria-label={isListening ? "Stop listening" : "Start voice input"}
        title={isListening ? "Click to stop listening" : "Click to start voice input"}
      >
        {isListening ? (
          isProcessing ? (
            <Loader2 className={`${iconSizeClasses[size]} animate-spin`} />
          ) : (
            <MicOff className={iconSizeClasses[size]} />
          )
        ) : (
          <Mic className={iconSizeClasses[size]} />
        )}
      </Button>

      {/* Status text */}
      {isListening && (
        <p className="text-xs mt-1 text-center">
          {isProcessing ? (
            <span className="text-green-400">Processing...</span>
          ) : (
            <span className="text-red-400 animate-pulse">Speak now</span>
          )}
        </p>
      )}

      {/* Error display - show briefly and auto-clear */}
      {error && !isListening && <p className="text-xs text-amber-400 mt-1 max-w-[200px] text-center">{error}</p>}

      {/* Helpful tip when not listening */}
      {!isListening && !error && <p className="text-xs text-gray-500 mt-1 text-center max-w-[120px]">Click & speak</p>}
    </div>
  )
}
