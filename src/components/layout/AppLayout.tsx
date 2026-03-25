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
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Zap
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
import { motion, AnimatePresence } from "framer-motion"

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: Target, label: "Express Scores", href: "/scores" },
  { icon: Heart, label: "Charity Fast", href: "/charity" },
  { icon: CreditCard, label: "Membership", href: "/subscription" },
  { icon: ShieldCheck, label: "Admin Control", href: "/admin", adminOnly: true },
]

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [pixels, setPixels] = React.useState<{id: number, top: string, left: string, delay: string}[]>([])

  React.useEffect(() => {
    const newPixels = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 6}s`
    }))
    setPixels(newPixels)
  }, [])

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full relative bg-white overflow-hidden font-sans">
        {/* Zepto Background Ambiance */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-accent/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '3s' }} />
          
          {pixels.map((pixel) => (
            <div 
              key={pixel.id}
              className="pixel-particle"
              style={{ 
                top: pixel.top, 
                left: pixel.left, 
                animationDelay: pixel.delay,
                backgroundColor: pixel.id % 2 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--accent))'
              }} 
            />
          ))}
        </div>

        <Sidebar className="border-r border-secondary bg-white/60 backdrop-blur-2xl z-20">
          <SidebarHeader className="p-10">
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="bg-primary p-3 rounded-[1.2rem] text-white shadow-2xl shadow-primary/30"
              >
                <Zap size={24} className="fill-white" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-primary leading-none tracking-tighter">GO</span>
                <span className="text-[10px] font-black text-accent uppercase tracking-[0.3em]">CHARITY</span>
              </div>
            </Link>
          </SidebarHeader>
          <SidebarContent className="px-6 py-6 space-y-4">
            <SidebarMenu>
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.href}
                    className={cn(
                      "group relative rounded-[1.5rem] px-6 py-8 transition-all duration-400 border-2 border-transparent",
                      pathname === item.href 
                        ? "bg-primary text-white shadow-xl shadow-primary/20" 
                        : "text-muted-foreground hover:bg-secondary"
                    )}
                  >
                    <Link href={item.href}>
                      <item.icon className={cn("mr-4", pathname === item.href ? "text-accent" : "text-primary")} size={20} />
                      <span className="font-black uppercase tracking-widest text-[10px]">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="mt-8 p-8 rounded-[2rem] bg-gradient-to-br from-primary to-primary/80 text-white space-y-4 relative overflow-hidden"
            >
               <Zap className="absolute bottom-[-10px] right-[-10px] w-16 h-16 opacity-10" />
               <div className="flex items-center gap-2">
                 <div className="h-2 w-2 rounded-full bg-accent animate-ping" />
                 <p className="text-[9px] font-black uppercase tracking-[0.2em]">Express Draw</p>
               </div>
               <h4 className="text-xl font-black tracking-tighter">Win in 10 Mins</h4>
               <Link href="/subscription">
                 <Button className="w-full bg-accent text-white rounded-xl font-black uppercase tracking-widest text-[9px] h-10 border-none shadow-lg">Join Elite</Button>
               </Link>
            </motion.div>
          </SidebarContent>
          <SidebarFooter className="p-8 border-t border-secondary">
            <div className="p-4 rounded-[1.5rem] bg-secondary flex items-center gap-4 group cursor-pointer hover:bg-white transition-all">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center font-black text-white text-lg">JS</div>
              <div className="flex flex-col">
                <span className="text-sm font-black text-primary tracking-tight">John Smith</span>
                <span className="text-[9px] text-accent font-black uppercase tracking-widest">Elite Albatross</span>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 overflow-auto relative z-10">
          <div className="max-w-7xl mx-auto p-8 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
