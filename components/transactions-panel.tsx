"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp, Download, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock transaction data
const transactionData = [
  { id: 1, date: "2023-04-15", ticker: "AAPL", type: "buy", shares: 10, price: 165.23, total: 1652.3 },
  { id: 2, date: "2023-04-10", ticker: "MSFT", type: "buy", shares: 5, price: 287.18, total: 1435.9 },
  { id: 3, date: "2023-04-05", ticker: "NVDA", type: "sell", shares: 3, price: 267.4, total: 802.2 },
  { id: 4, date: "2023-03-28", ticker: "GOOGL", type: "buy", shares: 8, price: 123.48, total: 987.84 },
  { id: 5, date: "2023-03-20", ticker: "AMZN", type: "buy", shares: 12, price: 102.3, total: 1227.6 },
  { id: 6, date: "2023-03-15", ticker: "TSLA", type: "sell", shares: 4, price: 180.13, total: 720.52 },
  { id: 7, date: "2023-03-10", ticker: "META", type: "buy", shares: 6, price: 185.25, total: 1111.5 },
]

export function TransactionsPanel({ fullWidth = false }: { fullWidth?: boolean }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [transactionType, setTransactionType] = useState("all")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date)
  }

  const filteredTransactions = transactionData.filter((transaction) => {
    const matchesSearch = transaction.ticker.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = transactionType === "all" || transaction.type === transactionType
    return matchesSearch && matchesType
  })

  return (
    <Card className={fullWidth ? "col-span-full" : ""}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle>Transactions</CardTitle>
          <CardDescription>Recent stock trades</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by ticker..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={transactionType} onValueChange={setTransactionType}>
            <SelectTrigger className="w-[130px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="buy">Buy Only</SelectItem>
              <SelectItem value="sell">Sell Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Ticker</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Shares</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell className="font-medium">{transaction.ticker}</TableCell>
                    <TableCell>
                      <span
                        className={`flex items-center ${transaction.type === "buy" ? "text-green-500" : "text-red-500"}`}
                      >
                        {transaction.type === "buy" ? (
                          <ArrowDown className="mr-1 h-4 w-4" />
                        ) : (
                          <ArrowUp className="mr-1 h-4 w-4" />
                        )}
                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">{transaction.shares}</TableCell>
                    <TableCell className="text-right">{formatCurrency(transaction.price)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(transaction.total)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                    No transactions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {filteredTransactions.length > 0 && (
          <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
            <span>
              Showing {filteredTransactions.length} of {transactionData.length} transactions
            </span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
