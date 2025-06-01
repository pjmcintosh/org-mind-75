"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

interface TiloInterfaceProps {
  onTextChange: (text: string) => void
}

const TiloInterface: React.FC<TiloInterfaceProps> = ({ onTextChange }) => {
  const [text, setText] = useState("")
  const [isListening, setIsListening] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value
    setText(newText)
    onTextChange(newText)
  }

  const startListening = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new webkitSpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = "en-US"

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onresult = (event) => {
        let interimTranscript = ""
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            setText((prevText) => prevText + event.results[i][0].transcript)
            onTextChange((prevText) => prevText + event.results[i][0].transcript)
          } else {
            interimTranscript += event.results[i][0].transcript
          }
        }
        if (textareaRef.current) {
          textareaRef.current.value = text + interimTranscript
        }
      }

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error)
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.start()
    } else {
      console.log("Speech Recognition Not Available")
    }
  }

  const stopListening = () => {
    if ("webkitSpeechRecognition" in window) {
      // Find the active recognition instance and stop it.  This is a bit hacky
      // because we don't have a direct reference to the recognition object.
      // A better approach would be to store the recognition object in state.
      const recognitions = (window as any).webkitSpeechRecognitionInstances || []
      if (recognitions.length > 0) {
        recognitions[recognitions.length - 1].stop()
      }
      setIsListening(false)
    }
  }

  useEffect(() => {
    // Hack to store recognition instances for stopping.
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      if (!(window as any).webkitSpeechRecognitionInstances) {
        ;(window as any).webkitSpeechRecognitionInstances = []
      }

      const originalWebkitSpeechRecognition = window.webkitSpeechRecognition
      window.webkitSpeechRecognition = (() => {
        const instance = new originalWebkitSpeechRecognition()
        ;(window as any).webkitSpeechRecognitionInstances.push(instance)
        return instance
      }) as any
    }

    return () => {
      if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
        ;(window as any).webkitSpeechRecognitionInstances = []
      }
    }
  }, [])

  return (
    <div>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleTextChange}
        placeholder="Type or speak here..."
        rows={5}
        cols={50}
      />
      <div>
        <button onClick={isListening ? stopListening : startListening}>
          {isListening ? "Stop Listening" : "Start Listening"}
        </button>
      </div>
    </div>
  )
}

export default TiloInterface
