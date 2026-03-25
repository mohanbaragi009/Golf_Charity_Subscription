"use client"

import * as React from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, TrendingUp, Zap, AlertCircle, Target, History } from "lucide-react"
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
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">Welcome Back, John</h1>
            <p className="text-muted-foreground">Your recent 5 rounds performance at a glance.</p>
          </div>
          <Badge variant="outline" className="border-primary text-primary px-4 py-1.5 rounded-full font-bold">
            PRO MEMBER
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white border-none shadow-xl shadow-primary/5 rounded-2xl overflow-hidden relative">
             <div className="absolute top-0 right-0 p-4 opacity-10">
              <Trophy size={80} className="text-primary" />
             </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Current Handicap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">14.5</div>
              <p className="text-[10px] text-green-600 mt-1 flex items-center font-bold">
                <TrendingUp size={14} className="mr-1" /> -0.4 from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-xl shadow-primary/5 rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Recent Avg. (Last 5)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">36.4</div>
              <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-widest font-bold">Verified Stableford</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-xl shadow-primary/5 rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Draw Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-accent">12</div>
              <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-widest font-bold">Next draw in 4 days</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-none shadow-xl shadow-primary/5 rounded-3xl bg-white overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">Score Progression</CardTitle>
                <CardDescription>Stableford points (Last 5 Rounds)</CardDescription>
              </div>
              <History size={20} className="text-muted-foreground opacity-30" />
            </CardHeader>
            <CardContent className="h-[300px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_DATA.slice(-5)}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '16px', 
                      border: 'none', 
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
                    }} 
                  />
                  <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={4} fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl shadow-primary/5 rounded-3xl bg-white overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-primary text-xl">
                  <Zap className="mr-2 h-5 w-5 text-accent" /> AI Insights
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={fetchAnalysis} disabled={loading} className="rounded-full">
                  {loading ? "Analyzing..." : "Refresh"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {aiAnalysis ? (
                <>
                  <div className="p-4 bg-accent/5 border border-accent/20 rounded-2xl">
                    <p className="text-sm italic leading-relaxed text-foreground">
                      "{aiAnalysis.summary}"
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Strengths</h4>
                      <ul className="space-y-2">
                        {aiAnalysis.strengths.map((s, i) => (
                          <li key={i} className="flex items-center text-xs font-bold text-green-700">
                             <CheckCircle2 size={14} className="mr-2 shrink-0" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Focus Areas</h4>
                      <ul className="space-y-2">
                        {aiAnalysis.weaknesses.map((w, i) => (
                          <li key={i} className="flex items-center text-xs font-bold text-orange-700">
                             <AlertCircle size={14} className="mr-2 shrink-0" />
                            {w}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Actionable Tips</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {aiAnalysis.actionableTips.map((tip, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-primary/5 rounded-2xl border border-primary/10 group hover:border-primary/30 transition-colors">
                          <Target size={16} className="text-primary mt-0.5" />
                          <p className="text-xs font-medium leading-relaxed">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                  <AlertCircle className="h-12 w-12 mb-4 opacity-10" />
                  <p className="text-sm font-bold">Click Refresh to generate AI coaching insights.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}

function CheckCircle2(props: any) {
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
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
