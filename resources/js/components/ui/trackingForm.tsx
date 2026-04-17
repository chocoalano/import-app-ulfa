import { router, useForm } from '@inertiajs/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowRight, AlertCircle } from 'lucide-react'

export default function TrackingForm() {
  const { data, setData, post, processing, errors } = useForm({
    keyword: '',
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()

    if (data.keyword.trim()) {
      router.get('/tracking', {
        keyword: data.keyword
      })
    }
  }




  return (
    <div className="mt-10">
      <form
        onSubmit={submit}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Input
          type="text"
          placeholder="Enter BL / PO / Container Number"
          value={data.keyword}
          onChange={(e) => setData('keyword', e.target.value)}
          className="flex-1 h-12"
        />

        <Button
          type="submit"
          disabled={processing || !data.keyword.trim()}
          className="group h-12 px-8 bg-linear-to-br from-zinc-700 to-zinc-900 flex items-center gap-2"
        >
          {processing ? 'Tracking...' : 'Track Now'}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </form>

      {errors.keyword && (
        <div className="mt-4 flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <span className="text-red-600 text-sm">{errors.keyword}</span>
        </div>
      )}
    </div>
  )
}
