import AppLayout from '@/layouts/app-layout'
import { Head, Link, router } from '@inertiajs/react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function CreateSupplier() {
  const [form, setForm] = useState({
    name: '',
    code: '',
    email: '',
    phone: '',
    address: '',
  })

  const submit = (e: React.FormEvent) => {
  e.preventDefault()

  router.post('/supplier/store', form, {
    preserveScroll: true,
    onError: (errors) => {
      console.error(errors)
    },
    onSuccess: () => {
      console.log('Supplier created')
    },
  })
}

  return (
    <AppLayout>
      <Head title="Create Supplier" />

      <div className="p-6 space-y-6 bg-zinc-50 min-h-screen">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">
              Create Supplier
            </h1>
            <p className="text-zinc-600">
              Add new supplier information
            </p>
          </div>

          <Link href="/supplier">
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>

        {/* FORM */}
        <Card className="max-w-3xl">
          <CardHeader>
            <CardTitle>Supplier Information</CardTitle>
            <CardDescription>
              Fill supplier details below
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* NAME & CODE */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">
                  Name <span className="text-destructive">*</span>
                </label>
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  placeholder="Supplier name"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Code
                </label>
                <Input
                  value={form.code}
                  onChange={(e) =>
                    setForm({ ...form, code: e.target.value })
                  }
                  placeholder="SUP-001"
                />
              </div>
            </div>

            {/* EMAIL & PHONE */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">
                  Email
                </label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  placeholder="supplier@email.com"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Phone
                </label>
                <Input
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  placeholder="+62..."
                />
              </div>
            </div>

            {/* ADDRESS */}
            <div>
              <label className="text-sm font-medium">
                Address
              </label>
              <Textarea
                value={form.address}
                onChange={(e) =>
                  setForm({ ...form, address: e.target.value })
                }
                placeholder="Supplier address"
                className="resize-none"
              />
            </div>

            {/* ACTION */}
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" asChild>
                <Link href="/supplier">Cancel</Link>
              </Button>

              <Button onClick={submit}>
                Save Supplier
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
