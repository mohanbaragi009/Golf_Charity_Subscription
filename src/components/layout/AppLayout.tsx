
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
  ChevronRight,
  ShieldCheck,
  Zap,
  Sparkles
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
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: Target, label: "Score Registry", href: "/scores" },
  { icon: Heart, label: "Foundations", href: "/charity" },
  { icon: CreditCard, label: "Membership", href: "/subscription" },
  { icon: ShieldCheck, label: "Admin Control", href: "/admin", adminOnly: true },
]

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full relative bg-background">
        {/* Abstract background shapes - Motion Enhanced */}
        <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[150px] pointer-events-none animate-pulse" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[150px] pointer-events-none animate-pulse" style={{ animationDelay: '3s' }} />

        <Sidebar className="border-r border-white/20 bg-white/30 backdrop-blur-2xl">
          <SidebarHeader className="p-10">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="bg-primary p-3 rounded-2xl text-white group-hover:scale-110 transition-all duration-500 shadow-2xl shadow-primary/20">
                <Trophy size={28} />
              </div>
              <div className="flex flex-col">
                <span className="font-headline text-3xl font-black text-primary leading-none tracking-tighter">GOLF</span>
                <span className="font-headline text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] opacity-50">Impact</span>
              </div>
            </Link>
          </SidebarHeader>
          <SidebarContent className="px-6 py-6 space-y-3">
            <SidebarMenu>
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.href}
                    className={cn(
                      "group relative hover:bg-white/50 rounded-2xl px-6 py-8 transition-all duration-500",
                      pathname === item.href 
                        ? "bg-primary text-white hover:bg-primary shadow-2xl shadow-primary/30" 
                        : "text-muted-foreground"
                    )}
                  >
                    <Link href={item.href}>
                      <item.icon className={cn("mr-4 transition-transform group-hover:rotate-12", pathname === item.href ? "text-accent" : "text-primary/60")} size={22} />
                      <span className="font-black uppercase tracking-widest text-[11px]">{item.label}</span>
                      {pathname === item.href && (
                        <div className="absolute right-6 w-2 h-2 rounded-full bg-accent shadow-[0_0_15px_rgba(var(--accent),0.5)]" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

            <div className="mt-10 p-8 rounded-[2.5rem] bg-primary/5 border border-primary/10 space-y-4 relative overflow-hidden group">
               <Sparkles className="absolute bottom-[-10px] right-[-10px] w-20 h-20 opacity-10 group-hover:scale-125 transition-transform duration-700" />
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Monthly Draw</p>
               <div className="space-y-1">
                 <h4 className="text-xl font-black text-primary tracking-tighter">Elite Driver</h4>
                 <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">4 Days Remaining</p>
               </div>
               <Link href="/subscription">
                 <Button size="sm" className="w-full mt-4 bg-primary text-white rounded-xl font-black uppercase tracking-widest text-[9px] h-10 shadow-lg">Upgrade</Button>
               </Link>
            </div>
          </SidebarContent>
          <SidebarFooter className="p-8 border-t border-white/10">
            <div className="p-5 rounded-[2.5rem] bg-white/50 backdrop-blur-md border border-white/60 flex items-center gap-4 group cursor-pointer hover:bg-white/80 transition-all duration-500 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center font-black text-white shadow-xl text-xl">
                JS
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black text-primary tracking-tight">John Smith</span>
                <span className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] opacity-60">Elite Albatross</span>
              </div>
              <ChevronRight className="ml-auto text-primary opacity-20 group-hover:opacity-100 transition-all group-hover:translate-x-1" size={18} />
            </div>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 overflow-auto relative z-10 scroll-smooth">
          <div className="max-w-7xl mx-auto p-8 md:p-12">
            <div className="md:hidden mb-10 flex items-center justify-between">
              <SidebarTrigger className="bg-white/60 backdrop-blur-xl rounded-2xl p-4 hover:bg-white transition-all shadow-xl" />
              <div className="bg-primary/90 p-2 rounded-xl text-white shadow-lg"><Trophy size={20} /></div>
            </div>
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
