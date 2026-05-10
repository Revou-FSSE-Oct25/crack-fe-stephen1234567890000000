"use client";

import {useEffect, useState } from "react";
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
        setServices(data.rows);
      } catch (error) {
        setError(error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, [search]);

  return (
    <h1>Service page</h1>
    // <div className="p-6">
    //   <div className="flex flex-col md:flex-row gap-4 mb-6">
    //     <input
    //       placeholder="Search Services..."
    //       value={input}
    //       onChange={(e) => setInput(e.target.value)}
    //       className="border p-2 flex-1"
    //     />
    //     <button
    //       onClick={() => setSearch(input)}
    //       className="bg-black text-white px-4 py-2 rounded"
    //     >
    //       Search
    //     </button>
    //   </div>
    //   {loading && <p>Loading Services...</p>}
    //   {error && <p className="text-red-500">{error}</p>}
    //   {!loading && !error && services.length === 0 && <p>No services found.</p>}
    //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //     {services.map((el) => (
    //       <div className="border rounded-xl p-4 shadow" key={el.id}>
    //         <h2 className="text-xl font-bold mb-2">{el.name}</h2>
    //         <p className="text-gray-600 mb-3">{el.description}</p>
    //         <div className="space-y-1">
    //           <p>Duration: {el.duration} minutes</p>
    //           <p>Price: ${el.price.toFixed(2)}</p>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
}
