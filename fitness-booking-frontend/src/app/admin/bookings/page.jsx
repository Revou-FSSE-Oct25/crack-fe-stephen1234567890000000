"use client";

import api from "@/lib/axios";
import { useEffect, useState } from "react";
import BookingCard from "@/components/myBookingCard";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBookings() {
      try {
        const { data } = await api.get("/bookings/admin/all");
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
    <div>
      <h1 className="text-3xl font-bold mb-6">All Bookings</h1>
      <div className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        {loading && <p>Loading all bookings...</p>}
        {bookings?.map((el) => (
          <BookingCard key={el.id} booking={el} refresh={fetchBookings} />
        ))}
      </div>
    </div>
  );
}
