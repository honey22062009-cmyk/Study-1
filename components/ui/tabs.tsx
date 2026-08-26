'use client';

import * as React from "react"
import { cn } from "@/lib/utils"

interface TabsContextValue {
  activeTab: string
  setActiveTab: (id: string) => void
}

const TabsContext = React.createContext<TabsContextValue | null>(null)

export function Tabs({ defaultValue, children, className }: { defaultValue: string, children: React.ReactNode, className?: string }) {
  const [activeTab, setActiveTab] = React.useState(defaultValue)
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={cn("inline-flex h-10 items-center justify-center rounded-xl bg-zinc-100 p-1 text-zinc-500", className)}>{children}</div>
}

export function TabsTrigger({ value, children, className }: { value: string, children: React.ReactNode, className?: string }) {
  const ctx = React.useContext(TabsContext)
  if (!ctx) throw new Error("TabsTrigger must be used within Tabs")
  const active = ctx.activeTab === value
  return (
    <button
      onClick={() => ctx.setActiveTab(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        active ? "bg-white text-zinc-900 shadow-sm" : "hover:bg-white/50",
        className
      )}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, children, className }: { value: string, children: React.ReactNode, className?: string }) {
  const ctx = React.useContext(TabsContext)
  if (!ctx) throw new Error("TabsContent must be used within Tabs")
  if (ctx.activeTab !== value) return null
  return <div className={cn("mt-4 ring-offset-white focus-visible:outline-none", className)}>{children}</div>
}
