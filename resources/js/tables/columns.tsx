import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  status: "Draft Invoice" | "BC 2.0" | "Arrive" | "SPJM"
  kodeRespon: string
  nomorRespon:string
  waktuStatus: string
  billOfLading: string
  purchaseOrder: string
  invoiceNumber:string
  container:string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "kodeRespon",
    header: "Kode Respon",
  },
  {
    accessorKey: "nomorRespon",
    header: "Nomor Respon",
  },
  {
    accessorKey: "waktuStatus",
    header: "Waktu Status",
  },
  {
    accessorKey: "billOfLading",
    header: "BL / AWB",
  },
  {
    accessorKey: "purchaseOrder",
    header: "PO",
  },
  {
    accessorKey: "invoiceNumber",
    header: "Invoice",
  },
  {
    accessorKey: "container",
    header: "Container",
  },
]