"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock forecast data
const forecastData = [
  { month: "Jan", actual: 450, forecast: 0 },
  { month: "Feb", actual: 620, forecast: 0 },
  { month: "Mar", actual: 380, forecast: 0 },
  { month: "Apr", actual: 563, forecast: 0 },
  { month: "May", actual: 0, forecast: 580 },
  { month: "Jun", actual: 0, forecast: 610 },
  { month: "Jul", actual: 0, forecast: 590 },
]

export function ForecastSpending({ fullWidth = false }: { fullWidth?: boolean }) {
  const currentMonth = "Apr"
  const nextMonth = "May"
  const forecastAmount = 563.08
  const underBudget = 2286.92

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  return (
    <Card className={fullWidth ? "col-span-full" : ""}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle>Forecast</CardTitle>
          <CardDescription>Next month's predicted spending</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{formatCurrency(forecastAmount)}</div>
        <div className="text-sm text-green-500">{formatCurrency(underBudget)} under budget</div>
        <div className="h-[150px] mt-4">
          <ChartContainer
            config={{
              actual: {
                label: "Actual",
                color: "hsl(var(--primary))",
              },
              forecast: {
                label: "Forecast",
                color: "hsl(var(--muted-foreground))",
                strokeDasharray: "4 4",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecastData}>
                <XAxis
                  dataKey="month"
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
                  tickFormatter={(value) => `${value}`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="actual"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  stroke="var(--color-actual)"
                />
                <Line
                  type="monotone"
                  dataKey="forecast"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  stroke="var(--color-forecast)"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            Based on your spending patterns, we predict you'll invest {formatCurrency(forecastAmount)} in {nextMonth}.
          </p>
          <p className="mt-1">This is {formatCurrency(underBudget)} under your monthly budget.</p>
        </div>
      </CardContent>
    </Card>
  )
}
