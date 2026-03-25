
"use client"

import * as React from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar as CalendarIcon, Target, Trophy, Info } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"

export default function ScoreEntry() {
  const { toast } = useToast()
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [score, setScore] = React.useState("")
  const [course, setCourse] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!score || !course) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please enter both the score and the course name.",
      })
      return
    }

    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Score Submitted!",
        description: `Your score of ${score} at ${course} has been recorded.`,
      })
      setScore("")
      setCourse("")
      setLoading(false)
    }, 1500)
  }

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Score Entry</h1>
          <p className="text-muted-foreground">Submit your latest Stableford points to update your profile.</p>
        </div>

        <Card className="border-none shadow-2xl shadow-primary/5 rounded-3xl overflow-hidden bg-white">
          <div className="bg-primary p-8 text-white flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">New Round</h2>
              <p className="text-white/70 text-sm">Enter your results from the course.</p>
            </div>
            <Trophy size={40} className="text-accent" />
          </div>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      placeholder="e.g. 36"
                      className="rounded-xl h-12 pl-10"
                      value={score}
                      onChange={(e) => setScore(e.target.value)}
                    />
                    <Target className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="course">Course Name</Label>
                <Input
                  id="course"
                  placeholder="e.g. Royal St. Andrews"
                  className="rounded-xl h-12"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                />
              </div>

              <div className="p-4 bg-accent/5 rounded-2xl flex items-start gap-4">
                <Info size={20} className="text-primary mt-1 shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Stableford points are used to determine handicap adjustments and eligibility for monthly prize draws. Ensure your scores are verified by your playing partners.
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 text-lg font-bold rounded-2xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                disabled={loading}
              >
                {loading ? "Recording Score..." : "Submit Score"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
