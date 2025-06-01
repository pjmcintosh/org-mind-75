import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "../styles/ephrya-theme.css"
import { Toaster } from "@/components/ui/toaster"
import { RoleProvider } from "@/lib/context/role-context"
import { MockDataProvider } from "@/lib/context/mock-data-context"
import { TiloProvider } from "@/lib/context/tilo-context"
import { LayoutWrapper } from "@/components/layout-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tilo Organizational Mind – Elevate Your Insights",
  description: "Immersive AI-powered interface for government transformation.",
  generator: "v0.dev",
}

console.log("Layout Loaded: Root layout with theme enforcement")

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark bg-gradient-to-br from-[#0b1323] to-[#101d34] text-white`}>
        <RoleProvider>
          <MockDataProvider>
            <TiloProvider>
              <LayoutWrapper>{children}</LayoutWrapper>
              <Toaster />
            </TiloProvider>
          </MockDataProvider>
        </RoleProvider>
      </body>
    </html>
  )
}
