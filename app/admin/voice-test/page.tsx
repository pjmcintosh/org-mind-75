"use client"

import { useState, useEffect } from "react"
import { speak, stopSpeaking, getSelectedVoice, getAvailableVoices, initializeVoices } from "@/lib/voice/speech"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function VoiceTestPage() {
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null)
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voiceReady, setVoiceReady] = useState(false)
  const [testMessage, setTestMessage] = useState(
    "Hello, I'm Tilo, your organizational mind assistant. I'm speaking with a UK English female voice.",
  )

  useEffect(() => {
    const initVoice = async () => {
      const success = await initializeVoices()
      setVoiceReady(success)

      if (success) {
        setSelectedVoice(getSelectedVoice())
        setAvailableVoices(getAvailableVoices())
      }
    }

    initVoice()

    // Check for voices periodically
    const interval = setInterval(() => {
      const voices = getAvailableVoices()
      if (voices.length > 0) {
        setAvailableVoices(voices)
        setSelectedVoice(getSelectedVoice())
      }
    }, 1000)

    return () => {
      clearInterval(interval)
      stopSpeaking()
    }
  }, [])

  const testVoice = async () => {
    setIsSpeaking(true)
    await speak(testMessage, {
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    })
  }

  const stopTest = () => {
    stopSpeaking()
    setIsSpeaking(false)
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Tilo Voice Test</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Voice Status</CardTitle>
            <CardDescription>Current voice configuration and status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Voice System:</h3>
              <Badge variant={voiceReady ? "success" : "outline"}>{voiceReady ? "Ready" : "Initializing..."}</Badge>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Selected Voice:</h3>
              {selectedVoice ? (
                <div className="p-3 bg-gray-50 rounded-md">
                  <p className="font-medium">{selectedVoice.name}</p>
                  <p className="text-sm text-gray-600">{selectedVoice.lang}</p>
                </div>
              ) : (
                <p className="text-amber-600">No voice selected</p>
              )}
            </div>

            <div className="flex gap-2">
              <Button onClick={testVoice} disabled={isSpeaking || !voiceReady}>
                {isSpeaking ? "Speaking..." : "Test Voice"}
              </Button>
              <Button onClick={stopTest} variant="outline" disabled={!isSpeaking}>
                Stop
              </Button>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Test Message:</h3>
              <textarea
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                className="w-full p-2 border rounded-md"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available Voices</CardTitle>
            <CardDescription>Voices detected on your device</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <h3 className="font-semibold mb-2">UK English Voices:</h3>
              <div className="max-h-40 overflow-y-auto space-y-1">
                {availableVoices
                  .filter((voice) => voice.lang.startsWith("en-GB") || voice.name.toLowerCase().includes("uk"))
                  .map((voice, index) => (
                    <div key={index} className="text-sm p-2 bg-gray-50 rounded flex justify-between items-center">
                      <div>
                        <span className="font-medium">{voice.name}</span>
                        <span className="text-gray-500 ml-2">({voice.lang})</span>
                      </div>
                      {voice === selectedVoice && <Badge className="bg-green-500">Selected</Badge>}
                    </div>
                  ))}

                {availableVoices.filter((v) => v.lang.startsWith("en-GB") || v.name.toLowerCase().includes("uk"))
                  .length === 0 && <p className="text-amber-600">No UK English voices found</p>}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2">All Voices ({availableVoices.length}):</h3>
              <div className="max-h-40 overflow-y-auto space-y-1">
                {availableVoices.map((voice, index) => (
                  <div key={index} className="text-xs p-1 text-gray-500">
                    {voice.name} ({voice.lang})
                  </div>
                ))}

                {availableVoices.length === 0 && <p className="text-amber-600">No voices available</p>}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Troubleshooting</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>If Tilo is not speaking, try these steps:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Make sure your device's volume is turned up</li>
            <li>Try using Chrome or Edge browsers which have better speech synthesis support</li>
            <li>Check if your browser has permission to use audio</li>
            <li>Try refreshing the page</li>
            <li>Visit this test page to verify voice selection</li>
          </ol>
          <p className="mt-4 text-sm text-gray-600">
            Note: Speech synthesis may not work in all browsers or may require user interaction first.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
