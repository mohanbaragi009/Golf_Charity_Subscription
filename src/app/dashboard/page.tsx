"use client"

import * as React from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, TrendingUp, Zap, AlertCircle, Target, History, Sparkles } from "lucide-react"
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

const MOCK_DATA = [
  { name: 'Jan', score: 32 },
  { name: 'Feb', score: 35 },
  { name: 'Mar', score: 30 },
  { name: 'Apr', score: 38 },
  { name: 'May', score: 41 },
  { name: 'Jun', score: 36 },
]

export default function Dashboard() {
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
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchAnalysis()
  }, [])

  return (
    <AppLayout>
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold text-primary flex items-center gap-3">
              Performance Hub <Sparkles className="text-accent" size={28} />
            </h1>
            <p className="text-muted-foreground font-medium">Elevate your game with AI-driven insights and charity tracking.</p>
          </div>
          <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-sm">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <span className="text-xs font-bold uppercase tracking-widest text-primary">Live Stats Verified</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="glass-card rounded-[2.5rem] relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
             <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700">
              <Trophy size={140} className="text-primary" />
             </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Trophy size={14} className="text-primary" /> Handicap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold text-primary tracking-tighter">14.5</div>
              <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest">
                <TrendingUp size={12} className="mr-1.5" /> -0.4 Progress
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card rounded-[2.5rem] overflow-hidden hover:scale-[1.02] transition-transform duration-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Target size={14} className="text-primary" /> Recent Avg
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold text-primary tracking-tighter">36.4</div>
              <p className="mt-4 text-[10px] text-muted-foreground/60 uppercase tracking-widest font-bold">Stableford Index</p>
            </CardContent>
          </Card>

          <Card className="glass-card rounded-[2.5rem] overflow-hidden hover:scale-[1.02] transition-transform duration-500 bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Sparkles size={14} className="text-accent" /> Draw Entries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold text-accent drop-shadow-sm">12</div>
              <div className="mt-4 flex items-center gap-2">
                 <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                 <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Next draw in 4 days</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <Card className="glass-card rounded-[3rem] overflow-hidden p-2">
            <CardHeader className="flex flex-row items-center justify-between p-6">
              <div>
                <CardTitle className="text-2xl font-bold text-primary">Score Trends</CardTitle>
                <CardDescription className="text-xs uppercase font-bold tracking-widest text-muted-foreground">Historical Performance</CardDescription>
              </div>
              <div className="p-3 bg-white/40 rounded-2xl border border-white/60">
                <History size={20} className="text-primary opacity-40" />
              </div>
            </CardHeader>
            <CardContent className="h-[340px] px-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_DATA.slice(-5)}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="hsla(var(--primary), 0.05)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '20px', 
                      border: '1px solid rgba(255, 255, 255, 0.4)', 
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05)' 
                    }} 
                  />
                  <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={5} fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="glass-card rounded-[3rem] overflow-hidden flex flex-col">
            <CardHeader className="bg-primary/5 border-b border-white/40 p-8">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center text-2xl font-bold text-primary">
                    AI Coaching <Sparkles className="ml-3 text-accent" size={24} />
                  </CardTitle>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Generated by Gemini 2.5</p>
                </div>
                <Button variant="outline" size="sm" onClick={fetchAnalysis} disabled={loading} className="rounded-full bg-white/40 border-white/60 hover:bg-white/80 transition-all font-bold px-6">
                  {loading ? "Analyzing..." : "Refresh Coaching"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8 flex-1">
              {aiAnalysis ? (
                <>
                  <div className="p-6 bg-white/50 backdrop-blur-md rounded-[2rem] border border-white/60 shadow-inner">
                    <p className="text-sm font-medium leading-relaxed italic text-primary/80">
                      "{aiAnalysis.summary}"
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em]">Verified Strengths</h4>
                      <div className="space-y-2">
                        {aiAnalysis.strengths.map((s, i) => (
                          <div key={i} className="flex items-center p-3 rounded-2xl bg-green-50/50 border border-green-100/50 text-xs font-bold text-green-700">
                             <div className="mr-3 p-1.5 bg-green-100 rounded-lg"><TrendingUp size={12} /></div>
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em]">Optimization Required</h4>
                      <div className="space-y-2">
                        {aiAnalysis.weaknesses.map((w, i) => (
                          <div key={i} className="flex items-center p-3 rounded-2xl bg-orange-50/50 border border-orange-100/50 text-xs font-bold text-orange-700">
                             <div className="mr-3 p-1.5 bg-orange-100 rounded-lg"><AlertCircle size={12} /></div>
                            {w}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/40">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-6">Actionable Training Plan</h4>
                    <div className="grid grid-cols-1 gap-4">
                      {aiAnalysis.actionableTips.map((tip, i) => (
                        <div key={i} className="flex items-start gap-4 p-5 bg-white/40 rounded-[2rem] border border-white/60 hover:scale-[1.01] hover:bg-white/60 transition-all cursor-default">
                          <div className="p-2.5 bg-primary/5 rounded-xl text-primary"><Target size={18} /></div>
                          <p className="text-xs font-bold leading-relaxed text-foreground/80">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-muted-foreground/30">
                  <Sparkles size={80} className="mb-6 animate-pulse" />
                  <p className="text-sm font-black uppercase tracking-widest">Coaching Engine Standby</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
