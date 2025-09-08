"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminGuard({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/signin");
        return;
      }

      let { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      console.log("Role check:", data, error);

      if (data?.role === "admin") {
        setIsAdmin(true);
      } else {
        router.push("/");
      }
      setLoading(false);
    };

    checkRole();
  }, [router]);

  if (loading) return <p className="text-white">Checking access...</p>;

  return isAdmin ? children : null;
}
