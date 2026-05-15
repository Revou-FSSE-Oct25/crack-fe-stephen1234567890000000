"use client";

import api from "@/lib/axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useProtected from "@/app/hooks/useProtected";
import Link from "next/link";

export default function CreateService() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("services", form);
      toast.success("Service created successfully!");
      router.push("/admin/services");
    } catch (error) {
      setError(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }
  useProtected(["admin"]);

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
              Create Service
            </h1>

            <p className="text-zinc-500 max-w-xl">
              Build and launch premium fitness programs for your clients.
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
              bg-zinc-950
              border border-zinc-800
              rounded-[32px]
              overflow-hidden
              relative
              min-h-[700px]
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

            {/* Content */}
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
                PREMIUM TRAINING
              </span>

              <h2
                className="
                  text-5xl
                  font-black
                  leading-tight
                  mb-5
                "
              >
                Build Elite
                <br />
                Fitness Programs
              </h2>

              <p
                className="
                  text-zinc-400
                  max-w-md
                  leading-relaxed
                "
              >
                Create high-end training services with premium experiences for
                your members.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
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
                Service Details
              </h2>

              <p className="text-zinc-500">
                Fill in the information below to create your new training
                service.
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

            {/* NAME */}
            <div className="space-y-3">
              <label className="text-sm text-zinc-400 uppercase tracking-[2px]">
                Service Name
              </label>

              <input
                type="text"
                placeholder="Strength Conditioning"
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

            {/* DESCRIPTION */}
            <div className="space-y-3">
              <label className="text-sm text-zinc-400 uppercase tracking-[2px]">
                Description
              </label>

              <textarea
                rows={6}
                placeholder="Describe your premium fitness service..."
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

            {/* PRICE & DURATION */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* PRICE */}
              <div className="space-y-3">
                <label className="text-sm text-zinc-400 uppercase tracking-[2px]">
                  Price
                </label>

                <input
                  type="number"
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

              {/* DURATION */}
              <div className="space-y-3">
                <label className="text-sm text-zinc-400 uppercase tracking-[2px]">
                  Duration
                </label>

                <input
                  type="number"
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

            {/* BUTTON */}
            <button
              disabled={loading}
              className="
                w-full
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
              {loading ? "Creating Service..." : "Create Service"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
