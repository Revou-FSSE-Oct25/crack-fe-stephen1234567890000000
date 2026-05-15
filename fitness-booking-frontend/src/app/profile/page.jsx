"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import useProtected from "../hooks/useProtected";
import toast from "react-hot-toast";

export default function ProfilePage() {
  useProtected(["user"]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [saving, setSaving] = useState(false);

  async function fetchProfile() {
    try {
      setLoading(true);
      const { data } = await api.get("/auth/me");
      console.log(data, "tess");

      setForm({
        name: data.name || "",
        email: data.email || "",
        password: "",
      });
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load profile.");
      toast.error(error.response?.data?.message || "Failed to load profile.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.email || !form.name || form.password === "") {
      return toast.error("All fields are required.");
    }
    try {
      setSaving(true);
      await api.put("/auth/me", form);
      await fetchProfile();

      toast.success("Profile updated successfully!");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update profile.");
      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    async function loadData() {
      await fetchProfile();
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div
        className="
          min-h-screen
          bg-black
          text-white
          p-6 md:p-10
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            grid lg:grid-cols-2
            gap-10
          "
        >
          <div
            className="
              h-[700px]
              rounded-[40px]
              bg-zinc-950
              border border-zinc-800
              animate-pulse
            "
          />

          <div
            className="
              h-[700px]
              rounded-[40px]
              bg-zinc-950
              border border-zinc-800
              animate-pulse
            "
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen
        bg-black
        text-white
        overflow-hidden
        relative
        px-6 md:px-10
        py-10
      "
    >
      <div
        className="
          absolute
          top-[-200px]
          right-[-100px]
          w-[500px]
          h-[500px]
          bg-white/5
          blur-3xl
          rounded-full
        "
      />

      <div
        className="
          absolute
          bottom-[-250px]
          left-[-150px]
          w-[600px]
          h-[600px]
          bg-zinc-700/10
          blur-3xl
          rounded-full
        "
      />

      <div
        className="
          max-w-7xl
          mx-auto
          relative z-10
        "
      >
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
                mb-4
              "
            >
              My Account
            </p>

            <h1
              className="
                text-5xl
                md:text-6xl
                font-black
                leading-tight
                mb-5
              "
            >
              Profile
              <br />
              Settings
            </h1>

            <p
              className="
                text-zinc-500
                max-w-2xl
                text-lg
                leading-relaxed
              "
            >
              Manage your account, personal information, and fitness journey
              preferences.
            </p>
          </div>

          <div
            className="
              bg-zinc-950
              border border-zinc-800
              rounded-3xl
              px-8 py-6
              min-w-[260px]
            "
          >
            <p className="text-zinc-500 mb-2">Account Status</p>

            <div
              className="
                flex items-center
                gap-3
              "
            >
              <div
                className="
                  w-3 h-3
                  rounded-full
                  bg-green-500
                "
              />

              <span
                className="
                  text-xl
                  font-bold
                "
              >
                Active Member
              </span>
            </div>
          </div>
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
              min-h-[760px]
              rounded-[40px]
              overflow-hidden
              border border-zinc-800
            "
          >
            <div
              className="
                absolute inset-0
                bg-gradient-to-br
                from-zinc-700
                via-black
                to-zinc-950
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
                top-0
                right-[80px]
                w-[1px]
                h-full
                bg-white/10
              "
            />

            <div
              className="
                absolute
                top-0
                right-[140px]
                w-[1px]
                h-full
                bg-white/5
              "
            />

            <div
              className="
                absolute
                bottom-10
                left-10
                z-10
              "
            >
              <div
                className="
                  w-24 h-24
                  rounded-full
                  bg-white
                  text-black
                  flex items-center
                  justify-center
                  text-4xl
                  font-black
                  mb-6
                "
              >
                {form.name?.charAt(0)}
              </div>

              <span
                className="
                  inline-block
                  bg-white
                  text-black
                  px-5 py-2
                  rounded-full
                  text-sm
                  font-black
                  mb-6
                "
              >
                ELITE MEMBER
              </span>

              <h2
                className="
                  text-5xl
                  font-black
                  leading-tight
                  mb-5
                "
              >
                Welcome Back,
                <br />
                {form.name}
              </h2>

              <p
                className="
                  text-zinc-400
                  text-lg
                  leading-relaxed
                  max-w-md
                "
              >
                Continue building your best physique with premium fitness
                coaching and elite training programs.
              </p>

              <div
                className="
                  flex gap-10
                  mt-10
                "
              >
                <div>
                  <h3
                    className="
                      text-3xl
                      font-black
                      mb-2
                    "
                  >
                    12
                  </h3>

                  <p className="text-zinc-500">Programs</p>
                </div>

                <div>
                  <h3
                    className="
                      text-3xl
                      font-black
                      mb-2
                    "
                  >
                    48
                  </h3>

                  <p className="text-zinc-500">Sessions</p>
                </div>

                <div>
                  <h3
                    className="
                      text-3xl
                      font-black
                      mb-2
                    "
                  >
                    PRO
                  </h3>

                  <p className="text-zinc-500">Level</p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="
              bg-zinc-950/90
              backdrop-blur-xl
              border border-zinc-800
              rounded-[40px]
              p-8 md:p-10
            "
          >
            <div className="mb-10">
              <p
                className="
                  uppercase
                  tracking-[4px]
                  text-zinc-500
                  text-sm
                  mb-4
                "
              >
                Personal Information
              </p>

              <h2
                className="
                  text-4xl
                  font-black
                  mb-4
                "
              >
                Edit Profile
              </h2>

              <p
                className="
                  text-zinc-500
                  leading-relaxed
                "
              >
                Update your personal information and keep your account secure.
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
                  mb-6
                "
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-7">
              <div className="space-y-3">
                <label
                  className="
                    text-sm
                    uppercase
                    tracking-[2px]
                    text-zinc-400
                  "
                >
                  Full Name
                </label>

                <input
                  type="text"
                  value={form.name}
                  className="
                    w-full
                    bg-black
                    border border-zinc-800
                    rounded-2xl
                    px-5 py-5
                    outline-none
                    focus:border-white
                    transition-all duration-300
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
                  Email Address
                </label>

                <input
                  type="email"
                  value={form.email}
                  className="
                    w-full
                    bg-black
                    border border-zinc-800
                    rounded-2xl
                    px-5 py-5
                    outline-none
                    focus:border-white
                    transition-all duration-300
                  "
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
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
                  New Password
                </label>

                <input
                  type="password"
                  value={form.password}
                  placeholder="Leave blank to keep current password"
                  className="
                    w-full
                    bg-black
                    border border-zinc-800
                    rounded-2xl
                    px-5 py-5
                    outline-none
                    focus:border-white
                    transition-all duration-300
                  "
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                />
              </div>

              <button
                type="submit"
                disabled={saving}
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
                  mt-6
                "
              >
                {saving ? "Updating Profile..." : "Update Profile"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
