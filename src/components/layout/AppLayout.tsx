
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Trophy, 
  LayoutDashboard, 
  Target, 
  Heart, 
  CreditCard, 
  Settings, 
  Gift,
  Menu,
  ChevronLeft
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider, 
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar"

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Target, label: "Score Entry", href: "/scores" },
  { icon: Heart, label: "Charities", href: "/charity" },
  { icon: CreditCard, label: "Subscription", href: "/subscription" },
  { icon: Gift, label: "Admin Portal", href: "/admin", adminOnly: true },
]

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r border-border bg-white/50 backdrop-blur-sm">
          <SidebarHeader className="p-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary p-2 rounded-xl text-white group-hover:bg-accent group-hover:text-primary transition-colors">
                <Trophy size={24} />
              </div>
              <span className="font-headline text-xl font-bold text-primary">GolfCharity</span>
            </Link>
          </SidebarHeader>
          <SidebarContent className="px-4 py-2">
            <SidebarMenu>
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.href}
                    className={cn(
                      "hover:bg-primary/10 hover:text-primary rounded-xl px-4 py-6 text-base transition-all",
                      pathname === item.href ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground shadow-md" : ""
                    )}
                  >
                    <Link href={item.href}>
                      <item.icon className="mr-3" size={20} />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-6 border-t border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center font-bold text-primary">
                JS
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold">John Smith</span>
                <span className="text-xs text-muted-foreground">Pro Member</span>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="md:hidden mb-4">
              <SidebarTrigger />
            </div>
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
