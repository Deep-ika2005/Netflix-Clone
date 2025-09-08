'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import MovieRow from '@/components/MovieRow'
import HeroSection from '@/components/HeroSection'
import { fetchMoviesTop10DubbedNewMovies } from '@/lib/fetchMovies'
import Footer from '@/components/Footer'

export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [featuredMovie, setFeaturedMovie] = useState(null)
  const [movies, setMovies] = useState([])
  const [top10Movies, setTop10Movies] = useState([])
  const [dubbedMovies, setDubbedMovies] = useState([])
  const [newMovies, setNewMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [showVideo, setShowVideo] = useState(false)
  const [videoUrl, setVideoUrl] = useState('')

  const fetchData = useCallback(async () => {
    try {
      const { moviesWithUrls, top10WithUrls, dubbedWithUrls, newMoviesWithUrls } =await fetchMoviesTop10DubbedNewMovies()
      setMovies(moviesWithUrls)
      setTop10Movies(top10WithUrls)
      setDubbedMovies(dubbedWithUrls)
      setNewMovies(newMoviesWithUrls)
      if (moviesWithUrls.length > 0) setFeaturedMovie(moviesWithUrls[0])
    } catch (err) {
      console.error('Error fetching movies:', err)
    }
  }, [])

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/signin')
      } else {
        setUser(user)
        await fetchData()
      }
      setLoading(false)
    }
    getUser()
  }, [fetchData, router])

  const handlePlay = (url) => {
    setVideoUrl(url)
    setShowVideo(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-8xl font-bold text-[#E50914]">NETFLIX</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white relative">
      <Navbar />
      <HeroSection featuredMovie={featuredMovie} onPlay={handlePlay} />

      <section className="relative z-20 md:mt-[150px] space-y-8 ">
        <MovieRow title="Trending Now" movies={movies} onSelect={setFeaturedMovie} onPlay={handlePlay}/>
        <MovieRow title="Top 10" movies={top10Movies} onSelect={setFeaturedMovie} onPlay={handlePlay}/>
        <MovieRow title="Dubbed in Tamil Movies" movies={dubbedMovies} onSelect={setFeaturedMovie} onPlay={handlePlay} />
        <MovieRow title="New Movies In Tamil" movies={newMovies} onSelect={setFeaturedMovie} onPlay={handlePlay} />
      </section>

      {showVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50" onClick={() => setShowVideo(false)}>
          <div className="relative w-full max-w-4xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <video key={videoUrl} controls autoPlay className="w-full h-full rounded-lg">
              <source src={videoUrl} type="video/mp4" />
            </video>
          </div>
        </div>
      )}<br /> <br />
      <Footer />
    </div>
  )
}
