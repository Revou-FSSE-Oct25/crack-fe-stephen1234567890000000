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

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      {bookings.length === 0 && !loading && <p>You have no bookings yet.</p>}
      {error && <p className="text-red-500">{error}</p>}
      {loading && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-black p-6 rounded-lg border border-gray-700">
              <Skeleton width="w-full" height="h-6" className="mb-2" />
              <Skeleton width="w-2/3" height="h-4" className="mb-2" />
              <Skeleton width="w-1/3" height="h-4" />
            </div>
          ))}
        </div>
      )}
      <div className="space-y-4">
        {bookings.map((el) => (
          <UserBookingCard key={el.id} booking={el} refresh={fetchBookings} />
        ))}
      </div>
    </div>
  );
}
