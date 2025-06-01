export const mockFinOpsMetrics = {
  totalCost: 45000,
  monthlyCost: 15000,
  costPerAgent: {
    ada: 5000,
    bob: 4500,
    eve: 5500,
  },
  efficiency: 94,
  roi: 340,
  costTrend: "decreasing" as const,
}

export const mockFinOpsSummary = {
  currentMonth: {
    budget: 50000,
    spent: 42000,
    remaining: 8000,
    utilizationRate: 84,
  },
  projectedSavings: 12000,
  optimizationOpportunities: ["Reduce idle time by 15%", "Optimize resource allocation", "Implement auto-scaling"],
}
