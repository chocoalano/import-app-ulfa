import AppLayout from '@/layouts/app-layout'
import { Head, router } from '@inertiajs/react'
import { useState } from 'react'
import { Search, Download, Plus, MoreHorizontal, Filter } from 'lucide-react'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Invoice {
  id: number
  supplier_id: number
  supplier_name: string
  invoice_number: string
  po_numbers: string[]
  status: string
  total_qty: number
  incoterm: string
  expected_delivery_date: string | null
  expected_arrival_date: string | null
  notes: string | null
}

interface Props {
  invoices: Invoice[]
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    paid:       "bg-emerald-100 text-emerald-700 border-emerald-200",
    pending:    "bg-amber-100 text-amber-700 border-amber-200",
    shipped:    "bg-blue-100 text-blue-700 border-blue-200",
    processing: "bg-purple-100 text-purple-700 border-purple-200",
  }
  return colors[status] ?? "bg-zinc-100 text-zinc-700 border-zinc-200"
}

export default function InvoiceList({ invoices }: Props) {
  const [searchTerm, setSearchTerm] = useState("")

  const filtered = invoices.filter(inv =>
    inv.supplier_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.po_numbers.some(po => po.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const totalQty = invoices.reduce((sum, inv) => sum + inv.total_qty, 0)

  return (
    <AppLayout>
      <Head title="Invoice List" />

      <div className="p-6 space-y-6 min-h-screen bg-zinc-50">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Invoice List</h1>
            <p className="text-zinc-600 mt-1">Manage and track your invoices</p>
          </div>
          <Button onClick={() => router.visit('/invoice/create')}>
            <Plus className="h-4 w-4 mr-2" />
            New Invoice
          </Button>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
              <Input
                className="pl-10"
                placeholder="Search invoice, PO, supplier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" onClick={() => window.location.href = '/invoice/export'}>
              <Download className="h-4 w-4 mr-2" /> Export
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/invoice/export-template'}>
              <Download className="h-4 w-4 mr-2" /> Template
            </Button>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier</TableHead>
                <TableHead>Invoice Number</TableHead>
                <TableHead>Purchase Orders</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total Qty</TableHead>
                <TableHead>Incoterm</TableHead>
                <TableHead>ETD</TableHead>
                <TableHead>ETA</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center text-zinc-400 py-8">
                    No invoices found.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>{invoice.supplier_name}</TableCell>
                    <TableCell className="font-mono text-sm">{invoice.invoice_number}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {invoice.po_numbers.map((po, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {po}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${getStatusColor(invoice.status)} capitalize`}>
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{invoice.total_qty.toLocaleString()}</TableCell>
                    <TableCell>{invoice.incoterm || '-'}</TableCell>
                    <TableCell className="text-sm text-zinc-600">{invoice.expected_delivery_date || '-'}</TableCell>
                    <TableCell className="text-sm text-zinc-600">{invoice.expected_arrival_date || '-'}</TableCell>
                    <TableCell className="text-sm text-zinc-600 max-w-32 truncate">{invoice.notes || '-'}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => router.visit(`/invoice/${invoice.id}`)}>
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => router.visit(`/invoice/${invoice.id}/edit`)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => {
                              if (confirm('Hapus invoice ini?')) {
                                router.delete(`/invoice/${invoice.id}`)
                              }
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>

        {/* Footer */}
        <div className="flex justify-between text-sm text-zinc-600">
          <span>Showing {filtered.length} of {invoices.length} invoices</span>
          <span>Total Qty: {totalQty.toLocaleString()}</span>
        </div>
      </div>
    </AppLayout>
  )
}