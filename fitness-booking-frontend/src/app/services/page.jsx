"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import Link from "next/link";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    async function fetchServices() {
      try {
        setLoading(true);
        const { data } = await api.get(`/services?search=${search}`);
        setServices(data.services);
      } catch (error) {
        setError(error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, [search]);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-wide mb-3">
            Training Services
          </h1>

          <p className="text-zinc-400 max-w-xl">
            Choose the training program that fits your fitness goals.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <input
            placeholder="Search Services..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="
              flex-1
              bg-zinc-900
              border border-zinc-800
              rounded-full
              px-5 py-3
              outline-none
              focus:border-white
              transition
            "
          />

          <button
            onClick={() => setSearch(input)}
            className="
              bg-white
              text-black
              px-8 py-3
              rounded-full
              font-semibold
              hover:bg-zinc-200
              transition-all duration-300
            "
          >
            Search
          </button>
        </div>

        {loading && <p className="text-zinc-400">Loading Services...</p>}

        {error && <p className="text-red-400">{error}</p>}

        {!loading && services?.length === 0 && (
          <p className="text-zinc-500">No services found.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {services?.map((el) => (
            <div
              key={el.id}
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border border-zinc-800
                bg-zinc-950
                p-6
                hover:border-zinc-600
                hover:-translate-y-2
                transition-all duration-500
              "
            >
              <div className="mb-6">
                <span
                  className="
                    inline-block
                    bg-white
                    text-black
                    text-sm
                    font-bold
                    px-4 py-1
                    rounded-full
                    mb-4
                  "
                >
                  PREMIUM TRAINING
                </span>

                <h2 className="text-5xl font-extrabold">${el.price}</h2>

                <p className="text-zinc-500 mt-1">per session</p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-3">{el.name}</h3>

                <p className="text-zinc-400 leading-relaxed">
                  {el.description}
                </p>
              </div>

              <div className="border-t border-zinc-800 pt-5 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Duration</span>

                  <span className="font-semibold">{el.duration} min</span>
                </div>
              </div>

              <Link
                href={`/services/${el.id}`}
                className="
                  block
                  w-full
                  text-center
                  bg-zinc-900
                  border border-zinc-700
                  py-3
                  rounded-full
                  font-semibold
                  hover:bg-white
                  hover:text-black
                  transition-all duration-300
                "
              >
                View Details
              </Link>

              <div
                className="
                  absolute
                  inset-0
                  opacity-0
                  group-hover:opacity-100
                  transition
                  duration-500
                  pointer-events-none
                  bg-gradient-to-b
                  from-white/5
                  to-transparent
                "
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
