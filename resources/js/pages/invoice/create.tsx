import React from "react"
import AppLayout from "@/layouts/app-layout"
import { Head, router, useForm, usePage } from "@inertiajs/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet,
} from "@/components/ui/field"
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {Tabs,TabsContent,TabsList,TabsTrigger,} from "@/components/ui/tabs"
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { PageProps } from "@/types"
import { Link } from "lucide-react"
import { CheckCircle2Icon, InfoIcon } from "lucide-react"

interface Supplier {
  id: number
  name: string
}

interface InvoiceOption {
  id: number
  po_number: string
  VendAccount: number
}

interface Props {
  supplier: Supplier[]
  purchaseOrders: InvoiceOption[]
}

interface InvoiceForm {
  VendAccount: string
  invoice_number: string
  po_ids: number[]
  status: string
  incoterm: string
  expected_delivery_date: string
  expected_arrival_date: string
  notes: string
  items: {
    ItemId: string
    Name: string
    qty: string
    PurchUnit: string
    hs_code: string
  }[]
}

export default function CreateInvoice({ supplier = [], purchaseOrders = [] }: Props) {
  const { data, setData, post, processing, errors } = useForm<InvoiceForm>({
    VendAccount: "",
    invoice_number: "",
    po_ids: [],
    status: "pending",
    incoterm: "",
    expected_delivery_date: "",
    expected_arrival_date: "",
    notes: "",
    items: [
      {
        ItemId: "",
        Name: "",
        qty: "",
        PurchUnit: "",
        hs_code: "",
      },
    ],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post("/invoice")
  }

  const toggleInvoice = (id: number) => {
    setData("po_ids",
      data.po_ids.includes(id)
        ? data.po_ids.filter((p) => p !== id)
        : [...data.po_ids, id]
    )
  }
  const filteredInvoice = purchaseOrders.filter(
    (invoice) =>
      data.VendAccount &&
      invoice.VendAccount === Number(data.VendAccount)
  )

  const addItem = () => {
    setData('items', [
      ...data.items,
      {
        ItemId: "",
        Name: "",
        qty: "",
        PurchUnit: "pcs",
        hs_code: "",
      },
    ])
  }
  const { props } = usePage() as any
  const success = props.flash?.success

  return (
      <AppLayout>
        <Head title="Create Purchase Order" />
        
        <div className="p-6 space-y-6 bg-linear-to-br from-zinc-50 to-zinc-100 min-h-screen">
  
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
          {/* form create invoice here */}
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
                          <CardTitle>Invoice Overview</CardTitle>
                          <CardDescription>
                            Informasi utama dan pengaturan invoice
                          </CardDescription>
                        </CardHeader>
  
                        <CardContent className="text-muted-foreground text-sm">
                          <div className="w-full max-w-4xl">
                            
                              <FieldGroup>
                                {/* BASIC INFO */}
                                <FieldSet>
                                  <FieldLegend>Basic Information</FieldLegend>
                                  <FieldDescription>
                                    Informasi utama invoice
                                  </FieldDescription>
  
                                  <FieldGroup className="grid grid-cols-3 gap-4">
                                    <Field>
                                      <FieldLabel htmlFor="invoice_number">
                                        Invoice Number <span className="text-destructive">*</span>
                                      </FieldLabel>
                                      <Input
                                        id="invoice_number"
                                        value={data.invoice_number}
                                        onChange={(e) => setData('invoice_number', e.target.value)}
                                        placeholder="INV-2026-001"
                                        required
                                      />
                                    </Field>
  
                                    <Field>
                                      <FieldLabel htmlFor="VendAccount">
                                        Supplier <span className="text-destructive">*</span>
                                      </FieldLabel>
  
                                      <Select
                                        value={data.VendAccount || ""}
                                        onValueChange={(value) => setData("VendAccount", value)}
                                      >
                                        <SelectTrigger id="VendAccount">
                                          <SelectValue placeholder="Select supplier" />
                                        </SelectTrigger>
  
                                        <SelectContent>
                                          <SelectGroup>
                                            {Array.isArray(supplier) && supplier.length > 0 ? (
                                              supplier.map((supplier) => (
                                                <SelectItem key={VendAccount} value={VendAccount.toString()}>
                                                {supplier.name}
                                              </SelectItem>
                                              ))
                                            ) : (
                                              <SelectItem value="mo-data" disabled>
                                                No suppliers available
                                              </SelectItem>
                                            )}
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
                                      value={item.qty}
                                      onChange={(e) => {
                                        const updated = [...data.items]
                                        updated[index].qty = e.target.value
                                        setData('items', updated)
                                      }}
                                    />
                                    {errors[`items.${index}.qty`] && (
                                      <p className="text-xs text-red-600 mt-1">
                                        {errors[`items.${index}.qty`]}
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
                        {/* Success Notification */}
                          {success && (
                            <div className="w-full max-w-md">
                              <Alert className="border-green-500 bg-green-50 text-green-700">
                                <CheckCircle2Icon className="h-4 w-4" />
                                <AlertTitle>Success</AlertTitle>
                                <AlertDescription>
                                  {success}
                                </AlertDescription>
                              </Alert>
                            </div>
                          )}
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