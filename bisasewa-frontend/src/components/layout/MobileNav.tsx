'use client'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MagnifyingGlassIcon, HeartIcon, UserIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

export default function MobileNav() {
  const pathname = usePathname()
  
  const navItems = [
    {
      label: 'Cari',
      href: '/search',
      icon: MagnifyingGlassIcon
    },
    {
      label: 'Favorit',
      href: '/favorites',
      icon: HeartIcon
    },
    {
      label: 'Akun',
      href: '/login',
      icon: UserIcon
    }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="bg-white border-t border-gray-200 py-2 px-4">
        <div className="flex items-center justify-around">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex flex-col items-center p-2 rounded-lg transition-colors',
                pathname === item.href
                  ? 'text-green-600'
                  : 'text-gray-500 hover:text-green-600'
              )}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}