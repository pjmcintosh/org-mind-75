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

export const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSupported, setIsSupported] = useState(false)
  const recognitionRef = useRef<any>(null)
  const isManualStop = useRef(false)

  // Check browser support
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      setIsSupported(!!SpeechRecognition)
    }
  }, [])

  const startListening = useCallback(() => {
    if (!isSupported) {
      setError("Speech recognition not supported")
      return
    }

    if (isListening) {
      stopListening()
      return
    }

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()

      isManualStop.current = false

      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "en-US"

      recognition.onstart = () => {
        setIsListening(true)
        setError(null)
      }

      recognition.onresult = (event: any) => {
        const result = event.results[0][0].transcript.trim()
        if (result) {
          setTranscript(result)
        }
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.onerror = (event: any) => {
        setIsListening(false)

        // Handle no-speech gracefully - don't treat as error
        if (event.error === "no-speech") {
          console.log("No speech detected - this is normal")
          return // Don't set error state for no-speech
        }

        // Only set error for actual problems
        switch (event.error) {
          case "not-allowed":
            setError("Microphone permission denied")
            break
          case "audio-capture":
            setError("Microphone not available")
            break
          case "network":
            setError("Network error")
            break
          default:
            console.log("Speech recognition event:", event.error)
          // Don't set error for other events
        }
      }

      recognitionRef.current = recognition
      recognition.start()
    } catch (err) {
      setError("Failed to start speech recognition")
      setIsListening(false)
    }
  }, [isSupported, isListening])

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      isManualStop.current = true
      recognitionRef.current.stop()
    }
  }, [isListening])

  // Cleanup
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
    }
  }, [])

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    isSupported,
    error,
  }
}
