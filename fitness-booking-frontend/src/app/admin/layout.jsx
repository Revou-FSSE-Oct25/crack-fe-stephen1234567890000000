"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      router.push("/services");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex">
      <aside className="w-[250px] bg-black text-white p-6">
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
        <div className="space-y-4">
          <a href="/admin/services">Services</a>
          <a href="/admin/bookings">Bookings</a>
        </div>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
