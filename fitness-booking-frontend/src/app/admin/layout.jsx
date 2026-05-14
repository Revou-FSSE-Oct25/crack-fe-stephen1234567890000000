"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      router.push("/services");
    }
  }, [router]);

  function navStyle(path) {
    return pathname === path
      ? "bg-white text-black"
      : "text-zinc-400 hover:bg-zinc-900 hover:text-white";
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      <aside
        className="
          w-[280px]
          border-r border-zinc-800
          bg-zinc-950/90
          backdrop-blur-xl
          p-8
          flex
          flex-col
        "
      >
        <div className="mb-14">
          <p className="uppercase tracking-[4px] text-zinc-500 text-xs mb-3">
            Fitness Admin
          </p>

          <h1 className="text-4xl font-black">FitBooking</h1>
        </div>

        <nav className="space-y-3">
          <Link
            href="/admin/services"
            className={`
              flex items-center
              px-5 py-4
              rounded-2xl
              transition-all duration-300
              font-medium
              ${navStyle("/admin/services")}
            `}
          >
            Manage Services
          </Link>

          <Link
            href="/admin/bookings"
            className={`
              flex items-center
              px-5 py-4
              rounded-2xl
              transition-all duration-300
              font-medium
              ${navStyle("/admin/bookings")}
            `}
          >
            Booking Management
          </Link>
        </nav>

        <div className="mt-auto">
          <div
            className="
              bg-zinc-900
              border border-zinc-800
              rounded-3xl
              p-6
            "
          >
            <p className="text-zinc-500 text-sm mb-2">System Status</p>

            <h3 className="font-bold text-lg">All Systems Active</h3>
          </div>
        </div>
      </aside>

      <main className="flex-1 bg-black">
        <div
          className="
            border-b border-zinc-800
            px-10 py-6
            flex justify-between items-center
            sticky top-0
            bg-black/80
            backdrop-blur-xl
            z-40
          "
        >
          <div>
            <p className="text-zinc-500 text-sm uppercase tracking-[3px]">
              Admin Dashboard
            </p>

            <h2 className="text-2xl font-bold mt-1">Control Center</h2>
          </div>

          <div
            className="
              bg-zinc-900
              border border-zinc-800
              px-5 py-3
              rounded-full
            "
          >
            <span className="text-sm text-zinc-400">Administrator</span>
          </div>
        </div>

        <div className="p-10">{children}</div>
      </main>
    </div>
  );
}
