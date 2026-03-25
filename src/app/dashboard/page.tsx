"use client"

import * as React from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, TrendingUp, Zap, AlertCircle, Target, History, Timer } from "lucide-react"
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

const MOCK_DATA = [
  { name: 'Jan', score: 32 },
  { name: 'Feb', score: 35 },
  { name: 'Mar', score: 30 },
  { name: 'Apr', score: 38 },
  { name: 'May', score: 41 },
  { name: 'Jun', score: 36 },
]

export default function Dashboard() {
  const { toast } = useToast()
  const [aiAnalysis, setAiAnalysis] = React.useState<AnalyzeGolfPerformanceOutput | null>(null)
  const [loading, setLoading] = React.useState(false)

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
  }, [])

  return (
    <AppLayout>
      <div className="space-y-16">
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
              <CardContent className="p-8 sm:p-12 space-y-6 sm:space-y-8">
                <div className={cn("p-4 rounded-[1.5rem] w-fit shadow-lg", stat.color === 'accent' ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary')}>
                  <stat.icon size={28} className={stat.color === 'accent' ? 'fill-accent' : ''} />
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-50 break-words leading-tight">{stat.label}</p>
                  <h3 className={cn("text-4xl sm:text-5xl xl:text-6xl font-black tracking-tighter truncate", stat.color === 'accent' ? 'text-accent' : 'text-primary')}>{stat.value}</h3>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary/60 truncate">{stat.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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

          <Card className="glass-card overflow-hidden flex flex-col bg-primary/5 border-none">
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
            <CardContent className="p-12 space-y-12 flex-1">
              {aiAnalysis ? (
                <div className="space-y-12">
                  <div className="p-10 rounded-[3rem] bg-white shadow-2xl shadow-black/[0.03] border border-secondary italic text-primary/80 font-bold leading-relaxed text-lg">
                    "{aiAnalysis.summary}"
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary/40 ml-2">Power Strengths</h4>
                      <div className="space-y-4">
                        {aiAnalysis.strengths.map((s, i) => (
                          <div key={i} className="flex items-center p-5 rounded-[2rem] bg-white border border-secondary text-[12px] font-black text-primary uppercase tracking-tight shadow-sm hover:translate-x-2 transition-transform">
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

                  <div className="pt-12 border-t border-secondary/40 space-y-8">
                    <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-primary/40 ml-2">Actionable 10m Drills</h4>
                    <div className="grid grid-cols-1 gap-6">
                      {aiAnalysis.actionableTips.map((tip, i) => (
                        <div key={i} className="flex items-start gap-6 p-8 bg-white rounded-[3rem] border border-secondary hover:shadow-xl transition-all cursor-default group">
                          <div className="p-4 bg-primary rounded-[1.5rem] text-white shadow-2xl shadow-primary/20 group-hover:scale-110 transition-transform"><Target size={24} /></div>
                          <div className="flex-1 space-y-1 pt-1">
                             <p className="text-[13px] font-black leading-relaxed text-primary uppercase tracking-tight">{tip}</p>
                             <p className="text-[9px] font-black text-accent uppercase tracking-[0.4em]">EXPRESS PROTOCOL</p>
                          </div>
                        </div>
                      ))}
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
    </AppLayout>
  )
}
