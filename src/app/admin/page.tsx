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
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  Dices,
  Eye,
  LayoutGrid,
  Heart,
  Sparkles,
  Info
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
        title: isSimulation ? "Analysis Ready" : "Winners Selected!",
        description: `Successfully processed draw for ${result.winners.length} recipients.`,
      })
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Draw Error",
        description: "The AI agent was unable to finalize the selection.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AppLayout>
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold text-primary flex items-center gap-3">
              Admin Control <ShieldCheck className="text-accent" size={28} />
            </h1>
            <p className="text-muted-foreground font-medium">Strategic management of reward cycles and charity oversight.</p>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-sm">
             <ShieldCheck size={18} className="text-primary" />
             <span className="text-[10px] font-black uppercase tracking-widest text-primary">System Secure</span>
          </div>
        </div>

        <Tabs defaultValue="prize" className="w-full">
          <TabsList className="bg-white/40 backdrop-blur-md p-1.5 rounded-[2rem] border border-white/60 mb-10 inline-flex h-16 w-full md:w-auto overflow-hidden">
            <TabsTrigger value="prize" className="rounded-3xl px-10 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-xl transition-all h-full font-bold">
              <Gift className="mr-2 h-4 w-4" /> Draw Engine
            </TabsTrigger>
            <TabsTrigger value="users" className="rounded-3xl px-10 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-xl transition-all h-full font-bold">
              <Users className="mr-2 h-4 w-4" /> Players
            </TabsTrigger>
            <TabsTrigger value="charity" className="rounded-3xl px-10 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-xl transition-all h-full font-bold">
              <Heart className="mr-2 h-4 w-4" /> Charities
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prize">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-1 space-y-8">
                <Card className="glass-card rounded-[3rem] overflow-hidden">
                  <CardHeader className="bg-primary p-8 text-white relative overflow-hidden">
                    <Sparkles className="absolute top-[-20px] right-[-20px] w-32 h-32 opacity-10" />
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                       <Settings size={20} /> Parameters
                    </CardTitle>
                    <CardDescription className="text-white/60 text-[10px] font-black uppercase tracking-widest">Draw configuration engine</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 space-y-8">
                    <div className="flex items-center justify-between p-5 bg-white/40 rounded-[2rem] border border-white/60 shadow-inner">
                      <div className="space-y-0.5">
                        <Label className="text-xs font-black uppercase tracking-widest text-primary">Simulation</Label>
                        <p className="text-[9px] text-muted-foreground font-bold opacity-60 uppercase">Pre-analysis mode</p>
                      </div>
                      <Switch 
                        checked={isSimulation} 
                        onCheckedChange={setIsSimulation} 
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Draw Mechanism</Label>
                      <Select value={drawType} onValueChange={setDrawType}>
                        <SelectTrigger className="rounded-2xl h-14 bg-white/40 border-white/60 font-bold px-6">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-white/40 shadow-2xl">
                          <SelectItem value="3-Number Match" className="font-bold">3-Number Match</SelectItem>
                          <SelectItem value="4-Number Match" className="font-bold">4-Number Match</SelectItem>
                          <SelectItem value="5-Number Match" className="font-bold">5-Number Match</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">AI Logic Strategy</Label>
                      <Select value={drawStrategy} onValueChange={(v: any) => setDrawStrategy(v)}>
                        <SelectTrigger className="rounded-2xl h-14 bg-white/40 border-white/60 font-bold px-6">
                          <SelectValue placeholder="Select strategy" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-white/40 shadow-2xl">
                          <SelectItem value="random" className="font-bold">Pure Random (Equal Probability)</SelectItem>
                          <SelectItem value="algorithmic" className="font-bold">Weighted (Performance Based)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="pt-4">
                      <Button 
                        className="w-full h-16 bg-primary text-white font-black uppercase tracking-[0.2em] rounded-[2rem] shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        onClick={handleRunDraw}
                        disabled={loading}
                      >
                        {loading ? "AI Analyzing..." : isSimulation ? "Run Simulation" : "Execute Draw"}
                        {!loading && (isSimulation ? <Eye size={20} /> : <Dices size={20} />)}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="bg-primary/5 backdrop-blur-md rounded-[2.5rem] p-8 border border-primary/10 space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 text-primary">
                    <LayoutGrid size={16} /> Governance Rules
                  </h4>
                  <ul className="text-[11px] text-muted-foreground/80 font-bold space-y-3 pl-1">
                    <li className="flex items-start gap-2">
                       <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1 shrink-0" />
                       Manual verification required before payout.
                    </li>
                    <li className="flex items-start gap-2">
                       <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1 shrink-0" />
                       Simulations do not persist to database.
                    </li>
                    <li className="flex items-start gap-2">
                       <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1 shrink-0" />
                       Jackpot rollovers auto-calculate.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-2">
                {winners ? (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                     {winners.simulationNote && (
                       <div className="bg-primary/5 backdrop-blur-md border border-primary/20 text-primary p-6 rounded-[2rem] flex items-center gap-4">
                          <div className="p-3 bg-white rounded-2xl shadow-sm"><Info size={24} /></div>
                          <p className="text-sm font-black uppercase tracking-widest">{winners.simulationNote}</p>
                       </div>
                     )}
                     
                     <Card className="glass-card rounded-[3.5rem] overflow-hidden p-10">
                        <div className="flex items-center gap-6 mb-12">
                          <div className="bg-accent p-4 rounded-[1.5rem] text-primary shadow-lg shadow-accent/20">
                             <TrendingUp size={32} />
                          </div>
                          <div className="flex-1 space-y-1">
                            <h3 className="text-2xl font-bold text-primary tracking-tight">Outcome Analysis</h3>
                            <p className="text-sm text-muted-foreground font-medium">{winners.explanation}</p>
                          </div>
                          <Badge className="bg-primary/5 text-primary border-primary/20 px-6 py-2 rounded-full font-black uppercase tracking-widest text-[10px]">
                            {drawStrategy}
                          </Badge>
                        </div>

                        <div className="space-y-6">
                          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-50 ml-1">Identified Recipients</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {winners.winners.map((winner, idx) => (
                              <div key={idx} className="p-8 rounded-[2.5rem] border border-white/60 bg-white/40 hover:bg-white/60 hover:scale-[1.02] transition-all duration-500 shadow-sm relative group overflow-hidden">
                                <Sparkles className="absolute top-2 right-2 text-accent opacity-0 group-hover:opacity-40 transition-opacity" size={24} />
                                <div className="flex justify-between items-start mb-6">
                                  <Badge className="bg-accent text-primary font-black uppercase tracking-widest text-[9px] px-3 py-1 rounded-lg">ID: {idx + 1}</Badge>
                                  {winner.matchType && <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">{winner.matchType}</span>}
                                </div>
                                <h5 className="text-3xl font-bold mb-4 text-primary tracking-tighter">{winner.userId}</h5>
                                <p className="text-xs font-medium text-muted-foreground leading-relaxed">
                                  {winner.justification}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {!isSimulation && (
                          <div className="mt-16 flex justify-end gap-4 pt-10 border-t border-white/40">
                             <Button variant="outline" className="rounded-2xl px-10 h-14 font-bold bg-white/40 border-white/60" onClick={() => setWinners(null)}>Reset</Button>
                             <Button className="bg-primary text-white rounded-2xl px-12 h-14 font-black uppercase tracking-widest shadow-2xl shadow-primary/20">Publish Official Results <ArrowRight size={20} className="ml-3" /></Button>
                          </div>
                        )}
                        {isSimulation && (
                           <div className="mt-16 flex justify-center pt-10 border-t border-white/40">
                             <Button variant="ghost" className="text-muted-foreground font-bold hover:bg-white/40 rounded-2xl px-8" onClick={() => setWinners(null)}>Clear Analysis</Button>
                           </div>
                        )}
                     </Card>
                  </div>
                ) : (
                  <div className="h-full min-h-[500px] flex flex-col items-center justify-center glass-card border-dashed rounded-[4rem] p-16 text-center bg-white/20">
                    <div className="w-24 h-24 rounded-[2.5rem] bg-white/40 flex items-center justify-center text-primary/10 mb-8 border border-white/60">
                      <Dices size={48} />
                    </div>
                    <h3 className="text-2xl font-bold text-primary/40">Draw Engine Ready</h3>
                    <p className="max-w-sm mx-auto mt-4 text-sm font-medium text-muted-foreground/50 leading-relaxed">
                      Configure the selection logic and run a simulation to preview winners before finalizing the official monthly draw.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <Card className="glass-card rounded-[3rem] overflow-hidden border-none shadow-2xl">
              <div className="p-8 border-b border-white/40 bg-white/20 flex flex-col md:flex-row gap-6 items-center justify-between">
                <div className="relative w-full md:w-96">
                  <Input placeholder="Search user directory..." className="rounded-2xl pl-12 h-14 bg-white/40 border-white/60 font-bold" />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary opacity-40" size={20} />
                </div>
                <div className="flex gap-4">
                   <Button variant="outline" className="rounded-2xl h-14 px-8 bg-white/40 border-white/60 font-bold hover:bg-white/60 transition-all"><Filter className="mr-3 h-4 w-4" /> Refine</Button>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="bg-transparent border-white/20">
                    <TableHead className="px-8 font-black uppercase tracking-widest text-[10px]">Recipient</TableHead>
                    <TableHead className="font-black uppercase tracking-widest text-[10px]">Verification</TableHead>
                    <TableHead className="font-black uppercase tracking-widest text-[10px]">Handicap</TableHead>
                    <TableHead className="font-black uppercase tracking-widest text-[10px]">Participation</TableHead>
                    <TableHead className="text-right px-8 font-black uppercase tracking-widest text-[10px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_USERS.map((user) => (
                    <TableRow key={user.id} className="hover:bg-white/40 transition-all border-white/20 group cursor-pointer">
                      <TableCell className="font-bold text-primary py-6 px-8">{user.name}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === "Active" ? "default" : "secondary"} className={user.status === "Active" ? "bg-green-100 text-green-700 hover:bg-green-100 border-none px-4 py-1 rounded-full font-black uppercase tracking-widest text-[9px]" : "px-4 py-1 rounded-full font-black uppercase tracking-widest text-[9px]"}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-bold">{user.handicap}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <div className="flex-1 h-2 bg-white/40 rounded-full max-w-[120px] overflow-hidden border border-white/60 shadow-inner">
                             <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${user.score}%` }}></div>
                          </div>
                          <span className="text-[10px] font-black text-primary">{user.score}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right px-8">
                        <Button variant="ghost" className="rounded-xl font-bold text-xs hover:bg-primary/5">Manage Record</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="charity">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               <Card className="glass-card border-dashed rounded-[3rem] flex flex-col items-center justify-center p-10 text-center hover:bg-white/40 transition-all cursor-pointer group hover:scale-[1.02]">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 mb-6 shadow-inner">
                    <Heart size={32} />
                  </div>
                  <h4 className="font-bold text-xl text-primary">Onboard Charity</h4>
                  <p className="text-xs font-medium text-muted-foreground mt-3 leading-relaxed">Expand the platform's social impact and verification footprint.</p>
               </Card>
               {["PureLife Water", "Future Scholars", "GreenEarth Fund"].map((c, idx) => (
                 <Card key={idx} className="glass-card rounded-[3rem] p-8 space-y-6 hover:scale-[1.02] transition-all duration-500">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h4 className="font-bold text-xl text-primary tracking-tight">{c}</h4>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50">Authorized Partner</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700 font-black uppercase tracking-widest text-[9px] px-3 py-1 rounded-lg">LIVE</Badge>
                    </div>
                    <p className="text-xs font-medium text-muted-foreground leading-relaxed line-clamp-3">
                      Global distribution management for {c.toLowerCase()} impact projects across developed and emerging regions.
                    </p>
                    <div className="flex gap-3 pt-4">
                       <Button variant="outline" className="flex-1 rounded-2xl bg-white/40 border-white/60 font-bold text-xs h-11">Configure</Button>
                       <Button variant="outline" className="flex-1 rounded-2xl bg-white/40 border-white/60 font-bold text-xs h-11">Audit Logs</Button>
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
