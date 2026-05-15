"use client";

import api from "@/lib/axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await api.post("/auth/login", form);
      localStorage.setItem("accessToken", data.accesstoken);
      localStorage.setItem("role", data.role);
      window.dispatchEvent(new Event("authChanged"));
      if (data.role === "admin") {
        router.push("/admin/services");
        return;
      }
      router.push("/services");
    } catch (error) {
      setError(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        min-h-screen
        bg-black
        text-white
        overflow-hidden
      "
    >
      <div
        className="
          grid lg:grid-cols-2
          min-h-screen
        "
      >
        <div
          className="
            relative
            hidden lg:flex
            items-end
            p-14
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
            "
          />

          <div
            className="
              absolute
              top-[-150px]
              left-[-150px]
              w-[400px]
              h-[400px]
              bg-white/5
              blur-3xl
              rounded-full
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

          <div className="relative z-10">
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
                tracking-wide
              "
            >
              ELITE FITNESS
            </span>

            <h1
              className="
                text-7xl
                font-black
                leading-[0.95]
                mb-6
              "
            >
              TRAIN
              <br />
              LIKE AN
              <br />
              ATHLETE
            </h1>

            <p
              className="
                text-zinc-400
                text-lg
                leading-relaxed
                max-w-lg
              "
            >
              Access premium fitness programs, private coaching, and elite
              training sessions designed for serious results.
            </p>

            <div
              className="
                flex gap-12
                mt-12
              "
            >
              <div>
                <h2
                  className="
                    text-4xl
                    font-black
                    mb-2
                  "
                >
                  10K+
                </h2>

                <p className="text-zinc-500">Members</p>
              </div>

              <div>
                <h2
                  className="
                    text-4xl
                    font-black
                    mb-2
                  "
                >
                  250+
                </h2>

                <p className="text-zinc-500">Programs</p>
              </div>

              <div>
                <h2
                  className="
                    text-4xl
                    font-black
                    mb-2
                  "
                >
                  24/7
                </h2>

                <p className="text-zinc-500">Access</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="
            flex
            items-center
            justify-center
            p-6 md:p-10
            bg-black
          "
        >
          <div
            className="
              w-full
              max-w-[520px]
            "
          >
            <div className="lg:hidden mb-10">
              <span
                className="
                  inline-block
                  bg-white
                  text-black
                  px-4 py-2
                  rounded-full
                  text-xs
                  font-black
                  mb-5
                "
              >
                ELITE FITNESS
              </span>

              <h1
                className="
                  text-5xl
                  font-black
                  leading-tight
                "
              >
                LOGIN
              </h1>
            </div>

            <div
              className="
                bg-zinc-950
                border border-zinc-800
                rounded-[36px]
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
                  Welcome Back
                </p>

                <h2
                  className="
                    text-5xl
                    font-black
                    mb-4
                  "
                >
                  Sign In
                </h2>

                <p
                  className="
                    text-zinc-500
                    leading-relaxed
                  "
                >
                  Continue your fitness journey and access your premium training
                  programs.
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

              <form onSubmit={handleSubmit} className="space-y-6">
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
                    placeholder="Enter your email"
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
                    Password
                  </label>

                  <input
                    type="password"
                    placeholder="Enter your password"
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

                <div
                  className="
                    flex
                    justify-between
                    items-center
                    text-sm
                  "
                >
                  <label
                    className="
                      flex items-center
                      gap-3
                      text-zinc-400
                    "
                  >
                    <input type="checkbox" className="accent-white" />
                    Remember me
                  </label>

                  <button
                    type="button"
                    className="
                      text-zinc-400
                      hover:text-white
                      transition-all
                    "
                  >
                    Forgot Password?
                  </button>
                </div>

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
                    mt-4
                  "
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </form>

              <div
                className="
                  mt-10
                  pt-8
                  border-t border-zinc-800
                  text-center
                "
              >
                <p className="text-zinc-500">
                  Don’t have an account?{" "}
                  <Link
                    href="/register"
                    className="
                      text-white
                      font-semibold
                      hover:text-zinc-300
                      transition-all
                    "
                  >
                    Create Account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
