'use client'
import React from 'react'
import { Mail } from 'lucide-react'
import { usePathname,useRouter } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleClick = () => {
    if (pathname === '/dashboard') {
      router.push('/')
    } else {
      router.push('/dashboard')
    }
  }
  console.log(pathname)
  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Left aligned */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TrackMail
              </span>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
              onClick={handleClick}
            >
              {pathname === '/dashboard' ? 'Compose Email' : 'Dashboard'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
