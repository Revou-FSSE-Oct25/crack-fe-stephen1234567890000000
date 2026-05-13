import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center p-8 max-w-2xl">
        <h1 className="text-5xl font-bold mb-4 gradient-overlay bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Elevate Your Fitness Journey
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Book professional trainers, discover premium services, and achieve
          your goals with FitBooking. Minimalist. Powerful. Yours.
        </p>
        <div className="space-x-4">
          <Link
            href="/login"
            className="bg-white text-black px-6 py-3 rounded-lg font-medium hover-lift transition"
          >
            Get Started
          </Link>
          <Link
            href="/services"
            className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition"
          >
            Explore Services
          </Link>
        </div>
      </div>
    </div>
  );
}
