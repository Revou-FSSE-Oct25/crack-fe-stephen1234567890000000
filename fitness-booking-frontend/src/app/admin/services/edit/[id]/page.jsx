"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/lib/axios";

export default function UpdateService() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchService() {
      try {
        const { data } = await api.get(`/services/${id}`);

        setForm(data);
      } catch (error) {
        setError(error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    }
    fetchService();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.put(`/services/${id}`, form);
      router.push("/admin/services");
    } catch (error) {
      setError(error.response?.data?.message);
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-[500px] space-y-4">
      <h1 className="text-3xl font-bold">Update Services</h1>
      <input
        value={form.name}
        placeholder="Name"
        className="border p-2 w-full"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <textarea
        value={form.description}
        placeholder="Description"
        className="border p-2 w-full"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        type="number"
        value={form.price}
        placeholder="Price"
        className="border p-2 w-full"
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
      <input
        type="number"
        value={form.duration}
        placeholder="Duration (minutes)"
        className="border p-2 w-full"
        onChange={(e) => setForm({ ...form, duration: e.target.value })}
      />
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex space-x-2">
        <button className="bg-white text-black px-4 py-2 rounded">Edit</button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={() => router.push("/admin/services")}
        >
          Back
        </button>
      </div>
    </form>
  );
}
