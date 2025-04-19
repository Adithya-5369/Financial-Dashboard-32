"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, ReferenceLine } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

// Mock portfolio trend data
const generateTrendData = (period: string) => {
  const baseData: Record<string, any[]> = {
    "1W": [
      { date: "Mon", value: 122500 },
      { date: "Tue", value: 123100 },
      { date: "Wed", value: 122800 },
      { date: "Thu", value: 124200 },
      { date: "Fri", value: 125863 },
    ],
    "1M": Array.from({ length: 30 }, (_, i) => ({
      date: `${i + 1}`,
      value: 120000 + Math.random() * 10000,
    })),
    "3M": Array.from({ length: 12 }, (_, i) => ({
      date: `Week ${i + 1}`,
      value: 115000 + Math.random() * 15000,
    })),
    "6M": Array.from({ length: 6 }, (_, i) => ({
      date: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i],
      value: 110000 + Math.random() * 20000,
    })),
    "1Y": Array.from({ length: 12 }, (_, i) => ({
      date: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
      value: 100000 + Math.random() * 30000,
    })),
    All: Array.from({ length: 5 }, (_, i) => ({
      date: [2019, 2020, 2021, 2022, 2023][i],
      value: 80000 + i * 10000 + Math.random() * 5000,
    })),
  }

  return baseData[period] || baseData["1M"]
}

// Add annotations for significant events
const annotations = [
  { date: "Wed", value: 122800, label: "Earnings Report", description: "AAPL released positive Q2 earnings" },
  { date: "Fri", value: 125863, label: "Market Rally", description: "Tech sector rallied on positive economic data" },
]

export function PortfolioTrend({ fullWidth = false }: { fullWidth?: boolean }) {
  const [period, setPeriod] = useState("1W")
  const [showMarketIndex, setShowMarketIndex] = useState(false)

  const trendData = generateTrendData(period)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Calculate performance metrics
  const startValue = trendData[0]?.value || 0
  const endValue = trendData[trendData.length - 1]?.value || 0
  const changeValue = endValue - startValue
  const changePercent = (changeValue / startValue) * 100
  const isPositive = changeValue >= 0

  return (
    <Card className={fullWidth ? "col-span-full" : ""}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle>Portfolio Trend</CardTitle>
          <CardDescription>Historical performance over time</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowMarketIndex(!showMarketIndex)}
            className={showMarketIndex ? "bg-muted" : ""}
          >
            Compare to S&P 500
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-2xl font-bold">{formatCurrency(endValue)}</div>
            <div className={`flex items-center text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}>
              {isPositive ? "+" : ""}
              {formatCurrency(changeValue)} ({isPositive ? "+" : ""}
              {changePercent.toFixed(2)}%)
              <span className="text-muted-foreground ml-2">{period}</span>
            </div>
          </div>
          <ToggleGroup type="single" value={period} onValueChange={(value) => value && setPeriod(value)}>
            <ToggleGroupItem value="1W">1W</ToggleGroupItem>
            <ToggleGroupItem value="1M">1M</ToggleGroupItem>
            <ToggleGroupItem value="3M">3M</ToggleGroupItem>
            <ToggleGroupItem value="6M">6M</ToggleGroupItem>
            <ToggleGroupItem value="1Y">1Y</ToggleGroupItem>
            <ToggleGroupItem value="All">All</ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="h-[300px]">
          <ChartContainer
            config={{
              portfolio: {
                label: "Portfolio Value",
                color: "hsl(var(--primary))",
              },
              market: {
                label: "S&P 500",
                color: "hsl(var(--muted-foreground))",
                strokeDasharray: "4 4",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  name="portfolio"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
                  stroke="var(--color-portfolio)"
                />
                {showMarketIndex && (
                  <Line
                    type="monotone"
                    dataKey={(entry) => entry.value * 0.95 + Math.random() * 5000}
                    name="market"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    dot={false}
                    activeDot={{ r: 6, fill: "hsl(var(--muted-foreground))" }}
                    stroke="var(--color-market)"
                  />
                )}
                {period === "1W" &&
                  annotations.map((annotation, index) => (
                    <ReferenceLine
                      key={index}
                      x={annotation.date}
                      stroke="hsl(var(--primary))"
                      strokeDasharray="3 3"
                      label={{
                        value: annotation.label,
                        position: "top",
                        fill: "hsl(var(--primary))",
                        fontSize: 12,
                      }}
                    />
                  ))}
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        {period === "1W" && (
          <div className="mt-4 space-y-2 text-sm">
            <h4 className="font-medium">Key Events</h4>
            {annotations.map((annotation, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                <div>
                  <div className="font-medium">
                    {annotation.label} ({annotation.date})
                  </div>
                  <div className="text-muted-foreground">{annotation.description}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
