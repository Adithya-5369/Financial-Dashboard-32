"use client"

import { ArrowDown, ArrowUp, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export function PortfolioOverview({ fullWidth = false }: { fullWidth?: boolean }) {
  const [currency, setCurrency] = useState("USD")

  const portfolioValue = 125863.42
  const dailyChange = 1243.87
  const dailyChangePercent = 0.98
  const isPositive = dailyChange > 0

  const currencySymbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    INR: "₹",
  }

  const conversionRates: Record<string, number> = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    INR: 83.12,
  }

  const formatCurrency = (value: number) => {
    const convertedValue = value * conversionRates[currency]
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(convertedValue)
  }

  return (
    <Card className={fullWidth ? "col-span-full" : ""}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle>Portfolio Value</CardTitle>
          <CardDescription>Your total investment value</CardDescription>
        </div>
        <Select value={currency} onValueChange={setCurrency}>
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder="Currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USD">USD</SelectItem>
            <SelectItem value="EUR">EUR</SelectItem>
            <SelectItem value="GBP">GBP</SelectItem>
            <SelectItem value="INR">INR</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{formatCurrency(portfolioValue)}</div>
        <div className="flex items-center pt-1">
          <span className={`flex items-center ${isPositive ? "text-green-500" : "text-red-500"}`}>
            {isPositive ? <ArrowUp className="mr-1 h-4 w-4" /> : <ArrowDown className="mr-1 h-4 w-4" />}
            {formatCurrency(dailyChange)} ({dailyChangePercent}%)
          </span>
          <span className="text-muted-foreground ml-2">Today</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-5 w-5 ml-1">
                  <Info className="h-3 w-3" />
                  <span className="sr-only">Info</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Value change since market open</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-md bg-muted p-2">
            <div className="text-xs text-muted-foreground">Total Invested</div>
            <div className="text-sm font-medium">{formatCurrency(98750.0)}</div>
          </div>
          <div className="rounded-md bg-muted p-2">
            <div className="text-xs text-muted-foreground">Total Return</div>
            <div className="text-sm font-medium text-green-500">+{formatCurrency(27113.42)}</div>
          </div>
          <div className="rounded-md bg-muted p-2">
            <div className="text-xs text-muted-foreground">Return %</div>
            <div className="text-sm font-medium text-green-500">+27.45%</div>
          </div>
          <div className="rounded-md bg-muted p-2">
            <div className="text-xs text-muted-foreground">Cash Balance</div>
            <div className="text-sm font-medium">{formatCurrency(12450.0)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
