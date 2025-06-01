"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Filter, X } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export interface FilterState {
  agent: string
  user: string
  status: string
  projectId: string
  dateRange: {
    from: Date | undefined
    to: Date | undefined
  }
}

interface EngagementFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  totalEngagements: number
  filteredCount: number
  className?: string
}

export function EngagementFilters({
  filters,
  onFiltersChange,
  totalEngagements,
  filteredCount,
  className,
}: EngagementFiltersProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  const clearFilters = () => {
    onFiltersChange({
      agent: "All Agents",
      user: "All Users",
      status: "All Status",
      projectId: "",
      dateRange: { from: undefined, to: undefined },
    })
  }

  const hasActiveFilters =
    filters.agent !== "All Agents" ||
    filters.user !== "All Users" ||
    filters.status !== "All Status" ||
    filters.projectId !== "" ||
    filters.dateRange.from ||
    filters.dateRange.to

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-cyan-400 font-semibold flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters
        </h3>
        <div className="flex items-center gap-2">
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            {filteredCount} of {totalEngagements} engagements
          </Badge>
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="bg-[#0f1a2c]/80 border-cyan-500/20 text-blue-200 hover:bg-cyan-500/10"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Agent Filter */}
        <div className="space-y-2">
          <Label className="text-blue-300 text-sm font-medium">Agent</Label>
          <Select value={filters.agent} onValueChange={(value) => handleFilterChange("agent", value)}>
            <SelectTrigger className="bg-[#0f1a2c]/80 border-cyan-500/20 text-white">
              <SelectValue placeholder="All Agents" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Agents">All Agents</SelectItem>
              <SelectItem value="Bob">Bob</SelectItem>
              <SelectItem value="Ada">Ada</SelectItem>
              <SelectItem value="Max">Max</SelectItem>
              <SelectItem value="Janet">Janet</SelectItem>
              <SelectItem value="Shandry">Shandry</SelectItem>
              <SelectItem value="Eve">Eve</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* User Filter */}
        <div className="space-y-2">
          <Label className="text-blue-300 text-sm font-medium">User</Label>
          <Select value={filters.user} onValueChange={(value) => handleFilterChange("user", value)}>
            <SelectTrigger className="bg-[#0f1a2c]/80 border-cyan-500/20 text-white">
              <SelectValue placeholder="All Users" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Users">All Users</SelectItem>
              <SelectItem value="CEO">CEO</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Client">Client</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <Label className="text-blue-300 text-sm font-medium">Status</Label>
          <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
            <SelectTrigger className="bg-[#0f1a2c]/80 border-cyan-500/20 text-white">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Status">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Project ID Filter */}
        <div className="space-y-2">
          <Label className="text-blue-300 text-sm font-medium">Project ID</Label>
          <Input
            placeholder="Search by ID..."
            value={filters.projectId}
            onChange={(e) => handleFilterChange("projectId", e.target.value)}
            className="bg-[#0f1a2c]/80 border-cyan-500/20 text-white placeholder-blue-300/50"
          />
        </div>

        {/* Date Range Filter */}
        <div className="space-y-2">
          <Label className="text-blue-300 text-sm font-medium">Date Range</Label>
          <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-[#0f1a2c]/80 border-cyan-500/20 text-white hover:bg-cyan-500/10",
                  !filters.dateRange.from && "text-blue-300/70",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.dateRange.from ? (
                  filters.dateRange.to ? (
                    <>
                      {format(filters.dateRange.from, "LLL dd, y")} - {format(filters.dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(filters.dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 bg-[#0f1a2c]/90 border border-cyan-500/20 text-white shadow-md backdrop-blur-sm"
              align="start"
            >
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={filters.dateRange.from}
                selected={filters.dateRange}
                onSelect={(range) => handleFilterChange("dateRange", range || { from: undefined, to: undefined })}
                numberOfMonths={2}
                className="bg-transparent text-white rounded-md shadow-inner backdrop-blur-sm border-none"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}
