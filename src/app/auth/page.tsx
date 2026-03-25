
"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile 
} from "firebase/auth"
import { Zap, ArrowRight, Mail, Lock, User, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { getFirebaseApp } from "@/firebase"

export default function AuthPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [isLogin, setIsLogin] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    name: ""
  })

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const auth = getAuth(getFirebaseApp())

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password)
        toast({ title: "Welcome back!", description: "Accessing GoCharity Engine..." })
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
        await updateProfile(userCredential.user, { displayName: formData.name })
        toast({ title: "Account Created", description: "Your impact journey begins." })
      }
      router.push("/dashboard")
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Auth Error",
        description: error.message || "Failed to authenticate. Please check your credentials.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-accent/10 rounded-full blur-[120px]" />

      <Link href="/" className="mb-12 flex items-center gap-4 group">
        <motion.div 
          whileHover={{ rotate: -10, scale: 1.1 }}
          className="bg-primary p-3 rounded-[1.2rem] text-white shadow-2xl shadow-primary/30"
        >
          <Zap size={24} className="fill-white" />
        </motion.div>
        <div className="flex flex-col">
          <span className="text-3xl font-black text-primary leading-none tracking-tighter">GO</span>
          <span className="text-[10px] font-black text-accent uppercase tracking-[0.3em]">CHARITY</span>
        </div>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="glass-card rounded-[4rem] border-none shadow-2xl overflow-hidden">
          <CardHeader className="bg-primary p-12 text-white text-center relative">
            <Sparkles className="absolute top-4 right-4 text-accent opacity-20" size={32} />
            <CardTitle className="text-4xl font-black tracking-tighter">
              {isLogin ? "Welcome Back" : "Join Express"}
            </CardTitle>
            <CardDescription className="text-white/60 font-black uppercase tracking-widest text-[9px] mt-2">
              {isLogin ? "Elite Impact Protocol" : "Start your impact legacy"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-12 space-y-8">
            <form onSubmit={handleAuth} className="space-y-6">
              {!isLogin && (
                <div className="space-y-2">
                  <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-primary opacity-40" size={18} />
                    <Input 
                      placeholder="Full Name" 
                      className="rounded-2xl h-14 pl-14 bg-secondary/50 border-none font-bold"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-primary opacity-40" size={18} />
                  <Input 
                    type="email" 
                    placeholder="Email Address" 
                    className="rounded-2xl h-14 pl-14 bg-secondary/50 border-none font-bold"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-primary opacity-40" size={18} />
                  <Input 
                    type="password" 
                    placeholder="Password" 
                    className="rounded-2xl h-14 pl-14 bg-secondary/50 border-none font-bold"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-16 bg-primary text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-xs"
                disabled={loading}
              >
                {loading ? "Authenticating..." : isLogin ? "Sign In" : "Create Account"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="text-center">
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-[10px] font-black uppercase tracking-widest text-primary/60 hover:text-primary transition-colors"
              >
                {isLogin ? "New here? Join Express" : "Already a member? Sign in"}
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
