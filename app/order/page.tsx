"use client"

import { useState } from "react"
import { PrimaryButton, InlineError } from "@/components/hcb"

const XANO = "https://xkyb-0esl-ybtr.n7e.xano.io/api:lsRTcA3V"

const INCLUDES = [
  "Your natural strengths and how they apply to this decision",
  "How you're designed to make important decisions",
  "Career environments where you're most likely to thrive",
  "Personalized insight into your current career question",
  "Practical next steps to move forward with clarity",
]

export default function OrderPage() {
  const [form, setForm] = useState({
    first_name: "",
    email: "",
    date_of_birth: "",
    time_of_birth: "",
    location_of_birth: "",
    career_question: "",
    decision_difficulty: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!form.first_name.trim()) return setError("First name is required.")
    if (!form.email.trim()) return setError("Email is required.")
    if (!form.date_of_birth.trim()) return setError("Your date of birth is required to generate your Blueprint.")

    setIsLoading(true)
    try {
      const res = await fetch(`${XANO}/orders/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: form.first_name,
          email: form.email,
          date_of_birth: form.date_of_birth,
          time_of_birth: form.time_of_birth,
          location_of_birth: form.location_of_birth,
          career_question: form.career_question,
          decision_difficulty: form.decision_difficulty,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Something went wrong.")
      window.location.href = data.checkout_url
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div style={{ background: "#F7F4EF", minHeight: "100vh" }}>
      <div style={{ maxWidth: 620, margin: "0 auto", padding: "56px 24px 80px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ color: "#7A1E2C", fontSize: 22, marginBottom: 16 }}>✦</div>
          <h1 style={{
            fontFamily: "Libre Baskerville, serif",
            fontSize: 30,
            color: "#1F2933",
            marginBottom: 20,
            lineHeight: 1.3,
          }}>
            Get Your Career Clarity Blueprint™
          </h1>
          <p style={{ color: "#4A5568", fontSize: 16, lineHeight: 1.7, marginBottom: 12 }}>
            Get personalized insight into your career decision based on your natural strengths, decision-making style, and birth data — so you can see which path actually fits how you're built.
          </p>
          <p style={{ color: "#4A5568", fontSize: 16, lineHeight: 1.7, marginBottom: 16 }}>
            Whether you're considering a new job, starting a business, or changing direction entirely, your Career Clarity Blueprint™ helps you see your decision more clearly and understand which direction fits how you're naturally built.
          </p>
          <p style={{ color: "#7A1E2C", fontSize: 14, fontWeight: 600 }}>
            Delivered to your inbox within 1–2 business days.
          </p>
        </div>

        {/* Includes */}
        <div style={{
          background: "#fff",
          border: "1px solid #E6E1D9",
          borderRadius: 12,
          padding: "28px 32px",
          marginBottom: 32,
        }}>
          <p style={{
            fontFamily: "Libre Baskerville, serif",
            fontSize: 15,
            fontWeight: 700,
            color: "#1F2933",
            marginBottom: 16,
          }}>
            Your Blueprint includes
          </p>
          <ul style={{ display: "flex", flexDirection: "column", gap: 12, margin: 0, padding: 0, listStyle: "none" }}>
            {INCLUDES.map((item) => (
              <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <span style={{ color: "#7A1E2C", fontSize: 14, marginTop: 2, flexShrink: 0 }}>✦</span>
                <span style={{ color: "#1F2933", fontSize: 15, lineHeight: 1.6 }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{
            background: "#fff",
            border: "1px solid #E6E1D9",
            borderRadius: 12,
            padding: 32,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}>

            {/* First Name */}
            <div>
              <label style={labelStyle}>First Name *</label>
              <input
                type="text"
                value={form.first_name}
                onChange={set("first_name")}
                placeholder="Your first name"
                style={inputStyle}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label style={labelStyle}>Email Address *</label>
              <input
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder="you@example.com"
                style={inputStyle}
                required
              />
              <p style={helperStyle}>Your Blueprint will be delivered to this address.</p>
            </div>

            {/* Field 1 — The Decision */}
            <div>
              <label style={labelStyle}>What career decision are you facing? *</label>
              <textarea
                value={form.career_question}
                onChange={set("career_question")}
                placeholder={'Describe the exact career decision you\'re facing. Name both options if you can. For example: "Should I leave my 15-year corporate career to consult independently, or stay and go for the director role I\'ve been offered?"'}
                rows={5}
                style={{ ...inputStyle, resize: "vertical", height: "auto" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginTop: 6, gap: 12 }}>
                <p style={{ ...helperStyle, margin: 0, flex: 1 }}>
                  <span style={{ color: "#C0392B" }}>✗ Too vague:</span> &ldquo;What am I best at?&rdquo;&nbsp;&nbsp;
                  <span style={{ color: "#2E7D32" }}>✓ Specific:</span> &ldquo;Should I leave my corporate job to coach full-time, or stay and ask for a promotion?&rdquo; The more specific you are, the more personal your Blueprint will be.
                </p>
                <span style={{
                  fontSize: 12,
                  color: form.career_question.length >= 120 ? "#2E7D32" : "#9AA5B4",
                  flexShrink: 0,
                  fontVariantNumeric: "tabular-nums",
                  whiteSpace: "nowrap",
                }}>
                  {form.career_question.length} / 120
                </span>
              </div>
            </div>

            {/* Field 2 — What's Making It Hard */}
            <div>
              <label style={labelStyle}>What&apos;s making this decision difficult to settle?</label>
              <textarea
                value={form.decision_difficulty}
                onChange={set("decision_difficulty")}
                placeholder={"One or two sentences is enough. For example: \"I've been in this role for 10 years and it pays well, but I dread Monday mornings.\""}
                rows={3}
                style={{ ...inputStyle, resize: "vertical", height: "auto" }}
              />
            </div>

            {/* Birth Details Divider */}
            <div style={{ borderTop: "1px solid #E6E1D9", paddingTop: 24 }}>
              <p style={{ color: "#1F2933", fontSize: 14, fontWeight: 600, marginBottom: 20 }}>
                Add your birth details for a more precise Blueprint.
              </p>

              {/* Date of Birth */}
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Date of Birth *</label>
                <input
                  type="date"
                  value={form.date_of_birth}
                  onChange={set("date_of_birth")}
                  style={inputStyle}
                  required
                />
                <p style={helperStyle}>
                  Your Blueprint is based on your birth data. Please enter your actual date of birth for the most accurate results.
                </p>
              </div>

              {/* Time of Birth */}
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Time of Birth</label>
                <input
                  type="time"
                  value={form.time_of_birth}
                  onChange={set("time_of_birth")}
                  style={inputStyle}
                />
                <p style={helperStyle}>
                  For greater accuracy, include your time of birth if you know it. If not, leave it blank — your Blueprint will still be personalized using your date of birth and location.
                </p>
              </div>

              {/* Location */}
              <div>
                <label style={labelStyle}>City & Country of Birth</label>
                <input
                  type="text"
                  value={form.location_of_birth}
                  onChange={set("location_of_birth")}
                  placeholder="e.g. Newport Beach, CA, USA"
                  style={inputStyle}
                />
                <p style={helperStyle}>
                  Include your city and country if you know it. If not, leave it blank — your Blueprint will still be personalized using your date of birth.
                </p>
              </div>
            </div>

            {error && <InlineError message={error} />}

            <PrimaryButton type="submit" disabled={isLoading || form.career_question.length < 120}>
              {isLoading ? "Redirecting to payment…" : "Get My Blueprint — $47"}
            </PrimaryButton>

            <div style={{ textAlign: "center" }}>
              <p style={{ color: "#4A5568", fontSize: 13, margin: "0 0 4px" }}>
                Secure payment via Stripe.
              </p>
              <p style={{ color: "#4A5568", fontSize: 13, margin: 0 }}>
                Your Career Clarity Blueprint™ arrives within 1–2 business days.
              </p>
            </div>
          </div>
        </form>

        {/* Footer note */}
        <p style={{ textAlign: "center", color: "#4A5568", fontSize: 13, marginTop: 20 }}>
          Each Blueprint is reviewed before delivery.
        </p>

      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 14,
  fontWeight: 600,
  color: "#1F2933",
  marginBottom: 6,
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  border: "1px solid #E6E1D9",
  borderRadius: 8,
  fontSize: 15,
  color: "#1F2933",
  background: "#F7F4EF",
  boxSizing: "border-box",
  outline: "none",
}

const helperStyle: React.CSSProperties = {
  margin: "6px 0 0",
  fontSize: 12,
  color: "#4A5568",
  lineHeight: 1.6,
}
