"use client"

import * as React from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Users, 
  Settings, 
  Gift, 
  TrendingUp, 
  CheckCircle2, 
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  Dices,
  Eye,
  LayoutGrid,
  Heart
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { prizeDrawWinnerSelection, type PrizeDrawWinnerSelectionOutput } from "@/ai/flows/prize-draw-winner-selection"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
  
  // Draw Configuration States
  const [isSimulation, setIsSimulation] = React.useState(true)
  const [drawStrategy, setDrawStrategy] = React.useState<"random" | "algorithmic">("algorithmic")
  const [drawType, setDrawType] = React.useState("5-Number Match")

  const handleRunDraw = async () => {
    setLoading(true)
    try {
      const result = await prizeDrawWinnerSelection({
        prizeDescription: "Limited Edition TaylorMade Driver & $500 Charity Donation.",
        numberOfWinners: 2,
        drawType: drawType as any,
        drawStrategy: drawStrategy,
        isSimulation: isSimulation,
        eligibleUsers: [
          { userId: "Alice Johnson", participationScore: 85, golfScores: [36, 38, 35, 34, 37] },
          { userId: "Bob Wilson", participationScore: 62, golfScores: [32, 33, 30, 28, 31] },
          { userId: "Diana Prince", participationScore: 92, golfScores: [40, 42, 41, 39, 43] },
          { userId: "Evan Miller", participationScore: 71, golfScores: [35, 34, 36, 33, 35] },
        ]
      })
      setWinners(result)
      toast({
        title: isSimulation ? "Simulation Complete" : "Official Draw Complete!",
        description: `Selected ${result.winners.length} winners using ${drawStrategy} strategy.`,
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
            <p className="text-muted-foreground">Manage users, charity listings, and monthly prize draws.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl border-2">
              <Settings className="mr-2 h-4 w-4" /> System
            </Button>
            <Button className="rounded-xl bg-primary text-white">
              <ShieldCheck className="mr-2 h-4 w-4" /> Verify Payouts
            </Button>
          </div>
        </div>

        <Tabs defaultValue="prize" className="w-full">
          <TabsList className="bg-white/50 p-1 rounded-2xl border border-border mb-8 inline-flex h-14 overflow-x-auto w-full md:w-auto">
            <TabsTrigger value="prize" className="rounded-xl px-8 data-[state=active]:bg-primary data-[state=active]:text-white h-full">
              <Gift className="mr-2 h-4 w-4" /> Prize Draws
            </TabsTrigger>
            <TabsTrigger value="users" className="rounded-xl px-8 data-[state=active]:bg-primary data-[state=active]:text-white h-full">
              <Users className="mr-2 h-4 w-4" /> Users
            </TabsTrigger>
            <TabsTrigger value="charity" className="rounded-xl px-8 data-[state=active]:bg-primary data-[state=active]:text-white h-full">
              <Heart className="mr-2 h-4 w-4" /> Charities
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prize">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-6">
                <Card className="border-none shadow-xl shadow-primary/5 rounded-3xl bg-white overflow-hidden">
                  <CardHeader className="bg-primary text-white p-6">
                    <CardTitle className="text-xl flex items-center gap-2">
                       <Settings size={20} /> Configure Draw
                    </CardTitle>
                    <CardDescription className="text-white/70">Set cadence and logic parameters.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="flex items-center justify-between p-3 bg-muted/20 rounded-xl border border-border">
                      <div className="space-y-0.5">
                        <Label className="text-sm font-bold">Simulation Mode</Label>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Pre-analysis check</p>
                      </div>
                      <Switch 
                        checked={isSimulation} 
                        onCheckedChange={setIsSimulation} 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-bold">Draw Type</Label>
                      <Select value={drawType} onValueChange={setDrawType}>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3-Number Match">3-Number Match</SelectItem>
                          <SelectItem value="4-Number Match">4-Number Match</SelectItem>
                          <SelectItem value="5-Number Match">5-Number Match</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-bold">Selection Logic</Label>
                      <Select value={drawStrategy} onValueChange={(v: any) => setDrawStrategy(v)}>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Select strategy" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="random">Random Generation</SelectItem>
                          <SelectItem value="algorithmic">Algorithmic (Weighted)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="pt-4">
                      <Button 
                        className="w-full h-14 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                        onClick={handleRunDraw}
                        disabled={loading}
                      >
                        {loading ? "AI Analysis in Progress..." : isSimulation ? "Run Simulation" : "Execute Official Draw"}
                        {!loading && (isSimulation ? <Eye size={20} /> : <Dices size={20} />)}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 space-y-3">
                  <h4 className="font-bold flex items-center gap-2 text-primary">
                    <LayoutGrid size={18} /> Cadence Rules
                  </h4>
                  <ul className="text-[11px] text-muted-foreground space-y-2 list-disc pl-4">
                    <li>Monthly cadence — draws executed once per month.</li>
                    <li>Jackpot rollover to next month if no 5-match winner.</li>
                    <li>Admin must manually publish results after review.</li>
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-2">
                {winners ? (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                     {winners.simulationNote && (
                       <div className="bg-orange-50 border border-orange-200 text-orange-700 p-4 rounded-2xl flex items-center gap-3">
                          <Info size={18} />
                          <p className="text-sm font-bold">{winners.simulationNote}</p>
                       </div>
                     )}
                     
                     <Card className="border-none shadow-xl shadow-primary/5 rounded-3xl bg-white p-8">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="bg-accent p-3 rounded-2xl">
                             <TrendingUp className="text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold">Result Analysis</h3>
                            <p className="text-sm text-muted-foreground">{winners.explanation}</p>
                          </div>
                          <Badge variant="outline" className="border-primary text-primary px-4 py-1 rounded-lg">
                            {drawStrategy.toUpperCase()}
                          </Badge>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Selected Recipients</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {winners.winners.map((winner, idx) => (
                              <div key={idx} className="p-6 rounded-[2rem] border-2 border-primary/10 bg-primary/5 hover:border-primary/30 transition-all">
                                <div className="flex justify-between items-start mb-3">
                                  <Badge className="bg-accent text-primary font-bold">RECIPIENT #{idx + 1}</Badge>
                                  {winner.matchType && <span className="text-[10px] font-bold text-muted-foreground">{winner.matchType}</span>}
                                </div>
                                <h5 className="text-2xl font-bold mb-3">{winner.userId}</h5>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {winner.justification}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {!isSimulation && (
                          <div className="mt-12 flex justify-end gap-3 pt-6 border-t border-border">
                             <Button variant="outline" className="rounded-xl px-8" onClick={() => setWinners(null)}>Reset</Button>
                             <Button className="bg-primary text-white rounded-xl px-8">Publish Results <ArrowRight size={18} className="ml-2" /></Button>
                          </div>
                        )}
                        {isSimulation && (
                           <div className="mt-12 flex justify-center pt-6 border-t border-border">
                             <Button variant="ghost" className="text-muted-foreground" onClick={() => setWinners(null)}>Clear Simulation Results</Button>
                           </div>
                        )}
                     </Card>
                  </div>
                ) : (
                  <div className="h-full min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-border rounded-[3rem] p-12 text-center text-muted-foreground bg-white/50">
                    <Dices size={64} className="mb-4 opacity-10" />
                    <h3 className="text-xl font-bold text-foreground">Awaiting Configuration</h3>
                    <p className="max-w-xs mx-auto mt-2">
                      Adjust the draw strategy and match type in the side panel to simulate or run this month's official reward draw.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="users">
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

          <TabsContent value="charity">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               <Card className="border-2 border-dashed border-border rounded-3xl flex flex-col items-center justify-center p-8 text-center hover:border-primary/50 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors mb-4">
                    <Heart size={24} />
                  </div>
                  <h4 className="font-bold">Add New Charity</h4>
                  <p className="text-xs text-muted-foreground mt-2">Expand the platform's social impact footprint.</p>
               </Card>
               {["PureLife Water", "Future Scholars", "GreenEarth Fund"].map((c, idx) => (
                 <Card key={idx} className="border-none shadow-xl shadow-primary/5 rounded-3xl bg-white p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-bold text-lg">{c}</h4>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">Live</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-6 line-clamp-2">
                      Managing the distribution of funds for {c.toLowerCase()} projects globally.
                    </p>
                    <div className="flex gap-2">
                       <Button variant="outline" size="sm" className="flex-1 rounded-xl">Edit Details</Button>
                       <Button variant="outline" size="sm" className="flex-1 rounded-xl">View Impact</Button>
                    </div>
                 </Card>
               ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
