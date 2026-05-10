"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useParams } from "next/navigation";

export default function ServiceDetail() {
  const params = useParams();
  const id = params.id;
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    fetchService();
  }, [id]);

  if (loading) return <p>Loading Service...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!service) return <p>Service not found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{service.name}</h1>
      <p className="text-gray-700 mb-4">{service.description}</p>
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
