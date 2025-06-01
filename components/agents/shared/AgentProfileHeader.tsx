import type React from "react"

interface AgentProfileHeaderProps {
  name: string
  role: string
  avatarSrc?: string
  avatarComponent?: React.ReactNode
  fallbackInitials: string
  description: string
  statusBadges: string[]
}

const AgentProfileHeader: React.FC<AgentProfileHeaderProps> = ({
  name,
  role,
  avatarSrc,
  avatarComponent,
  fallbackInitials,
  description,
  statusBadges,
}) => {
  return (
    <div className="flex items-center gap-6 p-6 bg-slate-800/30 rounded-lg border border-cyan-500/20 backdrop-blur-sm">
      {/* Avatar Section */}
      <div className="flex-shrink-0">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-cyan-400 shadow-xl bg-slate-700">
          {avatarComponent ? (
            avatarComponent
          ) : avatarSrc ? (
            <img
              src={avatarSrc || "/placeholder.svg"}
              alt={`${name} avatar`}
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = "none"
                const parent = target.parentElement
                if (parent) {
                  parent.innerHTML = `
                    <div class="w-full h-full flex items-center justify-center bg-slate-700">
                      <span class="text-slate-400 text-xl font-semibold">${fallbackInitials}</span>
                    </div>
                  `
                }
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-700">
              <span className="text-slate-400 text-xl font-semibold">{fallbackInitials}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-white mb-1">{name}</h1>
            <p className="text-cyan-400 text-lg font-medium mb-3">{role}</p>
            <p className="text-slate-300 text-sm leading-relaxed mb-4 max-w-2xl">{description}</p>
          </div>

          {/* Status Badges */}
          <div className="flex flex-wrap gap-2 ml-4">
            {statusBadges.map((badge, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full px-3 py-1 text-xs font-medium"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgentProfileHeader
