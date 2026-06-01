"use client"

import { AppShell } from "@/components/hcb"

export default function TermsPage() {
  return (
    <AppShell maxWidth="sm">
      <div className="flex flex-col gap-1 mb-8">
        <button
          onClick={() => window.history.back()}
          className="text-sm cursor-pointer mb-4 self-start"
          style={{ color: "var(--hcb-action-primary)", fontWeight: 500 }}
        >
          ← Back
        </button>
        <h1
          className="font-serif text-[28px]"
          style={{ color: "var(--hcb-text-primary)" }}
        >
          Terms of Service
        </h1>
        <p className="text-sm" style={{ color: "var(--hcb-text-secondary)" }}>
          Last updated: June 1, 2026
        </p>
      </div>

      <div
        className="flex flex-col gap-6 text-base leading-relaxed"
        style={{ color: "var(--hcb-text-primary)" }}
      >
        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">1. About This Service</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            Harmony Clarity Blueprint ("we", "us", "our") provides an AI-powered decision reflection
            platform. Our Blueprints are generated for <strong>reflective and entertainment purposes
            only</strong>. They do not constitute professional advice of any kind — including but not
            limited to financial, legal, medical, or psychological advice.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">2. Eligibility</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            You must be at least 18 years of age to use this service. By creating an account, you
            confirm that you meet this requirement.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">3. Your Account</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            You are responsible for maintaining the confidentiality of your login credentials. You
            agree to provide accurate information when registering and to keep it up to date. We
            reserve the right to suspend or terminate accounts that violate these Terms.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">4. Payments and Credits</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            Each Blueprint requires one credit, priced at $47 USD. Payments are processed securely
            by Stripe. Credits are non-refundable once a Blueprint has been generated. If you
            experience a technical failure that prevents Blueprint generation after payment, contact
            us and we will issue a replacement credit.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">5. Acceptable Use</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            You agree not to misuse our service. Prohibited activities include attempting to reverse
            engineer the platform, scraping content, sharing account access, or using the service
            for any unlawful purpose.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">6. Disclaimer of Warranties</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            This service is provided "as is" without warranties of any kind. We do not guarantee
            that Blueprints will be accurate, complete, or suitable for any particular purpose. Use
            of this service is entirely at your own discretion and risk.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">7. Limitation of Liability</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            To the maximum extent permitted by law, Harmony Clarity Blueprint shall not be liable
            for any indirect, incidental, or consequential damages arising from your use of this
            service. Our total liability shall not exceed the amount you paid for the relevant credit.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">8. Changes to These Terms</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            We may update these Terms from time to time. Continued use of the service after changes
            are posted constitutes your acceptance of the updated Terms.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">9. Contact</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            For questions about these Terms, contact us at{" "}
            <a
              href="mailto:harmoniesbloom@gmail.com"
              style={{ color: "var(--hcb-action-primary)" }}
            >
              harmoniesbloom@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </AppShell>
  )
}
