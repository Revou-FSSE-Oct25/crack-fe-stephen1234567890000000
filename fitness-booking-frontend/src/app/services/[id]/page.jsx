"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ScheduleCard from "@/components/scheduleCard";
import Skeleton from "@/components/Skeleton";


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

  async function fetchMyBookings() {
    try {
      const { data } = await api.get("/bookings/my-bookings");
      setMyBooking(data);
    } catch (error) {
      setError(error.response?.data?.message);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Please login first");
      router.push("/login");
      return;
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

    async function loadData() {
      await fetchMyBookings();
    }

    fetchService();
    fetchSchedule();
    loadData();
  }, [id, router]);

  async function handleBooking(ScheduleId) {
    try {
      setLoadingBooking(true);
      const { data } = await api.post("/bookings", {
        ScheduleId,
      });

      setMyBooking((prev) => [...prev, data]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
          <div className="bg-zinc-900 rounded-3xl h-[500px] animate-pulse" />

          <div className="space-y-5">
            <Skeleton width="w-1/3" height="h-5" />
            <Skeleton width="w-3/4" height="h-12" />
            <Skeleton width="w-full" height="h-20" />
            <Skeleton width="w-1/2" height="h-10" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-400 p-6">{error}</p>;
  }

  if (!service) {
    return <p className="text-white p-6">Service not found.</p>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* HERO */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* LEFT SIDE */}
          <div
            className="
              bg-zinc-950
              border border-zinc-800
              rounded-3xl
              overflow-hidden
              h-[600px]
              relative
            "
          >
            {/* Service Image / Banner */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${service.image || "https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?auto=format&fit=crop&w=1200&q=80"})`,
              }}
            />
            <div
              className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-zinc-950/70"
            />

            <div
              className="
                absolute bottom-8 left-8
              "
            >
              <span
                className="
                  bg-white
                  text-black
                  text-sm
                  font-bold
                  px-4 py-2
                  rounded-full
                "
              >
                ELITE TRAINING
              </span>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col justify-center">
            <p className="text-zinc-500 uppercase tracking-[4px] mb-3">
              Premium Fitness Program
            </p>

            <h1
              className="
                text-5xl lg:text-6xl
                font-black
                leading-tight
                mb-6
              "
            >
              {service.name}
            </h1>

            <div className="mb-8">
              <h2 className="text-5xl font-extrabold">${service.price}</h2>

              <p className="text-zinc-500 mt-2">Per Training Session</p>
            </div>

            <p
              className="
                text-zinc-400
                leading-relaxed
                text-lg
                mb-8
              "
            >
              {service.description}
            </p>

            {/* DETAILS */}
            <div
              className="
                border-y border-zinc-800
                py-6
                mb-8
                space-y-4
              "
            >
              <div className="flex justify-between">
                <span className="text-zinc-500">Duration</span>

                <span className="font-semibold">
                  {service.duration} Minutes
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-zinc-500">Training Type</span>

                <span className="font-semibold">Strength & Conditioning</span>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4">
              <button
                onClick={() => window.history.back()}
                className="
                  px-6 py-4
                  rounded-full
                  border border-zinc-700
                  hover:bg-zinc-900
                  transition-all
                "
              >
                Back
              </button>

              <button
                className="
                  flex-1
                  bg-white
                  text-black
                  font-bold
                  py-4
                  rounded-full
                  hover:bg-zinc-200
                  transition-all duration-300
                "
              >
                Start Training
              </button>
            </div>
          </div>
        </div>

        {/* SCHEDULE SECTION */}
        <div className="mt-24">
          <div className="mb-10">
            <p className="text-zinc-500 uppercase tracking-[3px] mb-3">
              Booking Schedule
            </p>

            <h2 className="text-4xl font-black">Available Sessions</h2>
          </div>

          {schedule?.length === 0 ? (
            <div
              className="
                bg-zinc-950
                border border-zinc-800
                rounded-3xl
                p-10
                text-center
                text-zinc-500
              "
            >
              No Schedule Available
            </div>
          ) : (
            <div className="grid gap-6">
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
          )}
        </div>
      </div>
    </div>
  );
}
