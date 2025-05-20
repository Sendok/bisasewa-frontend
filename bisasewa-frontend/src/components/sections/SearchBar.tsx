// components/sections/SearchBar.tsx
'use client'

import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { CalendarIcon, MapPinIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { format, addDays } from 'date-fns'
import { id } from 'date-fns/locale'
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DateRange } from "react-day-picker"

interface LocationSuggestion {
  name: string;
  description?: string;
  icon?: React.ReactNode;
  type: 'recent' | 'suggestion';
}

const LOCATION_SUGGESTIONS: LocationSuggestion[] = [
  {
    name: "Yogyakarta, Yogyakarta",
    description: "Untuk pemandangan seperti Candi Borobudur",
    icon: "🏛️",
    type: "suggestion"
  },
  {
    name: "Malang, Jawa Timur",
    description: "Tamu yang tertarik dengan Batu juga melihat-lihat tempat ini",
    icon: "🏔️",
    type: "suggestion"
  },
  {
    name: "Bandung, Jawa Barat",
    description: "Untuk para pencinta alam",
    icon: "🌲",
    type: "suggestion"
  },
  {
    name: "Surakarta, Jawa Tengah",
    description: "Tidak banyak diketahui orang",
    icon: "🏰",
    type: "suggestion"
  }
];

export default function SearchBar() {
  const [isSticky, setIsSticky] = useState(false)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })
  const [showSuggestions, setShowSuggestions] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filteredLocations, setFilteredLocations] = useState<LocationSuggestion[]>([])

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setIsSticky(offset > 100) // Adjust this value based on when you want the sticky effect to trigger
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirect or call API
    console.log({ search, category, location, date })
  }

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocation(value)
    
    // Filter locations based on input
    const filtered = LOCATION_SUGGESTIONS.filter(loc =>
      loc.name.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredLocations(filtered)
    setShowSuggestions(true)
  }

  return (
    <div className={clsx(
      'w-full z-50 transition-all duration-300',
      isSticky 
        ? 'fixed top-0 left-0 right-0 px-4 py-1.5 bg-[#1B2845]/95 backdrop-blur-sm shadow-md' 
        : 'relative px-4 py-8' // Removed mb-6
    )}>
     

      {/* Hero Text - Only show when not sticky */}
      {!isSticky && (
        <div className="relative text-center mb-18"> {/* Changed from mb-6 to mb-12 for more spacing */}
          <h1 className="text-2xl font-bold text-white mb-2">
            Hai kamu, mau Sewa apa?
          </h1>
          <p className="text-white/90 text-base">
            BisaSewa.com - Aplikasi Sewa terbaik dengan harga terjangkau!
          </p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className={clsx(
          "relative w-full max-w-6xl mx-auto rounded-xl flex flex-wrap items-center",
          isSticky 
            ? 'py-2 my-1 bg-transparent gap-3' 
            : 'py-6 px-8 shadow-lg bg-white gap-6'
        )}
      >
        {/* Nama barang */}
        <div className="flex-1 min-w-[180px] relative group">
          <input
            type="text"
            placeholder="Cari Barang Sewa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={clsx(
              "w-full px-4 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 bg-white hover:bg-gray-50",
              isSticky ? 'py-2' : 'py-3'
            )}
          />
          <MagnifyingGlassIcon className={clsx(
            "text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2",
            isSticky ? 'h-4 w-4' : 'h-5 w-5'
          )} />
        </div>

        {/* Kategori */}
        <div className="flex-1 min-w-[150px]">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={clsx(
              "w-full px-4 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white hover:bg-gray-50 appearance-none cursor-pointer",
              isSticky ? 'py-2' : 'py-3'
            )}
          >
            <option value="">Pilih Kategori</option>
            <option value="rumah">Rumah</option>
            <option value="mobil">Mobil</option>
            <option value="kamera">Kamera</option>
          </select>
        </div>

        {/* Lokasi */}
        <div className="flex-1 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Lokasi"
              value={location}
              onChange={handleLocationChange}
              onFocus={() => setShowSuggestions(true)}
              className={clsx(
                "w-full pl-10 pr-4 border border-gray-200 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white",
                isSticky ? 'py-2' : 'py-3'
              )}
            />
            <MapPinIcon className={clsx(
              "text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2",
              isSticky ? 'h-4 w-4' : 'h-5 w-5'
            )} />
          </div>
          
          {/* Location Suggestions Dropdown */}
          {showSuggestions && (
            <div className="absolute z-50 min-w-[300px]  mt-2 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-4">
                <h3 className="text-base font-medium text-gray-900 mb-3">Pencarian terkini</h3>
                <div className="space-y-3">
                  {LOCATION_SUGGESTIONS.map((location, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setLocation(location.name);
                        setShowSuggestions(false);
                      }}
                      className="w-full flex items-start gap-3 p-2 hover:bg-gray-50 rounded-xl transition-colors duration-200"
                    >
                      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg text-xl">
                        {location.icon}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-gray-900">{location.name}</p>
                        {location.description && (
                          <p className="text-xs text-gray-500 mt-0.5">{location.description}</p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Date Range Picker */}
        <div className="flex-1 min-w-[300px]">
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className={clsx(
                  "flex items-center w-full gap-2 bg-white hover:bg-gray-50 px-4 rounded-lg border border-gray-200 text-left transition-all duration-200",
                  isSticky ? 'py-2' : 'py-3'
                )}
              >
                <CalendarIcon className={clsx(
                  "text-gray-400 flex-shrink-0",
                  isSticky ? 'h-4 w-4' : 'h-5 w-5'
                )} />
                <div className="flex flex-col flex-1">
                  <div className="text-sm">
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "d MMM", { locale: id })} -{" "}
                          {format(date.to, "d MMM yyyy", { locale: id })}
                        </>
                      ) : (
                        format(date.from, "d MMM yyyy", { locale: id })
                      )
                    ) : (
                      <span className="text-gray-400">Pilih tanggal sewa</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-400">
                    {date?.from && date?.to ? (
                      `${Math.ceil(
                        (date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24)
                      )} hari`
                    ) : (
                      "Durasi sewa"
                    )}
                  </div>
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                disabled={(date) => date < new Date()}
                fromDate={new Date()}
                toDate={addDays(new Date(), 365)}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Tombol Search */}
        <button
          type="submit"
          className={clsx(
            "flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg",
            isSticky 
              ? 'px-4 py-2' 
              : 'px-6 py-3',
            // Add responsive classes for mobile
            "w-full sm:w-auto mt-4 sm:mt-0" // Full width on mobile, auto width on sm and up, margin top on mobile
          )}
        >
          <MagnifyingGlassIcon className={clsx(
            isSticky ? 'h-4 w-4' : 'h-5 w-5'
          )} />
          <span>Cari</span>
        </button>
      </form>
    </div>
  )
}
