"use client"

import * as React from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Timer, ShieldCheck, Zap, ZapIcon, ClipboardList, Eye, Play, UploadCloud } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const PLANS = [
  {
    name: "Basic Birdie",
    monthlyPrice: "9.99",
    yearlyPrice: "95.90",
    description: "Essential impact for casual players.",
    features: ["1 Monthly Express Draw", "Standard Verification", "5% Contribution", "Live Feed"]
  },
  {
    name: "Pro Eagle",
    monthlyPrice: "24.99",
    yearlyPrice: "239.90",
    description: "The most popular tier for active golfers.",
    features: ["5 Express Entries", "10m AI Analysis", "15% Contribution", "Priority Queue", "Verified Badge"],
    popular: true
  },
  {
    name: "Elite Albatross",
    monthlyPrice: "49.99",
    yearlyPrice: "479.90",
    description: "Ultimate speed and maximum impact.",
    features: ["20 Express Entries", "Instant AI Coaching", "25% Contribution", "VIP Expediting", "Elite Performance Gear"]
  }
]

const ONBOARDING_WORKFLOW = [
  { step: 1, title: "Onboarding", desc: "Profile setup and handicap verification protocol.", icon: ClipboardList, tags: ["ID Setup", "Verification"] },
  { step: 2, title: "Integration", desc: "AI engine connects to your performance logs.", icon: Eye, tags: ["AI Sync", "Data Map"] },
  { step: 3, title: "Verification", desc: "Real-time audit of golf rounds and impact.", icon: Play, tags: ["Round Audit", "Impact Check"] },
  { step: 4, title: "Activation", desc: "Full pool eligibility and VIP impact status.", icon: UploadCloud, tags: ["Pool Active", "Live Status"] }
]

export default function Subscriptions() {
  const { toast } = useToast()
  const [currentPlan, setCurrentPlan] = React.useState("Pro Eagle")
  const [billingCycle, setBillingCycle] = React.useState<"monthly" | "yearly">("monthly")

  return (
    <AppLayout>
      <div className="space-y-28 pb-32">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="inline-flex items-center gap-3 px-6 py-2.5 bg-primary/5 rounded-full border border-primary/10">
            <Zap size={18} className="text-accent fill-accent" />
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-primary">GoCharity Membership</span>
          </motion.div>
          <h1 className="text-8xl font-black text-primary tracking-tighter">Scale Your Impact.</h1>
          <p className="text-muted-foreground text-2xl font-bold leading-relaxed max-w-2xl mx-auto">
            Flexible membership tiers designed for high-frequency golf activity and verified social impact.
          </p>
          
          <div className="flex justify-center pt-8">
            <Tabs defaultValue="monthly" className="w-auto" onValueChange={(v) => setBillingCycle(v as any)}>
              <TabsList className="bg-secondary p-2 rounded-full border border-primary/5 h-20 inline-flex shadow-inner">
                <TabsTrigger value="monthly" className="rounded-full px-16 h-full data-[state=active]:bg-primary data-[state=active]:text-white font-black uppercase text-[11px] tracking-[0.3em] transition-all">Monthly</TabsTrigger>
                <TabsTrigger value="yearly" className="rounded-full px-16 h-full data-[state=active]:bg-primary data-[state=active]:text-white font-black uppercase text-[11px] tracking-[0.3em] transition-all flex items-center gap-3">
                  Yearly <Badge className="bg-accent text-white border-none text-[9px] px-2 py-0.5">-20%</Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-stretch">
          {PLANS.map((plan) => (
            <Card key={plan.name} className={cn("relative flex flex-col h-full border-none transition-all duration-700 rounded-[4.5rem] group overflow-hidden", plan.popular ? "bg-primary text-white shadow-[0_50px_100px_rgba(147,51,234,0.3)] scale-105 z-10" : "bg-white border-2 border-secondary shadow-2xl hover:translate-y-[-15px]")}>
              <CardHeader className="p-14 space-y-8">
                <div className="flex items-center justify-between">
                  <Badge className={cn("rounded-full px-5 py-2 font-black uppercase text-[10px] border-none tracking-widest shadow-lg", plan.popular ? "bg-accent text-white" : "bg-primary/10 text-primary")}>
                    {plan.name}
                  </Badge>
                  {plan.popular && <Zap className="text-accent fill-accent animate-pulse" size={24} />}
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-7xl font-black tracking-tighter">
                    ${billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                  </span>
                  <span className={cn("text-xs font-black uppercase tracking-[0.2em] opacity-60", plan.popular ? "text-white" : "text-muted-foreground")}>/{billingCycle === "monthly" ? "mo" : "yr"}</span>
                </div>
                <CardDescription className={cn("text-base font-bold leading-relaxed", plan.popular ? "text-white/80" : "text-muted-foreground/80")}>
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 px-14 pb-14 space-y-10">
                <div className={cn("h-px w-full", plan.popular ? "bg-white/20" : "bg-secondary")} />
                <ul className="space-y-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-5 text-sm">
                      <div className={cn("rounded-full p-2 shadow-inner", plan.popular ? "bg-white/10 text-accent" : "bg-primary/5 text-primary")}>
                        <Check size={16} strokeWidth={4} />
                      </div>
                      <span className="font-black uppercase text-[11px] tracking-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-14 pb-20 flex justify-center">
                <button className="bull-button" onClick={() => toast({ title: "Express Active!", description: `${plan.name} protocol engaged.` })}>
                  {plan.name === currentPlan ? "Current" : "Upgrade"}
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Workflow Timeline */}
        <div className="relative pt-20">
          <div className="text-center mb-24">
             <h3 className="text-4xl font-black text-primary tracking-tighter">Member Journey</h3>
             <p className="text-[11px] font-black uppercase tracking-[0.6em] text-muted-foreground mt-3 opacity-40">Express Onboarding Protocol</p>
          </div>
          <div className="relative max-w-5xl mx-auto px-6">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-primary/5 hidden md:block" />
            <div className="space-y-32">
              {ONBOARDING_WORKFLOW.map((item, idx) => (
                <div key={idx} className={cn("relative flex items-center justify-center md:justify-start", idx % 2 === 1 ? "md:justify-end" : "")}>
                  <div className="absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-[1.5rem] bg-white border-4 border-primary/10 flex items-center justify-center z-10 hidden md:flex shadow-2xl">
                    <item.icon size={24} className="text-primary" />
                  </div>
                  <motion.div initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className={cn("w-full md:w-[42%] glass-card p-12 space-y-6 hover:scale-105 transition-all group")}>
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-2xl text-primary tracking-tight">{item.title}</h4>
                      <Badge className="bg-primary text-white border-none text-[9px] font-black px-3 py-1 rounded-lg">STEP {item.step}</Badge>
                    </div>
                    <p className="text-sm font-bold text-muted-foreground/80 leading-relaxed uppercase tracking-widest">{item.desc}</p>
                    <div className="flex flex-wrap gap-3 pt-4">
                      {item.tags.map((tag, tIdx) => (
                        <div key={tIdx} className="px-3 py-1.5 rounded-xl border border-primary/10 bg-primary/5 text-[9px] font-black uppercase tracking-[0.2em] text-primary/40 group-hover:text-primary transition-colors">{tag}</div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}