'use client'

import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Play, Plus, Download } from 'lucide-react'

export default function MovieRow({ title, movies }) {
  const rowRef = useRef(null)
  const [hoveredMovie, setHoveredMovie] = useState(null)
  const [hoverCoords, setHoverCoords] = useState({ top: 0, left: 0, width: 0 })
  const [fullscreenMovie, setFullscreenMovie] = useState(null)

  console.log('Movies array:', movies)

  const scrollLeft = () => {
    rowRef.current?.scrollBy({ left: -200, behavior: 'smooth' })
  }

  const scrollRight = () => {
    rowRef.current?.scrollBy({ left: 200, behavior: 'smooth' })
  }

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setFullscreenMovie(null)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  if (!movies?.length) return null

  const handleMouseEnter = (movieId, e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setHoverCoords({ top: rect.top, left: rect.left, width: rect.width })
    setHoveredMovie(movieId)
  }

  const handleMouseLeave = () => {
    setHoveredMovie(null)
  }

const getHoverStyle = () => {
  const cardWidth = 350
  let left = hoverCoords.left + hoverCoords.width / 2 - cardWidth / 2
  const padding = 10
  if (left < padding) left = padding
  if (left + cardWidth > window.innerWidth - padding)
    left = window.innerWidth - cardWidth - padding
  return {
    top: hoverCoords.top - 80,
    left,
  }
}

  return (
    <div className="relative px-4 md:px-12">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>

      <button onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-[100] p-2 bg-black/50 rounded-full hover:bg-black/70" >
        <ChevronLeft className="text-white" size={40} />
      </button>

      <div
        ref={rowRef}
        className="grid grid-flow-col auto-cols-[250px] gap-4 overflow-x-auto scrollbar-hide"
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative cursor-pointer rounded-md"
            onMouseEnter={(e) => handleMouseEnter(movie.id, e)}
            onMouseLeave={handleMouseLeave}
            onClick={() => setFullscreenMovie(movie)}>
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-[140px] object-cover rounded-md" />
          </div>
        ))}
      </div>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-[100] p-2 bg-black/50 rounded-full hover:bg-black/70">
        <ChevronRight className="text-white" size={40} />
      </button>

      {hoveredMovie && (
        <div
          className="fixed w-[300px] bg-neutral-900 rounded-2xl shadow-xl z-50 transition-transform duration-200 scale-100 -translate-y-14 pointer-events-none"
          style={getHoverStyle()}
        >
          {movies
            .filter((m) => m.id === hoveredMovie)
            .map((movie) => {
              console.log('Hovered movie:', movie) 
              return (
                <div key={movie.id}>
                
                  <div className="relative w-full h-[200px] rounded-2xl overflow-hidden">
                    {movie.videoUrl ? (
                      <video
                        src={movie.videoUrl}
                        autoPlay
                        loop
                        playsInline
                        className="w-full h-full object-cover"/>
                    ) : (
                      <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover"/>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 p-3">
                    <button className="bg-white text-black rounded-full p-2 hover:bg-gray-300">
                      <Play className="w-5 h-5" />
                    </button>
                    <button className="bg-gray-700 text-white rounded-full p-2 hover:bg-gray-600">
                      <Plus className="w-5 h-5" />
                    </button>
                    <button className="bg-gray-700 text-white rounded-full p-2 hover:bg-gray-600">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="px-3 pb-3 text-sm text-gray-300">
                    <h1 className='text-bold text-white'>{movie.title}</h1>
                    <p>
                      {movie.rating} • {movie.runtime} • {movie.genres}
                    </p>
                  </div>
                </div>
              )
            })}
        </div>
      )}

      {/* Fullscreen Modal */}
      {fullscreenMovie && (
        <>
          {console.log('Fullscreen movie:', fullscreenMovie)} 
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[999]"
            onClick={() => setFullscreenMovie(null)}>
            <div className="relative w-screen h-screen bg-black"
              onClick={(e) => e.stopPropagation()}>
              {fullscreenMovie.videoUrl ? (
                <video src={fullscreenMovie.videoUrl}
                  autoPlay
                  loop
                  playsInline
                  className="w-full h-full object-contain"/>
              ) : (
                <img src={fullscreenMovie.posterUrl} alt={fullscreenMovie.title} className="w-full h-full object-contain" />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
