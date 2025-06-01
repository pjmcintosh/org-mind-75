"use client"

import { useState, useRef, useEffect, useCallback } from "react"

export type TiloState = "idle" | "listening" | "alert"

interface UseTiloStateOptions {
  onTranscript?: (transcript: string) => void
  onError?: (error: string) => void
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
  resultIndex: number
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
  message?: string
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  maxAlternatives: number
  start(): void
  stop(): void
  abort(): void
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null
  onend: ((this: SpeechRecognition, ev: Event) => any) | null
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition
    webkitSpeechRecognition: new () => SpeechRecognition
  }
}

export function useTiloState(options: UseTiloStateOptions = {}) {
  const [tiloState, setTiloState] = useState<TiloState>("idle")
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)
  const [speechError, setSpeechError] = useState<string | null>(null)
  const [lastResponse, setLastResponse] = useState<string>("")

  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const { onTranscript, onError } = options

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      setSpeechSupported(!!SpeechRecognition)

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        recognition.continuous = false
        recognition.interimResults = false
        recognition.lang = "en-US"
        recognition.maxAlternatives = 1

        recognition.onstart = () => {
          setIsListening(true)
          setTiloState("listening")
          setSpeechError(null)
        }

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = event.results[0][0].transcript
          onTranscript?.(transcript)
        }

        recognition.onend = () => {
          setIsListening(false)
          setTiloState("idle")
        }

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error("Speech recognition error:", event.error)
          setIsListening(false)
          setTiloState("idle")

          let errorMessage = ""
          switch (event.error) {
            case "no-speech":
              errorMessage = "No speech detected. Please try again."
              break
            case "audio-capture":
              errorMessage = "Microphone not accessible. Please check your microphone."
              break
            case "not-allowed":
              errorMessage = "Microphone access denied. Please allow microphone access."
              break
            case "network":
              errorMessage = "Network error occurred. Please check your connection."
              break
            case "aborted":
              // User stopped - don't show error
              break
            default:
              errorMessage = `Speech recognition error: ${event.error}`
          }

          if (errorMessage) {
            setSpeechError(errorMessage)
            onError?.(errorMessage)
          }
        }

        recognitionRef.current = recognition
      }
    }

    // Cleanup on unmount
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
    }
  }, [onTranscript, onError])

  const startListening = useCallback(() => {
    if (!speechSupported) {
      const error = "Speech recognition is not supported in your browser."
      setSpeechError(error)
      onError?.(error)
      return
    }

    if (isListening) {
      recognitionRef.current?.stop()
    } else {
      try {
        setSpeechError(null)
        recognitionRef.current?.start()
      } catch (error) {
        console.error("Failed to start speech recognition:", error)
        const errorMessage = "Failed to start voice recognition. Please try again."
        setSpeechError(errorMessage)
        onError?.(errorMessage)
      }
    }
  }, [speechSupported, isListening, onError])

  const setProcessing = useCallback((processing: boolean) => {
    setIsProcessing(processing)
    setTiloState(processing ? "alert" : "idle")
  }, [])

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
  }, [isListening])

  return {
    tiloState,
    isListening,
    isProcessing,
    speechSupported,
    speechError,
    lastResponse,
    startListening,
    stopListening,
    setProcessing,
    setLastResponse,
    setTiloState,
  }
}
