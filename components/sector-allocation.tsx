"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"

// Mock sector allocation data
const sectorData = [
  {
    name: "Technology",
    value: 45,
    color: "#8884d8",
    stocks: [
      { ticker: "AAPL", name: "Apple Inc.", allocation: 15, value: 18750 },
      { ticker: "MSFT", name: "Microsoft Corp.", allocation: 12, value: 15000 },
      { ticker: "NVDA", name: "NVIDIA Corp.", allocation: 10, value: 12500 },
      { ticker: "GOOGL", name: "Alphabet Inc.", allocation: 8, value: 10000 },
    ],
  },
  {
    name: "Healthcare",
    value: 20,
    color: "#82ca9d",
    stocks: [
      { ticker: "JNJ", name: "Johnson & Johnson", allocation: 8, value: 10000 },
      { ticker: "PFE", name: "Pfizer Inc.", allocation: 7, value: 8750 },
      { ticker: "UNH", name: "UnitedHealth Group", allocation: 5, value: 6250 },
    ],
  },
  {
    name: "Financial",
    value: 15,
    color: "#ffc658",
    stocks: [
      { ticker: "JPM", name: "JPMorgan Chase", allocation: 6, value: 7500 },
      { ticker: "BAC", name: "Bank of America", allocation: 5, value: 6250 },
      { ticker: "V", name: "Visa Inc.", allocation: 4, value: 5000 },
    ],
  },
  {
    name: "Consumer",
    value: 12,
    color: "#ff8042",
    stocks: [
      { ticker: "AMZN", name: "Amazon.com", allocation: 7, value: 8750 },
      { ticker: "WMT", name: "Walmart Inc.", allocation: 5, value: 6250 },
    ],
  },
  {
    name: "Energy",
    value: 8,
    color: "#0088fe",
    stocks: [
      { ticker: "XOM", name: "Exxon Mobil", allocation: 5, value: 6250 },
      { ticker: "CVX", name: "Chevron Corp.", allocation: 3, value: 3750 },
    ],
  },
]

export function SectorAllocation({ fullWidth = false }: { fullWidth?: boolean }) {
  const [selectedSector, setSelectedSector] = useState<string | null>(null)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const selectedSectorData = selectedSector ? sectorData.find((sector) => sector.name === selectedSector)?.stocks : null

  return (
    <Card className={fullWidth ? "col-span-full" : ""}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle>Sector Allocation</CardTitle>
          <CardDescription>Portfolio distribution by sector</CardDescription>
        </div>
        {selectedSector && (
          <Button variant="ghost" size="sm" onClick={() => setSelectedSector(null)}>
            Back to Sectors
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {!selectedSector ? (
          <div className="h-[300px]">
            <ChartContainer config={{}}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    onClick={(data) => setSelectedSector(data.name)}
                    cursor="pointer"
                  >
                    {sectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Allocation"]} contentStyle={{ borderRadius: "8px" }} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="font-medium text-lg">{selectedSector} Sector</h3>
            <div className="space-y-2">
              {selectedSectorData?.map((stock, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                  <div>
                    <div className="font-medium">{stock.ticker}</div>
                    <div className="text-sm text-muted-foreground">{stock.name}</div>
                  </div>
                  <div className="text-right">
                    <div>{formatCurrency(stock.value)}</div>
                    <div className="text-sm text-muted-foreground">{stock.allocation}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: "#8884d8" }}></div>
            <span>Technology: 45%</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: "#82ca9d" }}></div>
            <span>Healthcare: 20%</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: "#ffc658" }}></div>
            <span>Financial: 15%</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: "#ff8042" }}></div>
            <span>Consumer: 12%</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: "#0088fe" }}></div>
            <span>Energy: 8%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
