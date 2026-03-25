
"use client"

import * as React from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, TrendingUp, Calendar, Zap, AlertCircle } from "lucide-react"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
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
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Welcome Back, John</h1>
          <p className="text-muted-foreground">Your golf performance at a glance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white border-none shadow-xl shadow-primary/5 rounded-2xl overflow-hidden relative">
             <div className="absolute top-0 right-0 p-4 opacity-10">
              <Trophy size={80} className="text-primary" />
             </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Current Handicap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">14.5</div>
              <p className="text-xs text-green-600 mt-1 flex items-center font-bold">
                <TrendingUp size={14} className="mr-1" /> -0.4 from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-xl shadow-primary/5 rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Avg. Stableford</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">35.3</div>
              <p className="text-xs text-muted-foreground mt-1">Based on last 10 rounds</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-xl shadow-primary/5 rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Prize Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-accent">12</div>
              <p className="text-xs text-muted-foreground mt-1">Drawing in 4 days</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-none shadow-xl shadow-primary/5 rounded-2xl bg-white">
            <CardHeader>
              <CardTitle>Score Progression</CardTitle>
              <CardDescription>Stableford points over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_DATA}>
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
                      borderRadius: '12px', 
                      border: 'none', 
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
                    }} 
                  />
                  <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl shadow-primary/5 rounded-2xl bg-white overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-primary">
                  <Zap className="mr-2 h-5 w-5 text-accent" /> AI Performance Insights
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={fetchAnalysis} disabled={loading}>
                  {loading ? "Analyzing..." : "Refresh"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {aiAnalysis ? (
                <>
                  <div className="p-4 bg-accent/10 border border-accent/20 rounded-xl">
                    <p className="text-sm italic leading-relaxed text-foreground">
                      "{aiAnalysis.summary}"
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Strengths</h4>
                      <ul className="space-y-1">
                        {aiAnalysis.strengths.map((s, i) => (
                          <li key={i} className="flex items-start text-sm">
                            <Badge variant="secondary" className="mr-2 bg-green-100 text-green-700 hover:bg-green-100 border-none">+</Badge>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Weaknesses</h4>
                      <ul className="space-y-1">
                        {aiAnalysis.weaknesses.map((w, i) => (
                          <li key={i} className="flex items-start text-sm">
                            <Badge variant="secondary" className="mr-2 bg-orange-100 text-orange-700 hover:bg-orange-100 border-none">-</Badge>
                            {w}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <h4 className="text-sm font-bold mb-3">Actionable Tips</h4>
                    <div className="space-y-2">
                      {aiAnalysis.actionableTips.map((tip, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                          <Target size={16} className="text-primary mt-0.5" />
                          <p className="text-sm font-medium">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <AlertCircle className="h-12 w-12 mb-4 opacity-20" />
                  <p>Click Refresh to get AI insights.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
