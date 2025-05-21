'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { format, startOfDay, parse, isValid } from 'date-fns'
import { MapPin, Star, Shield } from 'lucide-react'
import type { Listing } from '@/types/listing'
import ImageGallery from '@/components/ui/ImageGallery'
import DatePicker from '@/components/ui/DatePicker'

interface ListingDetailProps {
  listing: Listing
}



export default function ListingDetail({ listing }: ListingDetailProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [isRenderComplete, setIsRenderComplete] = useState(false)
  
  // Get current date (start of day to avoid time comparison issues)
  const today = startOfDay(new Date())

  // Helper function to safely parse a date string
  const parseDateString = (dateStr: string | null): Date | undefined => {
    if (!dateStr) return undefined
    
    try {
      // Try to parse ISO format first
      const date = new Date(dateStr)
      if (isValid(date)) return startOfDay(date)
      
      // Try to parse yyyy-MM-dd format
      const parsedDate = parse(dateStr, 'yyyy-MM-dd', new Date())
      return isValid(parsedDate) ? startOfDay(parsedDate) : undefined
    } catch (error) {
      console.error('Failed to parse date:', error)
      return undefined
    }
  }

  // Initialize dates from URL params
  useEffect(() => {
    const startDateParam = searchParams.get('startDate')
    const endDateParam = searchParams.get('endDate')
    
    if (startDateParam) {
      const parsedStartDate = parseDateString(startDateParam)
      if (parsedStartDate) setStartDate(parsedStartDate)
    }
    
    if (endDateParam) {
      const parsedEndDate = parseDateString(endDateParam)
      if (parsedEndDate) setEndDate(parsedEndDate)
    }
    
    // Mark component as fully rendered
    setIsRenderComplete(true)
  }, []) // Empty dependency array to run only once on mount

  // Update URL when dates change, but only after initial render
  useEffect(() => {
    // Skip during initial render to prevent URL changes
    if (!isRenderComplete) return
    
    const params = new URLSearchParams(searchParams.toString())
    
    if (startDate) {
      params.set('startDate', format(startDate, 'yyyy-MM-dd'))
    } else {
      params.delete('startDate')
    }
    
    if (endDate) {
      params.set('endDate', format(endDate, 'yyyy-MM-dd'))
    } else {
      params.delete('endDate')
    }
    
    router.replace(`?${params.toString()}`, { scroll: false })
  }, [startDate, endDate, searchParams, router, isRenderComplete])

  // Handler for start date change
  const handleStartDateChange = (date: Date | undefined) => {
    console.log('Start date changed:', date)
    
    // Normalize to start of day or undefined
    const normalizedDate = date ? startOfDay(date) : undefined
    setStartDate(normalizedDate)
    
    // If end date exists and becomes invalid, reset it
    if (endDate && normalizedDate && endDate < normalizedDate) {
      setEndDate(undefined)
    }
  }

  // Handler for end date change
  const handleEndDateChange = (date: Date | undefined) => {
    console.log('End date changed:', date)
    
    // Normalize to start of day or undefined
    const normalizedDate = date ? startOfDay(date) : undefined
    setEndDate(normalizedDate)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-gray-900">{listing.name}</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="ml-1 text-sm font-medium">{listing.rating}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <MapPin className="w-4 h-4" />
              <span className="ml-1 text-sm">{listing.location}</span>
            </div>
          </div>
        </div>
      </div>

                {/* Image Gallery */}
      <div className="mt-6">
        <ImageGallery images={listing.images} title={listing.name} />
      </div>


      {/* Grid Layout */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Host Info */}
          <div className="flex items-center justify-between pb-6 border-b">
            <div>
              <h2 className="text-xl font-semibold">
                Disewakan oleh {listing.host.name}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Rating: {listing.host.rating} · {listing.host.reviews} ulasan
              </p>
            </div>
            <img
              src={listing.host.image}
              alt={listing.host.name}
              width={56}
              height={56}
              className="rounded-full"
            />
          </div>

          {/* Features */}
          <div className="space-y-4 pb-6 border-b">
            <h3 className="text-lg font-semibold">Fasilitas yang ditawarkan</h3>
            <div className="grid grid-cols-2 gap-4">
              {listing.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4 pb-6 border-b">
            <h3 className="text-lg font-semibold">Tentang barang ini</h3>
            <p className="text-gray-600 whitespace-pre-line">
              {listing.description}
            </p>
          </div>
        </div>

        {/* Booking Card */}
        <div className="lg:col-span-1">
          <div
            className="rounded-xl border border-gray-200 p-6 shadow-sm relative"
        
          >
            {/* Harga & Rating */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-xl sm:text-2xl font-bold text-green-600">
                  Rp{listing.price.toLocaleString()}
                </span>
                <span className="text-gray-500"> /hari</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="ml-1 text-sm font-medium">{listing.rating}</span>
              </div>
            </div>

            {/* Tanggal Sewa */}
            <div className="flex flex-col gap-4 mb-4">
              <DatePicker
                key="start-date-picker"
                label="Tanggal Mulai Sewa"
                selectedDate={startDate}
                onDateChange={handleStartDateChange}
                disabledBefore={today}
              />

              <DatePicker
                key="end-date-picker"
                label="Tanggal Akhir Sewa"
                selectedDate={endDate}
                onDateChange={handleEndDateChange}
                disabledBefore={startDate || today}
              />
            </div>

            {/* Tombol Pesan */}
            <div className="hidden lg:block">
              <button
                className={`w-full mt-6 py-3 rounded-lg font-medium transition-colors ${
                  startDate && endDate
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!startDate || !endDate}
              >
                Pesan Sekarang
              </button>
              <p className="mt-4 text-center text-sm text-gray-500">
                Anda belum akan dikenakan biaya
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Location Section */}
      <div className="mt-10 pb-8 border-b">
        <h2 className="text-xl font-semibold mb-6">Lokasi Anda</h2>
        <div className="h-96 bg-gray-100 rounded-xl overflow-hidden relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63245.97055414067!2d112.55355549999999!3d-7.98068125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd637aaab794a41%3A0x985e275799889424!2sKec.%20Dau%2C%20Kabupaten%20Malang%2C%20Jawa%20Timur!5e0!3m2!1sid!2sid!4v1716360254758!5m2!1sid!2sid" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className="absolute bottom-4 left-4 bg-white py-2 px-4 rounded-lg shadow-md">
            <div className="font-medium">Kecamatan Dau, Jawa Timur, Indonesia</div>
          </div>
        </div>
      </div>
      {/* Padding for Mobile */}
      <div className="h-20 lg:hidden" />
    </div>
  )
}