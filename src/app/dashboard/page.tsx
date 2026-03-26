"use client"

import * as React from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, TrendingUp, Zap, AlertCircle, Target, History, Timer, Heart, Users, ArrowRight, Sparkles, Crown } from "lucide-react"
import { CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { analyzeGolfPerformance, type AnalyzeGolfPerformanceOutput } from "@/ai/flows/personalized-golf-performance-analysis-flow"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"

const MOCK_DATA = [
  { name: 'Jan', score: 32 },
  { name: 'Feb', score: 35 },
  { name: 'Mar', score: 30 },
  { name: 'Apr', score: 38 },
  { name: 'May', score: 41 },
]

export default function Dashboard() {
  const { toast } = useToast()
  const [aiAnalysis, setAiAnalysis] = React.useState<AnalyzeGolfPerformanceOutput | null>(null)
  const [loading, setLoading] = React.useState(false)

  const fetchAnalysis = async () => {
    setLoading(true)
    try {
      const result = await analyzeGolfPerformance({ stablefordScores: [32, 35, 30, 38, 41], handicap: 14.5 })
      setAiAnalysis(result)
    } catch (e) {
      toast({ variant: "destructive", title: "Sync Error", description: "Could not retrieve AI coaching insights." })
    } finally { setLoading(false) }
  }

  React.useEffect(() => { fetchAnalysis() }, [])

  return (
    <AppLayout>
      <div className="space-y-16 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-6xl font-black text-primary tracking-tighter flex items-center gap-5">
              Performance Hub <Zap className="text-accent fill-accent animate-pulse" size={40} />
            </h1>
            <Badge className="bg-primary text-white border-none text-[10px] font-black px-4 py-1.5 rounded-full tracking-widest uppercase">ELITE VERIFIED</Badge>
          </div>
          <div className="flex items-center gap-6 px-10 py-5 rounded-[2.5rem] bg-secondary dark:bg-white/5 shadow-inner">
             <Timer size={20} className="text-accent" />
             <div className="flex flex-col">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/40 mb-1">Next Sync</span>
               <span className="text-lg font-black text-primary tracking-tighter">08m 42s</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { icon: Trophy, label: "Current handicap", value: "14.5", sub: "-0.4 Last Week" },
            { icon: Target, label: "Express Index", value: "36.4", sub: "Avg Top 5 Rounds" },
            { icon: Zap, label: "Active Entries", value: "12", sub: "Pool Eligibility: YES" },
          ].map((stat, i) => (
            <Card key={i} className="glass-card hover:scale-[1.02] transition-all">
              <CardContent className="p-10 space-y-6">
                <div className="p-4 rounded-[1.5rem] w-fit bg-primary/10 text-primary"><stat.icon size={24} /></div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-50">{stat.label}</p>
                  <h3 className="text-4xl font-black tracking-tighter text-primary truncate">{stat.value}</h3>
                </div>
                <p className="text-[9px] font-black uppercase tracking-widest text-primary/60">{stat.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-12">
            <Card className="glass-card p-6">
              <CardHeader className="p-10"><CardTitle className="text-3xl font-black text-primary tracking-tight">Express Dynamic</CardTitle></CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MOCK_DATA}>
                    <XAxis dataKey="name" hide />
                    <Tooltip />
                    <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary)/0.2)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-5">
            <Card className="glass-card h-full bg-primary/5 border-none p-10 space-y-8">
              <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary/40">AI Analysis</h4>
              {aiAnalysis ? (
                <div className="space-y-6">
                  <p className="italic text-primary/80 font-bold">"{aiAnalysis.summary}"</p>
                  <div className="space-y-4">
                    {aiAnalysis.strengths.slice(0, 2).map((s, i) => (
                      <div key={i} className="flex items-center p-4 rounded-2xl bg-white dark:bg-white/10 text-xs font-black text-primary uppercase"><TrendingUp size={14} className="mr-3 text-accent" />{s}</div>
                    ))}
                  </div>
                </div>
              ) : <div className="animate-pulse h-40 bg-primary/10 rounded-3xl" />}
            </Card>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-1 md:p-1.5 rounded-[4.5rem] bg-gradient-to-r from-primary/30 via-accent/40 to-primary/30 shadow-2xl dark:shadow-primary/20 overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/40 dark:bg-primary/5 backdrop-blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 p-12 md:p-20">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="w-24 h-24 rounded-[2.5rem] bg-primary text-white flex items-center justify-center shadow-2xl"><Crown size={48} className="fill-white" /></div>
              <div className="space-y-4 max-w-xl text-center md:text-left">
                <Badge className="bg-accent text-white border-none px-6 py-2 rounded-full font-black uppercase tracking-[0.3em] text-[10px]">ELITE SEASON PASS</Badge>
                <h2 className="text-4xl md:text-6xl font-black text-primary tracking-tighter leading-none">Unlock <span className="text-accent italic">Elite Status.</span></h2>
              </div>
            </div>
            <Button className="bull-button !w-40 !h-40 md:!w-48 md:!h-48 border-[12px] border-background/50 hover:scale-110 shadow-2xl group transition-all">
              <div className="flex flex-col items-center gap-2"><span className="text-[12px] font-black uppercase tracking-widest">ENGAGE</span><ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" /></div>
            </Button>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  )
}