"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export type FilterType = "all" | "internal" | "external" | "online" | "busy" | "idle" | "offline"
export type DepartmentFilter =
  | "all"
  | "System Core"
  | "Strategy"
  | "Engineering"
  | "Operations"
  | "Client Services"
  | "Legal"

interface AgentFilterControlsProps {
  agentFilter: FilterType
  departmentFilter: DepartmentFilter
  onAgentFilterChange: (filter: FilterType) => void
  onDepartmentFilterChange: (filter: DepartmentFilter) => void
  onClearFilters: () => void
  filteredCount: number
  totalCount: number
}

export function AgentFilterControls({
  agentFilter,
  departmentFilter,
  onAgentFilterChange,
  onDepartmentFilterChange,
  onClearFilters,
  filteredCount,
  totalCount,
}: AgentFilterControlsProps) {
  const hasActiveFilters = agentFilter !== "all" || departmentFilter !== "all"

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Filter by:</span>
            </div>

            <Select value={agentFilter} onValueChange={(value: FilterType) => onAgentFilterChange(value)}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Agent Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                <SelectItem value="internal">Internal Agents</SelectItem>
                <SelectItem value="external">Third-Party Agents</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="busy">Busy</SelectItem>
                <SelectItem value="idle">Idle</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={departmentFilter}
              onValueChange={(value: DepartmentFilter) => onDepartmentFilterChange(value)}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="System Core">System Core</SelectItem>
                <SelectItem value="Strategy">Strategy</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Operations">Operations</SelectItem>
                <SelectItem value="Client Services">Client Services</SelectItem>
                <SelectItem value="Legal">Legal</SelectItem>
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={onClearFilters}>
                Clear Filters
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {filteredCount} of {totalCount} agents
            </Badge>
            {hasActiveFilters && (
              <Badge variant="secondary" className="text-xs">
                Filtered
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
