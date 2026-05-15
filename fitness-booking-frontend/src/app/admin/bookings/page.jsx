"use client";

import api from "@/lib/axios";
import { useEffect, useState } from "react";
import AdminBookingCard from "@/components/adminBookingCard";
import useProtected from "@/app/hooks/useProtected";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchBookings() {
    try {
      const { data } = await api.get("/bookings/admin/all");

      setBookings(data);
    } catch (error) {
      setError(error.response?.data?.message);
    }
  }

  useEffect(() => {
    async function loadData() {
      await fetchBookings();
      setLoading(false);
    }
    loadData();
  }, []);

  useProtected(["admin"]);

  return (
    <div className="text-white">
      <div
        className="
          flex flex-col lg:flex-row
          justify-between
          lg:items-end
          gap-6
          mb-14
        "
      >
        <div>
          <p
            className="
              uppercase
              tracking-[4px]
              text-zinc-500
              text-sm
              mb-3
            "
          >
            Booking Management
          </p>

          <h1
            className="
              text-5xl
              font-black
              mb-4
            "
          >
            All Bookings
          </h1>

          <p className="text-zinc-500 max-w-2xl">
            Monitor and manage all premium training sessions booked by your
            clients.
          </p>
        </div>

        <div
          className="
            bg-zinc-950
            border border-zinc-800
            rounded-3xl
            px-8 py-6
            min-w-[250px]
          "
        >
          <p className="text-zinc-500 text-sm mb-2">Total Bookings</p>

          <h2
            className="
              text-5xl
              font-black
            "
          >
            {bookings.length}
          </h2>
        </div>
      </div>

      {error && (
        <div
          className="
            bg-red-500/10
            border border-red-500/20
            text-red-300
            px-5 py-4
            rounded-2xl
            mb-8
          "
        >
          {error}
        </div>
      )}

      {loading && (
        <div className="space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="
                  h-[220px]
                  bg-zinc-950
                  border border-zinc-800
                  rounded-3xl
                  animate-pulse
                "
            />
          ))}
        </div>
      )}

      {!loading && bookings.length === 0 && (
        <div
          className="
              bg-zinc-950
              border border-zinc-800
              rounded-3xl
              p-16
              text-center
            "
        >
          <h2
            className="
                text-3xl
                font-black
                mb-4
              "
          >
            No Bookings Found
          </h2>

          <p className="text-zinc-500">
            No training sessions have been booked yet.
          </p>
        </div>
      )}

      <div className="space-y-8">
        {bookings?.map((el) => (
          <AdminBookingCard key={el.id} booking={el} refresh={fetchBookings} />
        ))}
      </div>
    </div>
  );
}
