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
  Info,
  DollarSign,
  PieChart,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { prizeDrawWinnerSelection, type PrizeDrawWinnerSelectionOutput } from "@/ai/flows/prize-draw-winner-selection"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts'
import { useToast } from "@/hooks/use-toast"

const MOCK_USERS = [
  { id: "usr_1", name: "Alice Johnson", email: "alice@example.com", score: 85, handicap: 12.0, status: "Active", plan: "Pro Eagle" },
  { id: "usr_2", name: "Bob Wilson", email: "bob@golf.io", score: 62, handicap: 18.5, status: "Active", plan: "Basic Birdie" },
  { id: "usr_3", name: "Charlie Davis", email: "charlie@impact.org", score: 45, handicap: 24.1, status: "Pending", plan: "Elite Albatross" },
  { id: "usr_4", name: "Diana Prince", email: "diana@themyscira.com", score: 92, handicap: 8.2, status: "Active", plan: "Pro Eagle" },
  { id: "usr_5", name: "Evan Miller", email: "evan@miller.net", score: 71, handicap: 15.6, status: "Active", plan: "Elite Albatross" },
]

const STATS_DATA = [
  { name: 'Jan', total: 4000 },
  { name: 'Feb', total: 3000 },
  { name: 'Mar', total: 2000 },
  { name: 'Apr', total: 2780 },
  { name: 'May', total: 1890 },
  { name: 'Jun', total: 2390 },
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
      <div className="space-y-10 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-primary flex items-center gap-3 tracking-tighter">
              Admin Control <ShieldCheck className="text-accent" size={28} />
            </h1>
            <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px] opacity-60">Strategic System Management Engine</p>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-sm">
             <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-widest text-primary">System Integrity Verified</span>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-white/40 backdrop-blur-md p-1.5 rounded-[2.5rem] border border-white/60 mb-12 flex h-16 w-full md:w-auto overflow-x-auto overflow-y-hidden">
            <TabsTrigger value="overview" className="rounded-3xl px-8 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-xl transition-all h-full font-black uppercase tracking-widest text-[10px]">
              <PieChart className="mr-2 h-3 w-3" /> Overview
            </TabsTrigger>
            <TabsTrigger value="prize" className="rounded-3xl px-8 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-xl transition-all h-full font-black uppercase tracking-widest text-[10px]">
              <Gift className="mr-2 h-3 w-3" /> Draw Engine
            </TabsTrigger>
            <TabsTrigger value="users" className="rounded-3xl px-8 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-xl transition-all h-full font-black uppercase tracking-widest text-[10px]">
              <Users className="mr-2 h-3 w-3" /> User Registry
            </TabsTrigger>
            <TabsTrigger value="charity" className="rounded-3xl px-8 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-xl transition-all h-full font-black uppercase tracking-widest text-[10px]">
              <Heart className="mr-2 h-3 w-3" /> Charity Config
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
             <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
                {[
                  { icon: Users, label: "Total Users", value: "1,240", sub: "+12% MoM" },
                  { icon: DollarSign, label: "Prize Pool", value: "$45,200", sub: "Ready for Draw" },
                  { icon: Heart, label: "Charity Impact", value: "$124,500", sub: "Global Reach" },
                  { icon: TrendingUp, label: "Draw Volume", value: "842", sub: "Active entries" },
                ].map((stat, i) => (
                  <Card key={i} className="glass-card rounded-[2.5rem] p-8 space-y-2 hover:scale-[1.02] transition-transform group">
                    <div className="p-3 bg-primary/5 rounded-xl w-fit group-hover:bg-primary group-hover:text-white transition-all">
                      <stat.icon size={20} />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-50">{stat.label}</p>
                    <h3 className="text-3xl font-black text-primary tracking-tighter">{stat.value}</h3>
                    <p className="text-[9px] font-black text-primary/80 uppercase tracking-widest">{stat.sub}</p>
                  </Card>
                ))}
             </div>

             <Card className="glass-card rounded-[3.5rem] p-10">
                <div className="flex items-center justify-between mb-10">
                   <div>
                      <h3 className="text-2xl font-black text-primary tracking-tight">Growth & Impact Trends</h3>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Aggregated platform analytics</p>
                   </div>
                   <Button variant="outline" className="rounded-2xl bg-white/40 border-white/60 font-bold px-6">Export PDF</Button>
                </div>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={STATS_DATA}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                      <RechartsTooltip 
                        contentStyle={{ 
                          borderRadius: '20px', 
                          border: 'none', 
                          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                          backdropFilter: 'blur(20px)',
                          background: 'rgba(255,255,255,0.8)'
                        }} 
                      />
                      <Bar dataKey="total" radius={[10, 10, 0, 0]}>
                        {STATS_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index % 2 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--accent))'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
             </Card>
          </TabsContent>

          <TabsContent value="prize">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-1 space-y-8">
                <Card className="glass-card rounded-[3.5rem] overflow-hidden">
                  <CardHeader className="bg-primary p-8 text-white relative overflow-hidden">
                    <Sparkles className="absolute top-[-20px] right-[-20px] w-32 h-32 opacity-10" />
                    <CardTitle className="text-xl font-black tracking-tight flex items-center gap-2">
                       <Settings size={20} /> Draw Engine Config
                    </CardTitle>
                    <CardDescription className="text-white/60 text-[9px] font-black uppercase tracking-widest mt-1">Algorithmic parameter input</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 space-y-8">
                    <div className="flex items-center justify-between p-6 bg-white/40 rounded-[2.5rem] border border-white/60 shadow-inner">
                      <div className="space-y-0.5">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-primary">Simulation Mode</Label>
                        <p className="text-[8px] text-muted-foreground font-bold opacity-60 uppercase">Pre-analysis check</p>
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
                        className="w-full h-16 bg-primary text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        onClick={handleRunDraw}
                        disabled={loading}
                      >
                        {loading ? "AI Analyzing..." : isSimulation ? "Run Simulation" : "Execute Draw"}
                        {!loading && (isSimulation ? <Eye size={20} /> : <Dices size={20} />)}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="bg-primary/5 backdrop-blur-md rounded-[3rem] p-10 border border-primary/10 space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 text-primary">
                    <LayoutGrid size={16} /> Governance Protocols
                  </h4>
                  <ul className="text-[10px] text-muted-foreground/80 font-bold space-y-4 pl-1">
                    <li className="flex items-start gap-3">
                       <CheckCircle2 size={14} className="text-primary mt-0.5 shrink-0" />
                       Manual verification of handicap required before payout.
                    </li>
                    <li className="flex items-start gap-3">
                       <CheckCircle2 size={14} className="text-primary mt-0.5 shrink-0" />
                       Simulations do not persist to database or affect scores.
                    </li>
                    <li className="flex items-start gap-3">
                       <CheckCircle2 size={14} className="text-primary mt-0.5 shrink-0" />
                       Audit logs generated for every official draw execution.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-2">
                {winners ? (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                     {winners.simulationNote && (
                       <div className="bg-accent/10 backdrop-blur-md border border-accent/20 text-primary p-6 rounded-[2.5rem] flex items-center gap-4">
                          <div className="p-3 bg-white rounded-2xl shadow-sm"><Info size={24} className="text-accent" /></div>
                          <p className="text-xs font-black uppercase tracking-widest leading-relaxed">{winners.simulationNote}</p>
                       </div>
                     )}
                     
                     <Card className="glass-card rounded-[4rem] overflow-hidden p-12">
                        <div className="flex items-center gap-6 mb-12">
                          <div className="bg-accent p-4 rounded-[1.5rem] text-primary shadow-lg shadow-accent/20">
                             <TrendingUp size={32} />
                          </div>
                          <div className="flex-1 space-y-1">
                            <h3 className="text-3xl font-black text-primary tracking-tighter">Outcome Analysis</h3>
                            <p className="text-sm text-muted-foreground font-medium leading-relaxed">{winners.explanation}</p>
                          </div>
                        </div>

                        <div className="space-y-8">
                          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 ml-1">Identified Recipients</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {winners.winners.map((winner, idx) => (
                              <div key={idx} className="p-10 rounded-[3.5rem] border border-white/60 bg-white/40 hover:bg-white/60 hover:scale-[1.02] transition-all duration-500 shadow-sm relative group overflow-hidden">
                                <Sparkles className="absolute top-4 right-4 text-accent opacity-0 group-hover:opacity-40 transition-opacity" size={24} />
                                <div className="flex justify-between items-start mb-6">
                                  <Badge className="bg-accent text-primary font-black uppercase tracking-widest text-[9px] px-3 py-1.5 rounded-lg">ID: {idx + 1}</Badge>
                                  {winner.matchType && <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-40">{winner.matchType}</span>}
                                </div>
                                <h5 className="text-4xl font-black mb-4 text-primary tracking-tighter">{winner.userId}</h5>
                                <p className="text-xs font-bold text-muted-foreground/70 leading-relaxed uppercase tracking-widest">
                                  {winner.justification}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {!isSimulation && (
                          <div className="mt-16 flex justify-end gap-6 pt-12 border-t border-white/40">
                             <Button variant="ghost" className="rounded-2xl px-10 h-16 font-black uppercase tracking-widest text-[10px]" onClick={() => setWinners(null)}>Cancel</Button>
                             <Button className="bg-primary text-white rounded-2xl px-16 h-16 font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30">Publish Official Results <ArrowRight size={20} className="ml-3" /></Button>
                          </div>
                        )}
                        {isSimulation && (
                           <div className="mt-16 flex justify-center pt-12 border-t border-white/40">
                             <Button variant="outline" className="text-muted-foreground font-black uppercase tracking-widest text-[10px] hover:bg-white/40 rounded-2xl px-12 h-14 border-white/60" onClick={() => setWinners(null)}>Clear Analysis</Button>
                           </div>
                        )}
                     </Card>
                  </div>
                ) : (
                  <div className="h-full min-h-[600px] flex flex-col items-center justify-center glass-card border-dashed rounded-[4rem] p-20 text-center bg-white/20">
                    <div className="w-28 h-28 rounded-[3rem] bg-white/40 flex items-center justify-center text-primary/10 mb-10 border border-white/60 shadow-inner">
                      <Dices size={56} />
                    </div>
                    <h3 className="text-3xl font-black text-primary/30 tracking-tight">Draw Engine Standby</h3>
                    <p className="max-w-md mx-auto mt-6 text-sm font-bold text-muted-foreground/40 uppercase tracking-widest leading-loose">
                      Select selection logic and run a simulation to preview potential winners before finalizing the official monthly draw.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <Card className="glass-card rounded-[3.5rem] overflow-hidden border-none shadow-2xl">
              <div className="p-10 border-b border-white/40 bg-white/20 flex flex-col md:flex-row gap-8 items-center justify-between">
                <div className="relative w-full md:w-96">
                  <Input placeholder="Search user directory..." className="rounded-2xl pl-14 h-16 bg-white/40 border-white/60 font-bold placeholder:opacity-50" />
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-primary opacity-40" size={24} />
                </div>
                <div className="flex gap-4">
                   <Button variant="outline" className="rounded-2xl h-16 px-10 bg-white/40 border-white/60 font-black uppercase tracking-widest text-[10px] hover:bg-white/60 transition-all"><Filter className="mr-3 h-4 w-4" /> Refine</Button>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="bg-transparent border-white/20">
                    <TableHead className="px-10 py-6 font-black uppercase tracking-[0.2em] text-[10px]">User Profile</TableHead>
                    <TableHead className="font-black uppercase tracking-[0.2em] text-[10px]">Status</TableHead>
                    <TableHead className="font-black uppercase tracking-[0.2em] text-[10px]">Plan</TableHead>
                    <TableHead className="font-black uppercase tracking-[0.2em] text-[10px]">Handicap</TableHead>
                    <TableHead className="text-right px-10 font-black uppercase tracking-[0.2em] text-[10px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_USERS.map((user) => (
                    <TableRow key={user.id} className="hover:bg-white/40 transition-all border-white/20 group cursor-pointer">
                      <TableCell className="py-8 px-10">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center font-black text-primary border border-primary/10">
                              {user.name.split(' ').map(n => n[0]).join('')}
                           </div>
                           <div className="flex flex-col">
                             <span className="font-black text-primary tracking-tight">{user.name}</span>
                             <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-60 tracking-widest">{user.email}</span>
                           </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === "Active" ? "default" : "secondary"} className={user.status === "Active" ? "bg-primary/10 text-primary border-none px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[9px]" : "px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[9px]"}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-bold text-[10px] uppercase tracking-widest text-primary/70">{user.plan}</TableCell>
                      <TableCell className="font-black text-primary">{user.handicap}</TableCell>
                      <TableCell className="text-right px-10">
                        <div className="flex items-center justify-end gap-2">
                           <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/5"><Edit2 size={16} /></Button>
                           <Button variant="ghost" size="icon" className="rounded-xl hover:bg-destructive/5 text-destructive"><Trash2 size={16} /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="charity">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
               <Card className="glass-card border-dashed rounded-[3.5rem] flex flex-col items-center justify-center p-16 text-center hover:bg-white/40 transition-all cursor-pointer group hover:scale-[1.02]">
                  <div className="w-20 h-20 rounded-[2rem] bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 mb-8 shadow-inner">
                    <Heart size={40} />
                  </div>
                  <h4 className="font-black text-2xl text-primary tracking-tight">Onboard Partner</h4>
                  <p className="text-[10px] font-bold text-muted-foreground mt-4 leading-relaxed uppercase tracking-[0.2em] opacity-60">Expand social impact network</p>
               </Card>
               {["PureLife Water", "Future Scholars", "GreenEarth Fund"].map((c, idx) => (
                 <Card key={idx} className="glass-card rounded-[3.5rem] p-10 space-y-8 hover:scale-[1.02] transition-all duration-500 relative overflow-hidden group">
                    <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-primary/5 rounded-full blur-[40px] group-hover:bg-accent/10 transition-colors" />
                    <div className="flex justify-between items-start relative z-10">
                      <div className="space-y-1">
                        <h4 className="font-black text-2xl text-primary tracking-tighter">{c}</h4>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-40">Verified NGO Partner</p>
                      </div>
                      <Badge className="bg-primary/10 text-primary font-black uppercase tracking-widest text-[9px] px-4 py-1.5 rounded-full">ACTIVE</Badge>
                    </div>
                    <p className="text-xs font-bold text-muted-foreground/60 leading-relaxed uppercase tracking-widest line-clamp-3">
                      Global distribution management for {c.toLowerCase()} impact projects across developed and emerging regions.
                    </p>
                    <div className="flex gap-4 pt-4 relative z-10">
                       <Button variant="outline" className="flex-1 rounded-2xl bg-white/40 border-white/60 font-black uppercase tracking-widest text-[10px] h-14">Edit Content</Button>
                       <Button variant="outline" className="flex-1 rounded-2xl bg-white/40 border-white/60 font-black uppercase tracking-widest text-[10px] h-14">Audit Logs</Button>
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
