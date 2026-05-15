"use client";

import api from "@/lib/axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await api.post("/auth/register", form);
      localStorage.setItem("accessToken", data.accessToken);
      const savedRole = data.role ?? "user";
      localStorage.setItem("role", savedRole);
      window.dispatchEvent(new Event("authChanged"));

      router.push("/services");
    } catch (error) {
      setError(error.response?.data.message);
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
        relative
      "
    >
      {/* BACKGROUND GLOW */}
      <div
        className="
          absolute
          top-[-200px]
          right-[-150px]
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
          left-[-200px]
          w-[600px]
          h-[600px]
          bg-zinc-700/10
          blur-3xl
          rounded-full
        "
      />

      <div
        className="
          grid lg:grid-cols-2
          min-h-screen
          relative z-10
        "
      >
        {/* LEFT SIDE */}
        <div
          className="
            flex
            items-center
            justify-center
            p-6 md:p-10
            order-2 lg:order-1
          "
        >
          <div
            className="
              w-full
              max-w-[560px]
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
                  tracking-wide
                "
              >
                JOIN ELITE FITNESS
              </span>

              <h1
                className="
                  text-5xl
                  font-black
                  leading-tight
                "
              >
                CREATE
                <br />
                ACCOUNT
              </h1>
            </div>

            <div
              className="
                bg-zinc-950/90
                backdrop-blur-xl
                border border-zinc-800
                rounded-[40px]
                p-8 md:p-10
                shadow-2xl
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
                  Start Your Journey
                </p>

                <h2
                  className="
                    text-5xl
                    font-black
                    leading-tight
                    mb-5
                  "
                >
                  Create
                  <br />
                  Your Account
                </h2>

                <p
                  className="
                    text-zinc-500
                    leading-relaxed
                    max-w-md
                  "
                >
                  Join our elite fitness platform and unlock premium workouts,
                  coaching, and exclusive training programs.
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
                    Full Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your full name"
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
                    placeholder="Create a password"
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
                    flex items-start
                    gap-4
                    text-sm
                    text-zinc-500
                  "
                >
                  <input
                    type="checkbox"
                    className="
                      mt-1
                      accent-white
                    "
                  />

                  <p className="leading-relaxed">
                    I agree to the Terms of Service and Privacy Policy.
                  </p>
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
                  {loading ? "Creating Account..." : "Create Account"}
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
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="
                      text-white
                      font-semibold
                      hover:text-zinc-300
                      transition-all
                    "
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="
            relative
            hidden lg:flex
            items-end
            justify-start
            p-14
            overflow-hidden
            order-1 lg:order-2
          "
        >
          <div
            className="
              absolute inset-0
              bg-gradient-to-bl
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
              PREMIUM TRAINING
            </span>

            <h1
              className="
                text-8xl
                font-black
                leading-[0.9]
                mb-6
              "
            >
              BUILD
              <br />
              YOUR
              <br />
              BEST BODY
            </h1>

            <p
              className="
                text-zinc-400
                text-lg
                leading-relaxed
                max-w-lg
              "
            >
              Join thousands of athletes transforming their physique with elite
              training systems and performance coaching.
            </p>

            <div
              className="
                flex gap-12
                mt-14
              "
            >
              <div>
                <h2
                  className="
                    text-5xl
                    font-black
                    mb-2
                  "
                >
                  500+
                </h2>

                <p className="text-zinc-500">Workouts</p>
              </div>

              <div>
                <h2
                  className="
                    text-5xl
                    font-black
                    mb-2
                  "
                >
                  50K+
                </h2>

                <p className="text-zinc-500">Athletes</p>
              </div>

              <div>
                <h2
                  className="
                    text-5xl
                    font-black
                    mb-2
                  "
                >
                  24/7
                </h2>

                <p className="text-zinc-500">Coaching</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
