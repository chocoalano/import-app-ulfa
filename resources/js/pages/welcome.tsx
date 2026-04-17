import React from "react"
import { usePage, router } from "@inertiajs/react"
import { Globe, BarChart3, Truck, Layers, ArrowRight, Shield, Clock, Users, CheckCircle2, TrendingUp, Package, FileText, Zap } from "lucide-react"
import trackingForm from "@/components/ui/trackingForm"
import TrackingForm from "@/components/ui/trackingForm"

const features = [
  {
    icon: <Truck className="w-5 h-5" />,
    title: "Real-Time Tracking",
    desc: "Monitor every shipment from departure to arrival.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Layers className="w-5 h-5" />,
    title: "Smart PO Management",
    desc: "Centralize all purchase orders and sync entire supply chain.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: "Analytics Dashboard",
    desc: "Get actionable insights with visual reports.",
    gradient: "from-amber-500 to-orange-500"
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Compliance & Documentation",
    desc: "Automate customs documentation, ensure regulatory compliance.",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Team Collaboration",
    desc: "Share and maintain transparency across departments.",
    gradient: "from-rose-500 to-red-500"
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: "Delay Alerts",
    desc: "Receive instant notifications about delays.",
    gradient: "from-indigo-500 to-blue-500"
  }
]
export default function LandingPage() {
  const [activeTab, setActiveTab] = React.useState("exporters")
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    setIsVisible(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-40 bg-white/95 border-b border-slate-200 shadow-sm">
        <div className="container mx-auto flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-linear-to-br from-zinc-700 to-zinc-900 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">TradeFlow</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#features" className="hover:text-zinc-700 transition">Features</a>
            <a href="#solutions" className="hover:text-zinc-700 transition">Solutions</a>
            <a href="#how-it-works" className="hover:text-zinc-700 transition">How It Works</a>
            <a href="#home" className="hover:text-zinc-700 transition">Home</a>
          </nav>
          <div className="flex gap-3">
            <button
              onClick={() => router.visit('/login')}
              className="px-6 py-2 bg-linear-to-br from-zinc-700 to-zinc-900 text-white rounded-lg hover:shadow-lg transition font-medium text-sm"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-linear-to-br from-slate-50 via-white to-zinc-50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute w-125 h-125 bg-linear-to-br from-zinc-200/30 to-zinc-300/30 rounded-full blur-3xl"
            style={{
              top: '10%',
              left: mousePosition.x * 0.02 + '%',
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          />
          <div 
            className="absolute w-100 h-100 bg-linear-to-l from-zinc-300/20 to-zinc-400/20 rounded-full blur-3xl"
            style={{
              bottom: '10%',
              right: mousePosition.x * -0.01 + '%',
              transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          />
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-zinc-400/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>

        <div className="container mx-auto grid lg:grid-cols-2 gap-16 px-6 py-5 lg:py-16 items-center relative z-10">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 bg-zinc-100 px-4 py-2 rounded-full mb-6 animate-slideDown">
              <Zap className="w-4 h-4 text-zinc-700 animate-pulse" />
              <span className="text-sm font-semibold text-zinc-700">
                Make work easy
              </span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Simplify Your
              <span className="block text-transparent bg-clip-text bg-linear-to-br from-zinc-700 to-zinc-900 animate-gradient">
                Global Trade Operations
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-xl leading-relaxed">
              Track shipments in real-time, manage purchase orders seamlessly, and gain complete visibility across your international supply chain—all from one powerful platform.
            </p>
            {/* tracking field */}
            <TrackingForm />

            {/* <div className="mt-10 flex items-center gap-8 text-sm">
              <div className="flex items-center gap-2 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-slate-600">No credit card required</span>
              </div>
              <div className="flex items-center gap-2 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-slate-600">14-day free trial</span>
              </div>
            </div> */}
          </div>

          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="absolute -inset-4 bg-linear-to-br from-zinc-200 to-zinc-300 blur-3xl rounded-full opacity-50 animate-pulse" />
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-slate-200 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b">
                  <span className="text-sm font-semibold text-slate-700">Live Shipment Status</span>
                  <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full animate-pulse">On Time</span>
                </div>
                <div className="space-y-3">
                  {[
                    { status: "Departed", location: "Shanghai Port", time: "2 days ago", done: true, delay: "0s" },
                    { status: "In Transit", location: "Pacific Ocean", time: "Current", done: true, delay: "0.1s" },
                    { status: "Customs Clearance", location: "Los Angeles", time: "Pending", done: false, delay: "0.2s" },
                    { status: "Final Delivery", location: "Warehouse", time: "Expected Jan 25", done: false, delay: "0.3s" },
                  ].map((step, i) => (
                    <div 
                      key={i} 
                      className="flex items-center gap-4 group hover:bg-slate-50 p-2 rounded-lg transition-all duration-300 animate-slideRight"
                      style={{ animationDelay: step.delay }}
                    >
                      <div className={`w-3 h-3 rounded-full transition-all duration-500 ${step.done ? 'bg-zinc-700 animate-ping-slow' : 'bg-slate-300'}`} />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className={`text-sm font-medium transition-colors ${step.done ? 'text-slate-900' : 'text-slate-400'} group-hover:text-zinc-700`}>
                            {step.status}
                          </span>
                          <span className="text-xs text-slate-500">{step.time}</span>
                        </div>
                        <div className="text-xs text-slate-500 mt-1">{step.location}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating metrics cards */}
            <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4 border border-slate-200 animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">On-Time Rate</div>
                  <div className="text-lg font-bold text-slate-900">98.5%</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-slate-200 animate-float" style={{ animationDelay: '2s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">Active Shipments</div>
                  <div className="text-lg font-bold text-slate-900">247</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideRight {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes gradient {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          @keyframes ping-slow {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animate-slideDown {
            animation: slideDown 0.8s ease-out;
          }
          .animate-slideRight {
            animation: slideRight 0.8s ease-out;
          }
          .animate-fadeIn {
            animation: fadeIn 1s ease-out;
            opacity: 0;
            animation-fill-mode: forwards;
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 3s ease infinite;
          }
          .animate-ping-slow {
            animation: ping-slow 2s ease-in-out infinite;
          }
        `}</style>
      </section>

      {/* ================= STATS ================= */}
      <section className="bg-linear-to-br from-zinc-700 to-zinc-900 py-5">
        <div className="container mx-auto px-3">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold">10K+</div>
              <div className="text-sm opacity-90 mt-2">Active Shipments</div>
            </div>
            <div>
              <div className="text-4xl font-bold">150+</div>
              <div className="text-sm opacity-90 mt-2">Countries Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold">99.9%</div>
              <div className="text-sm opacity-90 mt-2">Tracking Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold">24/7</div>
              <div className="text-sm opacity-90 mt-2">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="py-18 bg-white overflow-hidden">
        <div className="container mx-10 px-6 mb-2">
          <div className="text-center max-w-3xl mx-auto mb-4">
            <h2 className="text-4xl font-bold mb-2">
              Powerful Features
            </h2>
            <p className="text-lg text-slate-600">
              Powerful features designed to streamline your export-import operations and keep you in control
            </p>
          </div>

          <div className="relative">
            {/* First Row - Scroll Right */}
            <div className="flex gap-6 animate-scroll-right mb-4">
              {[...features, ...features].map((feature, idx) => (
                <div key={idx} className="min-w-87.5">
                  <FeatureCard
                    icon={feature.icon}
                    title={feature.title}
                    desc={feature.desc}
                    gradient={feature.gradient}
                  />
                </div>
              ))}
            </div>

            {/* Second Row - Scroll Left */}
            <div className="flex gap-6 animate-scroll-left">
              {[...features, ...features].map((feature, idx) => (
                <div key={idx} className="min-w-87.5">
                  <FeatureCard
                    icon={feature.icon}
                    title={feature.title}
                    desc={feature.desc}
                    gradient={feature.gradient}
                    className="max-h-48"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes scroll-right {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes scroll-left {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-scroll-right {
            animation: scroll-right 30s linear infinite;
          }
          .animate-scroll-left {
            animation: scroll-left 30s linear infinite;
          }
          .animate-scroll-right:hover,
          .animate-scroll-left:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* ================= SOLUTIONS ================= */}
      <section id="solutions" className="py-18 bg-slate-50 mb-0">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-4xl font-bold mb-4">Built for Every Trade Role</h2>
            <p className="text-lg text-slate-600">
              Whether you're an exporter, importer, or logistics provider, we have solutions tailored for you
            </p>
          </div>

          <div className="flex justify-center gap-4 mb-10">
            {["exporters", "importers", "logistics"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg font-medium capitalize transition ${
                  activeTab === tab
                    ? "bg-zinc-700 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {activeTab === "exporters" && (
                <>
                  <SolutionPoint
                    icon={<Package />}
                    title="Multi-Shipment Dashboard"
                    desc="Manage hundreds of export shipments simultaneously with a unified view"
                  />
                  <SolutionPoint
                    icon={<FileText />}
                    title="Document Automation"
                    desc="Generate commercial invoices, packing lists, and certificates instantly"
                  />
                  <SolutionPoint
                    icon={<TrendingUp />}
                    title="Performance Analytics"
                    desc="Track on-time delivery rates, identify bottlenecks, and optimize routes"
                  />
                </>
              )}
              {activeTab === "importers" && (
                <>
                  <SolutionPoint
                    icon={<Clock />}
                    title="Customs Clearance Tracking"
                    desc="Monitor customs status and receive alerts for clearance delays"
                  />
                  <SolutionPoint
                    icon={<Shield />}
                    title="Supplier Reliability Scores"
                    desc="Evaluate vendor performance based on historical delivery data"
                  />
                  <SolutionPoint
                    icon={<BarChart3 />}
                    title="Cost Analysis"
                    desc="Break down total landed costs and identify savings opportunities"
                  />
                </>
              )}
              {activeTab === "logistics" && (
                <>
                  <SolutionPoint
                    icon={<Globe />}
                    title="Multi-Modal Tracking"
                    desc="Track shipments across sea, air, rail, and road with one platform"
                  />
                  <SolutionPoint
                    icon={<Users />}
                    title="Client Portal"
                    desc="Give customers real-time access to their shipment information"
                  />
                  <SolutionPoint
                    icon={<Zap />}
                    title="Route Optimization"
                    desc="AI-powered suggestions for faster, more cost-effective routing"
                  />
                </>
              )}
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-3 border border-slate-200">
              <div className="aspect-video bg-linear-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Globe className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
                  <p className="text-slate-600">Interactive Demo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how-it-works" className=" bg-white">
        <div className="container mx-auto px-6 pb-4">
          <div className="text-center max-w-3xl mx-auto mb-2 mt-2 py-13">
            <h2 className="text-4xl font-bold mb-4">Get Started in Minutes</h2>
            <p className="text-lg text-slate-600">
              Simple setup process to get your entire team up and running
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Connect Your Data",
                desc: "Import existing shipments and POs via CSV, API, or manual entry",
              },
              {
                step: "02",
                title: "Configure Tracking",
                desc: "Set up automated notifications and customize your dashboard views",
              },
              {
                step: "03",
                title: "Start Managing",
                desc: "Monitor shipments, collaborate with your team, and optimize operations",
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-bold text-zinc-200 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
                {i < 2 && (
                  <ArrowRight className="hidden md:block absolute top-12 -right-8 w-5 h-5 text-zinc-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      {/* <section className="py-24 bg-linear-to-br from-zinc-700 to-zinc-900 text-white">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Trade Operations?</h2>
          <p className="text-lg mb-10 opacity-90">
            Join hundreds of companies already managing their global shipments smarter with TradeFlow
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-zinc-700 rounded-lg hover:shadow-2xl transition font-semibold">
              Start Free Trial
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition font-semibold">
              Schedule Demo
            </button>
          </div>
        </div>
      </section> */}

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-900 text-slate-300">
        <div className="container mx-auto px-6 py-8 grid md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-zinc-700 to-zinc-900 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">TradeFlow</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              The modern platform for seamless export-import operations and complete supply chain visibility.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-zinc-300 cursor-pointer transition">Features</li>
              <li className="hover:text-zinc-300 cursor-pointer transition">Home</li>
              <li className="hover:text-zinc-300 cursor-pointer transition">Integrations</li>
              <li className="hover:text-zinc-300 cursor-pointer transition">API</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-zinc-300 cursor-pointer transition">Documentation</li>
              <li className="hover:text-zinc-300 cursor-pointer transition">Blog</li>
              <li className="hover:text-zinc-300 cursor-pointer transition">Case Studies</li>
              <li className="hover:text-zinc-300 cursor-pointer transition">Support</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-zinc-300 cursor-pointer transition">About Us</li>
              <li className="hover:text-zinc-300 cursor-pointer transition">Careers</li>
              <li className="hover:text-zinc-300 cursor-pointer transition">Contact</li>
              <li className="hover:text-zinc-300 cursor-pointer transition">Privacy Policy</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 py-3 text-center text-xs text-slate-500">
          © 2026 TradeFlow. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, desc, gradient }: any) {
  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 border border-slate-100 hover:border-transparent hover:-translate-y-1">
      <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{desc}</p>
    </div>
  )
}

function SolutionPoint({ icon, title, desc }: any) {
  return (
    <div className="flex gap-4">
      <div className="w-12 h-12 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-700 shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-lg mb-2">{title}</h4>
        <p className="text-slate-600">{desc}</p>
      </div>
    </div>
  )
}