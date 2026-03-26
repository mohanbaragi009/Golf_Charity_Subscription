"use client"

import * as React from "react"
import Link from "next/link"
import { Heart, Sparkles, Target, ArrowRight, Zap, Timer, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useUser } from "@/firebase"

export default function LandingPage() {
  const { user } = useUser()

  return (
    <div className="min-h-screen bg-white dark:bg-background relative overflow-hidden font-sans transition-colors duration-500">
      {/* Design Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]" />
      </div>

      <header className="container mx-auto px-6 py-10 flex items-center justify-between relative z-10">
        <Link href="/" className="flex items-center gap-4 group">
          <motion.div 
            whileHover={{ rotate: -10, scale: 1.1 }}
            className="bg-primary p-3.5 rounded-[1.5rem] text-white shadow-2xl shadow-primary/20"
          >
            <Zap size={32} className="fill-white" />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-4xl font-black text-primary leading-none tracking-tighter">GO</span>
            <span className="text-[11px] font-black text-accent uppercase tracking-[0.4em]">CHARITY</span>
          </div>
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          {user ? (
            <Link href="/dashboard" className="flex items-center gap-3 group">
               <div className="hidden sm:flex flex-col items-end">
                 <span className="text-[10px] font-black text-primary/40 uppercase tracking-widest">Logged in as</span>
                 <span className="text-sm font-black text-primary tracking-tight">{user.displayName || user.email}</span>
               </div>
               <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-black shadow-lg shadow-primary/20">
                  {user.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase()}
               </div>
            </Link>
          ) : (
            <>
              <Link href="/auth">
                <Button variant="ghost" className="font-black text-[12px] uppercase tracking-widest text-primary hover:bg-primary/5 rounded-full px-4 sm:px-6 h-12">Login</Button>
              </Link>
              <Link href="/auth">
                <Button className="bg-primary text-white font-black uppercase tracking-widest rounded-full px-6 sm:px-10 h-14 shadow-2xl shadow-primary/20 hover:bg-primary/90 hover:scale-105 transition-all text-[10px] sm:text-[12px]">
                  Join Express
                </Button>
              </Link>
            </>
          )}
        </div>
      </header>

      <main className="container mx-auto px-6 relative z-10 pt-12 lg:pt-32 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-8 lg:space-y-12 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-secondary/50 dark:bg-white/5 rounded-full border border-primary/10"
            >
              <Timer size={20} className="text-accent" />
              <span className="text-[11px] font-black text-primary uppercase tracking-[0.2em]">Verified Impact in 10 Minutes</span>
            </motion.div>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-black text-primary tracking-tighter leading-[0.85] lg:max-w-2xl">
              Play Fast. <br/><span className="text-accent italic">Give Faster.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground font-bold leading-relaxed lg:max-w-lg">
              The world's premier express golf impact platform. Verified scores, instant prizes, and hyper-local charity funding.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 justify-center lg:justify-start">
              <Link href={user ? "/dashboard" : "/auth"}>
                <Button size="lg" className="w-full sm:w-auto h-20 px-12 sm:px-16 bg-primary text-white font-black uppercase tracking-[0.1em] rounded-[2.5rem] shadow-[0_30px_60px_rgba(147,51,234,0.3)] text-lg sm:text-xl hover:scale-105 active:scale-95 transition-all">
                  {user ? "Go to Hub" : "Get Started"} <ArrowRight size={24} className="ml-4" />
                </Button>
              </Link>
              <div className="flex items-center gap-5 px-10 h-20 border-2 border-primary/5 rounded-[2.5rem] bg-white/40 dark:bg-white/5 backdrop-blur-xl w-full sm:w-auto">
                 <div className="flex -space-x-4">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-[3px] border-white dark:border-background bg-primary/10 flex items-center justify-center font-black text-primary text-[10px] lg:text-[11px]">U{i}</div>
                   ))}
                 </div>
                 <div className="flex flex-col">
                   <span className="text-sm font-black text-primary tracking-tight">12.4k+</span>
                   <span className="text-[9px] font-black uppercase text-primary/40 tracking-widest leading-none">Global Impactors</span>
                 </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
             <div className="absolute inset-0 bg-primary/10 rounded-[5rem] blur-[80px]" />
             <div className="relative glass-card p-10 lg:p-16 space-y-10 lg:space-y-12 border-2 border-white/80 dark:border-white/5 bg-white/30">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
                  <div className="p-8 lg:p-10 rounded-[3rem] bg-white dark:bg-white/5 shadow-2xl shadow-black/[0.02] border border-secondary dark:border-white/5 group hover:scale-105 transition-transform">
                     <Zap size={40} className="text-accent mb-6 fill-accent" />
                     <h3 className="text-3xl font-black text-primary tracking-tight">Express</h3>
                     <p className="text-[10px] font-black text-muted-foreground uppercase mt-3 tracking-widest opacity-60">10m Verification</p>
                  </div>
                  <div className="p-8 lg:p-10 rounded-[3rem] bg-primary text-white shadow-2xl shadow-primary/30 group hover:scale-105 transition-transform">
                     <Heart size={40} className="text-white mb-6 fill-white" />
                     <h3 className="text-3xl font-black tracking-tight">Direct</h3>
                     <p className="text-[10px] font-black opacity-70 uppercase mt-3 tracking-widest">100% Verified Impact</p>
                  </div>
                </div>
                <div className="p-10 rounded-[3.5rem] bg-white dark:bg-white/5 border border-secondary dark:border-white/5 flex flex-col sm:flex-row items-center justify-between shadow-sm gap-6 sm:gap-0">
                   <div className="space-y-1 text-center sm:text-left">
                     <h4 className="text-lg font-black text-primary tracking-tight">Current Draw Pool</h4>
                     <p className="text-[11px] font-black text-accent uppercase tracking-[0.3em]">Live Status: $45,200</p>
                   </div>
                   <Link href="/dashboard" className="w-full sm:w-auto">
                     <Button className="w-full sm:w-auto rounded-full bg-primary text-white px-8 h-12 font-black uppercase text-[10px] tracking-widest shadow-xl shadow-primary/20">Join Pool</Button>
                   </Link>
                </div>
             </div>
          </motion.div>
        </div>
      </main>

      <footer className="container mx-auto px-6 py-16 border-t border-secondary dark:border-white/5 mt-20 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div className="flex items-center gap-3">
           <Zap size={24} className="text-primary fill-primary" />
           <span className="text-[11px] font-black uppercase tracking-[0.5em] text-primary">GOCHARITY ENGINE v2.5</span>
        </div>
        <div className="flex gap-8 lg:gap-12 flex-wrap justify-center">
          {["Privacy", "Governance", "Support"].map(l => (
            <Link key={l} href="#" className="text-[11px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">{l}</Link>
          ))}
        </div>
      </footer>
    </div>
  )
}