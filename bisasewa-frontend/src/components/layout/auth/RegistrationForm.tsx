'use client'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface RegistrationFormProps {
  isOpen: boolean
  onClose: () => void
  onBack: () => void
}

interface FormErrors {
  firstName?: string
  lastName?: string
  birthDate?: string
  email?: string
}

export default function RegistrationForm({ isOpen, onClose, onBack }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    email: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    // Validate first name
    if (!formData.firstName) {
      newErrors.firstName = 'Nama depan wajib diisi'
    }

    // Validate last name
    if (!formData.lastName) {
      newErrors.lastName = 'Nama belakang wajib diisi'
    }

    // Validate birth date
    if (!formData.birthDate) {
      newErrors.birthDate = 'Tanggal lahir wajib diisi'
    } else {
      const birthDate = new Date(formData.birthDate)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      if (age < 18) {
        newErrors.birthDate = 'Anda harus berusia minimal 18 tahun'
      }
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = 'Email wajib diisi'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Format email tidak valid'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // Process form submission
      console.log('Form is valid', formData)
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white/95 backdrop-blur-md p-8 align-middle shadow-xl transition-all border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <button 
                    onClick={onBack}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ArrowLeft className="h-5 w-5 text-gray-500" />
                  </button>
                  <Dialog.Title className="text-xl font-semibold text-gray-500">
                    Selesaikan pendaftaran
                  </Dialog.Title>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-lg font-medium">Nama resmi</h2>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Nama depan pada bukti identitas"
                        value={formData.firstName}
                        onChange={(e) => {
                          setFormData({ ...formData, firstName: e.target.value })
                          if (errors.firstName) setErrors({ ...errors, firstName: undefined })
                        }}
                        className={`text-gray-500 w-full p-4 border ${
                          errors.firstName ? 'border-orange-500' : 'border-gray-200'
                        } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none`}
                      />
                      {errors.firstName && (
                        <p className="mt-2 text-sm text-orange-500">{errors.firstName}</p>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Nama belakang pada bukti identitas"
                        value={formData.lastName}
                        onChange={(e) => {
                          setFormData({ ...formData, lastName: e.target.value })
                          if (errors.lastName) setErrors({ ...errors, lastName: undefined })
                        }}
                        className={`text-gray-500 w-full p-4 border ${
                          errors.lastName ? 'border-orange-500' : 'border-gray-200'
                        } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none`}
                      />
                      {errors.lastName && (
                        <p className="mt-2 text-sm text-orange-500">{errors.lastName}</p>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      Pastikan nama Anda sesuai dengan nama pada bukti identitas resmi Anda. 
                      Jika Anda menggunakan nama lain, Anda bisa menambahkan <Link href="#" className="underline">nama depan pilihan</Link>.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-lg font-medium">Tanggal lahir</h2>
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => {
                          setFormData({ ...formData, birthDate: e.target.value })
                          if (errors.birthDate) setErrors({ ...errors, birthDate: undefined })
                        }}
                        className={`w-full p-4 border ${
                          errors.birthDate ? 'border-orange-500' : 'border-gray-200'
                        } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none`}
                      />
                      {errors.birthDate && (
                        <p className="mt-2 text-sm text-orange-500">{errors.birthDate}</p>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      Untuk mendaftar, Anda harus berusia setidaknya 18 tahun. 
                      Tanggal lahir Anda tidak akan dibagikan kepada orang lain yang menggunakan BisaSewa.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-lg font-medium">Info kontak</h2>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value })
                          if (errors.email) setErrors({ ...errors, email: undefined })
                        }}
                        className={`text-gray-500 w-full p-4 border ${
                          errors.email ? 'border-orange-500' : 'border-gray-200'
                        } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none`}
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm text-orange-500">{errors.email}</p>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      Kami akan mengirimkan konfirmasi perjalanan dan resi kepada Anda via email.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Dengan memilih <span className="font-medium">Setuju dan lanjutkan</span>, saya menyetujui{' '}
                      <Link href="#" className="text-green-600 hover:underline">Ketentuan Layanan</Link>,{' '}
                      <Link href="#" className="text-green-600 hover:underline">Ketentuan Layanan Pembayaran</Link>,{' '}
                      dan <Link href="#" className="text-green-600 hover:underline">Kebijakan Non-diskriminasi</Link>
                      {' '}BisaSewa dan menerima{' '}
                      <Link href="#" className="text-green-600 hover:underline">Kebijakan Privasi</Link>.
                    </p>

                    <button
                      type="submit"
                      className="w-full p-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Setuju dan lanjutkan
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}