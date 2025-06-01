"use client"

import { useState, useEffect, useRef, useCallback } from "react"

// Define types for the Web Speech API
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
  onspeechstart: ((this: SpeechRecognition, ev: Event) => any) | null
  onspeechend: ((this: SpeechRecognition, ev: Event) => any) | null
  onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null
  onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null
}

// Add global declarations for TypeScript
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition
    webkitSpeechRecognition: new () => SpeechRecognition
    isSecureContext: boolean
  }
}

export interface UseSpeechRecognitionProps {
  onResult: (transcript: string) => void
  onError?: (error: string) => void
  lang?: string
}

export interface UseSpeechRecognitionReturn {
  isListening: boolean
  isSupported: boolean
  startListening: () => void
  stopListening: () => void
  error: string | null
  isProcessing: boolean
}

export const useSpeechRecognition = ({
  onResult,
  onError,
  lang = "en-US",
}: UseSpeechRecognitionProps): UseSpeechRecognitionReturn => {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const isManualStop = useRef(false)
  const hasReceivedResult = useRef(false)

  // Check browser support and secure context
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check for secure context
      if (!window.isSecureContext) {
        setError("Speech recognition requires HTTPS")
        setIsSupported(false)
        return
      }

      // Check for Speech Recognition support
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const supported = !!SpeechRecognition
      setIsSupported(supported)

      if (!supported) {
        setError("Please use Chrome or Edge browser")
        return
      }

      console.log("Speech Recognition ready")
    }
  }, [])

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      console.log("Stopping speech recognition")
      isManualStop.current = true
      recognitionRef.current.stop()
    }
  }, [isListening])

  const startListening = useCallback(() => {
    if (!isSupported) {
      const errorMessage = "Speech recognition not supported. Please use Chrome or Edge."
      setError(errorMessage)
      if (onError) {
        onError(errorMessage)
      }
      return
    }

    if (!window.isSecureContext) {
      const errorMessage = "Speech recognition requires HTTPS"
      setError(errorMessage)
      if (onError) {
        onError(errorMessage)
      }
      return
    }

    // If already listening, stop instead
    if (isListening) {
      stopListening()
      return
    }

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()

      // Reset flags
      isManualStop.current = false
      hasReceivedResult.current = false

      // Configure recognition - simplified settings for better reliability
      recognition.lang = lang
      recognition.continuous = false // Single utterance mode
      recognition.interimResults = false // Only final results
      recognition.maxAlternatives = 1

      // Event handlers
      recognition.onstart = () => {
        console.log("Speech recognition started - speak now!")
        setIsListening(true)
        setError(null)
        setIsProcessing(false)
      }

      recognition.onaudiostart = () => {
        console.log("Audio capture started")
      }

      recognition.onspeechstart = () => {
        console.log("Speech detected")
        setIsProcessing(true)
      }

      recognition.onspeechend = () => {
        console.log("Speech ended")
      }

      recognition.onaudioend = () => {
        console.log("Audio capture ended")
      }

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        console.log("Recognition result received")
        hasReceivedResult.current = true

        const transcript = event.results[0][0].transcript.trim()
        console.log("Transcript:", transcript)

        if (transcript) {
          setIsProcessing(false)
          onResult(transcript)
        }
      }

      recognition.onend = () => {
        console.log("Speech recognition ended")
        setIsListening(false)
        setIsProcessing(false)

        // Only show "no speech" message if we didn't get any results and it wasn't manually stopped
        if (!hasReceivedResult.current && !isManualStop.current) {
          console.log("No speech was detected")
          // Don't set this as an error, just provide feedback
          setError("No speech detected - try again")
          setTimeout(() => setError(null), 3000) // Clear after 3 seconds
        }
      }

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech recognition error:", event.error)
        setIsListening(false)
        setIsProcessing(false)

        // Handle different error types
        switch (event.error) {
          case "no-speech":
            // Don't treat as critical error - this is normal
            console.log("No speech detected within timeout")
            if (!hasReceivedResult.current) {
              setError("No speech detected - try again")
              setTimeout(() => setError(null), 3000)
            }
            break
          case "audio-capture":
            setError("Microphone access failed")
            if (onError) onError("Microphone access failed")
            break
          case "not-allowed":
            setError("Microphone permission denied")
            if (onError) onError("Microphone permission denied")
            break
          case "network":
            setError("Network error - check connection")
            if (onError) onError("Network error")
            break
          case "aborted":
            // User stopped - don't show error
            break
          case "service-not-allowed":
            setError("Speech service unavailable")
            if (onError) onError("Speech service unavailable")
            break
          default:
            setError(`Error: ${event.error}`)
            if (onError) onError(`Error: ${event.error}`)
        }
      }

      // Store reference and start
      recognitionRef.current = recognition
      setError(null)
      recognition.start()
    } catch (error) {
      console.error("Failed to start speech recognition:", error)
      const errorMessage = "Failed to start voice recognition"
      setError(errorMessage)
      setIsListening(false)
      setIsProcessing(false)
      if (onError) {
        onError(errorMessage)
      }
    }
  }, [isSupported, isListening, onResult, onError, lang, stopListening])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort()
        } catch (error) {
          console.error("Error during cleanup:", error)
        }
      }
    }
  }, [])

  return {
    isListening,
    isSupported,
    startListening,
    stopListening,
    error,
    isProcessing,
  }
}
