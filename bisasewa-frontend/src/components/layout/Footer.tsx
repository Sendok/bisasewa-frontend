// components/layout/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-50 mt-16 border-t">
      <div className="container mx-auto px-6 py-6 text-sm text-gray-600 flex justify-between">
        <p>&copy; {new Date().getFullYear()} BisaSewa. Semua hak dilindungi.</p>
        <div className="space-x-4">
          <a href="#" className="hover:underline">Tentang</a>
          <a href="#" className="hover:underline">Privasi</a>
          <a href="#" className="hover:underline">Syarat</a>
        </div>
      </div>
    </footer>
  )
}
