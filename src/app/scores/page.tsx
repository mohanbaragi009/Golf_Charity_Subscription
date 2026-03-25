"use client"

import * as React from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar as CalendarIcon, Target, Trophy, Info, History } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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

      // Add new score at the beginning and keep only the last 5
      const updatedScores = [newScore, ...scores].slice(0, 5)
      setScores(updatedScores)

      toast({
        title: "Score Submitted!",
        description: `Your score of ${scoreNum} has been recorded. Only your last 5 scores are retained.`,
      })
      setScore("")
      setCourse("")
      setLoading(false)
    }, 1000)
  }

  return (
    <AppLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">Score Management</h1>
            <p className="text-muted-foreground">Manage your last 5 Stableford rounds.</p>
          </div>

          <Card className="border-none shadow-2xl shadow-primary/5 rounded-3xl overflow-hidden bg-white">
            <div className="bg-primary p-6 text-white flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Submit New Round</h2>
                <p className="text-white/70 text-xs">Enter Stableford points (1-45).</p>
              </div>
              <Trophy size={32} className="text-accent" />
            </div>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date Played</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="w-full justify-start text-left font-normal rounded-xl h-12"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
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
                  <Label htmlFor="score">Stableford Points</Label>
                  <div className="relative">
                    <Input
                      id="score"
                      type="number"
                      min="1"
                      max="45"
                      placeholder="Range: 1-45"
                      className="rounded-xl h-12 pl-10"
                      value={score}
                      onChange={(e) => setScore(e.target.value)}
                    />
                    <Target className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="course">Course Name</Label>
                  <Input
                    id="course"
                    placeholder="Course name..."
                    className="rounded-xl h-12"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 font-bold rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                  disabled={loading}
                >
                  {loading ? "Recording..." : "Add Score"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="p-4 bg-accent/5 rounded-2xl flex items-start gap-3 border border-accent/20">
            <Info size={18} className="text-primary mt-1 shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>System Rule:</strong> Only the latest 5 scores are retained. Adding a new score automatically replaces the oldest one.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-xl shadow-primary/5 rounded-3xl bg-white overflow-hidden">
            <CardHeader className="border-b border-border p-6 bg-muted/10">
              <div className="flex items-center gap-2">
                <History className="text-primary" size={20} />
                <div>
                  <CardTitle className="text-xl">Your Last 5 Rounds</CardTitle>
                  <CardDescription>Displayed in reverse chronological order.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <Table>
              <TableHeader>
                <TableRow className="bg-transparent">
                  <TableHead>Date</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead className="text-right">Stableford</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scores.map((s) => (
                  <TableRow key={s.id} className="hover:bg-primary/5 transition-colors">
                    <TableCell className="font-medium">{format(s.date, "MMM dd, yyyy")}</TableCell>
                    <TableCell>{s.course}</TableCell>
                    <TableCell className="text-right font-bold text-primary">
                      {s.score} pts
                    </TableCell>
                  </TableRow>
                ))}
                {scores.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                      No scores recorded yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <CardFooter className="bg-muted/5 p-4 justify-center">
               <p className="text-xs text-muted-foreground italic">Score range: 1 (min) to 45 (max)</p>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6 border-none shadow-lg shadow-primary/5 bg-gradient-to-br from-primary to-primary/80 text-white rounded-[2rem]">
               <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Average Stableford</p>
               <h3 className="text-3xl font-bold">
                 {(scores.reduce((acc, curr) => acc + curr.score, 0) / (scores.length || 1)).toFixed(1)}
               </h3>
            </Card>
            <Card className="p-6 border-none shadow-lg shadow-primary/5 bg-white rounded-[2rem]">
               <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Status</p>
               <h3 className="text-3xl font-bold text-primary">Verified</h3>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
