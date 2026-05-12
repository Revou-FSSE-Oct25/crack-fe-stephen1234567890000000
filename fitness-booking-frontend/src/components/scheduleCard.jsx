"use client";

import { formatDate } from "@/app/utils/formatDate";
import { formatTime } from "@/app/utils/formatTime";

export default function ScheduleCard({
  sch,
  myBooking,
  handleBooking,
  loadingBooking,
}) {
  const isBooked = myBooking.some((book) => book.ScheduleId === sch.id);

  return (
    <div>
      <div>
        <p>Trainer: {sch.User.name}</p>
        <p>Date: {formatDate(sch.date)}</p>
        <p>
          Time: {formatTime(sch.startTime)} - {formatTime(sch.endTime)}
        </p>
        <p>Remaining slot: {sch.capacity}</p>

        {isBooked && (
          <p className="text-green-500 font-semibold">✓ Already Booked</p>
        )}
      </div>
      <button
        onClick={() => handleBooking(sch.id)}
        disabled={isBooked || sch.capacity <= 0 || loadingBooking}
        className="bg-white text-black px-4 py-2 rounded disabled:bg-gray-400 hover:bg-gray-200 cursor-pointer"
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
