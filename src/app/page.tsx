"use client"

import * as React from "react"
import Link from "next/link"
import { Trophy, Heart, Sparkles, Target, ArrowRight, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function LandingPage() {
  const [pixels, setPixels] = React.useState<{id: number, top: string, left: string, delay: string}[]>([])

  React.useEffect(() => {
    const newPixels = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`
    }))
    setPixels(newPixels)
  }, [])

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Design Elements: Glowing Particles and Streaks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="light-streak top-[15%] right-[-5%] opacity-20" />
        <div className="light-streak bottom-[20%] left-[-10%] opacity-15" />
        
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

        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <header className="container mx-auto px-6 py-8 flex items-center justify-between relative z-10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-primary/90 p-2.5 rounded-2xl text-white group-hover:rotate-12 transition-all duration-500 shadow-xl shadow-primary/20">
            <Trophy size={28} />
          </div>
          <div className="flex flex-col">
            <span className="font-headline text-3xl font-bold text-primary leading-none">Golf</span>
            <span className="font-headline text-xs font-black text-muted-foreground uppercase tracking-widest opacity-70">Charity Platform</span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" className="font-bold text-primary hover:bg-gray-50 rounded-xl px-6">Login</Button>
          </Link>
          <Link href="/subscription">
            <Button className="bg-primary text-white font-black uppercase tracking-widest rounded-xl px-8 shadow-xl shadow-primary/20 hover:scale-[1.05] transition-transform">
              Join Now
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <section className="py-20 lg:py-32 flex flex-col items-center text-center space-y-10">
          <Badge className="bg-primary/5 text-primary border-primary/20 px-6 py-2 rounded-full font-black uppercase tracking-[0.3em] text-[10px] animate-in fade-in slide-in-from-bottom-4 duration-700">
            Beyond the Fairway
          </Badge>
          <h1 className="text-6xl md:text-8xl font-black text-primary tracking-tighter max-w-4xl leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Play with <span className="text-accent italic">Purpose.</span> Win for <span className="text-foreground">Impact.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground/80 font-medium max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
            The world's first golf performance platform where your verified scores drive global charitable funding. Level up your game and unlock exclusive rewards.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 pt-6 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
            <Link href="/subscription">
              <Button size="lg" className="h-16 px-12 bg-primary text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-all">
                Start Impacting <ArrowRight size={20} className="ml-3" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="h-16 px-12 rounded-2xl border-gray-200 bg-white/40 backdrop-blur-md font-bold text-primary hover:bg-white/60">
                Explore Dashboard
              </Button>
            </Link>
          </div>
        </section>

        {/* Impact Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-20">
          {[
            { 
              icon: Target, 
              title: "Verified Scores", 
              desc: "Record Stableford points from any course. Verified by AI for fair draw eligibility." 
            },
            { 
              icon: Heart, 
              title: "Social Impact", 
              desc: "A significant portion of your subscription fuels clean water, education, and reforestation." 
            },
            { 
              icon: Gift, 
              title: "Premium Rewards", 
              desc: "Monthly draws for high-performance gear and once-in-a-lifetime golf experiences." 
            }
          ].map((feature, i) => (
            <div key={i} className="glass-card p-10 rounded-[3rem] space-y-6 hover:scale-[1.05] transition-all duration-500 group">
              <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                <feature.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold text-primary tracking-tight">{feature.title}</h3>
              <p className="text-sm font-medium text-muted-foreground/70 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </section>

        {/* Secondary CTA */}
        <section className="py-20">
          <div className="bg-primary rounded-[4rem] p-12 md:p-24 relative overflow-hidden text-center space-y-8 shadow-2xl shadow-primary/20">
            <Sparkles className="absolute top-[-20px] right-[-20px] w-64 h-64 opacity-5" />
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter max-w-2xl mx-auto">Ready to drive meaningful change?</h2>
            <p className="text-white/70 text-lg font-medium max-w-xl mx-auto">Join a community of impact-driven golfers and start winning prizes while supporting the causes you care about.</p>
            <Link href="/subscription" className="inline-block pt-6">
              <Button className="h-16 px-12 bg-accent text-primary font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-accent/20 hover:scale-[1.05] transition-all">
                Join the Elite Albatross
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-6 py-12 border-t border-gray-100 mt-20 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 opacity-60">
        <p className="text-[10px] font-black uppercase tracking-widest text-primary">© 2024 Golf Charity Platform. All Rights Reserved.</p>
        <div className="flex gap-8">
          <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-primary hover:opacity-100 transition-opacity">Privacy Policy</Link>
          <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-primary hover:opacity-100 transition-opacity">Terms of Service</Link>
          <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-primary hover:opacity-100 transition-opacity">Governance</Link>
        </div>
      </footer>
    </div>
  )
}
