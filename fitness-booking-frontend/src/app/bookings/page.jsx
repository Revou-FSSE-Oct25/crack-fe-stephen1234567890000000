"use client";

import UserBookingCard from "@/components/UserBookingCard";
import Skeleton from "@/components/Skeleton";
import api from "@/lib/axios";
import { useEffect, useState } from "react";
import useProtected from "@/app/hooks/useProtected";

export default function MyBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchBookings() {
    try {
      const { data } = await api.get("/bookings/my-bookings");

      setBookings(data);
    } catch (error) {
      setError(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    async function loadData() {
      await fetchBookings();
    }
    loadData();
  }, []);

  useProtected(["user"]);
  const totalBookings = bookings.length;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-14">
          <p className="uppercase tracking-[4px] text-zinc-500 mb-3">
            Training Cart
          </p>

          <h1 className="text-5xl font-black">My Bookings</h1>
        </div>

        {error && <p className="text-red-400 mb-6">{error}</p>}

        {loading && (
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="
                    bg-zinc-950
                    border border-zinc-800
                    rounded-3xl
                    p-6
                  "
                >
                  <Skeleton width="w-full" height="h-6" className="mb-3" />

                  <Skeleton width="w-2/3" height="h-4" className="mb-3" />

                  <Skeleton width="w-1/3" height="h-4" />
                </div>
              ))}
            </div>

            <div
              className="
                bg-zinc-950
                border border-zinc-800
                rounded-3xl
                p-8
                h-fit
              "
            >
              <Skeleton width="w-1/2" height="h-6" className="mb-5" />

              <Skeleton width="w-full" height="h-10" />
            </div>
          </div>
        )}

        {!loading && (
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              {bookings.length === 0 && (
                <div
                  className="
                    bg-zinc-950
                    border border-zinc-800
                    rounded-3xl
                    p-12
                    text-center
                  "
                >
                  <h2 className="text-2xl font-bold mb-3">No Bookings Yet</h2>

                  <p className="text-zinc-500">
                    Start your fitness journey today.
                  </p>
                </div>
              )}

              {bookings.map((el) => (
                <UserBookingCard
                  key={el.id}
                  booking={el}
                  refresh={fetchBookings}
                />
              ))}
            </div>

            <div
              className="
                bg-zinc-950
                border border-zinc-800
                rounded-3xl
                p-8
                h-fit
                sticky top-28
              "
            >
              <h2 className="text-2xl font-bold mb-8">Booking Summary</h2>

              <div className="space-y-5">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Total Sessions</span>

                  <span className="font-semibold">{totalBookings}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500">Active Bookings</span>

                  <span className="font-semibold">
                    {bookings.filter((b) => b.status === "confirmed").length}
                  </span>
                </div>

                <div className="border-t border-zinc-800 pt-5">
                  <button
                    className="
                      w-full
                      bg-white
                      text-black
                      py-4
                      rounded-full
                      font-bold
                      hover:bg-zinc-200
                      transition-all duration-300
                    "
                  >
                    Continue Training
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
