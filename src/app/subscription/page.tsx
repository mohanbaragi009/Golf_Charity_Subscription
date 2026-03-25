"use client"

import * as React from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Trophy, Heart, Gift, CreditCard, Star, Timer, ShieldCheck, Sparkles, Zap, MessageSquare, ClipboardCheck, FileText, UserCheck } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const PLANS = [
  {
    name: "Basic Birdie",
    monthlyPrice: "9.99",
    yearlyPrice: "95.90",
    description: "Ideal for casual golfers making their first mark on social impact.",
    features: [
      "1 Monthly Draw Entry",
      "Core Performance Tracking",
      "5% Charity Contribution",
      "Standard Verification"
    ]
  },
  {
    name: "Pro Eagle",
    monthlyPrice: "24.99",
    yearlyPrice: "239.90",
    description: "The gold standard for dedicated players seeking deep insights.",
    features: [
      "5 Monthly Draw Entries",
      "Advanced AI Performance Engine",
      "15% Charity Contribution",
      "Priority Verification Queue",
      "Exclusive Pro Badge"
    ],
    popular: true
  },
  {
    name: "Elite Albatross",
    monthlyPrice: "49.99",
    yearlyPrice: "479.90",
    description: "Ultimate access for those driving maximum impact and performance.",
    features: [
      "15 Monthly Draw Entries",
      "High-Value VIP Draws",
      "25% Charity Contribution",
      "Unlimited AI Coaching",
      "Custom Performance Apparel"
    ]
  }
]

const LIFECYCLE_STEPS = [
  {
    step: 1,
    title: "Onboarding & Selection",
    description: "Choose your membership tier and designate your primary charity foundation. Your vision drives our collective impact.",
    icon: MessageSquare,
    tags: ["Plan Selection", "Charity Setup", "Identity Link"],
    align: "left"
  },
  {
    step: 2,
    title: "Score Verification",
    description: "Submit your Stableford scores through our verified registry. Our AI engine validates every round to ensure fair play.",
    icon: FileText,
    tags: ["AI Validation", "Handicap Check", "Data Integrity"],
    align: "right"
  },
  {
    step: 3,
    title: "Monthly Draw Engine",
    description: "Automatic entry into our premium draws. Winners are selected using transparent algorithmic strategies.",
    icon: Zap,
    tags: ["Automatic Entry", "Weighting", "Prize Payout"],
    align: "left"
  },
  {
    step: 4,
    title: "Verified Impact",
    description: "Receive your quarterly impact report. See exactly how your subscription funded clean water or education projects.",
    icon: UserCheck,
    tags: ["Social Impact", "NGO Verified", "Global Reach"],
    align: "right"
  }
]

export default function Subscriptions() {
  const { toast } = useToast()
  const [currentPlan, setCurrentPlan] = React.useState("Pro Eagle")
  const [billingCycle, setBillingCycle] = React.useState<"monthly" | "yearly">("monthly")

  const handleSubscribe = (name: string) => {
    setCurrentPlan(name)
    toast({
      title: "Subscription Updated",
      description: `Plan switched to ${name} (${billingCycle}). Welcome to the inner circle.`,
    })
  }

  return (
    <AppLayout>
      <div className="space-y-24 pb-20">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <Badge className="bg-primary/5 text-primary border-primary/20 px-6 py-2 rounded-full font-black uppercase tracking-[0.3em] text-[10px] mb-4">Membership Access</Badge>
          <h1 className="text-5xl font-bold text-primary tracking-tighter">Premium Membership</h1>
          <p className="text-muted-foreground text-lg font-medium leading-relaxed">
            Elevate your golfing experience while driving global change. Secure, verified, and high-impact.
          </p>
          
          <div className="flex justify-center pt-8">
            <Tabs defaultValue="monthly" className="w-auto" onValueChange={(v) => setBillingCycle(v as any)}>
              <TabsList className="bg-white/40 backdrop-blur-md p-1.5 rounded-[2rem] border border-white/60 shadow-xl h-16 inline-flex">
                <TabsTrigger value="monthly" className="rounded-3xl px-12 h-full data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-xl font-bold transition-all">Monthly</TabsTrigger>
                <TabsTrigger value="yearly" className="rounded-3xl px-12 h-full data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-xl font-bold transition-all flex items-center gap-2">
                  Yearly <span className="text-[10px] font-black uppercase bg-accent text-primary px-2 py-0.5 rounded-md">-20%</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch">
          {PLANS.map((plan) => (
            <Card 
              key={plan.name} 
              className={cn(
                "relative flex flex-col h-full overflow-hidden border-2 transition-all duration-700 rounded-[3.5rem] group",
                plan.popular 
                  ? "border-primary bg-white/60 backdrop-blur-xl shadow-2xl shadow-primary/10 scale-105 z-10" 
                  : "border-white/40 bg-white/30 backdrop-blur-lg shadow-xl hover:border-primary/20 hover:scale-[1.02]"
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 left-0 bg-primary text-white text-center py-2.5 text-[9px] font-black uppercase tracking-[0.4em] shadow-lg">
                  Curated Selection
                </div>
              )}
              <CardHeader className={cn("p-10", plan.popular ? "pt-14" : "")}>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary" className="bg-primary/5 text-primary border-none font-black uppercase tracking-widest text-[9px] px-3 py-1.5 rounded-lg">
                    {plan.name}
                  </Badge>
                  {plan.name === currentPlan && (
                    <div className="flex items-center gap-2 text-accent bg-primary px-3 py-1.5 rounded-full shadow-lg">
                       <Sparkles size={12} />
                       <span className="text-[9px] font-black uppercase tracking-widest">Selected</span>
                    </div>
                  )}
                </div>
                <div className="flex items-baseline gap-2 mt-6">
                  <span className="text-5xl font-black text-primary tracking-tighter">
                    ${billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                  </span>
                  <span className="text-muted-foreground font-bold text-sm uppercase tracking-widest opacity-50">/{billingCycle === "monthly" ? "mo" : "yr"}</span>
                </div>
                <CardDescription className="mt-6 text-sm font-medium leading-relaxed min-h-[64px] text-muted-foreground/80">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 px-10 pb-10">
                <div className="space-y-5">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-50">Included Features</p>
                  <ul className="space-y-5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-4 text-sm">
                        <div className="rounded-full bg-primary/10 p-1.5 text-primary mt-0.5 shadow-inner">
                          <Check size={12} strokeWidth={4} />
                        </div>
                        <span className="font-bold text-primary/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="pt-6 pb-12 px-10">
                <Button 
                  className={cn(
                    "w-full h-16 rounded-[2rem] font-black uppercase tracking-[0.2em] text-sm transition-all duration-500",
                    plan.name === currentPlan 
                      ? "bg-muted text-muted-foreground/40 cursor-default" 
                      : "bg-primary text-white hover:bg-primary/90 shadow-2xl shadow-primary/20 hover:scale-[1.03] active:scale-[0.97]"
                  )}
                  onClick={() => handleSubscribe(plan.name)}
                  disabled={plan.name === currentPlan}
                >
                  {plan.name === currentPlan ? "Active Membership" : "Upgrade Plan"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Lifecycle Path Section - Step by Step design */}
        <div className="relative pt-20">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-black text-primary tracking-tighter uppercase">Member Journey</h2>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground opacity-40">System Lifecycle Protocol</p>
          </div>

          <div className="max-w-6xl mx-auto relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/10 -translate-x-1/2 hidden md:block" />

            <div className="space-y-24">
              {LIFECYCLE_STEPS.map((step, idx) => (
                <div key={idx} className={cn("relative flex items-center justify-center md:justify-start", step.align === "right" ? "md:justify-end" : "")}>
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-2 border-primary/20 flex items-center justify-center z-10 hidden md:flex shadow-xl shadow-primary/5">
                    <step.icon size={20} className="text-primary" />
                    <div className="absolute inset-0 rounded-full bg-primary/5 animate-ping opacity-20" />
                  </div>

                  {/* Card content */}
                  <motion.div 
                    initial={{ opacity: 0, x: step.align === "left" ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={cn(
                      "w-full md:w-[45%] glass-card rounded-[3rem] p-10 space-y-6 relative overflow-hidden group",
                      step.align === "left" ? "md:mr-auto" : "md:ml-auto"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-black text-primary tracking-tighter">{step.title}</h3>
                      <Badge className="bg-primary/5 text-primary border-none text-[9px] font-black px-3 py-1 rounded-lg">STEP {step.step}</Badge>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-4">
                      {step.tags.map((tag, tIdx) => (
                        <div key={tIdx} className="px-3 py-1.5 rounded-xl border border-primary/10 bg-white/40 text-[9px] font-black uppercase tracking-widest text-primary/60 hover:bg-primary/5 transition-colors cursor-default">
                          {tag}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white/40 backdrop-blur-2xl rounded-[4rem] p-16 shadow-2xl border border-white/60 grid grid-cols-1 md:grid-cols-3 gap-16 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
           <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 rounded-[2rem] bg-white/60 backdrop-blur-md flex items-center justify-center text-primary mb-2 shadow-xl border border-white/60">
                <CreditCard size={32} />
              </div>
              <h4 className="font-bold text-xl text-primary tracking-tight">Encrypted Checkout</h4>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-relaxed opacity-60">Stripe PCI-DSS certified gateway for maximum protection.</p>
           </div>
           <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 rounded-[2rem] bg-white/60 backdrop-blur-md flex items-center justify-center text-primary mb-2 shadow-xl border border-white/60">
                <Timer size={32} />
              </div>
              <h4 className="font-bold text-xl text-primary tracking-tight">Adaptive Lifecycle</h4>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-relaxed opacity-60">Seamless auto-renewals with smart grace periods for users.</p>
           </div>
           <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 rounded-[2rem] bg-white/60 backdrop-blur-md flex items-center justify-center text-primary mb-2 shadow-xl border border-white/60">
                <ShieldCheck size={32} />
              </div>
              <h4 className="font-bold text-xl text-primary tracking-tight">Instant Validation</h4>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-relaxed opacity-60">Real-time status checks on every draw eligibility request.</p>
           </div>
        </div>
      </div>
    </AppLayout>
  )
}
