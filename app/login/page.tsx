"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { LogIn } from "lucide-react"
import { ParticleBackground } from "@/components/particle-background"

interface FormData {
  email: string
  password: string
  bypassLogin: boolean
}

interface FormErrors {
  email?: string
  password?: string
}

export default function LoginPage() {
  console.log("Loaded: LoginPage")

  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    bypassLogin: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      try {
        const storedEmail = localStorage.getItem("email") || ""
        setFormData((prev) => ({ ...prev, email: storedEmail }))
      } catch (error) {
        console.warn("Could not access localStorage:", error)
      }
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const newErrors: FormErrors = {}

    if (!formData.bypassLogin) {
      if (!formData.email) newErrors.email = "Email is required"
      if (!formData.password) newErrors.password = "Password is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }

    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("email", formData.email)
      }
    } catch (error) {
      console.warn("Could not save to localStorage:", error)
    }

    toast({
      title: formData.bypassLogin ? "Demo Mode Activated" : "Login Successful",
      description: formData.bypassLogin ? "Bypassing authentication..." : "Redirecting to role selection...",
    })

    setTimeout(() => {
      router.push("/select-role")
    }, 1000)
  }

  if (!isMounted) {
    return null
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 relative">
      <ParticleBackground className="opacity-30" />
      <div className="w-full max-w-md relative z-10">
        <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm text-white rounded-xl shadow-md">
          <CardHeader>
            <CardTitle className="text-cyan-400 text-2xl text-center">Organizational Mind</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-slate-200">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 bg-slate-800/50 border-slate-600 text-slate-100 placeholder-slate-400"
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <Label htmlFor="password" className="text-slate-200">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 bg-slate-800/50 border-slate-600 text-slate-100 placeholder-slate-400"
                  placeholder="Enter your password"
                />
                {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="bypassLogin"
                  name="bypassLogin"
                  checked={formData.bypassLogin}
                  onCheckedChange={() => setFormData((prev) => ({ ...prev, bypassLogin: !prev.bypassLogin }))}
                />
                <Label htmlFor="bypassLogin" className="text-sm text-slate-300">
                  Bypass Authentication
                </Label>
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white transition-colors"
              >
                <LogIn className="mr-2 h-4 w-4" />
                {isSubmitting ? "Authenticating..." : "Access System"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
