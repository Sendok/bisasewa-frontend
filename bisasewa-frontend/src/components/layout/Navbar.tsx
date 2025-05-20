'use client'

import { useState } from 'react'
import { MenuIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import AuthModal from './auth/AuthModal'



export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)

  return (
    <>
      <header className="w-full border-b bg-gray-50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="BisaSewa Logo" width={110} height={60} />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/sewakan"
              className="text-sm font-medium text-gray-700 hover:text-green-700 transition"
            >
              Bisa Sewakan Aja?
            </Link>
            <div className="flex gap-4">
              <button
                onClick={() => setAuthModalOpen(true)}
                className="text-sm px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                Masuk atau Mendaftar
              </button>
            </div>
          </div>

          {/* Mobile Burger */}
          <div className="md:hidden">
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className="p-2 rounded-md hover:bg-gray-100 transition"
            >
              {menuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-gray-50 border-t px-4 py-4 space-y-4">
            <Link
              href="/sewakan"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition"
            >
              Mau Menyewakan Barang Anda?
            </Link>
            <div className="flex gap-4">
              <button
                onClick={() => setAuthModalOpen(true)}
                className="text-sm px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                Masuk atau Mendaftar
              </button>
            </div>
          </div>
        )}
      </header>

      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  )
}