"use client"

import { useState } from "react"

interface AvatarImageProps {
  src: string
  alt: string
  fallbackInitials: string
}

export default function AvatarImage({ src, alt, fallbackInitials }: AvatarImageProps) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-700">
        <span className="text-slate-400 text-xl font-semibold">{fallbackInitials}</span>
      </div>
    )
  }

  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      className="w-full h-full object-cover object-center"
      onError={() => setHasError(true)}
    />
  )
}
