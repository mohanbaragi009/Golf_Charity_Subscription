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
  PanelLeft,
  ChevronRight
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
  SidebarTrigger
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
      <div className="flex min-h-screen w-full relative overflow-hidden bg-background">
        {/* Abstract background shapes */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

        <Sidebar className="border-r border-white/20 bg-white/30 backdrop-blur-xl">
          <SidebarHeader className="p-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-primary/90 p-2.5 rounded-2xl text-white group-hover:bg-accent group-hover:text-primary transition-all duration-500 shadow-lg shadow-primary/20">
                <Trophy size={26} />
              </div>
              <div className="flex flex-col">
                <span className="font-headline text-2xl font-bold text-primary leading-none">Golf</span>
                <span className="font-headline text-sm font-bold text-muted-foreground uppercase tracking-tighter opacity-70">Charity</span>
              </div>
            </Link>
          </SidebarHeader>
          <SidebarContent className="px-4 py-4 space-y-2">
            <SidebarMenu>
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.href}
                    className={cn(
                      "group relative hover:bg-white/40 hover:text-primary rounded-2xl px-5 py-7 text-base transition-all duration-300",
                      pathname === item.href ? "bg-primary text-white hover:bg-primary/90 hover:text-white shadow-xl shadow-primary/20" : "text-muted-foreground"
                    )}
                  >
                    <Link href={item.href}>
                      <item.icon className={cn("mr-3 transition-transform group-hover:scale-110", pathname === item.href ? "text-white" : "text-primary/70")} size={22} />
                      <span className="font-medium">{item.label}</span>
                      {pathname === item.href && (
                        <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-6 border-t border-white/20">
            <div className="p-4 rounded-[2rem] bg-white/40 backdrop-blur-sm border border-white/40 flex items-center gap-4 group cursor-pointer hover:bg-white/60 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center font-bold text-white shadow-lg group-hover:scale-105 transition-transform">
                JS
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-primary">John Smith</span>
                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Pro Member</span>
              </div>
              <ChevronRight className="ml-auto text-muted-foreground opacity-30 group-hover:opacity-100 transition-opacity" size={16} />
            </div>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 overflow-auto relative z-10">
          <div className="max-w-6xl mx-auto p-6 md:p-10">
            <div className="md:hidden mb-6">
              <SidebarTrigger className="bg-white/40 backdrop-blur-md rounded-xl p-2 hover:bg-white/60 transition-colors" />
            </div>
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}