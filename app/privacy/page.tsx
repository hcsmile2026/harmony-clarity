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
          Last Updated: June 19, 2026
        </p>
      </div>

      <div
        className="flex flex-col gap-6 text-base leading-relaxed"
        style={{ color: "var(--hcb-text-primary)" }}
      >
        <p style={{ color: "var(--hcb-text-secondary)" }}>
          Harmony Clarity™, a trade name of 5ATTA, Inc. ("Harmony Clarity," "we," "our," or "us"),
          respects your privacy and is committed to protecting the personal information you share with us.
        </p>
        <p style={{ color: "var(--hcb-text-secondary)" }}>
          This Privacy Policy describes how we collect, use, store, and protect your information when
          you visit our website, download our resources, purchase our products, or use our services
          (collectively, the "Services").
        </p>
        <p style={{ color: "var(--hcb-text-secondary)" }}>
          By using our Services, you agree to the practices described in this Privacy Policy.
        </p>

        <section className="flex flex-col gap-3">
          <h2 className="font-serif text-lg font-medium">1. Information We Collect</h2>

          <h3 className="font-medium" style={{ color: "var(--hcb-text-primary)" }}>Contact Information</h3>
          <ul className="list-disc pl-5 flex flex-col gap-1" style={{ color: "var(--hcb-text-secondary)" }}>
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number (if provided)</li>
          </ul>

          <h3 className="font-medium" style={{ color: "var(--hcb-text-primary)" }}>Birth Information</h3>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            To provide personalized Career Clarity Blueprint™ reports and related services, we may collect:
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-1" style={{ color: "var(--hcb-text-secondary)" }}>
            <li>Date of birth</li>
            <li>Time of birth</li>
            <li>City, state, and country of birth</li>
          </ul>

          <h3 className="font-medium" style={{ color: "var(--hcb-text-primary)" }}>Decision and Questionnaire Information</h3>
          <p style={{ color: "var(--hcb-text-secondary)" }}>We may collect:</p>
          <ul className="list-disc pl-5 flex flex-col gap-1" style={{ color: "var(--hcb-text-secondary)" }}>
            <li>Career questions</li>
            <li>Decision options you provide</li>
            <li>Questionnaire responses</li>
            <li>Written reflections and answers</li>
            <li>Other information you voluntarily submit in connection with our services</li>
          </ul>

          <h3 className="font-medium" style={{ color: "var(--hcb-text-primary)" }}>Payment Information</h3>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            Payments are processed securely through Stripe. We do not store complete credit card numbers on our servers.
          </p>

          <h3 className="font-medium" style={{ color: "var(--hcb-text-primary)" }}>Website Usage Information</h3>
          <p style={{ color: "var(--hcb-text-secondary)" }}>We may automatically collect certain technical information, including:</p>
          <ul className="list-disc pl-5 flex flex-col gap-1" style={{ color: "var(--hcb-text-secondary)" }}>
            <li>IP address</li>
            <li>Browser type</li>
            <li>Device information</li>
            <li>Pages visited</li>
            <li>Referring websites</li>
            <li>General usage analytics</li>
          </ul>

          <h3 className="font-medium" style={{ color: "var(--hcb-text-primary)" }}>Cookies</h3>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            We may use cookies and similar technologies to improve website functionality, understand
            website usage, and enhance your experience.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">2. How We Use Your Information</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>We may use your information to:</p>
          <ul className="list-disc pl-5 flex flex-col gap-1" style={{ color: "var(--hcb-text-secondary)" }}>
            <li>Generate and deliver your Career Clarity Blueprint™ and related services</li>
            <li>Process payments and fulfill purchases</li>
            <li>Respond to inquiries and provide customer support</li>
            <li>Communicate with you regarding your orders or requests</li>
            <li>Send educational content, updates, and promotional communications</li>
            <li>Improve our products, services, and website</li>
            <li>Maintain website security and prevent fraud</li>
            <li>Comply with legal obligations</li>
          </ul>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            You may unsubscribe from marketing emails at any time by using the unsubscribe link included in our emails.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">3. Use of Artificial Intelligence and Automated Tools</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            We may use a combination of software tools, automated systems, artificial intelligence
            technologies, and human review to help analyze information, generate insights, improve
            our services, and prepare personalized reports.
          </p>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            The use of these technologies does not change our commitment to protecting your personal
            information as described in this Privacy Policy.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">4. Birth Data and Personalized Reports</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            Your birth information, career questions, decision-related information, and questionnaire
            responses are collected solely for the purpose of providing personalized reports,
            educational content, and related services.
          </p>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            We do not sell, rent, or share this information with third parties for marketing purposes.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">5. Third-Party Service Providers</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            We use trusted third-party providers to operate our business and deliver our services.
            These providers may include:
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-1" style={{ color: "var(--hcb-text-secondary)" }}>
            <li>Stripe (payment processing)</li>
            <li>Xano (database and application services)</li>
            <li>Vercel (website hosting and analytics)</li>
            <li>Email service providers</li>
            <li>Artificial intelligence and automation service providers</li>
          </ul>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            These providers may process information only as necessary to perform services on our behalf.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">6. Sharing of Information</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            We do not sell or rent your personal information.
          </p>
          <p style={{ color: "var(--hcb-text-secondary)" }}>We may disclose information:</p>
          <ul className="list-disc pl-5 flex flex-col gap-1" style={{ color: "var(--hcb-text-secondary)" }}>
            <li>When required by law or legal process</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights, property, or safety</li>
            <li>To investigate fraud, abuse, or security concerns</li>
            <li>In connection with a merger, acquisition, reorganization, sale, or transfer of business assets</li>
          </ul>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">7. Data Security</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            We use commercially reasonable security measures to protect your information, including
            encrypted transmission (HTTPS) and secure storage practices.
          </p>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            However, no method of transmission over the Internet or electronic storage is completely
            secure. While we strive to protect your information, we cannot guarantee absolute security.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">8. Data Retention</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            We retain personal information only for as long as reasonably necessary to:
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-1" style={{ color: "var(--hcb-text-secondary)" }}>
            <li>Provide our services</li>
            <li>Comply with legal obligations</li>
            <li>Resolve disputes</li>
            <li>Enforce agreements</li>
            <li>Maintain business records</li>
          </ul>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            You may request deletion of your information by contacting us.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">9. Your Rights</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>You may request to:</p>
          <ul className="list-disc pl-5 flex flex-col gap-1" style={{ color: "var(--hcb-text-secondary)" }}>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Delete your personal information, subject to legal and operational requirements</li>
          </ul>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            To make a request, please contact us using the information provided below.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">10. Children's Privacy</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            Our Services are intended for individuals who are at least 18 years of age.
          </p>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            We do not knowingly collect personal information from anyone under 18. If we become
            aware that we have collected personal information from a child under 18, we will take
            reasonable steps to delete such information.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">11. External Links</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            Our website may contain links to third-party websites. We are not responsible for the
            privacy practices, content, or policies of those third-party websites.
          </p>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            We encourage you to review the privacy policies of any website you visit.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">12. Informational Purpose Only</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            The information, reports, insights, and educational materials provided by Harmony Clarity
            are intended for informational and educational purposes only.
          </p>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            They are not financial, legal, medical, psychological, or professional advice, and no
            specific outcome is guaranteed.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">13. Changes to This Privacy Policy</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            We may update this Privacy Policy from time to time.
          </p>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            Any changes will be posted on this page, and the revised version will become effective
            immediately upon posting. Your continued use of our Services after changes are posted
            constitutes acceptance of the updated Privacy Policy.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">14. Contact Us</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            If you have questions regarding this Privacy Policy or wish to make a privacy-related
            request, please contact:
          </p>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            Harmony Clarity™
            <br />
            <a
              href="mailto:hello@harmonyclarity.com"
              style={{ color: "var(--hcb-action-primary)" }}
            >
              hello@harmonyclarity.com
            </a>
          </p>
        </section>
      </div>
    </AppShell>
  )
}
