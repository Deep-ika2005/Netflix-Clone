"use client"

import { useState } from "react"
import Dashboard from "@/components/Dashboard"
import MoviesAdmin from "@/components/MoviesAdmin"
import UsersAdmin from "@/components/UsersAdmin"

export default function AdminPage() {
  const [tab, setTab] = useState("dashboard")

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 p-6">
        <h1 className="text-2xl text-white font-bold mb-6">Admin 👑</h1>
        <ul className="space-y-3">
          <li>
            <button
              onClick={() => setTab("dashboard")}
              className={`block w-full text-left text-white px-3 py-2 rounded ${
                tab === "dashboard" ? "bg-red-600" : "bg-gray-800"
              }`}
            >
              📊 Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => setTab("movies")}
              className={`block w-full text-left text-white px-3 py-2 rounded ${
                tab === "movies" ? "bg-red-600" : "bg-gray-800"
              }`}
            >
              🎬 Movies
            </button>
          </li>
          <li>
            <button
              onClick={() => setTab("users")}
              className={`block w-full text-left text-white px-3 py-2 rounded ${
                tab === "users" ? "bg-red-600" : "bg-gray-800"
              }`}
            >
              👥 Users
            </button>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1">
        {tab === "dashboard" && <Dashboard />}
        {tab === "movies" && <MoviesAdmin />}
        {tab === "users" && <UsersAdmin />}
      </div>
    </div>
  )
}
