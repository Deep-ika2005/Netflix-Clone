'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // Redirect after clicking email confirmation link
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        setError(error.message)
      } else {
        alert('✅ Check your email and confirm your account before signing in.')
        router.push('/auth/signin')
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
        style={{backgroundImage: "url('https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/IN-en-20250721-TRIFECTA-perspective_cadc8408-df6e-4313-a05d-daa9dcac139f_medium.jpg')"}}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="absolute top-0 left-0 m-4">
        <h1 className="text-4xl font-bold text-[#E50914]">NETFLIX</h1>
      </div>

      {/* Form */}
      <div className="relative z-10 w-full max-w-md p-8">
        <div className="bg-black bg-opacity-75 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-white mb-6">Sign Up</h2>
          {error && <div className="bg-[#E87C03] text-white p-3 rounded mb-4 text-sm">{error}</div>}

          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label htmlFor="email" className="text-white text-sm">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#333] border-[#333] text-white h-12 mt-1 w-full px-3"
                placeholder="Email address"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="text-white text-sm">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#333] border-[#333] text-white h-12 mt-1 w-full px-3"
                placeholder="Password"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="text-white text-sm">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-[#333] border-[#333] text-white h-12 mt-1 w-full px-3"
                placeholder="Confirm password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#E50914] hover:bg-[#F40612] text-white h-12 text-lg font-semibold"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 text-center text-[#737373]">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-white hover:underline">
              Sign in now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
