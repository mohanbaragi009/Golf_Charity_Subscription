"use client"

import * as React from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, TrendingUp, Zap, AlertCircle, Target, History, Timer, Heart, Users, ArrowUpRight, Sparkles, Crown, ArrowRight } from "lucide-react"
import { 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts"
import { analyzeGolfPerformance, type AnalyzeGolfPerformanceOutput } from "@/ai/flows/personalized-golf-performance-analysis-flow"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { Progress } from "@/components/ui/progress"

const MOCK_DATA = [
  { name: 'Jan', score: 32 },
  { name: 'Feb', score: 35 },
  { name: 'Mar', score: 30 },
  { name: 'Apr', score: 38 },
  { name: 'May', score: 41 },
  { name: 'Jun', score: 36 },
]

const LIVE_FEED = [
  { id: 1, user: "Alice J.", action: "won a Pro Eagle Draw", time: "2m ago", amount: "$500", type: "win" },
  { id: 2, user: "Bob W.", action: "reached 50 rounds", time: "5m ago", amount: "Gold Badge", type: "milestone" },
  { id: 3, user: "Diana P.", action: "donated to Clean Water", time: "12m ago", amount: "$120", type: "impact" },
  { id: 4, user: "Evan M.", action: "submitted 42pts score", time: "18m ago", amount: "Verified", type: "score" },
]

export default function Dashboard() {
  const { toast } = useToast()
  const [aiAnalysis, setAiAnalysis] = React.useState<AnalyzeGolfPerformanceOutput | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [progress, setProgress] = React.useState(0)

  const fetchAnalysis = async () => {
    setLoading(true)
    try {
      const result = await analyzeGolfPerformance({
        stablefordScores: [32, 35, 30, 38, 41, 36],
        handicap: 14.5,
        recentCourseConditions: "Moderate winds, dry greens"
      })
      setAiAnalysis(result)
    } catch (error: any) {
      const isBusy = error?.message?.includes('503') || error?.message?.includes('high demand') || error?.message?.includes('unavailable');
      toast({
        variant: "destructive",
        title: isBusy ? "AI Service Busy" : "Analysis Error",
        description: isBusy 
          ? "GoCharity AI is currently experiencing high demand. Please try again soon."
          : "We couldn't retrieve your personalized coaching insights right now.",
      })
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchAnalysis()
    const timer = setTimeout(() => setProgress(78), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AppLayout>
      <div className="space-y-16 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-6xl font-black text-primary tracking-tighter flex items-center gap-5">
              Performance Hub <Zap className="text-accent fill-accent animate-pulse" size={40} />
            </h1>
            <div className="flex items-center gap-3">
               <Badge className="bg-primary text-white border-none text-[10px] font-black px-4 py-1.5 rounded-full tracking-widest shadow-xl shadow-primary/20 uppercase">ELITE VERIFIED</Badge>
               <p className="text-[11px] text-muted-foreground font-black uppercase tracking-[0.3em] opacity-60">Real-time Performance Analytics</p>
            </div>
          </div>
          <div className="flex items-center gap-6 px-10 py-5 rounded-[2.5rem] bg-secondary border border-primary/5 shadow-inner">
             <Timer size={20} className="text-accent" />
             <div className="flex flex-col">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/40 leading-none mb-1">Next Sync</span>
               <span className="text-lg font-black text-primary tracking-tighter">08m 42s</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {[
            { icon: Trophy, label: "Current handicap", value: "14.5", sub: "-0.4 Last Week", color: "primary" },
            { icon: Target, label: "Express Index", value: "36.4", sub: "Avg Top 5 Rounds", color: "primary" },
            { icon: Zap, label: "Active Entries", value: "12", sub: "Pool Eligibility: YES", color: "accent" },
          ].map((stat, i) => (
            <Card key={i} className="glass-card overflow-hidden hover:scale-[1.02] transition-all group border-2 border-transparent hover:border-primary/10">
              <CardContent className="p-8 sm:p-10 space-y-6">
                <div className={cn("p-4 rounded-[1.5rem] w-fit shadow-lg", stat.color === 'accent' ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary')}>
                  <stat.icon size={24} className={stat.color === 'accent' ? 'fill-accent' : ''} />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-50 break-words leading-tight">{stat.label}</p>
                  <h3 className={cn("text-4xl sm:text-5xl font-black tracking-tighter truncate leading-none", stat.color === 'accent' ? 'text-accent' : 'text-primary')}>{stat.value}</h3>
                </div>
                <p className="text-[9px] font-black uppercase tracking-widest text-primary/60 truncate">{stat.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column (Chart & Activity) */}
          <div className="lg:col-span-7 space-y-12">
            <Card className="glass-card p-6">
              <CardHeader className="p-10">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-3xl font-black text-primary tracking-tight">Express Dynamic</CardTitle>
                    <CardDescription className="text-[11px] font-black uppercase tracking-[0.4em] text-muted-foreground mt-2">Historical Performance Flow</CardDescription>
                  </div>
                  <History className="text-primary/10" size={48} />
                </div>
              </CardHeader>
              <CardContent className="h-[400px] px-6">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MOCK_DATA.slice(-5)}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="8 8" vertical={false} stroke="rgba(0,0,0,0.03)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: 'hsl(var(--primary))' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: 'hsl(var(--primary))' }} />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '2.5rem', 
                        border: 'none', 
                        boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
                        background: 'white',
                        padding: '20px'
                      }} 
                    />
                    <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={6} fill="url(#colorScore)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="glass-card p-10 bg-gradient-to-br from-white to-primary/5 dark:from-primary/10 dark:to-transparent relative overflow-hidden group">
                <Heart className="absolute -top-6 -right-6 w-32 h-32 text-primary/5 rotate-12 transition-transform group-hover:scale-110" />
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary rounded-xl text-white shadow-lg"><Heart size={20} /></div>
                    <div className="space-y-0.5">
                      <h4 className="text-lg font-black text-primary tracking-tight">Charity Goal</h4>
                      <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Clean Water Project</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-2xl font-black text-primary tracking-tighter">$12,450 <span className="text-[10px] text-muted-foreground/40 font-bold uppercase tracking-widest">RAISED</span></span>
                      <span className="text-[10px] font-black text-accent uppercase tracking-widest">78% Complete</span>
                    </div>
                    <Progress value={progress} className="h-3 bg-primary/5" />
                  </div>
                  <Button className="w-full bg-white dark:bg-primary/20 border border-primary/10 text-primary hover:bg-primary hover:text-white rounded-2xl font-black uppercase tracking-widest text-[9px] h-12 shadow-sm">
                    View Impact Report
                  </Button>
                </div>
              </Card>

              <Card className="glass-card p-10 bg-white/40 dark:bg-white/5 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-2 h-full bg-accent/20" />
                <div className="space-y-6 h-full flex flex-col">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                      <Users size={14} /> Community Live
                    </h4>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                      <span className="text-[8px] font-black uppercase tracking-widest text-accent">Real-time</span>
                    </div>
                  </div>
                  <div className="space-y-4 overflow-hidden flex-1">
                    {LIVE_FEED.map((item, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={item.id} 
                        className="flex items-center justify-between p-3 rounded-2xl bg-white/60 dark:bg-white/10 border border-white dark:border-white/5 shadow-sm"
                      >
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-primary tracking-tight">{item.user}</span>
                          <span className="text-[8px] font-bold text-muted-foreground/60 uppercase tracking-widest truncate max-w-[100px]">{item.action}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] font-black text-accent block">{item.amount}</span>
                          <span className="text-[7px] font-bold text-muted-foreground uppercase opacity-40">{item.time}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Right Column (AI Insights) */}
          <div className="lg:col-span-5">
            <Card className="glass-card overflow-hidden h-full flex flex-col bg-primary/5 border-none">
              <CardHeader className="bg-primary text-white p-12 relative overflow-hidden">
                 <Zap className="absolute top-[-40px] right-[-40px] w-64 h-64 opacity-10" />
                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
                    <div className="space-y-2">
                      <CardTitle className="text-4xl font-black tracking-tighter">GoCharity AI</CardTitle>
                      <p className="text-[11px] font-black uppercase tracking-[0.5em] text-white/60">EXPRESS INTELLIGENCE ENGINE</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={fetchAnalysis} disabled={loading} className="rounded-full bg-white/10 border-white/20 hover:bg-white text-white hover:text-primary font-black uppercase tracking-widest text-[10px] px-8 h-12 shadow-xl shadow-black/10">
                      {loading ? "Syncing..." : "Refresh"}
                    </Button>
                 </div>
              </CardHeader>
              <CardContent className="p-10 space-y-12 flex-1">
                {aiAnalysis ? (
                  <div className="space-y-12">
                    <div className="p-10 rounded-[3rem] bg-white dark:bg-white/5 shadow-2xl shadow-black/[0.03] border border-secondary italic text-primary/80 font-bold leading-relaxed text-lg">
                      "{aiAnalysis.summary}"
                    </div>
                    
                    <div className="space-y-8">
                      <div className="space-y-6">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary/40 ml-2">Power Strengths</h4>
                        <div className="space-y-4">
                          {aiAnalysis.strengths.map((s, i) => (
                            <div key={i} className="flex items-center p-5 rounded-[2rem] bg-white dark:bg-white/10 border border-secondary text-[12px] font-black text-primary uppercase tracking-tight shadow-sm hover:translate-x-2 transition-transform">
                               <TrendingUp size={16} className="mr-4 text-accent" />
                               {s}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-6">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary/40 ml-2">Critical Fixes</h4>
                        <div className="space-y-4">
                          {aiAnalysis.weaknesses.map((w, i) => (
                            <div key={i} className="flex items-center p-5 rounded-[2rem] bg-accent/5 border border-accent/10 text-[12px] font-black text-accent uppercase tracking-tight shadow-sm hover:translate-x-2 transition-transform">
                               <AlertCircle size={16} className="mr-4" />
                               {w}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-28 text-primary/10">
                    <Zap size={100} className="mb-8 animate-pulse fill-primary/10" />
                    <p className="text-[12px] font-black uppercase tracking-[0.6em]">Syncing Express Analytics...</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* STUNNING PREMIUM SECTION - Optimized for Blue Dark Theme */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mt-20 p-1 md:p-1.5 rounded-[4.5rem] bg-gradient-to-r from-primary/30 via-accent/40 to-primary/30 shadow-[0_40px_100px_rgba(0,0,0,0.1)] dark:shadow-[0_40px_100px_rgba(31,164,244,0.15)] overflow-hidden group"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 bg-white/20 dark:bg-primary/5 backdrop-blur-3xl" />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-accent/10 dark:bg-accent/20 rounded-full blur-[120px]" 
          />
          <Sparkles className="absolute top-10 right-10 w-40 h-40 text-accent/10 dark:text-accent/30 opacity-20 group-hover:scale-125 transition-transform duration-1000" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 p-12 md:p-20">
            <div className="flex flex-col md:flex-row items-center gap-10 text-center md:text-left">
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/40 relative z-10">
                  <Crown size={48} className="fill-white" />
                </div>
                <div className="absolute inset-0 bg-accent animate-ping rounded-[2.5rem] opacity-20" />
              </div>
              <div className="space-y-4 max-w-xl">
                <Badge className="bg-accent text-white border-none px-6 py-2 rounded-full font-black uppercase tracking-[0.3em] text-[10px] shadow-lg">ELITE SEASON PASS</Badge>
                <h2 className="text-4xl md:text-6xl font-black text-primary tracking-tighter leading-none">
                  Unlock Global <span className="text-accent italic">Elite Status.</span>
                </h2>
                <p className="text-sm md:text-lg font-bold text-muted-foreground/80 dark:text-white/60 leading-relaxed uppercase tracking-widest">
                  Members who maintain a rolling average above 36pts for 3 consecutive months gain access to the "Charity Invitational" & custom golf gear.
                </p>
              </div>
            </div>

            {/* Premium Right-Aligned Button */}
            <div className="shrink-0">
              <Button 
                className="bull-button !w-40 !h-40 md:!w-48 md:!h-48 !bg-primary !text-white !border-[12px] !border-background/50 hover:scale-110 active:scale-95 transition-all shadow-[0_30px_60px_rgba(0,0,0,0.1)] group"
                onClick={() => toast({ title: "Priority Queue", description: "You are now on the waitlist for the Invitational." })}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[12px] font-black uppercase tracking-[0.2em]">ENGAGE</span>
                  <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </Button>
            </div>
          </div>
          
          {/* Bottom Glossy Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
        </motion.div>
      </div>
    </AppLayout>
  )
}
