"use client"

import { useState, useEffect } from "react"
import { speak, stopSpeaking, getSelectedVoice, getAvailableVoices } from "@/lib/voice/speech"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function VoiceTest() {
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null)
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])
  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {
    // Wait for voices to load
    const checkVoices = () => {
      const voices = getAvailableVoices()
      if (voices.length > 0) {
        setAvailableVoices(voices)
        setSelectedVoice(getSelectedVoice())
      } else {
        // Retry after a short delay
        setTimeout(checkVoices, 100)
      }
    }

    checkVoices()

    // Listen for voice changes
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = () => {
        setAvailableVoices(getAvailableVoices())
        setSelectedVoice(getSelectedVoice())
      }
    }
  }, [])

  const testVoice = () => {
    setIsSpeaking(true)
    speak("Hello, I'm Tilo, your organizational mind assistant. I'm speaking with a UK English female voice.")

    // Reset speaking state after a delay
    setTimeout(() => setIsSpeaking(false), 5000)
  }

  const stopTest = () => {
    stopSpeaking()
    setIsSpeaking(false)
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Tilo Voice Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Selected Voice:</h3>
          <p className="text-sm text-gray-600">
            {selectedVoice ? `${selectedVoice.name} (${selectedVoice.lang})` : "No voice selected"}
          </p>
        </div>

        <div className="flex gap-2">
          <Button onClick={testVoice} disabled={isSpeaking}>
            {isSpeaking ? "Speaking..." : "Test Voice"}
          </Button>
          <Button onClick={stopTest} variant="outline" disabled={!isSpeaking}>
            Stop
          </Button>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Available UK Voices:</h3>
          <div className="max-h-40 overflow-y-auto space-y-1">
            {availableVoices
              .filter((voice) => voice.lang.startsWith("en-GB") || voice.name.toLowerCase().includes("uk"))
              .map((voice, index) => (
                <div key={index} className="text-sm p-2 bg-gray-50 rounded">
                  <span className="font-medium">{voice.name}</span>
                  <span className="text-gray-500 ml-2">({voice.lang})</span>
                  {voice === selectedVoice && <span className="text-green-600 ml-2">✓ Selected</span>}
                </div>
              ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">All Available Voices ({availableVoices.length}):</h3>
          <div className="max-h-32 overflow-y-auto text-xs text-gray-500">
            {availableVoices.map((voice, index) => (
              <div key={index}>
                {voice.name} ({voice.lang})
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
