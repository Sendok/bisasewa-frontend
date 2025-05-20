'use client'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X } from 'lucide-react'
import Image from 'next/image'
import RegistrationForm from './RegistrationForm'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showRegistration, setShowRegistration] = useState(false)
  const [error, setError] = useState('')

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Remove any non-digit characters and keep the cursor position stable
    const digits = value.replace(/\D/g, '')
    const cursorPosition = e.target.selectionStart
    
    // Clear error when user types
    setError('')
    
    // Update phone number while preserving cursor position
    if (digits.length > 0) {
      setPhoneNumber(digits)
      // Restore cursor position after state update
      setTimeout(() => {
        e.target.setSelectionRange(cursorPosition, cursorPosition)
      }, 0)
    } else {
      setPhoneNumber('')
    }
  }

  const handleContinue = () => {
    // Validate phone number
    if (!phoneNumber) {
      setError('Nomor telepon wajib diisi')
      return
    }

    if (phoneNumber.length < 10) {
      setError('Nomor telepon tidak valid')
      return
    }

    // If validation passes, proceed with registration
    setShowRegistration(true)
  }

  return (
    <>
      <Transition appear show={isOpen && !showRegistration} as={Fragment}>
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
                  <div className="flex justify-between items-center mb-4">
                    <button 
                      onClick={onClose}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="h-5 w-5 text-gray-500" />
                    </button>
                    <Dialog.Title className="text-center text-md font-medium flex-1">
                      Masuk atau mendaftar
                    </Dialog.Title>
                    <div className="w-7" />
                  </div>

                  <div className="mt-4">
                    <h3 className="text-center text-2xl font-semibold mb-6">Selamat Datang di BisaSewa.com</h3>
                    
                    <div className="space-y-4">
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                          +62
                        </div>
                        <input
                          type="tel"
                          placeholder="- - - - - - - - - -"
                          value={phoneNumber}
                          onChange={handlePhoneChange}
                          className={`w-full p-4 pl-12 border ${
                            error ? 'border-orange-500 focus:ring-orange-500' : 'border-gray-200 focus:ring-green-500'
                          } rounded-lg focus:ring-2 focus:border-transparent transition-all outline-none`}
                        />
                        {error && (
                          <p className="mt-2 text-sm text-orange-500 absolute">
                            {error}
                          </p>
                        )}
                      </div>
                      <br/>
                      <p className="text-sm text-gray-600">
                        Kami akan menelepon atau mengirim SMS guna mengonfirmiskan nomor Anda. 
                        Tarif standar SMS dan data berlaku.{' '}
                        <a href="#" className="text-green-600 hover:text-green-700 underline font-medium">
                          Kebijakan Privasi
                        </a>
                      </p>

                      <button
                        onClick={handleContinue}
                        className="w-full p-3.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Lanjutkan
                      </button>

                      <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">atau</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <button className="w-full p-3 border border-gray-200 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                          <Image src="/google.svg" alt="Google" width={20} height={20} />
                          <span className="font-medium text-gray-700">Lanjutkan dengan Google</span>
                        </button>
                        
                        <button className="w-full p-3 border border-gray-200 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                          <Image src="/apple.svg" alt="Apple" width={20} height={20} />
                          <span className="font-medium text-gray-700">Lanjutkan dengan Apple</span>
                        </button>
                        
                        <button className="w-full p-3 border border-gray-200 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                          <Image src="/facebook.svg" alt="facebook" width={20} height={20} />
                          <span className="font-medium text-gray-700">Lanjutkan dengan Facebook</span>
                        </button>
                        
                        <button className="w-full p-3 border border-gray-200 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                          <Image src="/email.svg" alt="Email" width={20} height={20} />
                          <span className="font-medium text-gray-700">Lanjutkan dengan email</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <RegistrationForm 
        isOpen={isOpen && showRegistration}
        onClose={onClose}
        onBack={() => setShowRegistration(false)}
      />
    </>
  )
}
