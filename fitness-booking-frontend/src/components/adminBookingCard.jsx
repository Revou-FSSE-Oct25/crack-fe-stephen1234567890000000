"use client";

import api from "@/lib/axios";
import toast from "react-hot-toast";
import { formatDate } from "@/app/utils/formatDate";
import { formatTime } from "@/app/utils/formatTime";

export default function AdminBookingCard({ booking, refresh }) {
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

  function badgeStyle(status) {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-300 border border-yellow-500/20";

      case "confirmed":
        return "bg-blue-500/10 text-blue-300 border border-blue-500/20";

      case "completed":
        return "bg-green-500/10 text-green-300 border border-green-500/20";

      case "cancelled":
        return "bg-zinc-800 text-zinc-400 border border-zinc-700";

      default:
        return "bg-zinc-800 text-zinc-300";
    }
  }

  const role =
    typeof window !== "undefined" ? localStorage.getItem("role") : null;

  return (
    <div
      className="
        group
        bg-zinc-950
        border border-zinc-800
        rounded-[32px]
        overflow-hidden
        hover:border-zinc-600
        transition-all duration-500
      "
    >
      <div
        className="
          flex flex-col xl:flex-row
        "
      >
        {/* LEFT IMAGE */}
        <div
          className="
            relative
            xl:w-[320px]
            min-h-[260px]
            overflow-hidden
          "
        >
          {/* Fake Image */}
          <div
            className="
              absolute inset-0
              bg-gradient-to-br
              from-zinc-700
              via-black
              to-zinc-900
              group-hover:scale-110
              transition-all duration-700
            "
          />

          <div
            className="
              absolute inset-0
              bg-gradient-to-t
              from-black
              via-black/20
              to-transparent
            "
          />

          <div
            className="
              absolute top-6 left-6
            "
          >
            <span
              className="
                bg-white
                text-black
                px-4 py-2
                rounded-full
                text-xs
                font-black
                tracking-wide
              "
            >
              PREMIUM SESSION
            </span>
          </div>
        </div>

        <div
          className="
            flex-1
            p-8
            flex
            flex-col
            justify-between
          "
        >
          <div>
            <div
              className="
                flex flex-col lg:flex-row
                justify-between
                gap-6
                mb-8
              "
            >
              <div>
                <p
                  className="
                    uppercase
                    tracking-[3px]
                    text-zinc-500
                    text-sm
                    mb-3
                  "
                >
                  Fitness Booking
                </p>

                <h2
                  className="
                    text-4xl
                    font-black
                    mb-3
                  "
                >
                  {booking.Schedule.Service.name}
                </h2>

                <p className="text-zinc-400">
                  Trainer:{" "}
                  <span className="text-white font-medium">
                    {booking.Schedule.User.name}
                  </span>
                </p>
              </div>

              <div>
                <span
                  className={`
                    px-5 py-3
                    rounded-full
                    text-sm
                    font-bold
                    uppercase
                    tracking-wide
                    ${badgeStyle(booking.status)}
                  `}
                >
                  {booking.status}
                </span>
              </div>
            </div>

            <div
              className="
                border-y border-zinc-800
                py-6
                grid md:grid-cols-3
                gap-6
              "
            >
              <div>
                <p className="text-zinc-500 text-sm mb-2">Session Date</p>

                <h3 className="font-semibold text-lg">
                  {formatDate(booking.Schedule.date)}
                </h3>
              </div>

              <div>
                <p className="text-zinc-500 text-sm mb-2">Session Time</p>

                <h3 className="font-semibold text-lg">
                  {formatTime(booking.Schedule.startTime)} -{" "}
                  {formatTime(booking.Schedule.endTime)}
                </h3>
              </div>

              <div>
                <p className="text-zinc-500 text-sm mb-2">Booked On</p>

                <h3 className="font-semibold text-lg">
                  {formatDate(booking.createdAt)}
                </h3>
              </div>
            </div>
          </div>

          <div
            className="
              flex flex-col lg:flex-row
              justify-between
              items-start lg:items-center
              gap-5
              mt-8
            "
          >
            <div>
              <p className="text-zinc-500 text-sm mb-2">Booking ID</p>

              <h3 className="font-semibold">#{booking.id}</h3>
            </div>

            <div className="flex gap-4">
              {booking.status === "completed" && (
                <div
                  className="
                    border border-green-500/20
                    bg-green-500/10
                    text-green-300
                    px-6 py-4
                    rounded-full
                    font-medium
                  "
                >
                  Completed
                </div>
              )}

              {booking.status === "cancelled" && (
                <div
                  className="
                    border border-zinc-700
                    bg-zinc-900
                    text-zinc-400
                    px-6 py-4
                    rounded-full
                    font-medium
                  "
                >
                  Cancelled
                </div>
              )}

              {booking.status === "confirmed" &&
                (role === "admin" || role === "trainer") && (
                  <button
                    onClick={handleComplete}
                    className="
                      bg-white
                      text-black
                      px-8 py-4
                      rounded-full
                      font-black
                      hover:bg-zinc-200
                      transition-all duration-300
                    "
                  >
                    Complete Session
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
