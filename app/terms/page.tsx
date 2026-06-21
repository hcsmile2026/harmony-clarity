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
          Last Updated: June 20, 2026
        </p>
      </div>

      <div
        className="flex flex-col gap-6 text-base leading-relaxed"
        style={{ color: "var(--hcb-text-primary)" }}
      >
        <p style={{ color: "var(--hcb-text-secondary)" }}>
          Harmony Clarity™, a trade name of 5ATTA, Inc. ("Harmony Clarity," "we," "our," or "us"),
          provides educational content, personalized reports, digital products, programs, resources,
          and related services.
        </p>
        <p style={{ color: "var(--hcb-text-secondary)" }}>
          By accessing or using our website, products, services, content, or materials (collectively,
          the "Services"), you agree to be bound by these Terms of Service. If you do not agree to
          these Terms, please do not use our Services.
        </p>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">1. Eligibility</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            You must be at least 18 years old to use our Services.
          </p>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            By accessing or using our Services, you represent and warrant that you meet this requirement.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">2. Use of Services</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            You agree to use our Services only for lawful purposes and in accordance with these Terms.
          </p>
          <p style={{ color: "var(--hcb-text-secondary)" }}>You agree not to:</p>
          <ul className="list-disc pl-5 flex flex-col gap-1" style={{ color: "var(--hcb-text-secondary)" }}>
            <li>Violate any applicable law or regulation</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with the operation or security of our Services</li>
            <li>Copy, reproduce, distribute, modify, or exploit our content without permission</li>
            <li>Use our Services for fraudulent, harmful, or unlawful activities</li>
          </ul>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            We reserve the right to restrict, suspend, or terminate access to our Services if we
            believe these Terms have been violated.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">3. Intellectual Property</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            All content, reports, materials, designs, text, graphics, branding, logos, downloads,
            digital products, and other intellectual property made available through Harmony Clarity
            are owned by Harmony Clarity or its licensors and are protected by applicable intellectual
            property laws.
          </p>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            Purchasing or accessing a product does not transfer ownership of any intellectual property rights.
          </p>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            You may use purchased materials for your personal, non-commercial use only.
          </p>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            You may not reproduce, distribute, sell, share, publish, modify, or create derivative
            works from our materials without prior written permission.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">4. Purchases, Payments, and Refunds</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            Prices are displayed at the time of purchase and may change without notice.
          </p>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            Payments are processed through third-party payment providers such as Stripe.
          </p>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            Unless otherwise stated on the applicable sales page, all purchases are final and
            non-refundable due to the digital and personalized nature of many of our products
            and services.
          </p>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            If you experience a technical issue that prevents delivery of a purchased product or
            service, please contact us and we will make reasonable efforts to resolve the issue.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">5. User Submissions</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            You are responsible for the accuracy of any information you provide to Harmony Clarity,
            including but not limited to birth information, questionnaire responses, personal
            reflections, decision-related information, and other submitted content.
          </p>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            Harmony Clarity is not responsible for errors, omissions, or outcomes resulting from
            inaccurate, incomplete, or misleading information submitted by users.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">6. Educational and Informational Purpose Only</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            Harmony Clarity provides educational, informational, self-reflection, personal growth,
            and decision-support resources.
          </p>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            Our products, services, reports, content, and materials are not financial, legal, tax,
            medical, psychological, therapeutic, investment, or other professional advice.
          </p>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            You are solely responsible for your decisions, actions, and results.
          </p>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            Any insights, observations, recommendations, or guidance provided through our Services
            should be considered educational information only.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">7. No Guarantees</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            We make no guarantees regarding any outcome, result, achievement, decision, career path,
            financial result, business result, personal outcome, or other benefit that may arise from
            using our Services.
          </p>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            Individual results vary based on many factors beyond our control.
          </p>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            Decisions made based on information provided through our Services are solely your
            responsibility. You agree that Harmony Clarity is not responsible for the outcomes of
            any decisions you make.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">8. Artificial Intelligence and Automated Processing</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            Harmony Clarity may use software tools, automated systems, artificial intelligence
            technologies, and human review in the creation, delivery, analysis, or improvement of
            products and services.
          </p>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            We make no representation that content generated or assisted by such technologies will
            be error-free, complete, or suitable for any particular purpose.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">9. Electronic Communications</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            By using our Services, submitting forms, making purchases, or providing your email
            address, you consent to receive electronic communications from us, including
            service-related notices, product delivery information, and other communications related
            to your use of our Services.
          </p>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            You may unsubscribe from promotional emails at any time; however, we may continue to
            send service-related communications necessary to provide purchased products or services.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">10. Disclaimer of Warranties</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            All Services are provided on an "as is" and "as available" basis.
          </p>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            To the fullest extent permitted by law, Harmony Clarity disclaims all warranties,
            express or implied, including warranties of merchantability, fitness for a particular
            purpose, accuracy, reliability, availability, and non-infringement.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">11. Limitation of Liability</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            To the fullest extent permitted by law, Harmony Clarity, 5ATTA, Inc., and their owners,
            officers, employees, contractors, affiliates, and service providers shall not be liable
            for any indirect, incidental, consequential, special, punitive, or exemplary damages
            arising out of or relating to the use of our Services.
          </p>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            Our total liability for any claim shall not exceed the amount paid by you for the
            specific product or service giving rise to the claim.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">12. Indemnification</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            You agree to indemnify, defend, and hold harmless Harmony Clarity, 5ATTA, Inc., and
            their owners, officers, employees, contractors, affiliates, and service providers from
            and against any claims, liabilities, damages, losses, costs, or expenses arising from
            your use of the Services or violation of these Terms.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">13. Third-Party Services</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            Our Services may rely on or integrate with third-party providers, including payment
            processors, hosting providers, analytics services, automation providers, and artificial
            intelligence providers.
          </p>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            We are not responsible for the availability, policies, or actions of third-party services.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">14. Governing Law</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            These Terms shall be governed by and interpreted in accordance with the laws of the
            State of California, United States, without regard to conflict of law principles.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">15. Severability</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            If any provision of these Terms is found to be invalid, unlawful, or unenforceable,
            the remaining provisions shall remain in full force and effect.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">16. Changes to These Terms</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            We may update these Terms from time to time.
          </p>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            Any changes will be posted on this page and become effective upon posting.
          </p>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            Your continued use of the Services after any changes are posted constitutes acceptance
            of the updated Terms.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-lg font-medium">17. Contact Us</h2>
          <p style={{ color: "var(--hcb-text-secondary)" }}>
            If you have questions regarding these Terms, please contact:
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
