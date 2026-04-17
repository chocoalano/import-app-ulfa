import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const poData = [
    {
        purchase_order_id:"",
        itemId:"",
        Name:"",
        description:"",
        PurchQty:"",
        PurchUnit:"",
        hs_code:"",
    },
]

export function PoTable() {
  return (
    <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-25">PurchaseOrder No. {poData[0]?.purchase_order_id || "N/A"}</TableHead>
                <TableHead>Item Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>HS Code</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {poData.map((item, index) => (
                <TableRow key={index}>
                    <TableCell className="font-medium">{item.purchase_order_id}</TableCell>
                    <TableCell>{item.itemId}</TableCell>
                    <TableCell>{item.Name}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.hs_code}</TableCell>
                    <TableCell>{item.PurchUnit}</TableCell>
                    <TableCell className="text-right">{item.PurchQty}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            {/* <TableFooter>
                <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
            </TableFooter> */}
            </Table>
  )
}