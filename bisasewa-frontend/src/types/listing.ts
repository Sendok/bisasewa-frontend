export interface Listing {
  id: string
  name: string
  location: string
  price: number
  rating: number
  description: string
  images: string[]
  features: string[]
  discount?: number
  host: {
    name: string
    image: string
    rating: number
    reviews: number
  }
}