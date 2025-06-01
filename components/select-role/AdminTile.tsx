"use client"

import Link from "next/link"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"
import { cn } from "@/lib/utils"

interface AdminTileProps {
  className?: string
}

export default function AdminTile({ className }: AdminTileProps) {
  console.log("Loaded: AdminTile")

  return (
    <Link href="/admin/dashboard" className="group block">
      <div
        className={cn("h-full transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer", className)}
      >
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 p-4 bg-emerald-500/20 rounded-full w-20 h-20 flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
            <Shield className="h-10 w-10 text-emerald-400" />
          </div>
          <CardTitle className="text-2xl md:text-3xl mb-2 text-cyan-400">Admin Dashboard</CardTitle>
          <CardDescription className="text-base md:text-lg text-blue-300">
            Manage organizational assessments and view analytics dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <ul className="space-y-2 text-sm md:text-base text-blue-300">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
              View all submissions
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
              Analytics and reporting
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
              Manage client accounts
            </li>
          </ul>
          <Button className="w-full mt-6 text-white bg-cyan-600 hover:bg-cyan-700 py-3 text-base md:text-lg">
            Access Admin Dashboard
          </Button>
        </CardContent>
      </div>
    </Link>
  )
}
