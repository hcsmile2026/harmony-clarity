"use client"

import { useState } from "react"

// 👇 Paste your GHL webhook URL here
const GHL_WEBHOOK_URL = "YOUR_GHL_WEBHOOK_URL_HERE"

export default function BlueprintLandingPage() {
  const [firstName, setFirstName] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const isValid = firstName.trim().length > 0 && email.trim().includes("@")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    try {
      await fetch(GHL_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ first_name: firstName, email }),
      })
      setSubmitted(true)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "1px solid #E6E1D9",
    backgroundColor: "#FFFFFF",
    color: "#1F2933",
    outline: "none",
    fontFamily: "var(--font-inter, sans-serif)",
    boxSizing: "border-box",
  }

  return (
    <div style={{ backgroundColor: "#F7F4EF", minHeight: "100vh", padding: "0 0 64px 0" }}>

      {/* Top bar */}
      <div style={{ backgroundColor: "#F7F4EF", borderBottom: "1px solid #E6E1D9", padding: "16px 24px", textAlign: "center" }}>
        <span style={{ color: "#7A1E2C", fontSize: "20px" }}>✦</span>
        <span style={{ marginLeft: "10px", fontFamily: "var(--font-libre-baskerville, serif)", fontSize: "15px", color: "#1F2933", letterSpacing: "0.02em" }}>
          Harmony Clarity
        </span>
      </div>

      <div style={{ maxWidth: "560px", margin: "0 auto", padding: "0 24px" }}>

        {/* Hero */}
        <div style={{ textAlign: "center", padding: "64px 0 48px" }}>
          <div style={{ color: "#7A1E2C", fontSize: "28px", marginBottom: "28px" }}>✦</div>
          <h1 style={{
            fontFamily: "var(--font-libre-baskerville, Georgia, serif)",
            fontSize: "clamp(26px, 6vw, 38px)",
            fontWeight: 700,
            color: "#1F2933",
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
            marginBottom: "20px",
          }}>
            The 3 Questions That Actually Settle a Decision
          </h1>
          <p style={{
            fontFamily: "var(--font-inter, sans-serif)",
            fontSize: "18px",
            color: "#7A1E2C",
            fontStyle: "italic",
            fontFamily: "var(--font-libre-baskerville, serif)",
            margin: 0,
          }}>
            When everything else keeps you circling
          </p>
        </div>

        {/* Divider */}
        <div style={{ width: "40px", height: "1px", backgroundColor: "#E6E1D9", margin: "0 auto 48px" }} />

        {/* Opening */}
        <div style={{ marginBottom: "48px" }}>
          {[
            "You're not confused.",
            "You've already done the thinking.",
            "You know the options.",
            "You've weighed both sides.",
          ].map((line) => (
            <p key={line} style={{
              fontFamily: "var(--font-libre-baskerville, serif)",
              fontSize: "19px",
              color: "#1F2933",
              lineHeight: 1.6,
              marginBottom: "6px",
            }}>
              {line}
            </p>
          ))}

          <p style={{
            fontFamily: "var(--font-inter, sans-serif)",
            fontSize: "17px",
            color: "#4A5568",
            lineHeight: 1.8,
            marginTop: "24px",
            marginBottom: "16px",
          }}>
            What you don&apos;t have is clarity strong enough to commit.
          </p>
          <p style={{
            fontFamily: "var(--font-inter, sans-serif)",
            fontSize: "17px",
            color: "#4A5568",
            lineHeight: 1.8,
            marginBottom: "16px",
          }}>
            That&apos;s not a thinking problem. That&apos;s a decision problem.
          </p>
          <p style={{
            fontFamily: "var(--font-inter, sans-serif)",
            fontSize: "17px",
            color: "#4A5568",
            lineHeight: 1.8,
            marginBottom: "0",
          }}>
            Most decision frameworks add more to consider. These 3 questions do the opposite — they cut through everything and show you what actually matters.
          </p>
        </div>

        {/* Divider */}
        <div style={{ width: "40px", height: "1px", backgroundColor: "#E6E1D9", margin: "0 auto 48px" }} />

        {/* Credibility */}
        <div style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E6E1D9",
          borderLeft: "3px solid #7A1E2C",
          borderRadius: "0 12px 12px 0",
          padding: "28px 32px",
          marginBottom: "48px",
        }}>
          <p style={{
            fontFamily: "var(--font-libre-baskerville, serif)",
            fontStyle: "italic",
            fontSize: "17px",
            color: "#1F2933",
            lineHeight: 1.8,
            margin: 0,
          }}>
            These questions come from someone who learned decision clarity at 5 years old — when there was no time to overthink and no room for wrong moves. They&apos;re survival-tested. They cut through. They work.
          </p>
        </div>

        {/* Form */}
        {submitted ? (
          <div style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E6E1D9",
            borderRadius: "16px",
            padding: "40px 32px",
            textAlign: "center",
            boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
            marginBottom: "48px",
          }}>
            <div style={{ color: "#7A1E2C", fontSize: "32px", marginBottom: "16px" }}>✦</div>
            <h2 style={{
              fontFamily: "var(--font-libre-baskerville, serif)",
              fontSize: "22px",
              color: "#1F2933",
              marginBottom: "12px",
            }}>
              Check your inbox.
            </h2>
            <p style={{
              fontFamily: "var(--font-inter, sans-serif)",
              fontSize: "16px",
              color: "#4A5568",
              margin: 0,
            }}>
              The 3 questions are on their way to {email}.
            </p>
          </div>
        ) : (
          <div style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E6E1D9",
            borderRadius: "16px",
            padding: "40px 32px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
            marginBottom: "48px",
          }}>
            <h2 style={{
              fontFamily: "var(--font-libre-baskerville, serif)",
              fontSize: "20px",
              color: "#1F2933",
              marginBottom: "8px",
              textAlign: "center",
            }}>
              Get the 3 questions now.
            </h2>
            <p style={{
              fontFamily: "var(--font-inter, sans-serif)",
              fontSize: "15px",
              color: "#9AA5B4",
              textAlign: "center",
              marginBottom: "28px",
            }}>
              Enter your details below for immediate access.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                style={inputStyle}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#7A1E2C"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(122,30,44,0.12)" }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "#E6E1D9"; e.currentTarget.style.boxShadow = "none" }}
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyle}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#7A1E2C"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(122,30,44,0.12)" }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "#E6E1D9"; e.currentTarget.style.boxShadow = "none" }}
              />

              {error && (
                <p style={{ color: "#7A1E2C", fontSize: "14px", margin: 0 }}>{error}</p>
              )}

              <button
                type="submit"
                disabled={!isValid || isLoading}
                style={{
                  backgroundColor: isValid ? "#7A1E2C" : "#C4B8B8",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-inter, sans-serif)",
                  fontWeight: 600,
                  fontSize: "17px",
                  border: "none",
                  borderRadius: "12px",
                  padding: "18px 32px",
                  cursor: isValid ? "pointer" : "not-allowed",
                  boxShadow: isValid ? "0 4px 20px rgba(122,30,44,0.25)" : "none",
                  transition: "all 0.2s ease",
                  marginTop: "6px",
                }}
              >
                {isLoading ? "Sending…" : "Get The 3 Questions Now →"}
              </button>
            </form>
          </div>
        )}

        {/* What's Inside */}
        <div style={{ marginBottom: "48px" }}>
          <p style={{
            fontFamily: "var(--font-inter, sans-serif)",
            fontSize: "13px",
            fontWeight: 600,
            color: "#9AA5B4",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "20px",
            textAlign: "center",
          }}>
            Inside this guide
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { name: "The Coffin Test", desc: "What would your soul still ache to experience?" },
              { name: "The Energy Test", desc: "What would make you excited for Monday morning?" },
              { name: "The Fear Test", desc: "What scares you but makes you come alive?" },
            ].map((item) => (
              <div key={item.name} style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E6E1D9",
                borderRadius: "12px",
                padding: "20px 24px",
                display: "flex",
                gap: "16px",
                alignItems: "flex-start",
              }}>
                <span style={{ color: "#7A1E2C", fontSize: "14px", marginTop: "2px", flexShrink: 0 }}>✦</span>
                <div>
                  <p style={{
                    fontFamily: "var(--font-libre-baskerville, serif)",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#1F2933",
                    margin: "0 0 4px",
                  }}>
                    {item.name}
                  </p>
                  <p style={{
                    fontFamily: "var(--font-inter, sans-serif)",
                    fontSize: "15px",
                    color: "#4A5568",
                    margin: 0,
                    lineHeight: 1.6,
                  }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p style={{
            fontFamily: "var(--font-inter, sans-serif)",
            fontSize: "15px",
            color: "#4A5568",
            textAlign: "center",
            marginTop: "20px",
            lineHeight: 1.7,
          }}>
            Plus: How to use all three together to see which path actually holds.
          </p>
        </div>

        {/* Divider */}
        <div style={{ width: "40px", height: "1px", backgroundColor: "#E6E1D9", margin: "0 auto 32px" }} />

        {/* Footer tagline */}
        <p style={{
          fontFamily: "var(--font-libre-baskerville, serif)",
          fontStyle: "italic",
          fontSize: "16px",
          color: "#1F2933",
          textAlign: "center",
          lineHeight: 1.7,
          marginBottom: "24px",
        }}>
          No fluff. No theory.<br />
          Just what cuts through when nothing else does.
        </p>

        {/* Footer links */}
        <p style={{
          fontFamily: "var(--font-inter, sans-serif)",
          fontSize: "13px",
          color: "#9AA5B4",
          textAlign: "center",
        }}>
          <a href="/privacy" style={{ color: "#9AA5B4", textDecoration: "none" }}>Privacy Policy</a>
          <span style={{ margin: "0 8px" }}>|</span>
          <a href="/terms" style={{ color: "#9AA5B4", textDecoration: "none" }}>Terms of Service</a>
        </p>

      </div>
    </div>
  )
}
