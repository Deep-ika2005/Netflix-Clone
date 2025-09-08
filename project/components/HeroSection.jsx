import { useState, useRef } from 'react'
import Button from '@/components/Button'
import { Play, Info } from 'lucide-react'

export default function HeroSection({ featuredMovie }) {
  const [showVideo, setShowVideo] = useState(false)
  const videoRef = useRef(null) 

  if (!featuredMovie) return null

  const handlePlayToggle = () => {
    if (showVideo) {
     
      videoRef.current.pause()
      videoRef.current.currentTime = 0
      setShowVideo(false)
    } else {
      
      setShowVideo(true)
      setTimeout(() => {
        videoRef.current?.play()
      }, 100) 
    }
  }

  return (
    <section className="relative h-[70vh] md:h-[80vh] flex items-center">
     
      {showVideo ? (
        <video ref={videoRef}
          src="https://kekvncnwmtpqdbrfxkxr.supabase.co/storage/v1/object/public/movies/videos/video5.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          playsInline/>
      ) : (
       <div
  className="absolute inset-0 w-full h-full md:h-screen bg-cover bg-center"
  style={{ backgroundImage: "url('/image/image2.webp')" }}></div>

      )}
      
    <div className="relative z-10 px-4 md:px-12 max-w-2xl">
        <h1 className="text-4xl md:text-7xl font-extrabold mt-40 mb-4 ">Retro</h1>
        <p className='text-sm'>Retro movies transport us to a golden era of cinema, where storytelling, raw emotions, and authentic performances took center stage. With grainy film textures, classic soundtracks, and timeless charm, they evoke nostalgia and capture the essence of a bygone time. Each frame feels like a window into history, reminding us why the classics never truly fade.</p>
        <br />
        <div className="flex space-x-4">
          <Button className="bg-white hover:bg-gray-200 text-black px-8 py-3 text-lg font-semibold" onClick={handlePlayToggle}>
            <Play className="h-6 w-6 mr-2 fill-current" />{" "}
            {showVideo ? "Stop" : "Play"}
          </Button>
          <Button className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 text-lg font-semibold">
            <Info className="h-6 w-6 mr-2" /> More Info
          </Button> 
        </div>
      </div>
    </section>
  )
}
