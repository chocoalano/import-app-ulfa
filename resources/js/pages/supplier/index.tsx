import AppLayout from '@/layouts/app-layout'
import { Head, Link, router } from '@inertiajs/react'
import { useMemo, useRef, useState } from 'react'
import { Search, Download, Plus, MoreHorizontal } from 'lucide-react'

import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type Supplier = {
  id: number
  Name: string
  VendAccount: string
  MarkupGroup: string
  ItemBuyerGroupId: string
  phone: string
  address: string
}

interface Props {
  suppliers: Supplier[]
}

export default function SupplierIndex({ suppliers = [] }: Props) {
  const [search, setSearch] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(s =>
      s.Name.toLowerCase().includes(search.toLowerCase()) ||
      s.VendAccount.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, suppliers])

  const handleImport = (file?: File) => {
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    router.post('/supplier/import', formData, {
      onSuccess: () => {
        fileInputRef.current!.value = ''
      },
    })
  }

  return (
    <AppLayout>
      <Head title="Supplier" />

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".xlsx,.csv"
        onChange={e => handleImport(e.target.files?.[0])}
      />

      <div className="p-6 space-y-6 bg-zinc-50 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Supplier</h1>
            <p className="text-muted-foreground">
              Manage your supplier master data
            </p>
          </div>

          <Link href="/supplier/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Supplier
            </Button>
          </Link>
        </div>

        {/* Search & Action */}
        <Card>
          <CardContent className="pt-6 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="Search supplier name or code"
                value={search}
                onChange={e => setSearch(e.target.value)}
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
              asChild
            >
              <a href="/supplier/export-template">
                <Download className="h-4 w-4 mr-2" />
                Template
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Invoice Account</TableHead>
                <TableHead>Markup Group</TableHead>
                <TableHead>ItemBuyer GroupId</TableHead>
                <TableHead className="w-12.5" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredSuppliers.map(supplier => (
                <TableRow key={supplier.id}>
                  <TableCell className="font-medium">
                    {supplier.Name}
                  </TableCell>
                  <TableCell>{supplier.MarkupGroup}</TableCell>
                  <TableCell>{supplier.ItemBuyerGroupId}</TableCell>
                  <TableCell>{supplier.phone}</TableCell>

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/supplier/${supplier.id}`}>
                            View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/supplier/${supplier.id}/edit`}>
                            Edit
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}

              {filteredSuppliers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-6">
                    No supplier found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </AppLayout>
  )
}
