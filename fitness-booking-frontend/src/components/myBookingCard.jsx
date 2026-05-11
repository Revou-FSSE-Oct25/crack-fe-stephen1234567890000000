"use client";

import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function BookingCard({ booking, refresh }) {
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
    }
  }

  async function handleComplete() {
    try {
      await api.patch(`/bookings/${booking.id}/complete`);
      toast.success("Booking marked as complete");
      refresh();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to mark booking as complete",
      );
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

  const role =
    typeof window !== "undefined" ? localStorage.getItem("role") : null;

  return (
    <div className="border rounded-xl p-4 shadow">
      <div className="flex flex-col md:flex-row md:justify-between gap-4">
        <div>
          <p className="font-bold text-lg">
            Trainer: {booking.Schedule.User.name}
          </p>
          <p>Date: {booking.Schedule.date}</p>
          <p>
            Time: {booking.Schedule.startTime} - {booking.Schedule.endTime}
          </p>
        </div>
        <div className="flex flex-col items-start md:items-end gap-3">
          <span
            className={`text-white px-3 py-1 rounded ${badgeColor(booking.status)}`}
          >
            {booking.status}
          </span>
          {booking.status === "confirmed" && role === "user" && (
            <button
              onClick={handleCancel}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
          {booking.status === "confirmed" &&
            (role === "admin" || role === "trainer") && (
              <button
                onClick={handleComplete}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Complete
              </button>
            )}
        </div>
      </div>
    </div>
  );
}
