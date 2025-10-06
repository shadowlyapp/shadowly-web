import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Shadowly handles personal information, cookies, analytics, and third-party advertising services.",
};

const effectiveDate = "October 5, 2025";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-slate-900">Privacy Policy</h1>
            <p className="mt-2 text-base text-slate-600">Effective {effectiveDate}</p>
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
            <h2 className="text-xl font-semibold text-slate-800">1. Overview</h2>
            <p className="mt-2 leading-relaxed">
              Shadowly helps you practice shadowing using publicly available video
              content. This policy explains what information we collect, how we use it,
              and the choices you have.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800">2. Information we collect</h2>
            <div className="mt-2 space-y-3 leading-relaxed">
              <p>
                <span className="font-semibold">Account and contact data.</span> If you
                choose to contact us, we collect the details you provide (such as your
                email address) to respond to your message.
              </p>
              <p>
                <span className="font-semibold">Usage data.</span> We collect
                pseudonymous analytics data about how people interact with Shadowly. We
                also log application events to keep the service reliable.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800">3. Cookies and similar technologies</h2>
            <p className="mt-2 leading-relaxed">
              Shadowly uses first-party cookies to remember session preferences (for
              example, which video and caption settings you are using). We rely on
              third-party analytics and advertising providers that may set their own
              cookies or use similar tracking technologies to measure performance and
              deliver relevant ads. You can control cookies through your browser
              settings or opt-out mechanisms provided by the vendors listed below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800">4. Advertising and analytics partners</h2>
            <p className="mt-2 leading-relaxed">
              We work with third-party vendors, including Google, to show ads and
              understand how Shadowly is used. Vendors may collect data about your
              visits to this and other sites using cookies, device identifiers, or
              similar technologies. You can review Google&apos;s practices and opt-out of
              personalized advertising by visiting the
              <a
                href="https://policies.google.com/technologies/ads"
                className="ml-1 text-slate-900 underline decoration-slate-400 decoration-2 underline-offset-2 hover:text-slate-600"
                rel="noopener noreferrer"
                target="_blank"
              >
                Google Ads Privacy &amp; Terms page
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800">5. Data retention</h2>
            <p className="mt-2 leading-relaxed">
              We retain analytics and log information for as long as necessary to
              provide the service, troubleshoot issues, and meet legal obligations. If
              you contact us, we keep the correspondence only as long as needed to
              address your inquiry.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800">6. Your choices</h2>
            <div className="mt-2 space-y-3 leading-relaxed">
              <p>
                <span className="font-semibold">Cookie controls.</span> Adjust your
                browser settings to refuse or delete cookies. Many vendors also offer
                opt-out tools for interest-based advertising.
              </p>
              <p>
                <span className="font-semibold">Do Not Track.</span> Shadowly does not
                currently respond to browser Do Not Track signals, but you can limit
                tracking through the controls mentioned above.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800">7. International transfers</h2>
            <p className="mt-2 leading-relaxed">
              Shadowly is operated from the United States. If you access the service
              from another region, your data may be processed in the United States or
              other countries where our service providers operate.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800">8. Changes to this policy</h2>
            <p className="mt-2 leading-relaxed">
              We may update this policy to reflect product changes or legal
              requirements. When we do, we will adjust the effective date above. We
              encourage you to review this page periodically.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800">9. Contact</h2>
            <p className="mt-2 leading-relaxed">
              For privacy questions, email
              <a
                href="mailto:privacy@shadowly.app"
                className="ml-1 text-slate-900 underline decoration-slate-400 decoration-2 underline-offset-2 hover:text-slate-600"
              >
                privacy@shadowly.app
              </a>
              .
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
