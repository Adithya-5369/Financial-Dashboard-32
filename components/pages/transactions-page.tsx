"use client"

import { TransactionsPanel } from "@/components/transactions-panel"

export function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground">View and manage your investment transactions.</p>
      </div>

      <TransactionsPanel fullWidth />
    </div>
  )
}
