"use client"

import { useRouter } from "next/navigation";
import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Brain,
  TrendingUp,
  Users,
  DollarSign,
  BarChart3,
  Globe,
  Zap,
  CheckCircle,
  Clock,
  AlertCircle,
  Star,
  ArrowRight,
  Cpu,
  Network,
  Database,
  Shield,
} from "lucide-react"

export default function FuturisticAICollaboration() {
  const [startupIdea, setStartupIdea] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const router = useRouter();
const handleAnalyze = () => {
  if (!startupIdea.trim()) return;
  setIsAnalyzing(true);

  // Redirect to /result with the idea
  router.push(`/result?idea=${encodeURIComponent(startupIdea)}`);
};

  const agents = [
    {
      name: "Market Researcher",
      status: "completed" as const,
      icon: TrendingUp,
      progress: 100,
      description: "Analyzing market trends and opportunities",
    },
    {
      name: "Competitor Analyst",
      status: "active" as const,
      icon: Users,
      progress: 75,
      description: "Scanning competitive landscape",
    },
    {
      name: "Financial Modeler",
      status: "pending" as const,
      icon: DollarSign,
      progress: 0,
      description: "Building financial projections",
    },
    {
      name: "Report Generator",
      status: "pending" as const,
      icon: BarChart3,
      progress: 0,
      description: "Synthesizing comprehensive report",
    },
  ]

  const features = [
    {
      icon: Brain,
      title: "Neural Network Analysis",
      description: "Advanced AI algorithms process vast datasets to identify market patterns and opportunities",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      icon: Network,
      title: "Multi-Agent Coordination",
      description: "Specialized AI agents collaborate seamlessly to deliver comprehensive business intelligence",
      gradient: "from-lime-500 to-green-500",
    },
    {
      icon: Database,
      title: "Real-Time Data Processing",
      description: "Live market data integration ensures your analysis is always current and actionable",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade encryption and privacy controls protect your sensitive business information",
      gradient: "from-orange-500 to-red-500",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Founder, TechStart",
      content:
        "The AI analysis helped us identify a $50M market opportunity we completely missed. Game-changing insights.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "CEO, InnovateLab",
      content: "What would have taken our team months of research was completed in minutes with incredible accuracy.",
      rating: 5,
    },
    {
      name: "Emily Watson",
      role: "Venture Partner, FutureVC",
      content: "I use this for due diligence on every startup pitch. The depth of analysis is remarkable.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-background particle-bg overflow-hidden">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 w-full z-50 glassmorphism border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.05 }}>
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-lime-500 rounded-xl flex items-center justify-center glow-effect">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold neon-glow">AI Nexus</span>
            </motion.div>
            <div className="flex items-center space-x-6">
              {["Dashboard", "Agents", "Analytics", "Settings"].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                  >
                    {item}
                  </Button>
                </motion.div>
              ))}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Avatar className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 glow-effect">
                  <AvatarFallback className="bg-transparent text-white font-semibold">AI</AvatarFallback>
                </Avatar>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <motion.div className="absolute inset-0 opacity-30" style={{ y }}>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-lime-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        </motion.div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 glassmorphism px-6 py-3 rounded-full text-cyan-400 mb-8 border border-cyan-500/30"
          >
            <Zap className="w-5 h-5 text-lime-400" />
            <span className="font-medium">Next-Gen Multi-Agent AI System</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
          >
            <span className="neon-glow">Transform Ideas Into</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-lime-400 to-purple-400 bg-clip-text text-transparent">
              Intelligence
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Experience the future of business analysis with our revolutionary multi-agent AI collaboration system. Watch
            specialized AI agents work in perfect harmony to deliver unprecedented insights.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <div className="glassmorphism rounded-2xl p-6 border border-white/10">
              <Textarea
                placeholder="Describe your revolutionary startup idea... (e.g., AI-powered sustainable energy marketplace connecting renewable producers with smart cities)"
                value={startupIdea}
                onChange={(e) => setStartupIdea(e.target.value)}
                className="min-h-[120px] text-base bg-transparent border-0 text-white placeholder:text-white/50 resize-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleAnalyze}
                disabled={!startupIdea.trim() || isAnalyzing}
                size="lg"
                className="px-12 py-4 text-lg font-semibold bg-gradient-to-r from-cyan-500 to-lime-500 hover:from-cyan-400 hover:to-lime-400 text-black border-0 rounded-xl glow-effect hover-glow transition-all duration-300"
              >
                {isAnalyzing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Cpu className="w-6 h-6 mr-3" />
                    </motion.div>
                    Agents Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="w-6 h-6 mr-3" />
                    Launch AI Analysis
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {(isAnalyzing || analysisComplete) && (
        <motion.section
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-20 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 neon-glow">AI Agents in Action</h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Watch our specialized agents collaborate in real-time to analyze your startup idea
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {agents.map((agent, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="group"
                >
                  <Card className="glassmorphism border-white/10 hover-glow transition-all duration-500 h-full">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <motion.div
                          className="p-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-lime-500/20 border border-cyan-500/30"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <agent.icon className="w-8 h-8 text-cyan-400" />
                        </motion.div>
                        <Badge
                          variant="secondary"
                          className={`
                            ${agent.status === "completed" ? "bg-lime-500/20 text-lime-400 border-lime-500/30" : ""}
                            ${agent.status === "active" ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" : ""}
                            ${agent.status === "pending" ? "bg-white/10 text-white/60 border-white/20" : ""}
                            glassmorphism
                          `}
                        >
                          {agent.status === "completed" && <CheckCircle className="w-3 h-3 mr-1" />}
                          {agent.status === "active" && (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            >
                              <Clock className="w-3 h-3 mr-1" />
                            </motion.div>
                          )}
                          {agent.status === "pending" && <AlertCircle className="w-3 h-3 mr-1" />}
                          {agent.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl text-white group-hover:text-cyan-400 transition-colors">
                        {agent.name}
                      </CardTitle>
                      <CardDescription className="text-white/60">{agent.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Progress value={agent.progress} className="h-2 bg-white/10" />
                        <p className="text-sm text-white/70">{agent.progress}% complete</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 neon-glow">Revolutionary Capabilities</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Experience the next generation of AI-powered business intelligence with cutting-edge features
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="group cursor-pointer"
              >
                <Card className="glassmorphism border-white/10 hover-glow transition-all duration-500 h-full p-8">
                  <div className="flex items-start space-x-6">
                    <motion.div
                      className={`p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} glow-effect`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-white/70 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 neon-glow">Trusted by Innovators</h2>
            <p className="text-xl text-white/70">
              Join thousands of entrepreneurs who've transformed their ideas with AI
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group"
              >
                <Card className="glassmorphism border-white/10 hover-glow transition-all duration-500 h-full p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Star className="w-5 h-5 text-lime-400 fill-current" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-white/80 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500">
                      <AvatarFallback className="bg-transparent text-white font-semibold">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-white">{testimonial.name}</p>
                      <p className="text-sm text-white/60">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <motion.div className="flex items-center space-x-3 mb-6" whileHover={{ scale: 1.05 }}>
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-lime-500 rounded-2xl flex items-center justify-center glow-effect">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-bold neon-glow">AI Nexus</span>
              </motion.div>
              <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-md">
                Pioneering the future of business intelligence through revolutionary multi-agent AI collaboration.
              </p>
              <div className="flex space-x-4">
                {[Globe, Network, Database, Shield].map((Icon, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 glassmorphism rounded-xl border border-white/10 hover-glow cursor-pointer"
                  >
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 text-lg">Platform</h4>
              <ul className="space-y-3">
                {["AI Agents", "Analytics", "Integrations", "API Access"].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href="#"
                      className="text-white/70 hover:text-cyan-400 transition-colors duration-300 flex items-center group"
                    >
                      <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 text-lg">Company</h4>
              <ul className="space-y-3">
                {["About", "Careers", "Research", "Contact"].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href="#"
                      className="text-white/70 hover:text-lime-400 transition-colors duration-300 flex items-center group"
                    >
                      <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="border-t border-white/10 mt-16 pt-8 text-center"
          >
            <p className="text-white/50">© 2024 AI Nexus. Shaping the future of artificial intelligence.</p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  )
}


