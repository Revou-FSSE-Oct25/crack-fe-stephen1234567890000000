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
    <nav className="bg-black text-white p-4 shadow-lg border-b border-gray-700">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover-lift">
          FitBooking
        </Link>
        <div className="space-x-4 flex items-center">
          {role === "user" && (
            <>
              <Link href="/services" className="hover:text-gray-300 transition">
                Services
              </Link>
              <Link href="/bookings" className="hover:text-gray-300 transition">
                My Bookings
              </Link>
            </>
          )}
          {role === "admin" && (
            <>
              <Link href="/admin/services" className="hover:text-gray-300 transition">
                Manage Services
              </Link>
              <Link href="/admin/bookings" className="hover:text-gray-300 transition">
                All Bookings
              </Link>
            </>
          )}
          {role ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className="hover:text-gray-300 transition">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
