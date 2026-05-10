"use client";

import api from "@/lib/axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data } = await api.post("/auth/register", form);
      localStorage.setItem("accessToken", data.accessToken);
      router.push("/services");
    } catch (error) {
      setError(error.response?.data.message);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[300px]">
        <h1 className="text-2xl font-bold">Register</h1>
        <input
          placeholder="Name"
          className="border p-2"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          className="border p-2"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Password"
          className="border p-2"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {error && <p className="text-red-500">{error}</p>}

        <button className="bg-white text-black p-2">Register</button>
      </form>
    </div>
  );
}
