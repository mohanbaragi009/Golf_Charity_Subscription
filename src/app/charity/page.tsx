
"use client"

import * as React from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, CheckCircle2, Droplets, BookOpen, TreePine } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

const CHARITIES = [
  {
    id: "water",
    name: "PureLife Water",
    icon: Droplets,
    description: "Providing sustainable clean water solutions to remote communities globally.",
    allocation: "25%",
    impact: "1 year of water per 5 subscribers",
    image: "https://picsum.photos/seed/water/600/400"
  },
  {
    id: "education",
    name: "Future Scholars",
    icon: BookOpen,
    description: "Empowering underprivileged children through quality primary education.",
    allocation: "25%",
    impact: "Full school supplies for 1 child",
    image: "https://picsum.photos/seed/edu/600/400"
  },
  {
    id: "nature",
    name: "GreenEarth Fund",
    icon: TreePine,
    description: "Restoring biodiversity through aggressive reforestation and forest protection.",
    allocation: "25%",
    impact: "10 trees planted per month",
    image: "https://picsum.photos/seed/nature/600/400"
  }
]

export default function CharitySelection() {
  const { toast } = useToast()
  const [selectedId, setSelectedId] = React.useState("water")

  const handleSelect = (id: string) => {
    setSelectedId(id)
    toast({
      title: "Charity Updated",
      description: "Your contributions will now be allocated to this foundation.",
    })
  }

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">Charity Selection</h1>
            <p className="text-muted-foreground">Choose where your subscription portion goes.</p>
          </div>
          <Card className="bg-accent/20 border-none px-6 py-4 rounded-2xl flex items-center gap-4">
            <Heart className="text-primary fill-primary" />
            <div>
              <p className="text-xs font-bold uppercase text-primary tracking-wider">Total Raised</p>
              <p className="text-xl font-bold">$12,450.00</p>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CHARITIES.map((charity) => (
            <Card 
              key={charity.id} 
              className={`overflow-hidden border-2 transition-all duration-300 rounded-3xl group ${
                selectedId === charity.id 
                  ? "border-primary shadow-2xl shadow-primary/10 scale-[1.02]" 
                  : "border-transparent bg-white shadow-xl shadow-primary/5 hover:border-primary/20"
              }`}
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image 
                  src={charity.image} 
                  alt={charity.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  data-ai-hint={charity.id === 'water' ? 'clean water' : charity.id === 'education' ? 'classroom education' : 'forest reforestation'}
                />
                {selectedId === charity.id && (
                  <div className="absolute top-4 right-4 bg-white rounded-full p-2 text-primary shadow-lg">
                    <CheckCircle2 size={24} />
                  </div>
                )}
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-white/90 backdrop-blur-sm text-primary hover:bg-white border-none font-bold">
                    {charity.allocation} Contribution
                  </Badge>
                </div>
              </div>
              <CardHeader className="space-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <charity.icon className="text-primary" size={20} />
                  <CardTitle className="text-xl">{charity.name}</CardTitle>
                </div>
                <CardDescription className="text-sm leading-relaxed">
                  {charity.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-3 bg-primary/5 rounded-xl border border-primary/10">
                  <p className="text-xs font-bold uppercase text-primary/70 mb-1 tracking-widest">Monthly Impact</p>
                  <p className="text-sm font-medium">{charity.impact}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full rounded-xl font-bold h-12 ${
                    selectedId === charity.id 
                      ? "bg-primary text-white" 
                      : "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white"
                  }`}
                  onClick={() => handleSelect(charity.id)}
                >
                  {selectedId === charity.id ? "Selected Foundation" : "Select Foundation"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
