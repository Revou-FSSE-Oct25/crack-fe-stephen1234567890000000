"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/lib/axios";
import Link from "next/link";

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
  const [saving, setSaving] = useState(false);

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
      setSaving(true);
      await api.put(`/services/${id}`, form);
      router.push("/admin/services");
    } catch (error) {
      setError(error.response?.data?.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="grid lg:grid-cols-2 gap-10">
        <div
          className="
            h-[700px]
            rounded-[32px]
            bg-zinc-950
            border border-zinc-800
            animate-pulse
          "
        />

        <div
          className="
            h-[700px]
            rounded-[32px]
            bg-zinc-950
            border border-zinc-800
            animate-pulse
          "
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-7xl mx-auto">
        <div
          className="
            flex flex-col lg:flex-row
            justify-between
            lg:items-end
            gap-6
            mb-14
          "
        >
          <div>
            <p
              className="
                uppercase
                tracking-[4px]
                text-zinc-500
                text-sm
                mb-3
              "
            >
              Admin Services
            </p>

            <h1
              className="
                text-5xl
                font-black
                mb-4
              "
            >
              Edit Service
            </h1>

            <p className="text-zinc-500 max-w-xl">
              Update and refine your premium fitness programs.
            </p>
          </div>

          <Link
            href="/admin/services"
            className="
              border border-zinc-700
              px-8 py-4
              rounded-full
              hover:bg-zinc-900
              transition-all duration-300
              font-medium
              text-center
            "
          >
            ← Back to Services
          </Link>
        </div>

        <div
          className="
            grid lg:grid-cols-2
            gap-10
            items-start
          "
        >
          <div
            className="
              relative
              min-h-[720px]
              rounded-[32px]
              overflow-hidden
              border border-zinc-800
              bg-zinc-950
            "
          >
            <div
              className="
                absolute inset-0
                bg-gradient-to-br
                from-zinc-700
                via-black
                to-zinc-900
              "
            />

            <div
              className="
                absolute inset-0
                bg-gradient-to-t
                from-black
                via-black/40
                to-transparent
              "
            />

            <div
              className="
                absolute bottom-10 left-10
                z-10
              "
            >
              <span
                className="
                  inline-block
                  bg-white
                  text-black
                  px-5 py-2
                  rounded-full
                  text-sm
                  font-black
                  mb-5
                "
              >
                PREMIUM PROGRAM
              </span>

              <h2
                className="
                  text-5xl
                  font-black
                  leading-tight
                  mb-5
                "
              >
                Refine Elite
                <br />
                Training Programs
              </h2>

              <p
                className="
                  text-zinc-400
                  max-w-md
                  leading-relaxed
                "
              >
                Enhance your premium services with updated training details and
                better experiences.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="
              bg-zinc-950
              border border-zinc-800
              rounded-[32px]
              p-10
              space-y-8
            "
          >
            <div>
              <h2
                className="
                  text-3xl
                  font-black
                  mb-3
                "
              >
                Service Information
              </h2>

              <p className="text-zinc-500">
                Modify your service information below.
              </p>
            </div>

            {error && (
              <div
                className="
                  bg-red-500/10
                  border border-red-500/20
                  text-red-300
                  px-5 py-4
                  rounded-2xl
                "
              >
                {error}
              </div>
            )}

            <div className="space-y-3">
              <label
                className="
                  text-sm
                  uppercase
                  tracking-[2px]
                  text-zinc-400
                "
              >
                Service Name
              </label>

              <input
                value={form.name}
                type="text"
                placeholder="Service Name"
                className="
                  w-full
                  bg-black
                  border border-zinc-800
                  rounded-2xl
                  px-5 py-4
                  outline-none
                  focus:border-white
                  transition-all
                "
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-3">
              <label
                className="
                  text-sm
                  uppercase
                  tracking-[2px]
                  text-zinc-400
                "
              >
                Description
              </label>

              <textarea
                rows={6}
                value={form.description}
                placeholder="Description..."
                className="
                  w-full
                  bg-black
                  border border-zinc-800
                  rounded-2xl
                  px-5 py-4
                  outline-none
                  focus:border-white
                  transition-all
                  resize-none
                "
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label
                  className="
                    text-sm
                    uppercase
                    tracking-[2px]
                    text-zinc-400
                  "
                >
                  Price
                </label>

                <input
                  type="number"
                  value={form.price}
                  placeholder="99"
                  className="
                    w-full
                    bg-black
                    border border-zinc-800
                    rounded-2xl
                    px-5 py-4
                    outline-none
                    focus:border-white
                    transition-all
                  "
                  onChange={(e) =>
                    setForm({
                      ...form,
                      price: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-3">
                <label
                  className="
                    text-sm
                    uppercase
                    tracking-[2px]
                    text-zinc-400
                  "
                >
                  Duration
                </label>

                <input
                  type="number"
                  value={form.duration}
                  placeholder="60"
                  className="
                    w-full
                    bg-black
                    border border-zinc-800
                    rounded-2xl
                    px-5 py-4
                    outline-none
                    focus:border-white
                    transition-all
                  "
                  onChange={(e) =>
                    setForm({
                      ...form,
                      duration: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="
                  flex-1
                  bg-white
                  text-black
                  py-5
                  rounded-full
                  font-black
                  text-lg
                  hover:bg-zinc-200
                  transition-all duration-300
                  disabled:opacity-50
                "
              >
                {saving ? "Updating..." : "Update Service"}
              </button>

              <button
                type="button"
                onClick={() => router.push("/admin/services")}
                className="
                  px-8
                  border border-zinc-700
                  rounded-full
                  hover:bg-zinc-900
                  transition-all duration-300
                  font-medium
                "
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
