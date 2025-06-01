"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff } from "lucide-react"
import { useSpeechRecognition } from "./useSpeechRecognition"

interface MicButtonProps {
  onTranscript: (transcript: string) => void
  onListeningChange?: (isListening: boolean) => void
  onError?: (error: string) => void
  disabled?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
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
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null)

  // Check microphone permissions on mount
  useEffect(() => {
    async function checkMicrophonePermission() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices()
        const audioInputs = devices.filter((device) => device.kind === "audioinput")

        if (audioInputs.length === 0) {
          setPermissionGranted(false)
          if (onError) onError("No microphone detected")
          return
        }

        // Try to access the microphone
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        setPermissionGranted(true)

        // Stop the stream immediately after checking permission
        stream.getTracks().forEach((track) => track.stop())
      } catch (err) {
        console.error("Microphone permission error:", err)
        setPermissionGranted(false)
        if (onError) onError("Microphone access denied")
      }
    }

    checkMicrophonePermission()
  }, [onError])

  // Notify parent component when listening state changes
  useEffect(() => {
    if (onListeningChange) {
      onListeningChange(isListening)
    }
  }, [isListening, onListeningChange])

  // Pass transcript to parent when it changes
  useEffect(() => {
    if (transcript && transcript.trim() !== "") {
      onTranscript(transcript)
    }
  }, [transcript, onTranscript])

  // Pass errors to parent
  useEffect(() => {
    if (error && onError) {
      onError(error)
    }
  }, [error, onError])

  // Handle button click
  const handleToggleMic = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  // Size classes
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  }

  // If speech recognition is not supported
  if (!isSupported) {
    return null
  }

  return (
    <Button
      onClick={handleToggleMic}
      disabled={disabled || permissionGranted === false}
      className={`rounded-full flex items-center justify-center ${sizeClasses[size]} ${
        isListening ? "bg-red-500 hover:bg-red-600 text-white" : "bg-cyan-600 hover:bg-cyan-700 text-white"
      } ${className}`}
      type="button"
      aria-label={isListening ? "Stop listening" : "Start listening"}
    >
      {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
    </Button>
  )
}
