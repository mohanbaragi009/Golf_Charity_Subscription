"use client"

import * as React from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, TrendingUp, Zap, AlertCircle, Target, History, Sparkles, Timer } from "lucide-react"
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
      console.error(error)
      const isBusy = error?.message?.includes('503') || error?.message?.includes('high demand') || error?.message?.includes('unavailable');
      toast({
        variant: "destructive",
        title: isBusy ? "AI Service Busy" : "Analysis Error",
        description: isBusy 
          ? "Our AI coaching engine is currently experiencing high demand. Please try again in a moment."
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
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-black text-primary tracking-tighter flex items-center gap-4">
              Performance Hub <Zap className="text-accent fill-accent" size={32} />
            </h1>
            <div className="flex items-center gap-2">
               <Badge className="bg-primary/10 text-primary border-none text-[9px] font-black px-3 py-1 rounded-md">EXPRESS VERIFIED</Badge>
               <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Real-time Impact Analytics</p>
            </div>
          </div>
          <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-secondary border border-primary/10 shadow-sm">
             <Timer size={16} className="text-accent" />
             <span className="text-[10px] font-black uppercase tracking-widest text-primary">Next Update: 8m 42s</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Trophy, label: "Current handicap", value: "14.5", sub: "-0.4 Last Week", color: "primary" },
            { icon: Target, label: "Stableford Index", value: "36.4", sub: "Avg Top 5 Rounds", color: "primary" },
            { icon: Zap, label: "Active Entries", value: "12", sub: "Prize Pool Eligibility", color: "accent" },
          ].map((stat, i) => (
            <Card key={i} className="glass-card overflow-hidden hover:translate-y-[-5px] transition-transform group">
              <CardContent className="p-10 space-y-6">
                <div className={cn("p-3 rounded-xl w-fit", stat.color === 'accent' ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary')}>
                  <stat.icon size={24} className={stat.color === 'accent' ? 'fill-accent' : ''} />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-60">{stat.label}</p>
                  <h3 className={cn("text-5xl font-black tracking-tighter", stat.color === 'accent' ? 'text-accent' : 'text-primary')}>{stat.value}</h3>
                </div>
                <p className="text-[9px] font-black uppercase tracking-widest text-primary/60">{stat.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <Card className="glass-card p-4">
            <CardHeader className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-black text-primary">Score Dynamics</CardTitle>
                  <CardDescription className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Express Historical Trend</CardDescription>
                </div>
                <History className="text-primary/20" size={32} />
              </div>
            </CardHeader>
            <CardContent className="h-[340px] px-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_DATA.slice(-5)}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="rgba(0,0,0,0.03)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 'bold', fill: 'hsl(var(--primary))' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 'bold', fill: 'hsl(var(--primary))' }} />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '1.5rem', 
                      border: 'none', 
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                      background: 'white'
                    }} 
                  />
                  <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={4} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="glass-card overflow-hidden flex flex-col bg-secondary/30 border-none">
            <CardHeader className="bg-primary text-white p-10 relative overflow-hidden">
               <Zap className="absolute top-[-20px] right-[-20px] w-48 h-48 opacity-10" />
               <div className="flex items-center justify-between relative z-10">
                  <div className="space-y-1">
                    <CardTitle className="text-3xl font-black tracking-tight">AI Express Coach</CardTitle>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Powered by Zepto Intelligence</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={fetchAnalysis} disabled={loading} className="rounded-full bg-white/10 border-white/20 hover:bg-white text-white hover:text-primary font-black uppercase tracking-widest text-[9px] px-6 h-10">
                    {loading ? "Analyzing..." : "Refresh"}
                  </Button>
               </div>
            </CardHeader>
            <CardContent className="p-10 space-y-10 flex-1">
              {aiAnalysis ? (
                <div className="space-y-10">
                  <div className="p-8 rounded-[2rem] bg-white shadow-xl shadow-black/[0.02] border border-secondary italic text-primary/80 font-bold leading-relaxed">
                    "{aiAnalysis.summary}"
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40">Power Strengths</h4>
                      <div className="space-y-3">
                        {aiAnalysis.strengths.map((s, i) => (
                          <div key={i} className="flex items-center p-4 rounded-2xl bg-primary/5 text-[11px] font-black text-primary uppercase tracking-tight">
                             <TrendingUp size={14} className="mr-3 text-accent" />
                             {s}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40">Critical Fixes</h4>
                      <div className="space-y-3">
                        {aiAnalysis.weaknesses.map((w, i) => (
                          <div key={i} className="flex items-center p-4 rounded-2xl bg-accent/5 text-[11px] font-black text-accent uppercase tracking-tight">
                             <AlertCircle size={14} className="mr-3" />
                             {w}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-10 border-t border-secondary space-y-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40">Actionable 10m Drills</h4>
                    <div className="grid grid-cols-1 gap-4">
                      {aiAnalysis.actionableTips.map((tip, i) => (
                        <div key={i} className="flex items-start gap-5 p-6 bg-white rounded-[2rem] border border-secondary hover:translate-x-2 transition-transform cursor-default shadow-sm">
                          <div className="p-2.5 bg-primary rounded-xl text-white shadow-lg"><Target size={18} /></div>
                          <p className="text-[11px] font-black leading-relaxed text-primary uppercase tracking-tight">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-primary/10">
                  <Zap size={80} className="mb-6 animate-pulse fill-primary/10" />
                  <p className="text-[10px] font-black uppercase tracking-widest">Awaiting Rapid Analysis...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
