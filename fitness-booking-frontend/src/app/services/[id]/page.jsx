"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export default function ServiceDetail() {
  const params = useParams();
  const id = params.id;
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [loadingBooking, setLoadingBooking] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  useEffect(() => {
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
        console.log(data, "ini dataa");

        setSchedule(data);
      } catch (error) {
        setError(error.response?.data?.message);
      }
    }

    fetchService();
    fetchSchedule();
  }, [id]);

  async function handleBooking() {
    try {
      setLoadingBooking(true);
      await api.post("/", {
        scheduleId: selectedSchedule,
      });
      toast.success("Booking successful!");
    } catch (error) {
      toast.error("Booking failed!" || error.response?.data?.message);
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
          {schedule?.map((sch) => (
            <div
              className="border rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              key={sch.id}
              onClick={() => setSelectedSchedule(sch.id)}
            >
              <div>
                <p>Trainer: {sch.User.name}</p>
                <p>Date: {sch.date}</p>
                <p>
                  Time: {sch.startTime} - {sch.endTime}
                </p>
                <p>Remaining slot: {sch.capacity}</p>
              </div>
              <button
                onClick={handleBooking}
                disabled={!selectedSchedule || loadingBooking}
              >
                {sch.capacity <= 0 ? "full" : "Book Now"}
              </button>
            </div>
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
