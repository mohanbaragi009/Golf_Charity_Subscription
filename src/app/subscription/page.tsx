"use client"

import * as React from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, CreditCard, Timer, ShieldCheck, Sparkles, Zap, MessageSquare, FileText, UserCheck, ZapIcon } from "lucide-react"
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
    features: [
      "1 Monthly Express Draw",
      "Standard Verification",
      "5% Direct Contribution",
      "Live Performance Feed"
    ]
  },
  {
    name: "Pro Eagle",
    monthlyPrice: "24.99",
    yearlyPrice: "239.90",
    description: "The most popular tier for active golfers.",
    features: [
      "5 Express Draw Entries",
      "10m AI Analysis Sync",
      "15% Direct Contribution",
      "Priority Queue Access",
      "Verified Pro Badge"
    ],
    popular: true
  },
  {
    name: "Elite Albatross",
    monthlyPrice: "49.99",
    yearlyPrice: "479.90",
    description: "Ultimate speed and maximum impact.",
    features: [
      "20 Express Draw Entries",
      "Instant AI Coaching",
      "25% Direct Contribution",
      "VIP Payout Expediting",
      "Elite Performance Gear"
    ]
  }
]

export default function Subscriptions() {
  const { toast } = useToast()
  const [currentPlan, setCurrentPlan] = React.useState("Pro Eagle")
  const [billingCycle, setBillingCycle] = React.useState<"monthly" | "yearly">("monthly")

  const handleSubscribe = (name: string) => {
    setCurrentPlan(name)
    toast({
      title: "Plan Activated!",
      description: `${name} (${billingCycle}) is now live. Speed is yours.`,
    })
  }

  return (
    <AppLayout>
      <div className="space-y-24 pb-20">
        <div className="text-center max-w-3xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full">
            <Zap size={14} className="text-accent fill-accent" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Exclusive Access</span>
          </div>
          <h1 className="text-6xl font-black text-primary tracking-tighter">Choose Your Speed</h1>
          <p className="text-muted-foreground text-xl font-bold leading-relaxed">
            Flexible membership tiers designed for high-frequency impact and performance.
          </p>
          
          <div className="flex justify-center pt-6">
            <Tabs defaultValue="monthly" className="w-auto" onValueChange={(v) => setBillingCycle(v as any)}>
              <TabsList className="bg-secondary p-1.5 rounded-full border border-primary/10 h-16 inline-flex">
                <TabsTrigger value="monthly" className="rounded-full px-12 h-full data-[state=active]:bg-primary data-[state=active]:text-white font-black uppercase text-[10px] tracking-widest transition-all">Monthly</TabsTrigger>
                <TabsTrigger value="yearly" className="rounded-full px-12 h-full data-[state=active]:bg-primary data-[state=active]:text-white font-black uppercase text-[10px] tracking-widest transition-all flex items-center gap-2">
                  Yearly <span className="bg-accent text-white px-2 py-0.5 rounded-md text-[8px]">-20%</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-stretch">
          {PLANS.map((plan) => (
            <Card 
              key={plan.name} 
              className={cn(
                "relative flex flex-col h-full border-none transition-all duration-500 rounded-[3.5rem] group overflow-hidden",
                plan.popular 
                  ? "bg-primary text-white shadow-2xl shadow-primary/30 scale-105 z-10" 
                  : "bg-white border-2 border-secondary shadow-xl hover:border-primary/20 hover:translate-y-[-10px]"
              )}
            >
              <CardHeader className="p-10 space-y-6">
                <div className="flex items-center justify-between">
                  <Badge className={cn("rounded-full px-4 py-1.5 font-black uppercase text-[9px] border-none tracking-widest", plan.popular ? "bg-accent text-white" : "bg-primary/10 text-primary")}>
                    {plan.name}
                  </Badge>
                  {plan.popular && <Zap className="text-accent fill-accent" size={20} />}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black tracking-tighter">
                    ${billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                  </span>
                  <span className={cn("text-xs font-black uppercase tracking-widest opacity-60", plan.popular ? "text-white" : "text-muted-foreground")}>/{billingCycle === "monthly" ? "mo" : "yr"}</span>
                </div>
                <CardDescription className={cn("text-sm font-bold leading-relaxed", plan.popular ? "text-white/80" : "text-muted-foreground/80")}>
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 px-10 pb-10 space-y-8">
                <div className={cn("h-px w-full", plan.popular ? "bg-white/20" : "bg-secondary")} />
                <ul className="space-y-5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-4 text-sm">
                      <div className={cn("rounded-full p-1.5 shadow-sm", plan.popular ? "bg-white/10 text-accent" : "bg-primary/10 text-primary")}>
                        <Check size={14} strokeWidth={4} />
                      </div>
                      <span className="font-black uppercase text-[10px] tracking-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-10 pb-14">
                <Button 
                  className={cn(
                    "w-full h-16 rounded-[2rem] font-black uppercase tracking-widest text-[11px] shadow-2xl transition-all hover:scale-[1.05] active:scale-[0.98]",
                    plan.popular 
                      ? "bg-white text-primary hover:bg-white/90" 
                      : "bg-primary text-white hover:bg-primary/90"
                  )}
                  onClick={() => handleSubscribe(plan.name)}
                >
                  {plan.name === currentPlan ? "Current Plan" : "Upgrade Express"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
           {[
             { icon: ZapIcon, title: "Instant Access", desc: "Digital verification in under 10 minutes." },
             { icon: Timer, title: "Rapid Payout", desc: "Prizes settled within 24 hours of selection." },
             { icon: ShieldCheck, title: "Impact Verified", desc: "Blockchain-backed social impact receipts." },
           ].map((item, idx) => (
             <div key={idx} className="p-12 rounded-[3.5rem] bg-secondary/50 border border-primary/5 text-center space-y-6">
                <div className="w-16 h-16 rounded-[2rem] bg-white flex items-center justify-center text-primary mx-auto shadow-sm">
                  <item.icon size={32} />
                </div>
                <h4 className="text-2xl font-black text-primary tracking-tighter">{item.title}</h4>
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest leading-loose">{item.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </AppLayout>
  )
}
