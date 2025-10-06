import Link from "next/link";

export const metadata = {
  title: "About Shadowly",
  description:
    "Learn how Shadowly helps language learners build fluency through immersive shadowing sessions on real-world videos.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-slate-900">About Shadowly</h1>
            <p className="mt-2 text-base text-slate-600">
              Shadowly is a focused practice space for language learners who want to
              sound natural using the shadowing technique.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            <span className="inline-flex h-2 w-2 items-center justify-center">
              <span className="inline-block h-2 w-2 rounded-full bg-slate-400" aria-hidden="true" />
            </span>
            Back to app
          </Link>
        </div>

        <div className="space-y-8 text-slate-700">
          <section>
            <h2 className="text-xl font-semibold text-slate-800">How it works</h2>
            <p className="mt-2 leading-relaxed">
              Paste any YouTube link or pick from our curated recommendations to start
              a session. We surface synchronized transcripts, timed captions, and
              translation tools so you can listen, repeat, and refine your delivery in
              real time. Every interaction is designed to keep you in the flow—no
              distractions, no video rabbit holes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800">Why shadowing</h2>
            <p className="mt-2 leading-relaxed">
              Shadowing trains your ear, voice, and rhythm together. By imitating
              native speakers as they talk, you absorb pronunciation, melody, and
              colloquial phrasing far faster than through memorized vocabulary alone.
              Shadowly automates the tedious parts—rewinding, timing captions, and
              keeping track of target languages—so you can stay focused on production.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800">Our roadmap</h2>
            <p className="mt-2 leading-relaxed">
              We are working toward a richer study notebook, customizable drills, and
              optional AI feedback. A dedicated dark mode, additional language
              collections, and spaced repetition tools are on the near-term roadmap.
              Have ideas or want to collaborate? We would love to hear from you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800">Get in touch</h2>
            <p className="mt-2 leading-relaxed">
              Questions, suggestions, or partnership requests can be sent to
              <a
                href="mailto:hello@shadowly.app"
                className="ml-1 text-slate-900 underline decoration-slate-400 decoration-2 underline-offset-2 hover:text-slate-600"
              >
                hello@shadowly.app
              </a>
              . We reply to most messages within a couple of days.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
