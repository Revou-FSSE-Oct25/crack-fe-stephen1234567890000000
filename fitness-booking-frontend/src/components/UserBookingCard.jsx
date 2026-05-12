"use client";

import api from "@/lib/axios";
import { formatDate } from "@/app/utils/formatDate";
import { formatTime } from "@/app/utils/formatTime";
import toast from "react-hot-toast";

export default function UserBookingCard({ booking, refresh }) {
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
  
  return <div></div>;
}
