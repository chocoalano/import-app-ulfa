import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// ✅ gunakan PascalCase
export type Shipping = {
  bl_number: string
  pol: string
  pod: string
  etd: string
  eta: string
  carrier: string
  container_number: string
  status: string
  purchase_order_id: string
  invoice_id: number
  custom_reference: string
  nomor_respon: string
}

// ✅ component juga PascalCase
export function ShippingsTable({ shippings }: { shippings: Shipping[] }) {
  return (
    <Table>
      <TableCaption>A list of your shipping data.</TableCaption>

      <TableHeader>
        <TableRow>
          {/* ✅ kalau mau tampilkan BL di header */}
          <TableHead className="w-25">
            BL Number
          </TableHead>

          <TableHead>POL</TableHead>
          <TableHead>POD</TableHead>
          <TableHead>ETD</TableHead>
          <TableHead>ETA</TableHead>
          <TableHead>Carrier</TableHead>
          <TableHead>Container Number</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>PO ID</TableHead>
          <TableHead>Invoice ID</TableHead>
          <TableHead>Custom Reference</TableHead>
          <TableHead>Nomor Respon</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {shippings.length > 0 ? (
            shippings.map((item) => (
            <TableRow key={item.bl_number}>
                <TableCell>{item.bl_number}</TableCell>
                <TableCell>{item.pol}</TableCell>
                <TableCell>{item.pod}</TableCell>
                <TableCell>{item.etd}</TableCell>
                <TableCell>{item.eta}</TableCell>
                <TableCell>{item.carrier}</TableCell>
                <TableCell>{item.container_number}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.purchase_order_id}</TableCell>
                <TableCell>{item.invoice_id}</TableCell>
                <TableCell>{item.custom_reference}</TableCell>
                <TableCell>{item.nomor_respon}</TableCell>
            </TableRow>
            ))
        ) : (
            <TableRow>
            <TableCell colSpan={12} className="text-center">
                No shipping data found
            </TableCell>
            </TableRow>
        )}
        </TableBody>
    </Table>
  )
}