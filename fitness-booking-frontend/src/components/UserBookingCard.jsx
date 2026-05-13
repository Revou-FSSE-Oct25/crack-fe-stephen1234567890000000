"use client";

import api from "@/lib/axios";
import { formatDate } from "@/app/utils/formatDate";
import { formatTime } from "@/app/utils/formatTime";
import toast from "react-hot-toast";

export default function UserBookingCard({ booking, refresh }) {
  console.log(booking, 'ini booking');
  
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
      console.log(error.response?.data?.message, 'errrrr');
      
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
    <div className="border rounded-xl p-4 shadow">
      <p className="font-bold">Trainer: {booking.Schedule.User.name}</p>
      <p>Date: {formatDate(booking.Schedule.date)}</p>
      <p>Time: {formatTime(booking.Schedule.startTime)}</p>
      <p className="text-sm text-gray-500">
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
          className="bg-red-500 text-white px-4 py-2 rounded mt-3"
        >
          Cancel Booking
        </button>
      )}
    </div>
  );
}
