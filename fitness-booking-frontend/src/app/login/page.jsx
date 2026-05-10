"use client";

import api from "@/lib/axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data } = await api.post("/auth/login", form);
      console.log(data, data.accesstoken, "dataaaaa");

      localStorage.setItem("accessToken", data.accesstoken);
      router.push("/services");
    } catch (error) {
      console.log(error.response?.data?.message, "errorrrr");
      setError(error.response?.data?.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[300px]">
        <h1 className="text-2xl font-bold">Login</h1>
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
        <button className="bg-white text-black p-2">Login</button>
      </form>
    </div>
  );
}
