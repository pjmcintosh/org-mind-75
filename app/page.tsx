"use client"

import { redirect } from "next/navigation"

export default function HomePage() {
  console.log("Root redirected to /login")
  redirect("/login")
}
