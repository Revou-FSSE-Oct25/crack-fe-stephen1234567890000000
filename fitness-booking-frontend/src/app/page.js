import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-black text-white overflow-hidden">
      <section
        className="
          relative
          min-h-screen
          flex items-center
          px-6 md:px-12 lg:px-20
        "
      >
        <div
          className="
            absolute inset-0
            bg-gradient-to-br
            from-zinc-900
            via-black
            to-zinc-950
          "
        />

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
            relative z-10
            max-w-7xl
            mx-auto
            grid lg:grid-cols-2
            gap-16
            items-center
            w-full
          "
        >
          <div>
            <span
              className="
                inline-block
                bg-white
                text-black
                px-5 py-2
                rounded-full
                text-sm
                font-black
                mb-8
                tracking-wide
              "
            >
              ELITE FITNESS PLATFORM
            </span>

            <h1
              className="
                text-6xl
                md:text-7xl
                lg:text-8xl
                font-black
                leading-[0.9]
                mb-8
              "
            >
              TRAIN
              <br />
              LIKE A
              <br />
              CHAMPION
            </h1>

            <p
              className="
                text-zinc-400
                text-lg
                md:text-xl
                leading-relaxed
                max-w-2xl
                mb-10
              "
            >
              Premium fitness coaching, elite training sessions, and world-class
              workout programs designed to transform your body and performance.
            </p>

            <div className="flex flex-wrap gap-5">
              <Link
                href="/register"
                className="
                  bg-white
                  text-black
                  px-8 py-5
                  rounded-full
                  font-black
                  text-lg
                  hover:bg-zinc-200
                  transition-all duration-300
                "
              >
                Start Training
              </Link>

              <Link
                href="/services"
                className="
                  border border-zinc-700
                  px-8 py-5
                  rounded-full
                  font-semibold
                  hover:bg-zinc-900
                  transition-all duration-300
                "
              >
                Explore Programs
              </Link>
            </div>

            <div
              className="
                flex flex-wrap
                gap-12
                mt-16
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
                  50K+
                </h2>

                <p className="text-zinc-500">Active Members</p>
              </div>

              <div>
                <h2
                  className="
                    text-5xl
                    font-black
                    mb-2
                  "
                >
                  250+
                </h2>

                <p className="text-zinc-500">Premium Workouts</p>
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

                <p className="text-zinc-500">Coaching Access</p>
              </div>
            </div>
          </div>

          <div
            className="
              relative
              h-[700px]
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

            <div
              className="
                absolute
                bottom-10
                left-10
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
                  mb-4
                "
              >
                Unlock
                <br />
                Your Potential
              </h2>

              <p
                className="
                  text-zinc-400
                  max-w-md
                  leading-relaxed
                "
              >
                Build strength, improve performance, and transform your physique
                with elite coaching.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="
          py-32
          px-6 md:px-12 lg:px-20
          border-t border-zinc-900
        "
      >
        <div className="max-w-7xl mx-auto">
          {/* TOP */}
          <div className="mb-20">
            <p
              className="
                uppercase
                tracking-[4px]
                text-zinc-500
                text-sm
                mb-4
              "
            >
              WHY FITBOOKING
            </p>

            <h2
              className="
                text-5xl
                md:text-6xl
                font-black
                leading-tight
                max-w-4xl
              "
            >
              Everything You Need To Become Stronger
            </h2>
          </div>

          {/* GRID */}
          <div
            className="
              grid
              md:grid-cols-2
              lg:grid-cols-3
              gap-8
            "
          >
            {/* CARD 1 */}
            <div
              className="
                bg-zinc-950
                border border-zinc-800
                rounded-[32px]
                p-10
                hover:border-zinc-600
                transition-all duration-300
              "
            >
              <div
                className="
                  text-6xl
                  font-black
                  text-zinc-700
                  mb-8
                "
              >
                01
              </div>

              <h3
                className="
                  text-3xl
                  font-black
                  mb-5
                "
              >
                Elite Trainers
              </h3>

              <p
                className="
                  text-zinc-500
                  leading-relaxed
                "
              >
                Work with certified coaches and professional athletes to
                maximize your performance.
              </p>
            </div>

            <div
              className="
                bg-zinc-950
                border border-zinc-800
                rounded-[32px]
                p-10
                hover:border-zinc-600
                transition-all duration-300
              "
            >
              <div
                className="
                  text-6xl
                  font-black
                  text-zinc-700
                  mb-8
                "
              >
                02
              </div>

              <h3
                className="
                  text-3xl
                  font-black
                  mb-5
                "
              >
                Premium Programs
              </h3>

              <p
                className="
                  text-zinc-500
                  leading-relaxed
                "
              >
                Access advanced workout systems designed for muscle growth,
                endurance, and athletic performance.
              </p>
            </div>

            <div
              className="
                bg-zinc-950
                border border-zinc-800
                rounded-[32px]
                p-10
                hover:border-zinc-600
                transition-all duration-300
              "
            >
              <div
                className="
                  text-6xl
                  font-black
                  text-zinc-700
                  mb-8
                "
              >
                03
              </div>

              <h3
                className="
                  text-3xl
                  font-black
                  mb-5
                "
              >
                Flexible Booking
              </h3>

              <p
                className="
                  text-zinc-500
                  leading-relaxed
                "
              >
                Schedule sessions anytime and train at your own pace with
                complete flexibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="
          py-32
          px-6 md:px-12 lg:px-20
          border-t border-zinc-900
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            grid lg:grid-cols-2
            gap-16
            items-center
          "
        >
          {/* LEFT */}
          <div>
            <p
              className="
                uppercase
                tracking-[4px]
                text-zinc-500
                text-sm
                mb-5
              "
            >
              JOIN THE MOVEMENT
            </p>

            <h2
              className="
                text-5xl
                md:text-7xl
                font-black
                leading-[0.95]
                mb-8
              "
            >
              PUSH
              <br />
              PAST
              <br />
              LIMITS
            </h2>

            <p
              className="
                text-zinc-400
                text-lg
                leading-relaxed
                max-w-xl
                mb-10
              "
            >
              Become part of a fitness community focused on discipline,
              consistency, and elite performance.
            </p>

            <Link
              href="/register"
              className="
                inline-block
                bg-white
                text-black
                px-8 py-5
                rounded-full
                font-black
                text-lg
                hover:bg-zinc-200
                transition-all duration-300
              "
            >
              Join Now
            </Link>
          </div>

          {/* RIGHT */}
          <div
            className="
              bg-zinc-950
              border border-zinc-800
              rounded-[40px]
              p-10 md:p-14
            "
          >
            <div className="space-y-10">
              <div
                className="
                  flex
                  justify-between
                  items-center
                  border-b border-zinc-800
                  pb-6
                "
              >
                <div>
                  <p className="text-zinc-500 mb-2">Strength Training</p>

                  <h3
                    className="
                      text-2xl
                      font-black
                    "
                  >
                    Elite Power
                  </h3>
                </div>

                <span
                  className="
                    text-4xl
                    font-black
                  "
                >
                  95%
                </span>
              </div>

              <div
                className="
                  flex
                  justify-between
                  items-center
                  border-b border-zinc-800
                  pb-6
                "
              >
                <div>
                  <p className="text-zinc-500 mb-2">Conditioning</p>

                  <h3
                    className="
                      text-2xl
                      font-black
                    "
                  >
                    Athletic Cardio
                  </h3>
                </div>

                <span
                  className="
                    text-4xl
                    font-black
                  "
                >
                  88%
                </span>
              </div>

              <div
                className="
                  flex
                  justify-between
                  items-center
                "
              >
                <div>
                  <p className="text-zinc-500 mb-2">Body Transformation</p>

                  <h3
                    className="
                      text-2xl
                      font-black
                    "
                  >
                    Lean Physique
                  </h3>
                </div>

                <span
                  className="
                    text-4xl
                    font-black
                  "
                >
                  99%
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
