"use client"

import { useState } from "react"
import { PrimaryButton, InlineError } from "@/components/hcb"

const XANO = "https://xkyb-0esl-ybtr.n7e.xano.io/api:lsRTcA3V"

export default function OrderPage() {
  const [form, setForm] = useState({
    first_name: "",
    email: "",
    date_of_birth: "",
    time_of_birth: "",
    location_of_birth: "",
    career_question: "",
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
    if (!form.career_question.trim()) return setError("Please describe your career question.")

    setIsLoading(true)
    try {
      const res = await fetch(`${XANO}/orders/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "48px 24px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ color: "#7A1E2C", fontSize: 22, marginBottom: 12 }}>✦</div>
          <h1 style={{
            fontFamily: "Libre Baskerville, serif",
            fontSize: 28,
            color: "#1F2933",
            marginBottom: 12,
            lineHeight: 1.3,
          }}>
            Get Your Career Clarity Blueprint
          </h1>
          <p style={{ color: "#4A5568", fontSize: 16, lineHeight: 1.6 }}>
            Answer a few questions and receive a personalised AI-powered Blueprint
            for your career decision — delivered to your inbox within 24 hours.
          </p>
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
            gap: 20,
          }}>
            {/* Name */}
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
            </div>

            {/* Career Question */}
            <div>
              <label style={labelStyle}>Your Career Question *</label>
              <p style={{ color: "#4A5568", fontSize: 13, marginBottom: 8 }}>
                Describe your career situation or the decision you are facing.
              </p>
              <textarea
                value={form.career_question}
                onChange={set("career_question")}
                placeholder="e.g. Should I leave my corporate job to start my own consulting business?"
                rows={4}
                style={{ ...inputStyle, resize: "vertical", height: "auto" }}
                required
              />
            </div>

            {/* Divider */}
            <div style={{ borderTop: "1px solid #E6E1D9", paddingTop: 20 }}>
              <p style={{ color: "#4A5568", fontSize: 13, marginBottom: 16 }}>
                <strong style={{ color: "#1F2933" }}>Optional:</strong> Add your birth details for deeper personalisation.
              </p>

              {/* Date of Birth */}
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Date of Birth</label>
                <input
                  type="date"
                  value={form.date_of_birth}
                  onChange={set("date_of_birth")}
                  style={inputStyle}
                />
              </div>

              {/* Time of Birth */}
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Time of Birth</label>
                <input
                  type="time"
                  value={form.time_of_birth}
                  onChange={set("time_of_birth")}
                  style={inputStyle}
                />
              </div>

              {/* Location */}
              <div>
                <label style={labelStyle}>City & Country of Birth</label>
                <input
                  type="text"
                  value={form.location_of_birth}
                  onChange={set("location_of_birth")}
                  placeholder="e.g. Phnom Penh, Cambodia"
                  style={inputStyle}
                />
              </div>
            </div>

            {error && <InlineError message={error} />}

            <PrimaryButton type="submit" disabled={isLoading}>
              {isLoading ? "Redirecting to payment…" : "Get My Blueprint — $47"}
            </PrimaryButton>

            <p style={{ color: "#4A5568", fontSize: 12, textAlign: "center", margin: 0 }}>
              Secure payment via Stripe. Your Blueprint arrives within 24 hours.
            </p>
          </div>
        </form>
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
