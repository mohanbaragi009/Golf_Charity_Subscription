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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

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
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [score, setScore] = React.useState("")
  const [course, setCourse] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [scores, setScores] = React.useState<GolfScore[]>(INITIAL_SCORES)

  React.useEffect(() => {
    setDate(new Date())
  }, [])

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

      setScores([newScore, ...scores].slice(0, 5))

      toast({
        title: "Verified Submission!",
        description: `Your GoCharity score of ${scoreNum} is now pending verification.`,
      })
      setScore("")
      setCourse("")
      setLoading(false)
    }, 1200)
  }

  return (
    <AppLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-12">
          <div className="space-y-3">
            <h1 className="text-5xl font-black text-primary tracking-tighter">Score Registry</h1>
            <p className="text-muted-foreground font-bold uppercase tracking-[0.3em] text-[10px]">Express Pool Verification</p>
          </div>

          <Card className="glass-card rounded-[4rem] overflow-hidden">
            <div className="bg-primary p-12 text-white relative overflow-hidden">
              <Sparkles className="absolute top-[-30px] right-[-30px] w-48 h-48 opacity-10" />
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-black tracking-tighter">New Round</h2>
                  <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Stableford Index (1-45)</p>
                </div>
                <div className="bg-white/10 p-5 rounded-[1.5rem] backdrop-blur-xl shadow-2xl">
                   <Trophy size={36} className="text-accent fill-accent" />
                </div>
              </div>
            </div>
            <CardContent className="p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <Label htmlFor="date" className="text-[11px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-2">Round Timestamp</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="w-full justify-start text-left font-black rounded-[1.5rem] h-16 bg-secondary/50 border-none px-8"
                      >
                        <CalendarIcon className="mr-4 text-primary opacity-40" size={20} />
                        {date ? format(date, "PPP") : <span>Select Date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 rounded-[2rem] overflow-hidden border-none shadow-2xl" align="start">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="score" className="text-[11px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-2">Stableford Points</Label>
                  <div className="relative">
                    <Input
                      id="score"
                      type="number"
                      placeholder="Range: 1-45"
                      className="rounded-[1.5rem] h-16 pl-14 bg-secondary/50 border-none font-black text-lg"
                      value={score}
                      onChange={(e) => setScore(e.target.value)}
                    />
                    <Target className="absolute left-6 top-1/2 -translate-y-1/2 text-primary opacity-40" size={22} />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="course" className="text-[11px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-2">Course Name</Label>
                  <Input
                    id="course"
                    placeholder="Enter course..."
                    className="rounded-[1.5rem] h-16 bg-secondary/50 border-none font-black px-8"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-20 font-black uppercase tracking-[0.4em] rounded-[2rem] bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 text-xs"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Finalize Score"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="p-8 bg-primary/5 rounded-[2.5rem] flex items-start gap-6 border border-primary/5">
            <Info size={24} className="text-primary mt-1 shrink-0" />
            <div className="space-y-1">
               <p className="text-[11px] font-black text-primary/80 uppercase tracking-widest leading-relaxed">
                 Express Verification: 5-round rolling retention enforced for competitive integrity.
               </p>
               <p className="text-[9px] font-black text-accent uppercase tracking-[0.4em]">SYSTEM PROTOCOL v2.0</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-12">
          <Card className="glass-card rounded-[4rem] overflow-hidden flex flex-col min-h-[600px]">
            <CardHeader className="p-12 border-b border-secondary bg-primary/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-primary rounded-[1.5rem] text-white shadow-2xl shadow-primary/20"><History size={32} /></div>
                  <div className="space-y-1">
                    <CardTitle className="text-4xl font-black text-primary tracking-tighter">Score Logs</CardTitle>
                    <CardDescription className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground">RECENT VERIFIED ROUNDS</CardDescription>
                  </div>
                </div>
                <Badge className="bg-accent text-primary border-none px-6 py-2 rounded-full font-black uppercase tracking-widest text-[10px] shadow-lg shadow-accent/20">ACTIVE SEASON</Badge>
              </div>
            </CardHeader>
            <Table>
              <TableHeader>
                <TableRow className="bg-transparent border-secondary hover:bg-transparent">
                  <TableHead className="px-12 h-16 font-black uppercase tracking-[0.4em] text-[10px]">Round Date</TableHead>
                  <TableHead className="h-16 font-black uppercase tracking-[0.4em] text-[10px]">Verified Course</TableHead>
                  <TableHead className="text-right px-12 h-16 font-black uppercase tracking-[0.4em] text-[10px]">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scores.map((s) => (
                  <TableRow key={s.id} className="hover:bg-primary/5 transition-all border-secondary group cursor-default">
                    <TableCell className="px-12 py-10 font-black text-primary/60 text-lg tracking-tight">{format(s.date, "MMM dd, yyyy")}</TableCell>
                    <TableCell className="font-black text-primary tracking-tight text-lg">{s.course}</TableCell>
                    <TableCell className="text-right px-12">
                      <div className="inline-flex items-center gap-3">
                        <span className="text-5xl font-black text-primary tracking-tighter">{s.score}</span>
                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-40">PTS</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <CardFooter className="mt-auto p-12 bg-primary/5 flex justify-center border-t border-secondary">
               <p className="text-[11px] text-muted-foreground font-black uppercase tracking-[0.6em] italic">GoCharity Rolling Verification Engine</p>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <Card className="p-12 glass-card border-none bg-primary text-white rounded-[4rem] shadow-2xl shadow-primary/30 relative overflow-hidden group">
               <Sparkles className="absolute bottom-[-40px] right-[-40px] w-56 h-56 opacity-10 group-hover:scale-125 transition-transform duration-1000" />
               <p className="text-[11px] font-black uppercase tracking-[0.4em] opacity-60 mb-3">ROLLING AVERAGE</p>
               <div className="flex items-baseline gap-4 relative z-10">
                 <h3 className="text-7xl font-black tracking-tighter">
                   {(scores.reduce((acc, curr) => acc + curr.score, 0) / (scores.length || 1)).toFixed(1)}
                 </h3>
                 <span className="text-sm font-black uppercase tracking-widest opacity-60">Verified Index</span>
               </div>
            </Card>
            <Card className="p-12 glass-card rounded-[4rem] relative overflow-hidden group">
               <div className="absolute top-10 right-10 w-4 h-4 rounded-full bg-accent animate-pulse shadow-[0_0_30px_rgba(255,0,128,0.6)]" />
               <p className="text-[11px] font-black uppercase tracking-[0.4em] text-muted-foreground mb-3">POOL STATUS</p>
               <h3 className="text-6xl font-black text-primary tracking-tighter">Active</h3>
               <p className="text-[11px] font-black text-primary/40 uppercase tracking-[0.3em] mt-3">QUALIFIED FOR MONTHLY DRAWS</p>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}