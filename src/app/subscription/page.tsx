"use client"

import * as React from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Trophy, Heart, Gift, CreditCard, Star, Timer } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const PLANS = [
  {
    name: "Basic Birdie",
    monthlyPrice: "9.99",
    yearlyPrice: "95.90",
    description: "Perfect for casual players looking to contribute.",
    features: [
      "Monthly Prize Draw entry (1x)",
      "Standard Performance Tracking",
      "5% Charity Allocation",
      "Verified Score Entry"
    ]
  },
  {
    name: "Pro Eagle",
    monthlyPrice: "24.99",
    yearlyPrice: "239.90",
    description: "Our most popular plan for active golfers.",
    features: [
      "Monthly Prize Draw entries (5x)",
      "Advanced AI Insights",
      "15% Charity Allocation",
      "Priority Support",
      "Special Member Badge"
    ],
    popular: true
  },
  {
    name: "Elite Albatross",
    monthlyPrice: "49.99",
    yearlyPrice: "479.90",
    description: "Ultimate benefits for dedicated players.",
    features: [
      "Monthly Prize Draw entries (15x)",
      "Exclusive High-Value Draws",
      "25% Charity Allocation",
      "One-on-one AI Coaching",
      "Custom Apparel Discounts"
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
      title: "Plan Updated",
      description: `You are now subscribed to the ${name} ${billingCycle} plan.`,
    })
  }

  return (
    <AppLayout>
      <div className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h1 className="text-4xl font-bold text-primary">Subscription & Payment</h1>
          <p className="text-muted-foreground text-lg">
            Choose a plan to unlock full platform features. All payments are secured via Stripe.
          </p>
          
          <div className="flex justify-center pt-4">
            <Tabs defaultValue="monthly" className="w-auto" onValueChange={(v) => setBillingCycle(v as any)}>
              <TabsList className="bg-white p-1 rounded-2xl border border-border shadow-sm h-12">
                <TabsTrigger value="monthly" className="rounded-xl px-8 h-full data-[state=active]:bg-primary data-[state=active]:text-white">Monthly</TabsTrigger>
                <TabsTrigger value="yearly" className="rounded-xl px-8 h-full data-[state=active]:bg-primary data-[state=active]:text-white">Yearly (Save 20%)</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {PLANS.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative flex flex-col h-full overflow-hidden border-2 transition-all duration-300 rounded-[2.5rem] ${
                plan.popular 
                  ? "border-primary shadow-2xl shadow-primary/10 scale-105 z-10" 
                  : "border-transparent bg-white shadow-xl shadow-primary/5 hover:border-primary/20"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 left-0 bg-primary text-white text-center py-2 text-[10px] font-bold uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              <CardHeader className={plan.popular ? "pt-10" : ""}>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-primary/5 text-primary hover:bg-primary/10 border-none font-bold">
                    {plan.name}
                  </Badge>
                  {plan.name === currentPlan && (
                    <Badge className="bg-accent text-primary font-bold">Active</Badge>
                  )}
                </div>
                <div className="flex items-baseline gap-1 mt-4">
                  <span className="text-4xl font-bold">
                    ${billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                  </span>
                  <span className="text-muted-foreground text-sm">/{billingCycle === "monthly" ? "mo" : "yr"}</span>
                </div>
                <CardDescription className="mt-4 text-sm leading-relaxed min-h-[48px]">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <div className="rounded-full bg-green-100 p-1 text-green-600 mt-0.5">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      <span className="font-medium text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-6 pb-8 px-8">
                <Button 
                  className={`w-full h-14 rounded-2xl font-bold text-lg transition-all ${
                    plan.name === currentPlan 
                      ? "bg-muted text-muted-foreground cursor-default hover:bg-muted" 
                      : "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
                  }`}
                  onClick={() => handleSubscribe(plan.name)}
                  disabled={plan.name === currentPlan}
                >
                  {plan.name === currentPlan ? "Subscribed" : "Choose Plan"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-[3rem] p-12 shadow-xl shadow-primary/5 grid grid-cols-1 md:grid-cols-3 gap-8 border border-primary/5">
           <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-primary mb-4">
                <CreditCard size={24} />
              </div>
              <h4 className="font-bold mb-2">Secure Payments</h4>
              <p className="text-xs text-muted-foreground">Stripe PCI-compliant gateway for all transactions.</p>
           </div>
           <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-primary mb-4">
                <Timer size={24} />
              </div>
              <h4 className="font-bold mb-2">Smart Lifecycle</h4>
              <p className="text-xs text-muted-foreground">Automatic renewals and grace periods for lapsed subs.</p>
           </div>
           <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-primary mb-4">
                <ShieldCheck size={24} />
              </div>
              <h4 className="font-bold mb-2">Instant Validation</h4>
              <p className="text-xs text-muted-foreground">Real-time status check on every platform request.</p>
           </div>
        </div>
      </div>
    </AppLayout>
  )
}

function ShieldCheck(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
