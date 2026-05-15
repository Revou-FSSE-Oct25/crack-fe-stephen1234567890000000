"use client";

import api from "@/lib/axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AdminPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteService, setDeleteService] = useState(null);
  const [deleting, setDeleting] = useState(false);

  async function fetchServices() {
    try {
      setLoading(true);
      const { data } = await api.get("/services");
      console.log(data, "dataaaa");

      setServices(data.services);
    } catch (error) {
      setError(error.response?.data?.message);
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

  function openDeleteConfirmation(service) {
    setDeleteService(service);
  }

  function closeDeleteConfirmation() {
    setDeleteService(null);
  }

  async function confirmDelete() {
    if (!deleteService) {
      return;
    }

    try {
      setDeleting(true);
      await api.delete(`/services/${deleteService.id}`);
      setServices((prev) => prev.filter((srv) => srv.id !== deleteService.id));
      toast.success("Service deleted successfully.");
      closeDeleteConfirmation();
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to delete service.";
      setError(message);
      toast.error(message);
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="
                h-[420px]
                rounded-3xl
                bg-zinc-950
                border border-zinc-800
                animate-pulse
              "
          />
        ))}
      </div>
    );
  }

  return (
    <div className="text-white">
      <div
        className="
          flex flex-col lg:flex-row
          lg:items-end
          justify-between
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
            Manage Services
          </h1>

          <p className="text-zinc-500 max-w-xl">
            Create and organize your premium fitness programs.
          </p>
        </div>

        <Link
          href="/admin/services/create"
          className="
            bg-white
            text-black
            px-8 py-4
            rounded-full
            font-bold
            hover:bg-zinc-200
            transition-all duration-300
            text-center
          "
        >
          + Add Service
        </Link>
      </div>

      {error && (
        <div
          className="
            bg-red-500/10
            border border-red-500/20
            text-red-300
            px-5 py-4
            rounded-2xl
            mb-8
          "
        >
          {error}
        </div>
      )}

      {deleteService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8">
          <div className="w-full max-w-lg rounded-[32px] border border-zinc-800 bg-zinc-950 p-8 text-white">
            <h2 className="text-2xl font-black mb-4">Confirm delete</h2>
            <p className="text-zinc-400 mb-8">
              Are you sure you want to remove the service{" "}
              <span className="font-semibold text-white">
                {deleteService.name}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={closeDeleteConfirmation}
                className="w-full sm:flex-1 border border-zinc-700 py-3 rounded-full hover:bg-zinc-900 transition-all duration-300"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmDelete}
                disabled={deleting}
                className="w-full sm:flex-1 bg-red-600 text-white py-3 rounded-full font-semibold hover:bg-red-500 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete service"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {services.map((src) => (
          <div
            key={src.id}
            className="
              group
              bg-zinc-950
              border border-zinc-800
              rounded-3xl
              overflow-hidden
              hover:border-zinc-600
              transition-all duration-500
              hover:-translate-y-2
            "
          >
            <div
              className="
                relative
                h-[220px]
                overflow-hidden
              "
            >
              <div
                className="
                  absolute inset-0
                  bg-gradient-to-br
                  from-zinc-700
                  via-black
                  to-zinc-900
                  group-hover:scale-110
                  transition-all duration-700
                "
              />

              <div
                className="
                  absolute inset-0
                  bg-gradient-to-t
                  from-black
                  via-black/30
                  to-transparent
                "
              />

              <div
                className="
                  absolute
                  top-5 left-5
                "
              >
                <span
                  className="
                    bg-white
                    text-black
                    text-xs
                    font-black
                    px-4 py-2
                    rounded-full
                    tracking-wide
                  "
                >
                  PREMIUM
                </span>
              </div>

              <div
                className="
                  absolute
                  bottom-6 left-6
                "
              >
                <h2
                  className="
                    text-5xl
                    font-black
                  "
                >
                  ${src.price}
                </h2>

                <p className="text-zinc-400 mt-1">Per Session</p>
              </div>
            </div>

            <div className="p-7">
              <div className="mb-6">
                <h3
                  className="
                    text-3xl
                    font-black
                    mb-3
                  "
                >
                  {src.name}
                </h3>

                <p
                  className="
                    text-zinc-400
                    leading-relaxed
                    line-clamp-2
                  "
                >
                  {src.description}
                </p>
              </div>

              <div
                className="
                  border-y border-zinc-800
                  py-5
                  space-y-4
                  mb-6
                "
              >
                <div className="flex justify-between">
                  <span className="text-zinc-500">Duration</span>

                  <span className="font-semibold">{src.duration} mins</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500">Total Bookings</span>

                  <span className="font-semibold">
                    {src.Bookings?.length || 0}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <Link
                  href={`/admin/services/edit/${src.id}`}
                  className="
                    flex-1
                    bg-white
                    text-black
                    text-center
                    py-3
                    rounded-full
                    font-bold
                    hover:bg-zinc-200
                    transition-all duration-300
                  "
                >
                  Edit
                </Link>

                <button
                  onClick={() => openDeleteConfirmation(src)}
                  className="
                    flex-1
                    border border-zinc-700
                    py-3
                    rounded-full
                    font-semibold
                    hover:bg-zinc-900
                    transition-all duration-300
                  "
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
