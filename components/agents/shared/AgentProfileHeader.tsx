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
    <div className="flex flex-col items-center justify-center">
      <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-cyan-400 shadow-xl bg-slate-700">
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
                    <span class="text-slate-400 text-2xl font-semibold">${fallbackInitials}</span>
                  </div>
                `
              }
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-700">
            <span className="text-slate-400 text-2xl font-semibold">{fallbackInitials}</span>
          </div>
        )}
      </div>
      <h2 className="text-2xl font-semibold mt-4 text-white">{name}</h2>
      <p className="text-slate-400">{role}</p>
      <p className="text-slate-300 text-center mt-2">{description}</p>
      <div className="flex mt-2">
        {statusBadges.map((badge, index) => (
          <span key={index} className="bg-cyan-500 text-white rounded-full px-3 py-1 text-sm font-medium mr-2">
            {badge}
          </span>
        ))}
      </div>
    </div>
  )
}

export default AgentProfileHeader
