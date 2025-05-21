'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

type Listing = {
  id: string
  name: string
  location: string
  price: number
  discount?: number
  image: string
  rating: number
  category: string // Add this line
}

const mockListings: Listing[] = [
  {
    id: '1',
    name: 'Vila Sejuk di Bali',
    location: 'Ubud, Indonesia',
    price: 500000,
    image: '/images/list.png',
    rating: 4.8,
    discount: 10,
    category: 'Villa', // Add categories
  },
  {
    id: '2',
    name: 'Kamera Canon R6',
    location: 'Jakarta',
    price: 150000,
    image: '/images/list.png',
    rating: 4.5,
    category: 'Elektronik',
  },
  {
    id: '3',
    name: 'PlayStation 5',
    location: 'Surabaya',
    price: 200000,
    image: '/images/list.png',
    rating: 4.7,
    discount: 15,
    category: 'Permainan',
  },
  {
    id: '4',
    name: 'DJI Mavic Air 2',
    location: 'Bandung',
    price: 350000,
    image: '/images/list.png',
    rating: 4.6,
    category: 'Drone',
  },
  {
    id: '5',
    name: 'Tenda Camping 4 Orang',
    location: 'Yogyakarta',
    price: 100000,
    image: '/images/list.png',
    rating: 4.3,
    discount: 20,
    category: 'Camping',
  },
  {
    id: '6',
    name: 'MacBook Pro M1',
    location: 'Jakarta Selatan',
    price: 450000,
    image: '/images/list.png',
    rating: 4.9,
    category: 'Elektronik',
  },
  {
    id: '7',
    name: 'Sepeda Gunung MTB',
    location: 'Bogor',
    price: 120000,
    image: '/images/list.png',
    rating: 4.4,
    discount: 5,
    category: 'Olahraga',
  },
  {
    id: '8',
    name: 'Nintendo Switch',
    location: 'Tangerang',
    price: 150000,
    image: '/images/list.png',
    rating: 4.7,
    category: 'Permainan',
  },
  {
    id: '9',
    name: 'Peralatan Camping Set',
    location: 'Malang',
    price: 180000,
    image: '/images/list.png',
    rating: 4.5,
    discount: 12,
    category: 'Camping',
  },
  {
    id: '10',
    name: 'Studio Lighting Kit',
    location: 'Semarang',
    price: 250000,
    image: '/images/list.png',
    rating: 4.6,
    category: 'Fotografi',
  },
]

export default function ListingGrid() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const totalPages = Math.ceil(mockListings.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = mockListings.slice(startIndex, endIndex)

  return (
    <div className="bg-white py-8 border-t border-b border-gray-200">
      <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-xl font-semibold text-gray-800">
          Rekomendasi untuk Anda
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {currentItems.map((item) => (
            <Link
              key={item.id}
              href={`/listing/${item.id}`}
              className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition group cursor-pointer border border-gray-100"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Category Label */}
                <span className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-[11px] font-medium">
                  {item.category}
                </span>
                {item.discount && (
                  <span className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-lg text-[11px] font-medium">
                    -{item.discount}%
                  </span>
                )}
              </div>

              {/* Content Container */}
              <div className="flex flex-col p-3 gap-1.5">
                {/* Location */}
                <div className="flex items-center text-gray-500 text-xs">
                  <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {item.location}
                </div>

                {/* Name */}
                <h3 className="font-medium text-gray-800 text-sm line-clamp-1">
                  {item.name}
                </h3>

                {/* Price and Rating */}
                <div className="flex justify-between items-center mt-1">
                  <div className="flex flex-col">
                    <span className="text-green-600 font-bold text-sm">
                      Rp{item.price.toLocaleString()}
                    </span>
                    {item.discount && (
                      <span className="text-[11px] text-gray-400 line-through">
                        Rp{(item.price / (1 - item.discount / 100)).toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center bg-yellow-50 px-1.5 py-0.5 rounded">
                    <svg className="w-3.5 h-3.5 text-yellow-400 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs font-medium text-gray-700">
                      {item.rating}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination Controls with background */}
        <div className="mt-8 bg-white-50">
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-lg ${
                    currentPage === i + 1
                      ? 'bg-green-600 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}