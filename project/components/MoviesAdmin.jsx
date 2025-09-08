"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function MoviesAdmin() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editMovie, setEditMovie] = useState(null)

  // form states
  const [title, setTitle] = useState("")
  const [posterUrl, setPosterUrl] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [rating, setRating] = useState("")
  const [runtime, setRuntime] = useState("")
  const [genres, setGenres] = useState("")

  // fetch movies
  const fetchMovies = async () => {
    let { data, error } = await supabase.from("movies").select("*")
    if (error) console.error("Fetch error:", error.message)
    else setMovies(data)
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  // add or update
  const handleSaveMovie = async (e) => {
    e.preventDefault()
    setLoading(true)

    let error
    if (editMovie) {
      // update
      ;({ error } = await supabase
        .from("movies")
        .update({
          title,
          poster_path: posterUrl,
          video_url: videoUrl,
          rating,
          runtime,
          genres,
        })
        .eq("id", editMovie.id))
    } else {
      // insert
      ;({ error } = await supabase.from("movies").insert([
        { title, poster_path: posterUrl, video_url: videoUrl, rating, runtime, genres },
      ]))
    }

    if (error) {
      console.error("Save error:", error.message)
      alert("❌ Failed: " + error.message)
    } else {
      alert("✅ Saved successfully!")
      fetchMovies()
      setShowModal(false)
      resetForm()
    }

    setLoading(false)
  }

  const resetForm = () => {
    setTitle("")
    setPosterUrl("")
    setVideoUrl("")
    setRating("")
    setRuntime("")
    setGenres("")
    setEditMovie(null)
  }

  // delete movie
  const handleDelete = async (id) => {
    if (!confirm("Delete this movie?")) return
    const { error } = await supabase.from("movies").delete().eq("id", id)
    if (error) alert("❌ Delete failed: " + error.message)
    else {
      alert("🗑 Deleted successfully")
      fetchMovies()
    }
  }

  // open modal for edit
  const openEdit = (movie) => {
    setEditMovie(movie)
    setTitle(movie.title)
    setPosterUrl(movie.poster_path)
    setVideoUrl(movie.video_url)
    setRating(movie.rating)
    setRuntime(movie.runtime)
    setGenres(movie.genres)
    setShowModal(true)
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">🎬 Manage Movies</h1>
      <button
        onClick={() => setShowModal(true)}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded mb-6"
      >
        ➕ Add New Movie
      </button>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-gray-900 p-4 rounded-lg relative">
            <img
              src={movie.poster_path}
              alt={movie.title}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-xl font-semibold mt-2">{movie.title}</h2>
            <p className="text-sm text-gray-400">{movie.genres}</p>
            <p className="text-sm">⏱ {movie.runtime}</p>
            <p className="text-sm">⭐ {movie.rating}</p>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => openEdit(movie)}
                className="bg-yellow-600 px-2 py-1 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(movie.id)}
                className="bg-red-600 px-2 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
          <div className="bg-gray-900 p-6 rounded-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">
              {editMovie ? "✏️ Edit Movie" : "➕ Add Movie"}
            </h2>
            <form onSubmit={handleSaveMovie} className="space-y-3">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 bg-gray-800 rounded"
                required
              />
              <input
                type="text"
                placeholder="Poster URL"
                value={posterUrl}
                onChange={(e) => setPosterUrl(e.target.value)}
                className="w-full p-2 bg-gray-800 rounded"
                required
              />
              <input
                type="text"
                placeholder="Video URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="w-full p-2 bg-gray-800 rounded"
                required
              />
              <input
                type="text"
                placeholder="Rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full p-2 bg-gray-800 rounded"
              />
              <input
                type="text"
                placeholder="Runtime"
                value={runtime}
                onChange={(e) => setRuntime(e.target.value)}
                className="w-full p-2 bg-gray-800 rounded"
              />
              <input
                type="text"
                placeholder="Genres"
                value={genres}
                onChange={(e) => setGenres(e.target.value)}
                className="w-full p-2 bg-gray-800 rounded"
              />

              <div className="flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    resetForm()
                  }}
                  className="px-4 py-2 bg-gray-600 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
