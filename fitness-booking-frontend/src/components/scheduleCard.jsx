"use client";

import { formatDate } from "@/app/utils/formatDate";
import { formatTime } from "@/app/utils/formatTime";

export default function ScheduleCard({
  sch,
  myBooking,
  handleBooking,
  loadingBooking,
}) {
  const activeBooking = myBooking.find(
    (book) => book.ScheduleId === sch.id && book.status === "confirmed",
  );
  const CompleteBooking = myBooking.find(
    (book) => book.ScheduleId === sch.id && book.status === "completed",
  );

  const isBooked = !!activeBooking;

  return (
    <div className="bg-black text-white p-6 rounded-lg shadow-lg border border-gray-700 hover-lift gradient-overlay">
      <div className="mb-4">
        <p className="text-lg font-semibold text-gray-200">Trainer: {sch.User.name}</p>
        <p className="text-sm text-gray-400">Date: {formatDate(sch.date)}</p>
        <p className="text-sm text-gray-400">
          Time: {formatTime(sch.startTime)} - {formatTime(sch.endTime)}
        </p>
        <p className="text-sm text-gray-400">Remaining slot: {sch.capacity}</p>

        {activeBooking && (
          <p className="text-green-400 font-semibold">✓ Already Booked</p>
        )}
        {CompleteBooking && (
          <p className="text-blue-400 font-semibold">✓ Session Completed</p>
        )}
      </div>
      <button
        onClick={() => handleBooking(sch.id)}
        disabled={isBooked || sch.capacity <= 0 || loadingBooking}
        className="w-full bg-white text-black py-3 px-4 rounded-md font-medium transition-all duration-300 hover:bg-gray-200 disabled:bg-gray-600 disabled:text-gray-400"
      >
        {loadingBooking
          ? "Booking..."
          : isBooked
            ? "Already Booked"
            : sch.capacity <= 0
              ? "Full"
              : "Book Now"}
      </button>
    </div>
  );
}
