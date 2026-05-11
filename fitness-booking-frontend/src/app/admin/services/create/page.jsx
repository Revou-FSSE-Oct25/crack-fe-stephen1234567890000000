"use client";

import api from "@/lib/axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CreateService() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
  });
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("services", form);
      toast.success("Service created successfully!");
      router.push("/admin/services");
    } catch (error) {
      setError(error.response?.data?.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-[500px] space-y-4">
      <h1 className="text-3xl font-bold">Create Service</h1>
      <input
        placeholder="Name"
        className="border p-2 w-full"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <textarea
        placeholder="Description"
        className="border p-2 w-full"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      ></textarea>
      <input
        placeholder="Price"
        className="border p-2 w-full"
        type="number"
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
      <input
        placeholder="Duration"
        className="border p-2 w-full"
        type="number"
        onChange={(e) => setForm({ ...form, duration: e.target.value })}
      />
      {error && <p className="text-red-500">{error}</p>}

      <button className="bg-white text-black px-4 py-2 rounded">Create</button>
    </form>
  );
}
