"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ScheduleCard from "@/components/scheduleCard";

export default function ServiceDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [loadingBooking, setLoadingBooking] = useState(false);
  const [myBooking, setMyBooking] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Please login first");
      router.push("/login");
      return;
    }

    async function fetchMyBookings() {
      try {
        const { data } = await api.get("/bookings/my-bookings");
        setMyBooking(data);
      } catch (error) {
        setError(error.response?.data?.message);
      }
    }

    async function fetchService() {
      try {
        setLoading(true);
        const { data } = await api.get(`/services/${id}`);
        setService(data);
      } catch (error) {
        setError(error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    }

    async function fetchSchedule() {
      try {
        const { data } = await api.get(`/schedules/services/${id}`);
        setSchedule(data);
      } catch (error) {
        setError(error.response?.data?.message);
      }
    }

    fetchService();
    fetchSchedule();
    fetchMyBookings();
  }, [id, router]);

  async function handleBooking(ScheduleId) {
    try {
      setLoadingBooking(true);
      await api.post("/bookings", {
        ScheduleId,
      });

      setMyBooking((prev) => [...prev, { ScheduleId }]);
      toast.success("Booking successful!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Booking failed!",
      );
      console.log(error.response?.data?.message, "errr");
    } finally {
      setLoadingBooking(false);
    }
  }

  if (loading) return <p>Loading Service...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!service) return <p>Service not found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{service.name}</h1>
      <p className="text-gray-700 mb-4">{service.description}</p>
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Available Schedules</h2>
        <div className="grid gap-4">
          {schedule?.length === 0 && <p>No Schedule available</p>}

          {schedule?.map((el) => (
            <ScheduleCard
              key={el.id}
              sch={el}
              myBooking={myBooking}
              handleBooking={handleBooking}
              loadingBooking={loadingBooking}
            />
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <p>Duration: {service.duration} minutes</p>
        <p>Price: ${service.price.toFixed(2)}</p>
      </div>
      <button
        onClick={() => window.history.back()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Back to Services
      </button>
    </div>
  );
}
