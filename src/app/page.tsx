"use client"

import * as React from "react"
import Link from "next/link"
import { Trophy, Heart, Sparkles, Target, ArrowRight, Zap, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden font-sans">
      {/* Design Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-accent/10 rounded-full blur-[80px]" />
      </div>

      <header className="container mx-auto px-6 py-8 flex items-center justify-between relative z-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-primary p-2.5 rounded-[1rem] text-white shadow-xl shadow-primary/20">
            <Zap size={28} className="fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-black text-primary leading-none tracking-tighter">ZEPTO</span>
            <span className="text-[10px] font-black text-accent uppercase tracking-[0.3em]">IMPACT</span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" className="font-black text-[11px] uppercase tracking-widest text-primary">Login</Button>
          </Link>
          <Link href="/subscription">
            <Button className="bg-primary text-white font-black uppercase tracking-widest rounded-full px-8 h-12 shadow-xl shadow-primary/20 hover:bg-primary/90">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 relative z-10 pt-16 lg:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full border border-primary/10">
              <Timer size={16} className="text-accent" />
              <span className="text-[10px] font-black text-primary uppercase tracking-widest">Impact in 10 Minutes</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-primary tracking-tighter leading-[0.9] lg:max-w-xl">
              Verified Play. <span className="text-accent italic">Instant</span> Results.
            </h1>
            <p className="text-xl text-muted-foreground font-bold leading-relaxed lg:max-w-md">
              The world's fastest golf performance platform. Verified scores, instant prizes, and express charity impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <Link href="/subscription">
                <Button size="lg" className="h-16 px-12 bg-primary text-white font-black uppercase tracking-[0.1em] rounded-3xl shadow-2xl shadow-primary/30 text-lg">
                  Join The Club <ArrowRight size={20} className="ml-3" />
                </Button>
              </Link>
              <div className="flex items-center gap-4 px-8 border-2 border-primary/10 rounded-3xl bg-white/50 backdrop-blur-md">
                 <div className="flex -space-x-3">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-secondary flex items-center justify-center font-black text-primary text-[10px]">P{i}</div>
                   ))}
                 </div>
                 <span className="text-[10px] font-black uppercase text-primary/60 tracking-widest">12k+ Impactors</span>
              </div>
            </div>
          </div>

          <div className="relative">
             <div className="absolute inset-0 bg-primary/5 rounded-[4rem] blur-[60px]" />
             <div className="relative glass-card p-12 space-y-10 border-2 border-white bg-white/40 shadow-2xl">
                <div className="grid grid-cols-2 gap-8">
                  <div className="p-8 rounded-[2rem] bg-white shadow-xl shadow-black/[0.02] border border-secondary">
                     <Zap size={32} className="text-accent mb-4 fill-accent" />
                     <h3 className="text-2xl font-black text-primary">Fast</h3>
                     <p className="text-[10px] font-bold text-muted-foreground uppercase mt-2">10m Verification</p>
                  </div>
                  <div className="p-8 rounded-[2rem] bg-primary text-white shadow-xl shadow-primary/20">
                     <Heart size={32} className="text-white mb-4 fill-white" />
                     <h3 className="text-2xl font-black">Direct</h3>
                     <p className="text-[10px] font-bold opacity-70 uppercase mt-2">100% Verified Impact</p>
                  </div>
                </div>
                <div className="p-10 rounded-[2.5rem] bg-white border border-secondary flex items-center justify-between">
                   <div className="space-y-1">
                     <h4 className="text-sm font-black text-primary tracking-tight">Express Draw Pool</h4>
                     <p className="text-[10px] font-bold text-accent uppercase tracking-widest">Live Now: $45,200</p>
                   </div>
                   <Button className="rounded-full bg-accent text-white px-6 font-black uppercase text-[10px]">Enter</Button>
                </div>
             </div>
          </div>
        </div>

        <section className="py-32 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: Target, title: "Precision Track", color: "primary" },
            { icon: Sparkles, title: "Elite Perks", color: "accent" },
            { icon: Timer, title: "Rapid Payouts", color: "primary" },
          ].map((f, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="p-10 rounded-[3.5rem] bg-white shadow-2xl shadow-black/[0.03] border border-secondary space-y-6">
              <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center", f.color === 'primary' ? 'bg-primary/5 text-primary' : 'bg-accent/5 text-accent')}>
                <f.icon size={32} />
              </div>
              <h3 className="text-2xl font-black text-primary tracking-tighter">{f.title}</h3>
              <p className="text-sm font-bold text-muted-foreground/70 leading-relaxed uppercase tracking-widest">
                Optimized performance metrics designed for high-frequency golf activity.
              </p>
            </motion.div>
          ))}
        </section>
      </main>

      <footer className="container mx-auto px-6 py-12 border-t border-secondary mt-20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
           <Zap size={20} className="text-primary fill-primary" />
           <span className="text-[10px] font-black uppercase tracking-widest text-primary">ZEPTO IMPACT ENGINE v2.0</span>
        </div>
        <div className="flex gap-8">
          {["Privacy", "Terms", "Support"].map(l => (
            <Link key={l} href="#" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">{l}</Link>
          ))}
        </div>
      </footer>
    </div>
  )
}
