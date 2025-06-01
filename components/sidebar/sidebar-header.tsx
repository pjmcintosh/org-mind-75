"use client"

import TiloAvatar from "@/components/tilo/TiloAvatar"

export function SidebarHeader() {
  return (
    <div className="flex flex-col items-center py-6 space-y-2 border-b border-slate-700/50">
      <TiloAvatar state="idle" size="xl" className="w-24 h-24 rounded-full border-2 border-cyan-400 shadow-lg" />
      <div className="text-center">
        <h2 className="text-lg font-semibold text-cyan-300">Tilo</h2>
        <p className="text-xs text-slate-400">Organizational Mind</p>
      </div>
    </div>
  )
}

export default SidebarHeader
