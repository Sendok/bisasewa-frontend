'use client'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Fragment, useState, useRef, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ArrowLeft } from 'lucide-react'

interface OTPVerificationModalProps {
  isOpen: boolean
  onClose: () => void
  onBack: () => void
  phoneNumber: string
  onSuccess: () => void  // Add this new prop
}

export default function OTPVerificationModal({ 
  isOpen, 
  onClose, 
  onBack, 
  phoneNumber,
  onSuccess 
}: OTPVerificationModalProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  
  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return // Prevent multiple digits

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = () => {
    const otpValue = otp.join('')
    if (otpValue.length === 6) {
      // Verify OTP here
      console.log('OTP submitted:', otpValue)
      // If verification successful, call onSuccess to proceed to registration
      onSuccess()
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
                  <Dialog.Title className="text-xl font-semibold">
                    Konfirmasikan nomor Anda
                  </Dialog.Title>
                </div>

                <div className="space-y-6">
                  <p className="text-lg">
                    Masukkan kode yang kami kirimkan melalui SMS ke +62 {phoneNumber}:
                  </p>

                  <div className="flex justify-center gap-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={digit}
                        ref={(el) => { inputRefs.current[index] = el }}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-12 h-12 text-center text-xl border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                      />
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <button className="text-green-600 hover:text-green-700 font-medium">
                      Pilih opsi lain
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={otp.some(digit => !digit)}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors
                        ${otp.every(digit => digit) 
                          ? 'bg-green-600 text-white hover:bg-green-700' 
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                    >
                      Lanjutkan
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}