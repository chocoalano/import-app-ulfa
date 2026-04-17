// import AppLayout from '@/layouts/app-layout'
import { Head, Link, router } from '@inertiajs/react'
import { useState, useRef } from 'react'
import { Search, Filter, Download, Plus, MoreHorizontal } from 'lucide-react'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const getStatusColor = (status: string) => {
  const colors = {
    paid: "bg-emerald-100 text-emerald-700 border-emerald-200",
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    shipped: "bg-blue-100 text-blue-700 border-blue-200",
    processing: "bg-purple-100 text-purple-700 border-purple-200",
  }
  return colors[status as keyof typeof colors] ?? "bg-zinc-100 text-zinc-700"
}

interface Props {
  purchaseOrders: any[]
}

export default function PO({ purchaseOrders }: Props) {
  const [searchTerm, setSearchTerm] = useState("")
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleImport = (file?: File) => {
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    router.post('/po/import', formData, {
      onSuccess: () => {
        alert('Import berhasil')
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      },
    })
  }


  const totalQty = purchaseOrders.reduce((sum, inv) => sum + inv.total_qty, 0)
  const totalPO = purchaseOrders.length

  const filteredPurchaseOrders = purchaseOrders.filter(purchaseOrders =>
    purchaseOrders.supplier_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    purchaseOrders.po_number.toLowerCase().includes(searchTerm.toLowerCase())
  )
  return (
    // <AppLayout>
    <div>
      <Head title="Purchase Order" />

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".xlsx,.csv"
        onChange={(e) => handleImport(e.target.files?.[0])}
      />

      <div className="p-6 space-y-6 min-h-screen bg-zinc-50">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Purchase Orders</h1>
            <p className="text-zinc-600">Manage and track your purchase orders</p>
          </div>
          <Link href="/po/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New PO
            </Button>
          </Link>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
              <Input
                className="pl-10"
                placeholder="Search PO / Supplier"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              <Download className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.href = '/po/export-template'}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Template
            </Button>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier</TableHead>
                <TableHead>PO</TableHead>
                <TableHead>Incoterm</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Expected Delivery Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total Qty</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPurchaseOrders.map(po => {
                  const id = po.id  // ✅ definisikan id di sini
                  return (
                    <TableRow key={po.po_number}>
                      <TableCell>{po.supplier_name}</TableCell>
                      <TableCell>{po.po_number}</TableCell>
                      <TableCell>{po.incoterm || '-'}</TableCell>
                      <TableCell>{po.order_date}</TableCell>
                      <TableCell>{po.expected_delivery_date || '-'}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(po.status)}>
                          {po.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {po.total_qty.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => router.visit(`/po/${id}`)}>
                              Show
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.visit(`/po/${id}/edit`)}>
                              Edit
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </Card>

        {/* Footer */}
        <div className="flex justify-between text-sm text-zinc-600">
          <span>Total PO: {totalPO}</span>
          <span>Total Qty: {totalQty.toLocaleString()}</span>
        </div>
      </div>
      </div>
    // </AppLayout>
  )
}
