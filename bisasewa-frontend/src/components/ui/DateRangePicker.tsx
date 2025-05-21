// components/ui/DateRangePicker.tsx
'use client'

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'

interface DateRangePickerProps {
  label: string
  range: [Date | undefined, Date | undefined]
  onRangeChange: (range: [Date | undefined, Date | undefined]) => void
  disabledBefore?: Date
}

export default function DateRangePicker({
  label,
  range,
  onRangeChange,
  disabledBefore,
}: DateRangePickerProps) {
  const [start, end] = range

  // helper untuk tampilkan teks trigger
  const labelText = start && end
    ? `${format(start, 'dd MMM yyyy')} – ${format(end, 'dd MMM yyyy')}`
    : 'Pilih tanggal'

  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <Popover>
        <PopoverTrigger asChild>
          <div className="mt-1 flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-green-500 transition-colors">
            <CalendarIcon className="w-5 h-5 text-gray-400 mr-2" />
            <span className="text-gray-600 truncate">{labelText}</span>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 mt-2 bg-white rounded-lg shadow z-50">
          <Calendar
            mode="range"
            selected={range as [Date, Date]}
            onSelect={(val) => {
              // val is [Date, Date]
              onRangeChange(val as [Date, Date])
            }}
            disabled={disabledBefore ? { before: disabledBefore } : undefined}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
