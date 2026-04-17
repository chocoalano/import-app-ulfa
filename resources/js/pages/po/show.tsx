import AppLayout from "@/layouts/app-layout"
import { Head, Link } from "@inertiajs/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ShowPO() {
  // ⛔ nanti ini dari props inertia
  const po = {
    PurchId: "PO-2026-001",
    supplier: "PT Supplier A",
    status: "approved",
    incoterm: "FOB",
    expected_delivery_date: "2026-02-10",
    expected_arrival_date: "2026-02-18",
    notes: "Barang harus dikemas kayu",
    items: [
      {
        ItemId: "ITEM-001",
        Name: "Steel Bolt",
        description: "High quality bolt",
        PurchQty: 100,
        PurchUnit: "pcs",
        hs_code: "731815",
        status: "pending",
      },
      {
        ItemId: "ITEM-002",
        Name: "Nut 10mm",
        description: "Heavy duty nut",
        PurchQty: 200,
        PurchUnit: "pcs",
        hs_code: "731816",
        status: "shipped",
      },
    ],
  }
  const totalQty = po.items.reduce((sum, item) => {
    return sum + item.PurchQty;   
  }, 0);

  return (
    <AppLayout>
      <Head title={`Show PO ${po.PurchId}`} />

      <div className="p-6 space-y-6 bg-linear-to-br from-zinc-50 to-zinc-100 min-h-screen">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{po.PurchId}</h1>
            <p className="text-zinc-600">Purchase Order Detail</p>
          </div>

          <div className="flex gap-2">
            <Link href="/po">
              <Button variant="outline">Back</Button>
            </Link>
            <Link href={`/po/${po.PurchId}/edit`}>
              <Button>Edit</Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="items">Items</TabsTrigger>
          </TabsList>

          {/* ================= OVERVIEW ================= */}
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Purchase Order Information</CardTitle>
                <CardDescription>Informasi utama PO</CardDescription>
              </CardHeader>

              <CardContent className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <label className="text-muted-foreground">Supplier</label>
                  <Input value={po.supplier} disabled />
                </div>

                <div>
                  <label className="text-muted-foreground">Incoterm</label>
                  <Input value={po.incoterm} disabled />
                </div>

                <div>
                  <label className="text-muted-foreground">Expected Delivery</label>
                  <Input value={po.expected_delivery_date} disabled />
                </div>

                <div>
                  <label className="text-muted-foreground">Expected Arrival</label>
                  <Input value={po.expected_arrival_date} disabled />
                </div>

                <div>
                  <label className="text-muted-foreground">Status</label>
                  <div className="mt-2">
                    <Badge>{po.status}</Badge>
                  </div>
                </div>

                <div className="col-span-3">
                  <label className="text-muted-foreground">Notes</label>
                  <Textarea value={po.notes} disabled />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ================= ITEMS ================= */}
          <TabsContent value="items">
            <Card>
              <CardHeader>
                <CardTitle>Purchase Order Items</CardTitle>
                <CardDescription>Daftar item dalam PO</CardDescription>
              </CardHeader>

              <CardContent className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b text-muted-foreground">
                      <th className="p-2 text-left">Item No</th>
                      <th className="p-2 text-left">Name</th>
                      <th className="p-2 text-left">Description</th>
                      <th className="p-2 text-right">Qty</th>
                      <th className="p-2">Unit</th>
                      <th className="p-2">HS Code</th>
                      <th className="p-0">Status</th>
                    </tr>
                  </thead>
                  {/* Footer */}

                  <tbody>
                    {po.items.map((item, i) => (
                      <tr key={i} className="border-b">
                        <td className="p-2">{item.ItemId}</td>
                        <td className="p-2 font-medium">{item.Name}</td>
                        <td className="p-2">{item.description}</td>
                        <td className="p-2 text-right">{item.PurchQty}</td>
                        <td className="p-2 text-center">{item.PurchUnit}</td>
                        <td className="p-2 text-center">{item.hs_code}</td>
                        <td className="p-2 text-center">
                          <Badge variant="outline">{item.status}</Badge>
                        </td>
                      </tr>
                    ))}                     
                  </tbody>
                   {/* FOOTER TOTAL */}
                  <tfoot>
                    <tr className="border-t font-semibold bg-gray-50">
                      <td colSpan={3}></td>
                      <td className="p-2 text-right">
                        Total: {totalQty.toLocaleString()}
                      </td>
                      <td colSpan={3}></td>
                    </tr>
                  </tfoot>
                </table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
       
    </AppLayout>
  )
}
