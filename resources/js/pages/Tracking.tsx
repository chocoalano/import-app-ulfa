import {
  Globe, Package, Ship, Calendar, Building2
} from "lucide-react"
import { useEffect, useState } from "react"
import { usePage, router } from "@inertiajs/react"

import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from "@/components/ui/accordion"

import {
  Card, CardContent, CardHeader, CardTitle, CardDescription
} from "@/components/ui/card"

import { ShippingsTable, type Shipping } from "@/components/ui/shipping-table"
import { Input } from "@/components/ui/input"

import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

type Shipment = {
  id: number
  bl_number: string
  container_number: string
  supplier_name: string
  invoice_id: number
  purchase_order_id: string
  custom_reference: string
  pod: string
  pol: string
  etd: string
  eta: string
  carrier: string
  nomor_respon: string
  status: string
  invoice?: {
    id: number
    invoice_number: string
  }
}

type PageProps = {
  shipments: Shipment[]
}



export default function Tracking() {
 
  const { shipments } = usePage<PageProps>().props

  const [query, setQuery] = useState("")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) =>
      setMousePosition({ x: e.clientX, y: e.clientY })

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleSearch = (value: string) => {
    setQuery(value)

    router.get('/tracking/search', {
      keyword: value
    }, {
      preserveState: true,
      replace: true
    })
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-50 via-zinc-100 to-zinc-200">

      {/* Background */}
      <div
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(113,113,122,0.15), transparent 40%)`,
        }}
      />

      {/* HEADER */}
      <header className="border-b bg-white/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Globe className="h-8 w-8 text-zinc-700" />
            <span className="text-2xl font-bold text-zinc-800">
              TradeFlow
            </span>
          </div>

          <button
            onClick={() => router.visit("/login")}
            className="px-6 py-2 bg-zinc-800 text-white rounded-lg"
          >
            Login
          </button>
        </div>
      </header>

      {/* CONTENT */}
      <main className="container mx-auto px-4 py-12 space-y-8">

        {/* DEBUG */}
        <div className="bg-blue-100 text-blue-800 p-2 rounded">
          Total Shipments: {shipments.length}
        </div>

        {/* CARDS */}
        {shipments.map((shipment) => (
          <div key={shipment.id} className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex gap-2">
                  <Package className="h-4 w-4" /> AJU
                </CardTitle>
                <p className="font-bold">{shipment.custom_reference}</p>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex gap-2">
                  <Ship className="h-4 w-4" /> BL
                </CardTitle>
                <p className="font-bold">{shipment.bl_number}</p>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex gap-2">
                  <Building2 className="h-4 w-4" /> Supplier
                </CardTitle>
                <p className="font-bold">{shipment.supplier_name}</p>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex gap-2">
                  <Calendar className="h-4 w-4" /> Status
                </CardTitle>
                <p className="font-bold">{shipment.status}</p>
              </CardHeader>
            </Card>

          </div>
        ))}

        {/* SEARCH */}
        <Tabs defaultValue="tracking" className="w-300 mx-auto">
          <TabsList className="flex justify-center">
            <TabsTrigger value="bl">Tracking by BL</TabsTrigger>
            <TabsTrigger value="po">Tracking by PO</TabsTrigger>
            <TabsTrigger value="invoice">Tracking by Invoice</TabsTrigger>
            <TabsTrigger value="item-code">Tracking by Item Code</TabsTrigger>
          </TabsList>

          <TabsContent value="bl">
            <Card>
              <CardHeader>
                <CardTitle>Tracking by BL</CardTitle>
                <CardDescription>Search shipment</CardDescription>
              </CardHeader>

              <CardContent className="flex flex-row">
                <Input
                  value={query}
                  placeholder="Input BL / Container / Invoice / PO"
                  onChange={(e) => setQuery(e.target.value)}
                />
                 <Button 
                 onClick={()=> handleSearch(query)}
                 variant="outline" 
                 className="ml-2"
                 >Search</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="po">
            <Card>
              <CardHeader>
                <CardTitle>Tracking by PO</CardTitle>
                <CardDescription>Search shipment</CardDescription>
              </CardHeader>

              <CardContent className="flex flex-row">
                <Input
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Input BL / Container / Invoice / PO"
                />
                 <Button variant="outline" className="ml-2">Search</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="invoice">
            <Card>
              <CardHeader>
                <CardTitle>Tracking by Invoice</CardTitle>
                <CardDescription>Search shipment</CardDescription>
              </CardHeader>

              <CardContent className="flex flex-row">
                <Input
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Input BL / Container / Invoice / PO"
                />
                <Button variant="outline" className="ml-2">Search</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="item-code">
            <Card>
              <CardHeader>
                <CardTitle>Tracking by Item Code</CardTitle>
                <CardDescription>Search shipment</CardDescription>
              </CardHeader>

              <CardContent className="flex flex-row">
                <Input
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Input BL / Container / Invoice / PO"
                />
                  <Button variant="outline" className="ml-2">Search</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* TABLE */}
        <Card className="w-300 mx-auto">
          <h1 className="text-lg font-semibold px-6 pt-6">
            Shipment Details
          </h1>

          <Accordion type="single" collapsible>
            <AccordionItem value="invoice">
              <AccordionTrigger className="px-6">
                View Details
              </AccordionTrigger>

              <AccordionContent className="px-6 pb-6">
                <ShippingsTable shippings={shipments as Shipping[]} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

      </main>
    </div>
  )
}