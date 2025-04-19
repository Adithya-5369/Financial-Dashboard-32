"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PortfolioOverview } from "@/components/portfolio-overview"
import { BudgetTracker } from "@/components/budget-tracker"
import { ForecastSpending } from "@/components/forecast-spending"
import { SectorAllocation } from "@/components/sector-allocation"
import { PortfolioTrend } from "@/components/portfolio-trend"
import { PortfolioHealth } from "@/components/portfolio-health"
import { TransactionsPanel } from "@/components/transactions-panel"
import { GoalTracker } from "@/components/goal-tracker"

export function DashboardContent() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your financial portfolio.</p>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="forecast">Forecast</TabsTrigger>
          <TabsTrigger value="allocation">Allocation</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <PortfolioOverview />
            <BudgetTracker />
            <ForecastSpending />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <SectorAllocation />
            <PortfolioTrend />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <PortfolioHealth />
            <TransactionsPanel />
            <GoalTracker />
          </div>
        </TabsContent>

        <TabsContent value="budget" className="space-y-4">
          <BudgetTracker fullWidth />
        </TabsContent>

        <TabsContent value="forecast" className="space-y-4">
          <ForecastSpending fullWidth />
        </TabsContent>

        <TabsContent value="allocation" className="space-y-4">
          <SectorAllocation fullWidth />
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <PortfolioTrend fullWidth />
        </TabsContent>
      </Tabs>
    </div>
  )
}
