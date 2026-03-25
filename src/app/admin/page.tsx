
"use client"

import * as React from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Users, 
  Settings, 
  Gift, 
  TrendingUp, 
  CheckCircle2, 
  Search,
  Filter,
  ArrowRight
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { prizeDrawWinnerSelection, type PrizeDrawWinnerSelectionOutput } from "@/ai/flows/prize-draw-winner-selection"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

const MOCK_USERS = [
  { id: "usr_1", name: "Alice Johnson", score: 85, handicap: 12.0, status: "Active" },
  { id: "usr_2", name: "Bob Wilson", score: 62, handicap: 18.5, status: "Active" },
  { id: "usr_3", name: "Charlie Davis", score: 45, handicap: 24.1, status: "Pending" },
  { id: "usr_4", name: "Diana Prince", score: 92, handicap: 8.2, status: "Active" },
  { id: "usr_5", name: "Evan Miller", score: 71, handicap: 15.6, status: "Active" },
]

export default function AdminPortal() {
  const { toast } = useToast()
  const [loading, setLoading] = React.useState(false)
  const [winners, setWinners] = React.useState<PrizeDrawWinnerSelectionOutput | null>(null)

  const handleRunDraw = async () => {
    setLoading(true)
    try {
      const result = await prizeDrawWinnerSelection({
        prizeDescription: "Limited Edition TaylorMade Driver & $500 Charity Donation in your name.",
        numberOfWinners: 2,
        eligibleUsers: [
          { userId: "Alice Johnson", participationScore: 85, golfScores: [36, 38, 35] },
          { userId: "Bob Wilson", participationScore: 62, golfScores: [32, 33, 30] },
          { userId: "Diana Prince", participationScore: 92, golfScores: [40, 42, 41] },
          { userId: "Evan Miller", participationScore: 71, golfScores: [35, 34, 36] },
        ]
      })
      setWinners(result)
      toast({
        title: "Draw Complete!",
        description: `Successfully selected ${result.winners.length} winners.`,
      })
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Draw Failed",
        description: "An error occurred during the winner selection process.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">Admin Portal</h1>
            <p className="text-muted-foreground">Manage platform users, subscriptions, and draws.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl border-2">
              <Settings className="mr-2 h-4 w-4" /> System Settings
            </Button>
            <Button className="rounded-xl bg-primary text-white">
              Export Data
            </Button>
          </div>
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="bg-white/50 p-1 rounded-2xl border border-border mb-8 inline-flex h-14">
            <TabsTrigger value="users" className="rounded-xl px-8 data-[state=active]:bg-primary data-[state=active]:text-white h-full">
              <Users className="mr-2 h-4 w-4" /> User Management
            </TabsTrigger>
            <TabsTrigger value="prize" className="rounded-xl px-8 data-[state=active]:bg-primary data-[state=active]:text-white h-full">
              <Gift className="mr-2 h-4 w-4" /> AI Prize Draw
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="border-none shadow-xl shadow-primary/5 rounded-2xl">
                <CardHeader className="p-6">
                  <CardTitle className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Total Users</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="text-3xl font-bold">1,284</div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-xl shadow-primary/5 rounded-2xl">
                <CardHeader className="p-6">
                  <CardTitle className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Revenue (MTD)</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="text-3xl font-bold text-primary">$34,812</div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-xl shadow-primary/5 rounded-2xl">
                <CardHeader className="p-6">
                  <CardTitle className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Active Subs</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="text-3xl font-bold">84%</div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-xl shadow-primary/5 rounded-2xl">
                <CardHeader className="p-6">
                  <CardTitle className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Charity Payout</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="text-3xl font-bold text-accent">$8,204</div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-none shadow-xl shadow-primary/5 rounded-3xl bg-white overflow-hidden">
              <div className="p-6 border-b border-border flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                  <Input placeholder="Search users by name or email..." className="rounded-xl pl-10 h-11" />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                </div>
                <div className="flex gap-2">
                   <Button variant="ghost" className="rounded-xl"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>User</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Handicap</TableHead>
                    <TableHead>Participation</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_USERS.map((user) => (
                    <TableRow key={user.id} className="hover:bg-primary/5 cursor-pointer transition-colors">
                      <TableCell className="font-bold py-4">{user.name}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === "Active" ? "default" : "secondary"} className={user.status === "Active" ? "bg-green-100 text-green-700 hover:bg-green-100 border-none" : ""}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.handicap}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-muted rounded-full max-w-[100px] overflow-hidden">
                             <div className="h-full bg-primary" style={{ width: `${user.score}%` }}></div>
                          </div>
                          <span className="text-xs font-bold">{user.score}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="rounded-lg">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="prize">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-6">
                <Card className="border-none shadow-xl shadow-primary/5 rounded-3xl bg-white overflow-hidden">
                  <CardHeader className="bg-primary text-white">
                    <CardTitle>Configure Draw</CardTitle>
                    <CardDescription className="text-white/70">Set the parameters for the AI selector.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Prize Description</label>
                      <Input defaultValue="Premium Driver & $500 Charity Grant" className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Number of Winners</label>
                      <Input type="number" defaultValue="2" className="rounded-xl" />
                    </div>
                    <div className="pt-4">
                      <Button 
                        className="w-full h-14 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                        onClick={handleRunDraw}
                        disabled={loading}
                      >
                        {loading ? "AI is Selecting..." : "Run AI Prize Draw"}
                        {!loading && <Gift size={20} />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="bg-accent/20 rounded-3xl p-6 border border-accent/30 space-y-3">
                  <h4 className="font-bold flex items-center gap-2 text-primary">
                    <CheckCircle2 size={18} /> Fair Play Guarantee
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    The AI selector considers both participation engagement and golf performance (Stableford points) to ensure a balanced selection that rewards both loyalty and skill.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-2">
                {winners ? (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                     <Card className="border-none shadow-xl shadow-primary/5 rounded-3xl bg-white p-8">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="bg-accent p-3 rounded-2xl">
                             <TrendingUp className="text-primary" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">Selection Strategy</h3>
                            <p className="text-sm text-muted-foreground">{winners.explanation}</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Selected Winners</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {winners.winners.map((winner, idx) => (
                              <div key={idx} className="p-6 rounded-[2rem] border-2 border-primary/10 bg-primary/5 hover:border-primary/30 transition-all">
                                <Badge className="bg-accent text-primary mb-3 font-bold">WINNER #{idx + 1}</Badge>
                                <h5 className="text-2xl font-bold mb-3">{winner.userId}</h5>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {winner.justification}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-12 flex justify-end gap-3">
                           <Button variant="outline" className="rounded-xl px-8" onClick={() => setWinners(null)}>Reset Draw</Button>
                           <Button className="bg-primary text-white rounded-xl px-8">Notify Winners <ArrowRight size={18} className="ml-2" /></Button>
                        </div>
                     </Card>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-border rounded-[3rem] p-12 text-center text-muted-foreground bg-white/50">
                    <Gift size={64} className="mb-4 opacity-10" />
                    <h3 className="text-xl font-bold text-foreground">No Active Draw</h3>
                    <p className="max-w-xs mx-auto mt-2">
                      Configure the prize parameters and run the AI selector to determine this month's winners.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
