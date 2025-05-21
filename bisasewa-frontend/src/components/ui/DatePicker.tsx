'use client'

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'

interface DatePickerProps {
  label: string
  selectedDate: Date | undefined
  onDateChange: (date: Date | undefined) => void
  disabledBefore?: Date
}

export default function DatePicker({
  label,
  selectedDate,
  onDateChange,
  disabledBefore,
}: DatePickerProps) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <Popover>
        <PopoverTrigger asChild>
          <div className="mt-1 flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-green-500 transition-colors">
            <CalendarIcon className="w-5 h-5 text-gray-400 mr-2" />
            <span className="text-gray-600 truncate">
              {selectedDate ? format(selectedDate, 'dd MMM yyyy') : 'Pilih tanggal'}
            </span>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 mt-2 bg-white rounded-lg shadow">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateChange}
            disabled={disabledBefore ? { before: disabledBefore } : undefined}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
