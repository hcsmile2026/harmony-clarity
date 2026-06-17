"use client"

export default function OrderThankYouPage() {
  return (
    <div style={{ background: "#F7F4EF", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ maxWidth: 520, padding: "48px 24px", textAlign: "center" }}>
        <div style={{ color: "#7A1E2C", fontSize: 32, marginBottom: 24 }}>✦</div>

        <h1 style={{
          fontFamily: "Libre Baskerville, serif",
          fontSize: 28,
          color: "#1F2933",
          marginBottom: 16,
          lineHeight: 1.3,
        }}>
          Payment received. Thank you.
        </h1>

        <p style={{
          fontSize: 18,
          color: "#4A5568",
          lineHeight: 1.7,
          marginBottom: 12,
        }}>
          Your Career Clarity Blueprint™ will be delivered to your inbox
          within <strong style={{ color: "#1F2933" }}>1–2 business days</strong>.
        </p>

        <p style={{ fontSize: 15, color: "#4A5568", lineHeight: 1.6, marginBottom: 32 }}>
          Check your inbox — and your spam folder, just in case.
          If you have any questions, reach out to{" "}
          <a href="mailto:support@harmonyclarity.com" style={{ color: "#7A1E2C" }}>
            support@harmonyclarity.com
          </a>
        </p>

        <div style={{
          background: "#fff",
          border: "1px solid #E6E1D9",
          borderRadius: 12,
          padding: "24px 28px",
        }}>
          <p style={{ color: "#4A5568", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: "#1F2933" }}>What happens next:</strong><br />
            We review your Career Clarity Blueprint™ personally before sending it to you.
            You will receive an email with a secure link to view your personalised report.
          </p>
        </div>
      </div>
    </div>
  )
}
