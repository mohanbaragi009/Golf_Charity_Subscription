"use client"

import * as React from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar as CalendarIcon, Target, Trophy, Info, History, Sparkles } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

type GolfScore = {
  id: string
  date: Date
  score: number
  course: string
}

const INITIAL_SCORES: GolfScore[] = [
  { id: "1", date: new Date(2024, 5, 10), score: 36, course: "Pinehurst No. 2" },
  { id: "2", date: new Date(2024, 5, 5), score: 41, course: "Oakmont Country Club" },
  { id: "3", date: new Date(2024, 4, 28), score: 32, course: "Royal St. Andrews" },
  { id: "4", date: new Date(2024, 4, 15), score: 38, course: "Augusta National" },
  { id: "5", date: new Date(2024, 4, 2), score: 35, course: "Pebble Beach" },
]

export default function ScoreEntry() {
  const { toast } = useToast()
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [score, setScore] = React.useState("")
  const [course, setCourse] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [scores, setScores] = React.useState<GolfScore[]>(INITIAL_SCORES)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const scoreNum = parseInt(score)
    
    if (!score || !course || !date) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all fields.",
      })
      return
    }

    if (isNaN(scoreNum) || scoreNum < 1 || scoreNum > 45) {
      toast({
        variant: "destructive",
        title: "Invalid Score",
        description: "Stableford scores must be between 1 and 45.",
      })
      return
    }

    setLoading(true)
    setTimeout(() => {
      const newScore: GolfScore = {
        id: Math.random().toString(36).substr(2, 9),
        date: date,
        score: scoreNum,
        course: course,
      }

      const updatedScores = [newScore, ...scores].slice(0, 5)
      setScores(updatedScores)

      toast({
        title: "Verified Submission!",
        description: `Your score of ${scoreNum} is now pending verification.`,
      })
      setScore("")
      setCourse("")
      setLoading(false)
    }, 1200)
  }

  return (
    <AppLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1 space-y-10">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-primary">Score Entry</h1>
            <p className="text-muted-foreground font-medium">Record your performance for draw eligibility.</p>
          </div>

          <Card className="glass-card rounded-[3rem] overflow-hidden">
            <div className="bg-primary p-8 text-white relative overflow-hidden">
              <Sparkles className="absolute top-[-20px] right-[-20px] w-32 h-32 opacity-10" />
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">New Round</h2>
                  <p className="text-white/60 text-xs font-black uppercase tracking-widest mt-1">Stableford points (1-45)</p>
                </div>
                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                   <Trophy size={28} className="text-accent" />
                </div>
              </div>
            </div>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Play Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="w-full justify-start text-left font-bold rounded-2xl h-14 bg-white/40 border-white/60"
                      >
                        <CalendarIcon className="mr-3 text-primary opacity-60" size={18} />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 rounded-3xl overflow-hidden border-white/40 shadow-2xl" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="score" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Stableford Total</Label>
                  <div className="relative">
                    <Input
                      id="score"
                      type="number"
                      min="1"
                      max="45"
                      placeholder="Range: 1-45"
                      className="rounded-2xl h-14 pl-12 bg-white/40 border-white/60 font-bold"
                      value={score}
                      onChange={(e) => setScore(e.target.value)}
                    />
                    <Target className="absolute left-4 top-1/2 -translate-y-1/2 text-primary opacity-60" size={18} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="course" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Golf Course</Label>
                  <Input
                    id="course"
                    placeholder="Enter course name..."
                    className="rounded-2xl h-14 bg-white/40 border-white/60 font-bold px-6"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-14 font-black uppercase tracking-[0.2em] rounded-2xl bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  disabled={loading}
                >
                  {loading ? "Recording..." : "Finalize Score"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="p-6 bg-accent/5 backdrop-blur-md rounded-[2rem] flex items-start gap-4 border border-accent/20">
            <Info size={20} className="text-primary mt-0.5 shrink-0" />
            <p className="text-xs font-bold text-primary/70 leading-relaxed uppercase tracking-widest opacity-80">
              Only your latest 5 verified scores are used for draw weightings and coaching.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-10">
          <Card className="glass-card rounded-[3rem] overflow-hidden flex flex-col min-h-[500px]">
            <CardHeader className="p-8 border-b border-white/40 bg-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary rounded-2xl text-white shadow-lg"><History size={24} /></div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-primary">Score History</CardTitle>
                    <CardDescription className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Recent verified rounds</CardDescription>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">Active Season</Badge>
              </div>
            </CardHeader>
            <Table>
              <TableHeader>
                <TableRow className="bg-transparent border-white/20">
                  <TableHead className="px-8 font-black uppercase tracking-widest text-[10px]">Play Date</TableHead>
                  <TableHead className="font-black uppercase tracking-widest text-[10px]">Verified Course</TableHead>
                  <TableHead className="text-right px-8 font-black uppercase tracking-widest text-[10px]">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scores.map((s) => (
                  <TableRow key={s.id} className="hover:bg-white/40 transition-all border-white/20 group">
                    <TableCell className="px-8 py-6 font-bold text-primary/80">{format(s.date, "MMM dd, yyyy")}</TableCell>
                    <TableCell className="font-bold text-foreground/80">{s.course}</TableCell>
                    <TableCell className="text-right px-8">
                      <div className="inline-flex items-center gap-2">
                        <span className="text-2xl font-black text-primary tracking-tighter">{s.score}</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50">PTS</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <CardFooter className="mt-auto p-8 bg-white/10 flex justify-center border-t border-white/20">
               <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.3em] italic">System-enforced 5-round rolling retention</p>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 glass-card border-none bg-gradient-to-br from-primary to-primary/80 text-white rounded-[3rem] shadow-2xl shadow-primary/20 relative overflow-hidden group">
               <Sparkles className="absolute bottom-[-20px] right-[-20px] w-40 h-40 opacity-10 group-hover:scale-110 transition-transform duration-700" />
               <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">Rolling Average</p>
               <div className="flex items-baseline gap-2">
                 <h3 className="text-5xl font-black tracking-tighter">
                   {(scores.reduce((acc, curr) => acc + curr.score, 0) / (scores.length || 1)).toFixed(1)}
                 </h3>
                 <span className="text-xs font-bold opacity-60">Verified</span>
               </div>
            </Card>
            <Card className="p-8 glass-card rounded-[3rem] relative overflow-hidden group">
               <div className="absolute top-8 right-8 w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-2">Eligibility Status</p>
               <h3 className="text-4xl font-black text-primary tracking-tight">Active</h3>
               <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-2">Qualified for Monthly Draws</p>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
