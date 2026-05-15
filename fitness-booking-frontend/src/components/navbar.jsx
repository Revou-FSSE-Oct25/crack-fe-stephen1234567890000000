"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [role, setRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    function loadRole() {
      const savedRole = localStorage.getItem("role");
      setRole(savedRole);
    }

    loadRole();
    window.addEventListener("authChanged", loadRole);
    return () => window.removeEventListener("authChanged", loadRole);
  }, []);

  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    window.dispatchEvent(new Event("authChanged"));
    router.push("/login");
  }

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/70 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-wide text-white hover:opacity-80 transition"
        >
          Fit<span className="text-zinc-400">Booking</span>
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-6 text-sm font-medium">
          {role === "user" && (
            <>
              <Link
                href="/services"
                className="text-zinc-300 hover:text-white transition duration-300"
              >
                Services
              </Link>

              <Link
                href="/bookings"
                className="text-zinc-300 hover:text-white transition duration-300"
              >
                My Bookings
              </Link>
            </>
          )}

          {role === "admin" && (
            <>
              <Link
                href="/admin/services"
                className="text-zinc-300 hover:text-white transition duration-300"
              >
                Manage Services
              </Link>

              <Link
                href="/admin/bookings"
                className="text-zinc-300 hover:text-white transition duration-300"
              >
                All Bookings
              </Link>
            </>
          )}

          {role ? (
            <button
              onClick={handleLogout}
              className="
                px-5 py-2 rounded-full
                bg-white/10
                border border-white/10
                text-white
                hover:bg-white hover:text-black
                transition-all duration-300
                backdrop-blur-md
              "
            >
              Sign Out
            </button>
          ) : (
            <Link
              href="/login"
              className="
                px-5 py-2 rounded-full
                bg-white text-black
                hover:bg-zinc-200
                transition-all duration-300
              "
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
