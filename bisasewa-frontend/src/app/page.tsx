// app/page.tsx

import SearchBar from '@/components/sections/SearchBar'
import CategoryScroller from '@/components/sections/CategoryScroller'
import ListingGrid from '@/components/sections/ListingGrid'

export default function Home() {
  return (
    <main className="pt-6">
      <SearchBar />
      <CategoryScroller />
      <ListingGrid />
    </main>
  )
}
