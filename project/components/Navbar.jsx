'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { FiSearch, FiBell } from 'react-icons/fi'
import { LogOut, ChevronDown } from 'lucide-react'

export default function Navbar() {
  const router = useRouter()

  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [profileOpen, setProfileOpen] = useState(false)

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    const { data, error } = await supabase.from('movies').select('*')
    if (error) console.error('Error fetching movies:', error)
    else setMovies(data)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/auth/signin')
  }

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
     <div className="fixed top-0 z-50 w-full bg-gradient from-black to-transparent">
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-6 z-20 bg-gradient-to-b from-black to-transparent">
        <div className="flex items-center gap-8">
          <h1 className="text-3xl font-bold text-[#E50914] cursor-pointer" onClick={() => router.push('/')}> NETFLIX</h1>
          <nav className="hidden md:flex gap-6 text-sm">
            <span className="cursor-pointer hover:text-gray-400">Home</span>
            <span className="cursor-pointer hover:text-gray-400">TV Shows</span>
            <span className="cursor-pointer hover:text-gray-400">Movies</span>
            <span className="cursor-pointer hover:text-gray-400">Games</span>
            <span className="cursor-pointer hover:text-gray-400">News & popular</span>
            <span className="cursor-pointer hover:text-gray-400">My List</span>
            <span className="cursor-pointer hover:text-gray-400">Browse by Language</span>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {searchOpen && (
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-800 px-3 py-1 rounded outline-none border border-white text-white"
            />
          )}
          <FiSearch size={20} className="cursor-pointer" onClick={() => setSearchOpen(!searchOpen)}/>
          <p> Children</p>
          <FiBell size={20} className="cursor-pointer" />  
         

          {/* Profile Icon + Dropdown */}
          <div className="relative">
            <div
              className="w-8 h-8 bg-pink-700 rounded cursor-pointer flex items-center justify-center"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <img src="image/imageNav.png" alt="Profile" className="w-8 h-8 rounded" />
              <ChevronDown className="w-4 h-4 ml-1 text-black" />
            </div>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-black text-white rounded shadow-lg border border-gray-700">
                <ul className="flex flex-col text-sm">
                  <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 cursor-pointer">
                    <div className="w-6 h-6 bg-blue-700 rounded text-center">🐼</div> Profile 1
                  </li>
                  <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 cursor-pointer">
                    <div className="w-6 h-6 bg-purple-700 rounded text-center">🐨</div> Children
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">Manage Profiles</li>
                  <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">Transfer Profile</li>
                  <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">Account</li>
                  <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">Help Centre</li>
                  <li
                    onClick={handleSignOut}
                    className="px-4 py-2 hover:bg-gray-800 cursor-pointer text-red-500"
                  >
                    Sign out of Netflix
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

      {searchQuery && (
        <div className="absolute top-20 left-0 right-0 z-30 bg-black p-4">
          <h2 className="text-lg font-bold mb-2">Search Results:</h2>
          {filteredMovies.length > 0 ? (
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredMovies.map((movie) => (
                <li key={movie.id} className="bg-gray-800 p-2 rounded">
                  <img
                    src={movie.poster_path}
                    alt={movie.title}
                    className="w-full h-40 object-cover rounded"
                  />
                  <p className="mt-2 text-sm">{movie.title}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No results found.</p>
          )}
        </div>
      )}
    </>
  )
}
