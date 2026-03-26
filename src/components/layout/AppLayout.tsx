"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  LayoutDashboard, 
  Target, 
  Heart, 
  CreditCard, 
  ShieldCheck,
  Zap,
  LogOut,
  User,
  Moon,
  Sun
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
import { useUser } from "@/firebase"
import { getAuth, signOut } from "firebase/auth"
import { getFirebaseApp } from "@/firebase"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: Target, label: "Express Scores", href: "/scores" },
  { icon: Heart, label: "Charity Fast", href: "/charity" },
  { icon: CreditCard, label: "Membership", href: "/subscription" },
  { icon: ShieldCheck, label: "Admin Control", href: "/admin", adminOnly: true },
]

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useUser()
  const [pixels, setPixels] = React.useState<{id: number, top: string, left: string, delay: string}[]>([])
  const [theme, setTheme] = React.useState<"light" | "dark">("light")

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle("dark", savedTheme === "dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  React.useEffect(() => {
    const newPixels = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`
    }))
    setPixels(newPixels)
  }, [])

  const handleSignOut = async () => {
    const auth = getAuth(getFirebaseApp())
    await signOut(auth)
    router.push("/")
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full relative bg-background overflow-hidden font-sans transition-colors duration-500">
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-accent/10 rounded-full blur-[120px] animate-pulse" />
          {pixels.map((p) => (
            <div key={p.id} className="pixel-particle" style={{ top: p.top, left: p.left, animationDelay: p.delay, backgroundColor: p.id % 2 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--accent))' }} />
          ))}
        </div>

        <Sidebar className="border-r border-border bg-sidebar/60 backdrop-blur-2xl z-20">
          <SidebarHeader className="p-10">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-primary p-3 rounded-[1.2rem] text-primary-foreground shadow-2xl">
                <Zap size={24} className="fill-current" />
              </div>
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
                  <SidebarMenuButton asChild isActive={pathname === item.href} className={cn("rounded-[1.5rem] px-6 py-8 h-auto", pathname === item.href ? "bg-primary text-primary-foreground" : "text-muted-foreground")}>
                    <Link href={item.href}>
                      <item.icon className={cn("mr-4", pathname === item.href ? "text-accent" : "text-primary")} size={20} />
                      <span className="font-black uppercase tracking-widest text-[10px]">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

            <div className="mt-4 px-2">
              <Button variant="ghost" onClick={toggleTheme} className="w-full h-14 rounded-2xl bg-secondary/50 dark:bg-white/5 text-primary border border-primary/5 font-black uppercase tracking-widest text-[10px] flex items-center justify-between px-6">
                <span className="flex items-center gap-2">{theme === "light" ? <Sun size={14} /> : <Moon size={14} />} {theme === "light" ? "Light" : "Dark"}</span>
                <div className="w-8 h-4 rounded-full bg-primary/20 relative"><motion.div animate={{ x: theme === "light" ? 0 : 16 }} className="absolute top-1 left-1 w-2 h-2 rounded-full bg-primary" /></div>
              </Button>
            </div>
          </SidebarContent>
          <SidebarFooter className="p-8 border-t border-border">
            {user ? (
              <div className="flex flex-col gap-4">
                <div className="p-4 rounded-[1.5rem] bg-secondary dark:bg-white/5 flex items-center gap-4">
                  <Avatar className="w-12 h-12 rounded-xl">
                    <AvatarImage src={user.photoURL || ""} />
                    <AvatarFallback className="bg-primary text-primary-foreground font-black">{user.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-black text-primary truncate">{user.displayName || "User"}</span>
                    <span className="text-[9px] text-accent font-black uppercase tracking-widest">Elite Member</span>
                  </div>
                </div>
                <Button variant="ghost" onClick={handleSignOut} className="w-full h-12 rounded-xl text-primary/40 font-black uppercase text-[9px]"><LogOut size={14} className="mr-2" /> Sign Out</Button>
              </div>
            ) : (
              <Link href="/auth" className="w-full"><Button className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-black uppercase text-[10px]"><User size={16} className="mr-2" /> Sign In</Button></Link>
            )}
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 overflow-auto relative z-10 p-4 md:p-12">
          <div className="md:hidden mb-6 flex justify-between items-center bg-card/60 backdrop-blur-xl p-4 rounded-3xl">
            <Link href="/" className="flex items-center gap-2"><Zap size={20} className="text-primary fill-primary" /><span className="text-xl font-black text-primary">GO</span></Link>
            <SidebarTrigger />
          </div>
          <AnimatePresence mode="wait"><motion.div key={pathname} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>{children}</motion.div></AnimatePresence>
        </main>
      </div>
    </SidebarProvider>
  )
}