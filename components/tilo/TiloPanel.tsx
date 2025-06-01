"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

interface TiloPanelProps {
  onTranscription: (transcription: string) => void
}

const TiloPanel: React.FC<TiloPanelProps> = ({ onTranscription }) => {
  const [isListening, setIsListening] = useState(false)
  const [transcription, setTranscription] = useState("")
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new webkitSpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = "en-US" // You can change the language here

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = ""
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            setTranscription((prevTranscription) => prevTranscription + event.results[i][0].transcript)
            onTranscription(transcription + event.results[i][0].transcript)
          } else {
            interimTranscript += event.results[i][0].transcript
          }
        }
      }

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech recognition error:", event.error)
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
    } else {
      console.warn("Web Speech API is not supported in this browser.")
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
    }
  }, [onTranscription, transcription])

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  return (
    <div>
      <button onClick={startListening} disabled={isListening}>
        Start Listening
      </button>
      <button onClick={stopListening} disabled={!isListening}>
        Stop Listening
      </button>
      <p>Transcription: {transcription}</p>
    </div>
  )
}

export default TiloPanel
