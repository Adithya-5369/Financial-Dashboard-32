"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Bell,
  ChevronDown,
  CreditCard,
  DollarSign,
  Home,
  LineChart,
  List,
  PieChart,
  Settings,
  Target,
  Wallet,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()
  const [portfolioOpen, setPortfolioOpen] = useState(true)

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (open) {
      onClose()
    }
  }, [pathname])

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Portfolio",
      icon: Wallet,
      href: "/portfolio",
      active: pathname === "/portfolio" || pathname.startsWith("/portfolio/"),
      submenu: true,
      submenuOpen: portfolioOpen,
      submenuItems: [
        { label: "Overview", href: "/portfolio", active: pathname === "/portfolio" },
        { label: "Stocks", href: "/portfolio/stocks", active: pathname === "/portfolio/stocks" },
        { label: "ETFs", href: "/portfolio/etfs", active: pathname === "/portfolio/etfs" },
        { label: "Crypto", href: "/portfolio/crypto", active: pathname === "/portfolio/crypto" },
      ],
    },
    {
      label: "Transactions",
      icon: CreditCard,
      href: "/transactions",
      active: pathname === "/transactions",
    },
    {
      label: "Budget",
      icon: DollarSign,
      href: "/budget",
      active: pathname === "/budget",
    },
    {
      label: "Forecast",
      icon: LineChart,
      href: "/forecast",
      active: pathname === "/forecast",
    },
    {
      label: "Sector Allocation",
      icon: PieChart,
      href: "/sectors",
      active: pathname === "/sectors",
    },
    {
      label: "Performance",
      icon: BarChart3,
      href: "/performance",
      active: pathname === "/performance",
    },
    {
      label: "Watchlist",
      icon: List,
      href: "/watchlist",
      active: pathname === "/watchlist",
    },
    {
      label: "Goals",
      icon: Target,
      href: "/goals",
      active: pathname === "/goals",
    },
    {
      label: "Alerts",
      icon: Bell,
      href: "/alerts",
      active: pathname === "/alerts",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
      active: pathname === "/settings",
    },
  ]

  return (
    <>
      <div
        className={cn("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden", open ? "block" : "hidden")}
        onClick={onClose}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r bg-card transition-transform md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <span className="text-lg font-bold text-primary-foreground">Z</span>
            </div>
            <span className="font-bold">Zenith Finance</span>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={onClose}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="px-3 py-4">
            <nav className="flex flex-col gap-1">
              {routes.map((route, i) =>
                route.submenu ? (
                  <div key={i} className="flex flex-col">
                    <Button
                      variant="ghost"
                      className={cn(
                        "flex w-full items-center justify-between px-3 py-2 text-muted-foreground",
                        route.active && "bg-muted text-foreground",
                      )}
                      onClick={() => setPortfolioOpen(!portfolioOpen)}
                    >
                      <div className="flex items-center gap-3">
                        <route.icon className="h-4 w-4" />
                        {route.label}
                      </div>
                      <ChevronDown className={cn("h-4 w-4 transition-transform", portfolioOpen && "rotate-180")} />
                    </Button>
                    {portfolioOpen && (
                      <div className="ml-4 mt-1 flex flex-col gap-1 pl-4 border-l">
                        {route.submenuItems?.map((item, j) => (
                          <Link
                            key={j}
                            href={item.href}
                            className={cn(
                              "flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground",
                              item.active && "bg-muted text-foreground",
                            )}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={i}
                    href={route.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground",
                      route.active && "bg-muted text-foreground",
                    )}
                  >
                    <route.icon className="h-4 w-4" />
                    {route.label}
                  </Link>
                ),
              )}
            </nav>
          </div>
        </ScrollArea>
      </aside>
    </>
  )
}
