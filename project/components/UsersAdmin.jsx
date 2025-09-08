"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function UsersAdmin() {
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    let { data, error } = await supabase.from("profiles").select("*")
    if (error) {
      console.error("❌ Fetch error:", error.message)
    } else {
      setUsers(data || [])
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleDelete = async (id) => {
    if (!confirm("Delete this user?")) return
    const { error } = await supabase.from("profiles").delete().eq("id", id)
    if (error) {
      alert("❌ Delete failed: " + error.message)
    } else {
      alert("🗑 User deleted")
      fetchUsers()
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">👥 Manage Users</h1>

      <table className="w-full bg-gray-900 rounded-lg overflow-hidden">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Current Email</th>
   
            <th className="px-4 py-2 text-left">Role</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-400">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} className="border-t border-gray-700">
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.email}</td>

                <td className="px-4 py-2">{user.role || "—"}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-600 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
