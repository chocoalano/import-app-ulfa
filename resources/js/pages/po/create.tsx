import React, { useState } from 'react'
import AppLayout from '@/layouts/app-layout'
import { Head, router, useForm, usePage, Link } from '@inertiajs/react'
import { Search, Filter, Download, Plus, MoreHorizontal, Package, TrendingUp, Save } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { PageProps } from '@/types'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription } from '@/components/ui/alert'

const invoices = [
  {
    VendAccount: "string",
    supplier_name: "string",
    PurchId: "string",
    total_qty: "number",
    incoterm: "string",
    expected_delivery_date: "string",
    expected_arrival_date: "string",
    notes: "string",
  },
 
]
const getStatusColor = (status: string) => {
  const colors = {
    paid: "bg-emerald-100 text-emerald-700 border-emerald-200",
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    shipped: "bg-blue-100 text-blue-700 border-blue-200",
    processing: "bg-purple-100 text-purple-700 border-purple-200",
  }
  return colors[status as keyof typeof colors] || "bg-zinc-100 text-zinc-700 border-zinc-200"
}
interface Props{
  supplier: {
    id: number
    name: string
  }[]
}

export default function PO({ supplier = [] }: Props) {
  interface POItem {
    ItemId: string
    Name: string
    PurchQty: string
    PurchUnit: string
    hs_code: string
  }


  interface POForm {
    VendAccount: string
    supplier_name: string
    PurchId: string
    total_qty: number
    incoterm: string
    createdDateTime: string
    expected_delivery_date: string
    expected_arrival_date: string
    notes: string
    items: POItem[]
  }

  const { data, setData, post, processing, errors } = useForm<POForm>({
    VendAccount: "",
    supplier_name: "",
    PurchId: "",
    total_qty: 0,
    incoterm: "",
    createdDateTime: "",
    expected_delivery_date: "",
    expected_arrival_date: "",
    notes: "",
    items: [],
  })

  // calculate total_qty whenever items change
  const totalItemsQty = data.items.reduce(
    (sum, itm) => sum + Number(itm.PurchQty || 0),
    0
  )

  React.useEffect(() => {
    setData('total_qty', totalItemsQty)
  }, [totalItemsQty])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/po')
  }
  const [searchTerm, setSearchTerm] = useState("")
    
  const totalQty = invoices.reduce(
    (sum, inv) => sum + Number(inv.total_qty || 0),
    0
  )

  const totalPO = invoices.length

  const filteredInvoices = invoices.filter(invoice => 
    invoice.supplier_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.PurchId.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const addItem = () => {
    setData('items', [
      ...data.items,
      {
        ItemId: "",
        Name: "",
        PurchQty: "",
        PurchUnit: "pcs",
        hs_code: "",
      },
    ])
  }
  const removeItem = (index: number) => {
    setData('items', data.items.filter((_, i) => i !== index))
  }

  const { flash } = usePage<PageProps>().props

  return (
    <AppLayout>
      <Head title="Create Purchase Order" />
      
      <div className="p-6 space-y-6 bg-linear-to-br from-zinc-50 to-zinc-100 min-h-screen">
        {/* flash messages */}
        <>
          {flash?.success && (
            <Alert className="bg-emerald-50 text-emerald-900 border-emerald-200">
              <AlertDescription className="flex items-center gap-2">
                <span className="font-semibold">✓ Success:</span>
                {flash.success}
              </AlertDescription>
            </Alert>
          )}

          {flash?.error && (
            <Alert className="bg-red-50 text-red-900 border-red-200">
              <AlertDescription className="flex items-center gap-2">
                <span className="font-semibold">✕ Error:</span>
                {flash.error}
              </AlertDescription>
            </Alert>
          )}
        </>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Create Purchase Orders</h1>
            <p className="text-zinc-600 mt-1">Form Create purchase orders</p>
          </div>
          <Link href="/po">
            <Button className="bg-white text-zinc-900 border-zinc-900 hover:zinc-900 hover:text-white shadow-sm">
                Cancel
            </Button>
            </Link>
        </div>

        

        {/* Filters and Search */}
        {/* <Card className="border-zinc-200">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <Input
                  placeholder="Search by PO number, supplier..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="border-zinc-300">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" className="border-zinc-300">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" className="border-zinc-300">
                  <Download className="h-4 w-4 mr-2" />
                  Import
                </Button>
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* form create po here */}
        <form onSubmit={handleSubmit}>
          <div>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className='max-w-full'>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                    <Card>
                      <CardHeader>
                        <CardTitle>Purchase Order Overview</CardTitle>
                        <CardDescription>
                          Informasi utama dan pengaturan purchase order
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="text-muted-foreground text-sm">
                        <div className="w-full max-w-4xl">
                          
                            <FieldGroup>
                              {/* BASIC INFO */}
                              <FieldSet>
                                <FieldLegend>Basic Information</FieldLegend>
                                <FieldDescription>
                                  Informasi utama purchase order
                                </FieldDescription>

                                <FieldGroup className="grid grid-cols-3 gap-4">
                                  <Field>
                                    <FieldLabel htmlFor="PurchId">
                                      PO Number <span className="text-destructive">*</span>
                                    </FieldLabel>
                                    <Input
                                      id="PurchId"
                                      value={data.PurchId}
                                      onChange={(e) => setData('PurchId', e.target.value)}
                                      placeholder="PO-2026-001"
                                      required
                                    />
                                  </Field>

                                  <Field>
                                    <FieldLabel htmlFor="VendAccount">
                                      Supplier <span className="text-destructive">*</span>
                                    </FieldLabel>

                                    <Select
                                      value={data.VendAccount}
                                      onValueChange={(value) => setData('VendAccount', value)}
                                    >
                                      <SelectTrigger id="VendAccount">
                                        <SelectValue placeholder="Select supplier" />
                                      </SelectTrigger>

                                      <SelectContent>
                                        <SelectGroup>
                                          {supplier.map((supplier) => (
                                            <SelectItem
                                              key={supplier.id}
                                              value={supplier.id.toString()}
                                            >
                                              {supplier.name}
                                            </SelectItem>
                                          ))}
                                        </SelectGroup>
                                      </SelectContent>
                                    </Select>

                                    {errors.VendAccount && (
                                      <p className="text-sm text-red-500 mt-1">
                                        {errors.VendAccount}
                                      </p>
                                    )}
                                    
                                  </Field>


                                  <Field>
                                    <FieldLabel htmlFor="status">
                                      Status
                                    </FieldLabel>
                                    <Select defaultValue="draft">
                                      <SelectTrigger id="status">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectGroup>
                                          <SelectItem value="draft">Draft</SelectItem>
                                          <SelectItem value="approved">Approved</SelectItem>
                                          <SelectItem value="shipped">Shipped</SelectItem>
                                          <SelectItem value="completed">Completed</SelectItem>
                                          <SelectItem value="cancelled">Cancelled</SelectItem>
                                        </SelectGroup>
                                      </SelectContent>
                                    </Select>
                                  </Field>
                                </FieldGroup>
                              </FieldSet>

                              <FieldSeparator />

                              {/* LOGISTIC */}
                              <FieldSet>
                                <FieldLegend>Logistic Information</FieldLegend>
                                <FieldDescription>
                                  Informasi pengiriman dan incoterm
                                </FieldDescription>
                                <FieldGroup className="grid grid-cols-4 gap-4">
                                  <Field>
                                    <FieldLabel htmlFor="incoterm">
                                      Incoterm
                                    </FieldLabel>
                                    <Select
                                    value={data.incoterm}
                                          onValueChange={(value) => setData('incoterm', value)} >
                                      <SelectTrigger id="incoterm">
                                        <SelectValue placeholder="EXW / FOB / CIF" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectGroup>
                                          <SelectItem value="EXW">EXW</SelectItem>
                                          <SelectItem value="FOB">FOB</SelectItem>
                                          <SelectItem value="CFR">CFR</SelectItem>
                                          <SelectItem value="CIF">CIF</SelectItem>
                                          <SelectItem value="DAP">DAP</SelectItem>
                                        </SelectGroup>
                                      </SelectContent>
                                      </Select>
                                  </Field>

                                  <Field>
                                    <FieldLabel htmlFor="createdDateTime">
                                      Order Date
                                    </FieldLabel>
                                    <Input
                                        id="createdDateTime"
                                        type="date"
                                        value={data.createdDateTime}
                                        onChange={(e) => setData('createdDateTime', e.target.value)}
                                      />
                                  </Field>
                                  <Field>
                                    <FieldLabel htmlFor="expected_delivery_date">
                                      Expected Delivery Date
                                    </FieldLabel>
                                    <Input
                                        id="expected_delivery_date"
                                        type="date"
                                        value={data.expected_delivery_date}
                                        onChange={(e) => setData('expected_delivery_date', e.target.value)}
                                      />
                                  </Field>

                                  <Field>
                                    <FieldLabel htmlFor="expected_arrival_date">
                                      Expected Arrival Date
                                    </FieldLabel>
                                    <Input
                                      id="expected_arrival_date"
                                      type="date"
                                      value={data.expected_arrival_date}
                                      onChange={(e) => setData('expected_arrival_date', e.target.value)}
                                    />
                                  </Field>
                                </FieldGroup>
                              </FieldSet>

                              <FieldSeparator />

                              {/* NOTES */}
                              <FieldSet>
                                <FieldLegend>Additional Notes</FieldLegend>

                                <FieldGroup>
                                  <Field>
                                    <FieldLabel htmlFor="notes">
                                      Notes
                                    </FieldLabel>
                                    <Textarea
                                      id="notes"
                                      value={data.notes}
                                      onChange={(e) => setData('notes', e.target.value)}
                                      placeholder="Catatan tambahan untuk purchase order"
                                      className="resize-none"
                                    />
                                  </Field>
                                </FieldGroup>
                              </FieldSet>

                              <FieldSeparator />

                              {/* SUMMARY */}
                              {/* <FieldSet>
                                <FieldLegend>Summary</FieldLegend>

                                <FieldGroup className="grid grid-cols-3 gap-4">
                                  <Field>
                                    <FieldLabel htmlFor="total_qty">
                                      Total Quantity
                                    </FieldLabel>
                                    <Input
                                      id="total_qty"
                                      type="number"
                                      step="0.01"
                                      disabled
                                      placeholder="0.00"
                                    />
                                  </Field>
                                </FieldGroup>
                              </FieldSet> */}
                            </FieldGroup>
                        </div>
                      </CardContent>
                    </Card>
              </TabsContent>          
              <TabsContent value="details">
                  <Card>
                    <CardHeader>
                      <CardTitle>Purchase Order Items</CardTitle>
                      <CardDescription>
                        Tambahkan dan kelola item dalam purchase order
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="text-sm">
                      <div className="w-full overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b text-muted-foreground">
                              <th className="p-2 text-left text-xs">Item No</th>
                              <th className="p-2 text-left text-xs">Item Name</th>
                              <th className="p-2 text-left text-xs w-30">Qty</th>
                              <th className="p-2 text-left text-xs w-30">Unit</th>
                              <th className="p-2 text-left text-xs w-35">HS Code</th>
                              <th className="p-2 text-center text-xs w-20">Action</th>
                            </tr>
                          </thead>

                          <tbody>
                            {data.items.map((item, index) => (
                              <tr key={index} className="border-b">
                                
                                <td className="p-2">
                                  <Input
                                    value={item.ItemId}
                                    onChange={(e) => {
                                      const updated = [...data.items]
                                      updated[index].ItemId = e.target.value
                                      setData('items', updated)
                                    }}
                                    placeholder="ITEM-001"
                                  />
                                  {errors[`items.${index}.ItemId`] && (
                                    <p className="text-xs text-red-600 mt-1">
                                      {errors[`items.${index}.ItemId`]}
                                    </p>
                                  )}
                                </td>

                                <td className="p-2">
                                  <Input
                                    value={item.Name}
                                    onChange={(e) => {
                                      const updated = [...data.items]
                                      updated[index].Name = e.target.value
                                      setData('items', updated)
                                    }}
                                    placeholder="Item name"
                                    required
                                  />
                                  {errors[`items.${index}.Name`] && (
                                    <p className="text-xs text-red-600 mt-1">
                                      {errors[`items.${index}.Name`]}
                                    </p>
                                  )}
                                </td>

                                <td className="p-2">
                                  <Input
                                    type="number"
                                    step="0.01"
                                    value={item.PurchQty}
                                    onChange={(e) => {
                                      const updated = [...data.items]
                                      updated[index].PurchQty = e.target.value
                                      setData('items', updated)
                                    }}
                                  />
                                  {errors[`items.${index}.PurchQty`] && (
                                    <p className="text-xs text-red-600 mt-1">
                                      {errors[`items.${index}.PurchQty`]}
                                    </p>
                                  )}
                                </td>

                                <td className="p-2">
                                  <Select
                                    value={item.PurchUnit}
                                    onValueChange={(value) => {
                                      const updated = [...data.items]
                                      updated[index].PurchUnit = value
                                      setData('items', updated)
                                    }}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pcs">PCS</SelectItem>
                                      <SelectItem value="box">BOX</SelectItem>
                                      <SelectItem value="kg">KG</SelectItem>
                                      <SelectItem value="set">SET</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </td>

                                <td className="p-2">
                                  <Input
                                    value={item.hs_code}
                                    onChange={(e) => {
                                      const updated = [...data.items]
                                      updated[index].hs_code = e.target.value
                                      setData('items', updated)
                                    }}
                                    placeholder="HS Code"
                                  />
                                </td>

                                <td className="p-2 text-center">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-destructive"
                                    onClick={() => {
                                      const updated = data.items.filter((_, i) => i !== index)
                                      setData('items', updated)
                                    }}
                                    disabled={data.items.length === 1}
                                  >
                                    ✕
                                  </Button>
                                </td>

                              </tr>
                            ))}
                          </tbody>

                        </table>
                      </div>

                      {/* ACTION */}
                      <div className="mt-4 flex gap-2">
                        <Button type="button" variant="outline" onClick={addItem}>
                          + Add Item
                        </Button>
                      </div>
                    </CardContent>
                    {/* ACTION */}
                    <div className='flex justify-end px-6 pb-6'>
                      <Field orientation="horizontal">
                        <Button type="submit" disabled={processing}>
                          {processing ? 'Saving...' : 'Save Purchase Order'}
                          </Button>
                          <Button 
                            variant="outline" 
                            type="button"
                            onClick={() => router.visit('/po')}
                          >
                            Cancel
                          </Button>
                      </Field>
                    </div>
                  </Card>
              </TabsContent>
            </Tabs>
            </div>
          </form>
        
      </div>
      
    </AppLayout>
  )
}