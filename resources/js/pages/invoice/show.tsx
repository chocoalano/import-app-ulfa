import { Head } from "@inertiajs/react"
import { Globe, Package, Ship, Calendar, MapPin, Building2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const data = [
  {
    id: "m5gr84i9",
    nomorAju: 316,
    kodeRespon: "A",
    nomorRespon: "TEST23456",
    billOfLading: "6789987654",
    purchaseOrder: "potesting",
    invoiceNumber: "inv12345678",
    container: "asdf34567",
  },
  {
    id: "m5gr84i10",
    nomorAju: 316,
    kodeRespon: "A",
    nomorRespon: "TEST23456",
    billOfLading: "6789987654",
    purchaseOrder: "potesting",
    invoiceNumber: "inv12345678",
    container: "asdf34567",
  },
]

export default function Invoice() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-200">
      {/* Animated background gradient */}
      <div
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(113, 113, 122, 0.15), transparent 40%)`,
        }}
      />

      {/* Header */}
      <header className="relative border-b bg-white/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="h-8 w-8 text-zinc-700" />
              <span className="text-2xl font-bold bg-gradient-to-r from-zinc-800 to-zinc-600 bg-clip-text text-transparent">
                TradeFlow
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">
                Features
              </a>
              <a href="#" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">
                Solutions
              </a>
              <a href="#" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">
                How It Works
              </a>
              <a href="#" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">
                Home
              </a>
            </nav>
            <button className="px-6 py-2 bg-gradient-to-r from-zinc-800 to-zinc-700 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all">
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Title Section */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-linear-to-r from-zinc-900 to-zinc-700 bg-clip-text text-transparent">
              Tracking Details
            </h1>
            <p className="text-zinc-600">Monitor your shipment in real-time</p>
          </div>

          {/* Tracking Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm pb-3 font-medium text-slate-600 flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Custom Reference
                </CardTitle>
                <p className="text-xl font-bold text-slate-900">AJU-1001</p>
              </CardHeader>
                
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm pb-3 font-medium text-slate-600 flex items-center gap-2">
                  <Ship className="h-4 w-4" />
                  Airway Bill Number
                </CardTitle>
                <p className="text-2xl font-bold text-slate-900">123-4567890123</p>
              </CardHeader>
              {/* <CardContent>
              </CardContent> */}
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm pb-3 font-medium text-slate-600 flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Container Number
                </CardTitle>
                <p className="text-2xl font-bold text-slate-900">ABCU1234567</p>
              </CardHeader>
              {/* <CardContent>
              </CardContent> */}
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm pb-3 font-medium text-slate-600 flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Supplier
                </CardTitle>
                <p className="text-xl font-semibold text-slate-900">Global Imports Ltd.</p>
              </CardHeader>
              {/* <CardContent>
              </CardContent> */}
            </Card>

            {/* <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm pb-3 font-medium text-slate-600 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Country of Origin
                </CardTitle>
                <p className="text-xl font-semibold text-slate-900">China</p>
              </CardHeader>
              {/* <CardContent>
              </CardContent> */}
            </Card> */}

            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-sm pb-3 font-medium text-slate-600 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Estimated Delivery
                </CardTitle>
                <p className="text-xl font-semibold text-slate-900">2024-09-15</p>
              </CardHeader>
              {/* <CardContent>
              </CardContent> */}
            </Card >
            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-sm pb-3 font-medium text-slate-600 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Estimated Arrival
                </CardTitle>
                <p className="text-xl font-semibold text-slate-900">2024-09-22</p>
              </CardHeader>
              {/* <CardContent>
              </CardContent> */}
            </Card>
            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-sm pb-3 font-medium text-slate-600 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Status
                </CardTitle>
                <p className="text-xl font-semibold text-slate-900">BC 2.0</p>
              </CardHeader>
              {/* <CardContent>
              </CardContent> */}
            </Card>
          </div>

          {/* Tracking Numbers Accordion */}
          <Card className="border-zinc-200">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="tracking" className="border-0">
                <AccordionTrigger className="px-6 hover:no-underline hover:bg-zinc-50/50 rounded-t-lg">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-zinc-700" />
                    <span className="font-semibold">Tracking Numbers</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-6 pt-4">
                    {data.map((item, index) => (
                      <div key={item.id} className="p-6 bg-gradient-to-br from-zinc-50 to-zinc-100/50 rounded-lg border border-zinc-200">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-lg text-zinc-900">Shipment {index + 1}</h3>
                          <Badge variant={item.status === "BC 2.0" ? "default" : "secondary"} className="px-3 py-1">
                            {item.status}
                          </Badge>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div>
                            <p className="text-xs text-zinc-500 mb-1">Kode Respon</p>
                            <p className="font-semibold text-zinc-900">{item.kodeRespon}</p>
                          </div>
                          <div>
                            <p className="text-xs text-zinc-500 mb-1">Nomor Respon</p>
                            <p className="font-semibold text-zinc-900">{item.nomorRespon}</p>
                          </div>
                          <div>
                            <p className="text-xs text-zinc-500 mb-1">Bill of Lading</p>
                            <p className="font-semibold text-zinc-900">{item.billOfLading}</p>
                          </div>
                          <div>
                            <p className="text-xs text-zinc-500 mb-1">Purchase Order</p>
                            <p className="font-semibold text-zinc-900">{item.purchaseOrder}</p>
                          </div>
                          <div>
                            onClick={() => router.visit('/invoice')}
                            <p className="text-xs text-zinc-500 mb-1">Invoice Number</p>
                            <p className="font-semibold text-zinc-900">{item.invoiceNumber}</p>
                          </div>
                          <div>
                            <p className="text-xs text-zinc-500 mb-1">Container</p>
                            <p className="font-semibold text-zinc-900">{item.container}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        </div>
      </main>
    </div>
  )
}