"use client"

import { AppShell } from "@/components/hcb"

export default function PrivacyPage() {
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
          Privacy Policy
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
          <h2 className="font-serif text-lg font-medium">1. What We Collect</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            When you use Harmony Clarity Blueprint, we collect the following information:
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-1" style={{ color: "var(--hcb-text-secondary)" }}>
            <li><strong>Account information:</strong> email address and password</li>
            <li><strong>Profile information:</strong> first name, date of birth, time of birth, city and country of birth</li>
            <li><strong>Decision content:</strong> the decisions, options, and answers you provide during Blueprint sessions</li>
            <li><strong>Payment information:</strong> processed by Stripe — we do not store your card details</li>
            <li><strong>Usage data:</strong> anonymous analytics via Vercel Analytics</li>
          </ul>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">2. How We Use Your Data</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            Your data is used solely to:
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-1" style={{ color: "var(--hcb-text-secondary)" }}>
            <li>Generate your personalised Blueprint using AI</li>
            <li>Maintain your account and session history</li>
            <li>Process payments and manage credits</li>
            <li>Improve the service through anonymous usage analytics</li>
          </ul>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            We do not sell, rent, or share your personal data with third parties for marketing purposes.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">3. Birth Data</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            Your birth information (date, time, and location) is used exclusively for generating
            your Blueprint. It is stored securely and never shared with third parties. You may
            update or delete this information at any time by contacting us.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">4. Third-Party Services</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            We use the following third-party services to operate the platform:
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-1" style={{ color: "var(--hcb-text-secondary)" }}>
            <li><strong>Xano</strong> — backend database and API</li>
            <li><strong>Stripe</strong> — payment processing</li>
            <li><strong>Vercel</strong> — hosting and anonymous analytics</li>
          </ul>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            Each of these services has their own privacy policy governing their handling of data.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">5. Data Retention</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            We retain your data for as long as your account is active. You may request deletion
            of your account and associated data at any time by contacting us.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">6. Security</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            We take reasonable measures to protect your data, including encrypted transmission (HTTPS)
            and secure storage. No system is completely secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">7. Your Rights</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            You have the right to access, correct, or delete the personal data we hold about you.
            To exercise these rights, contact us at the address below.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">8. Contact</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            For privacy-related questions or requests, contact us at{" "}
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
