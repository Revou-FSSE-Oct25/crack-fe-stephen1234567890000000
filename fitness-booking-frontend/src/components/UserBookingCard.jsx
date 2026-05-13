"use client";

import api from "@/lib/axios";
import { formatDate } from "@/app/utils/formatDate";
import { formatTime } from "@/app/utils/formatTime";
import toast from "react-hot-toast";

export default function UserBookingCard({ booking, refresh }) {
  console.log(booking, "ini booking");

  async function handleCancel() {
    const confirmed = confirm("Cancel Booking?");
    if (!confirmed) {
      return;
    }
    try {
      await api.patch(`/bookings/${booking.id}/cancel`);
      toast.success("Booking cancelled");
      refresh();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel booking");
      console.log(error.response?.data?.message, "errrrr");
    }
  }

  function badgeColor(status) {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "confirmed":
        return "bg-blue-500";
      case "completed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  }

  return (
    <div className="bg-black text-white p-6 rounded-lg shadow-lg border border-gray-700 hover-lift">
      <p className="font-bold text-lg text-gray-200">
        Trainer: {booking.Schedule.User.name}
      </p>
      <p className="text-sm text-gray-400">
        Date: {formatDate(booking.Schedule.date)}
      </p>
      <p className="text-sm text-gray-400">
        Time: {formatTime(booking.Schedule.startTime)}
      </p>
      <p className="text-sm text-gray-400">
        Status:{" "}
        <span
          className={`px-2 py-1 rounded-full text-white ${badgeColor(booking.status)}`}
        >
          {booking.status}
        </span>
      </p>
      {booking.status === "confirmed" && (
        <button
          onClick={handleCancel}
          className="bg-red-600 text-white px-4 py-2 rounded mt-4 hover:bg-red-700 transition"
        >
          Cancel Booking
        </button>
      )}
    </div>
  );
}
