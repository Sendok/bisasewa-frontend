// components/sections/CategoryScroller.tsx
'use client'

import { useState } from 'react'
import { CameraIcon, HomeIcon, CarIcon, TvIcon } from 'lucide-react'
import clsx from 'clsx'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const categories = [
  { 
    name: 'Rumah', 
    icon: HomeIcon, 
    value: 'rumah',
    description: 'Sewa rumah, villa, dan apartment'
  },
  { 
    name: 'Mobil', 
    icon: CarIcon, 
    value: 'mobil',
    description: 'Rental mobil dan kendaraan'
  },
  { 
    name: 'Kamera', 
    icon: CameraIcon, 
    value: 'kamera',
    description: 'Sewa kamera dan peralatan fotografi'
  },
  { 
    name: 'Elektronik', 
    icon: TvIcon, 
    value: 'elektronik',
    description: 'Sewa peralatan elektronik'
  },
]

export default function CategoryScroller() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <div className="pt-0 pb-3"> {/* Changed from py-3 to pt-0 pb-3 to remove top padding only */}

      {/* Category Scroller */}
      <div className="w-full overflow-x-auto">
        <div className="flex justify-center gap-3 px-4 md:px-0 min-w-full">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <TooltipProvider key={cat.value}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setActive(cat.value)}
                      className={clsx(
                        'flex flex-col items-center px-4 py-2.5 rounded-full text-xs transition-all duration-200',
                        'min-w-[90px] shadow-sm hover:shadow-md',
                        'border border-gray-100',
                        'focus:outline-none focus:ring-0',
                        active === cat.value 
                          ? 'bg-green-600 text-white font-medium scale-105 border-green-500'
                          : 'bg-green-50 text-green-800 hover:bg-green-100'
                      )}
                    >
                      <Icon 
                        className={clsx(
                          "h-4 w-4 mb-1",
                          active === cat.value 
                            ? "text-white"
                            : "text-green-600"
                        )}
                      />
                      <span className="font-medium text-[11px]">{cat.name}</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent 
                    className="bg-[#1B2845] text-white border-[#1B2845] rounded-lg px-3 py-2"
                  >
                    <p className="text-xs">{cat.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )
          })}
        </div>
      </div>
    </div>
  )
}
