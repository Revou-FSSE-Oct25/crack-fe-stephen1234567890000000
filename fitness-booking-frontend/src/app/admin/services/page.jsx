"use client";

import api from "@/lib/axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchServices() {
    try {
      setLoading(true);
      const { data } = await api.get("/services");
      console.log(data, 'fetching..');
      
      setServices(data.services);
    } catch (error) {
      setError(error.response?.data?.message);
      console.log(error, 'errrrr');
      
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    async function loadData() {
      await fetchServices();
    }
    loadData();
  }, []);

  async function handleDelete(id) {
    const confrimed = confirm("Delete this service?");
    if (!confrimed) {
      return;
    }
    try {
      await api.delete(`/services/${id}`);
      setServices((prev) => prev.filter((srv) => srv.id !== id));
    } catch (error) {
      setError(error.response?.data?.message);
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Services</h1>
        <Link
          href="/admin/services/create"
          className="bg-white text-black px-4 py-2 rounded"
        >
          Add Services
        </Link>
      </div>
      <div>{error && <p className="text-red-500">{error}</p>}</div>
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border text-black">Name</th>
              <th className="p-3 border text-black">Price</th>
              <th className="p-3 border text-black">Duration</th>
              <th className="p-3 border text-black">Action</th>
            </tr>
          </thead>
          <tbody>
            {services.map((src) => (
              <tr key={src.id}>
                <td className="border p-3">{src.name}</td>
                <td className="border p-3">${src.price.toFixed(2)}</td>
                <td className="border p-3">{src.duration} mins</td>
                <td className="border p-3 space-x-2">
                  <Link
                    href={`/admin/services/edit/${src.id}`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(src.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
