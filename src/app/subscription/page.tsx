
"use client"

import * as React from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Trophy, Heart, Gift, CreditCard, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const PLANS = [
  {
    name: "Basic Birdie",
    price: "9.99",
    description: "Perfect for casual players looking to contribute.",
    features: [
      "Monthly Prize Draw entry (1x)",
      "Standard Performance Tracking",
      "5% Charity Allocation",
      "Verified Score Entry"
    ],
    popular: false
  },
  {
    name: "Pro Eagle",
    price: "24.99",
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
    price: "49.99",
    description: "Ultimate benefits for dedicated players.",
    features: [
      "Monthly Prize Draw entries (15x)",
      "Exclusive High-Value Draws",
      "25% Charity Allocation",
      "One-on-one AI Coaching",
      "Custom Apparel Discounts"
    ],
    popular: false
  }
]

export default function Subscriptions() {
  const { toast } = useToast()
  const [currentPlan, setCurrentPlan] = React.useState("Pro Eagle")

  const handleSubscribe = (name: string) => {
    setCurrentPlan(name)
    toast({
      title: "Plan Updated",
      description: `You are now subscribed to the ${name} plan.`,
    })
  }

  return (
    <AppLayout>
      <div className="space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-4">Support & Play</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Choose a plan that fits your lifestyle. A portion of every subscription goes directly to your chosen charity.
          </p>
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
                <div className="absolute top-0 right-0 left-0 bg-primary text-white text-center py-2 text-xs font-bold uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              <CardHeader className={plan.popular ? "pt-10" : ""}>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/10 border-none font-bold">
                    {plan.name}
                  </Badge>
                  {plan.name === currentPlan && (
                    <Badge className="bg-accent text-primary font-bold">Current</Badge>
                  )}
                </div>
                <div className="flex items-baseline gap-1 mt-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
                <CardDescription className="mt-4 text-sm leading-relaxed h-12">
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
                      ? "bg-secondary text-primary hover:bg-secondary cursor-default" 
                      : "bg-primary text-white hover:bg-primary/90 hover:shadow-lg active:scale-[0.98]"
                  }`}
                  onClick={() => handleSubscribe(plan.name)}
                  disabled={plan.name === currentPlan}
                >
                  {plan.name === currentPlan ? "Your Active Plan" : "Upgrade Plan"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-[3rem] p-12 shadow-xl shadow-primary/5 flex flex-col md:flex-row items-center gap-12 border border-primary/5">
          <div className="w-24 h-24 bg-accent/20 rounded-[2rem] flex items-center justify-center text-primary shrink-0">
             <Star size={48} className="fill-accent" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">Yearly Membership Bonus</h3>
            <p className="text-muted-foreground mb-4">Switch to annual billing and save 20% on your subscription, plus get 50 bonus prize draw entries instantly.</p>
            <Button variant="outline" className="border-2 border-primary text-primary font-bold rounded-xl h-12 px-8 hover:bg-primary hover:text-white">
              Switch to Annual
            </Button>
          </div>
          <div className="flex items-center gap-6 shrink-0 border-l border-border pl-12 hidden lg:flex">
             <div className="text-center">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Secure Payments</p>
                <div className="flex gap-2">
                  <CreditCard size={20} className="text-muted-foreground" />
                  <span className="text-sm font-bold opacity-30">STRIPE / PAYPAL</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
