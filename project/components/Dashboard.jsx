"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Dashboard() {
  const [movieCount, setMovieCount] = useState(0)
  const [userCount, setUserCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)

      // count movies
      let { count: movies, error: movieErr } = await supabase
        .from("movies")
        .select("*", { count: "exact", head: true })
      if (!movieErr) setMovieCount(movies || 0)

      // count users
      let { count: users, error: userErr } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true })
      if (!userErr) setUserCount(users || 0)

      setLoading(false)
    }

    fetchStats()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">📊 Admin Dashboard</h1>

      {loading ? (
        <p>⏳ Loading stats...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold">Movies</h2>
            <p className="text-3xl font-semibold">{movieCount}</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold">Users</h2>
            <p className="text-3xl font-semibold">{userCount}</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold">Revenue</h2>
            <p className="text-3xl font-semibold">$12,340</p>
          </div>
        </div>
      )}
    </div>
  )
}
