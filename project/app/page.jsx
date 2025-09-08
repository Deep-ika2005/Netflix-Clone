'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'


export default function Home() {
  const router = useRouter()
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
    }
    checkUser()
  }, [])

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{backgroundImage:"url('https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/IN-en-20250721-TRIFECTA-perspective_cadc8408-df6e-4313-a05d-daa9dcac139f_medium.jpg')",}}/>

      <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-6 z-10">
        <h1 className="text-4xl font-bold text-[#E50914]">NETFLIX</h1>
        <div className="flex gap-4 items-center">
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-black bg-opacity-70 text-white px-2 py-1 rounded border border-gray-500 text-sm">
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
          </select>

          <button onClick={() => router.push('/auth/signin')}
            className="bg-[#E50914] text-white px-4 py-1 rounded font-semibold cursor-pointer">
            Sign In
          </button>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Unlimited movies, TV shows and more
        </h1><br />
        <h2 className="text-2xl mb-6 bold">Starts at ₹149. Cancel at any time.</h2>
        <p className="mb-4 bold">
          Ready to watch? Enter your email to create or restart your membership.
        </p><br />

        <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
          <input
            type="email"
            placeholder="Email address"
            className="px-10 py-3 text-white bg-[#333] rounded"
          />
          <button
            onClick={() => router.push('/auth/signup')}
            className="bg-[#E50914] px-6 py-3 rounded text-white font-bold hover:bg-red-700">
            Get Started
          </button>
        </div>
      </div>
      
    </div>
  )
}
