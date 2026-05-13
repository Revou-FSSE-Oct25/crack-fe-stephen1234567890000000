"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Navbar() {
  const [role, setRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function loadRole() {
      const savedRole = localStorage.getItem("role");
      console.log(savedRole, "roleeee");
      
      setRole(savedRole);
    }
    loadRole();
  }, []);

  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    router.push("/login");
  }

  return (
    <nav className="border-b px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold">
        FitBooking
      </Link>
      <div className="flex items-center gap-4">
        {role === "user" && <Link href="/services">Services</Link>}
        {role === "user" && <Link href="/bookings">My Bookings</Link>}
        {role === "admin" && <Link href="/admin/services">Dashboard</Link>}
        {role ? (
          <button
            onClick={handleLogout}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
