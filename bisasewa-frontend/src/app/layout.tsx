// app/layout.tsx
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MobileNav from '@/components/layout/MobileNav'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-gray-50 text-gray-900">
        <div className="relative">
          {/* Background Image Container */}
          <div className="absolute top-0 left-0 right-0 h-[40%] -z-10">
            <div className="absolute inset-0 bg-[url('/background-landing.png')] bg-cover bg-center bg-no-repeat" />

          </div>
          
          <Navbar />
          <main className="min-h-screen pb-16 lg:pb-0">{children}</main>
          <Footer />
          <MobileNav />
        </div>
      </body>
    </html>
  )
}
