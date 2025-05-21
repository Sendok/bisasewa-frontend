import ListingDetail from '@/components/sections/ListingDetail'
import { notFound } from 'next/navigation'
import type { Listing } from '@/types/listing'

// This would eventually come from your API
const getListingById = async (id: string): Promise<Listing | null> => {
  // Mock data for now - replace with actual API call
  const mockListing = {
    id: '1',
    name: 'Rumah Jogja Aesthetic 3BR dengan halaman belakang',
    location: 'Yogyakarta, Indonesia',
    price: 500000,
    rating: 4.95,
    description: `Interior simple di Karangwuni Daya, Yogyakarta

Tempat yang nyaman untuk staycation bersama keluarga atau teman. Suasana yang tenang karena berada di area perumahan.`,
    images: [
      '/images/list.png',
      '/images/list.png',
      '/images/list.png',
      '/images/list.png',
      '/images/list.png',
    ],
    features: [
      'Wifi kencang',
      'Area kerja khusus',
      'Dapur lengkap',
      'AC',
      'Smart TV',
      'Teras/balkon',
    ],
    host: {
      name: 'Tuan Rumah',
      image: '/images/avatar.png',
      rating: 4.9,
      reviews: 124,
    },
  }

  return mockListing.id === id ? mockListing : null
}

interface Props {
  params: {
    id: string
  }
}

export default async function ListingDetailPage({ params }: Props) {
  const listing = await getListingById(params.id)

  if (!listing) {
    notFound()
  }

  return <ListingDetail listing={listing} />
}