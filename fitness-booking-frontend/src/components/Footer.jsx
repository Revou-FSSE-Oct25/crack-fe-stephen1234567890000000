import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white text-black border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-4">
            <p className="text-2xl font-semibold">FitBooking</p>
            <p className="max-w-sm text-sm text-gray-600">
              A modern booking experience for trainers and clients, designed
              with a clean black-and-white aesthetic and easy access to
              services.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-900">
              Quick Links
            </p>
            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li>
                <Link href="/services" className="hover:text-black transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/bookings" className="hover:text-black transition">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-black transition">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-900">
              Connect
            </p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-gray-600">
              <Link href="/contact" className="hover:text-black transition">
                Contact Support
              </Link>
              <Link href="/privacy" className="hover:text-black transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-black transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-sm text-gray-500">
          <p className="text-center">
            © {new Date().getFullYear()} FitBooking. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
