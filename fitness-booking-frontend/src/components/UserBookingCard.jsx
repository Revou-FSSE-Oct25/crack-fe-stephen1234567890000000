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
      console.log(error.response?.data?.message, "errrrr");
    }
  }

  function badgeStyle(status) {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border border-yellow-500/20";

      case "confirmed":
        return "bg-blue-500/20 text-blue-300 border border-blue-500/20";

      case "completed":
        return "bg-green-500/20 text-green-300 border border-green-500/20";

      case "cancelled":
        return "bg-zinc-800 text-zinc-400 border border-zinc-700";

      default:
        return "bg-zinc-800 text-zinc-300";
    }
  }

  return (
    <div
      className="
        bg-zinc-950
        border border-zinc-800
        rounded-3xl
        p-6
        hover:border-zinc-600
        transition-all duration-300
      "
    >
      <div className="flex flex-col lg:flex-row gap-6">
        <div
          className="
            w-full lg:w-[180px]
            h-[180px]
            rounded-2xl
            bg-gradient-to-br
            from-zinc-800
            via-black
            to-zinc-900
            flex-shrink-0
          "
        />

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start gap-4 mb-4">
              <div>
                <p className="text-zinc-500 text-sm uppercase tracking-[3px] mb-2">
                  Personal Training
                </p>

                <h2 className="text-3xl font-black">
                  {booking.Schedule.Service.name}
                </h2>
              </div>

              <span
                className={`
                  px-4 py-2
                  rounded-full
                  text-xs
                  font-bold
                  uppercase
                  ${badgeStyle(booking.status)}
                `}
              >
                {booking.status}
              </span>
            </div>

            <p className="text-zinc-400 mb-2">
              Trainer:{" "}
              <span className="text-white font-medium">
                {booking.Schedule.User.name}
              </span>
            </p>

            <p className="text-zinc-400 mb-2">
              Date:{" "}
              <span className="text-white">
                {formatDate(booking.Schedule.date)}
              </span>
            </p>

            <p className="text-zinc-400">
              Time:{" "}
              <span className="text-white">
                {formatTime(booking.Schedule.startTime)}
              </span>
            </p>
          </div>

          <div className="mt-8 flex justify-between items-center">
            <p className="text-2xl font-bold">
              ${booking.Schedule.Service.price}
            </p>

            {booking.status === "confirmed" && (
              <button
                onClick={handleCancel}
                className="
                  px-6 py-3
                  rounded-full
                  border border-zinc-700
                  hover:bg-zinc-900
                  transition-all duration-300
                "
              >
                Cancel Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
