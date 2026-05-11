"use client";

import BookingCard from "@/components/myBookingCard";
import api from "@/lib/axios";
import { useEffect, useState } from "react";

export default function MyBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBookings() {
      try {
        const { data } = await api.get("/bookings/my-bookings");
        console.log(data, "ini dataaaa");

        setBookings(data);
      } catch (error) {
        setError(error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      {bookings.length === 0 && !loading && <p>You have no bookings yet.</p>}
      {error && <p className="text-red-500">{error}</p>}
      {loading && <p>Loading your bookings...</p>}
      <div className="space-y-4">
        {bookings.map((el) => (
          <BookingCard key={el.id} booking={el} refresh={fetchBookings} />
        ))}
      </div>
    </div>
  );
}
