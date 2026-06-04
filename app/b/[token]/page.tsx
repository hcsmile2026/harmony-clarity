"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

const XANO = "https://xkyb-0esl-ybtr.n7e.xano.io/api:lsRTcA3V"

interface BlueprintData {
  blueprint_text: string
  first_name: string
  created_at: string
}

export default function BlueprintViewPage() {
  const params = useParams()
  const token = params?.token as string

  const [blueprint, setBlueprint] = useState<BlueprintData | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) return
    fetch(`${XANO}/blueprints/view/${token}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setBlueprint(data)
        } else {
          setError(data.message || "Blueprint not found.")
        }
      })
      .catch(() => setError("Could not load your Blueprint. Please try again."))
      .finally(() => setLoading(false))
  }, [token])

  if (loading) {
    return (
      <div style={centerStyle}>
        <div style={{ color: "#7A1E2C", fontSize: 28, marginBottom: 16 }}>✦</div>
        <p style={{ color: "#4A5568" }}>Loading your Blueprint…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={centerStyle}>
        <div style={{ color: "#7A1E2C", fontSize: 28, marginBottom: 16 }}>✦</div>
        <p style={{ color: "#4A5568", maxWidth: 400, textAlign: "center" }}>{error}</p>
        <p style={{ color: "#4A5568", fontSize: 14, marginTop: 12 }}>
          If you believe this is an error, contact{" "}
          <a href="mailto:support@harmonyclarity.com" style={{ color: "#7A1E2C" }}>
            support@harmonyclarity.com
          </a>
        </p>
      </div>
    )
  }

  if (!blueprint) return null

  // Render markdown-style text as HTML
  const renderBlueprint = (text: string) => {
    return text
      .split("\n")
      .map((line, i) => {
        if (line.startsWith("## ")) {
          return (
            <h2 key={i} style={{
              fontFamily: "Libre Baskerville, serif",
              fontSize: 20,
              color: "#7A1E2C",
              marginTop: 32,
              marginBottom: 12,
              borderBottom: "1px solid #E6E1D9",
              paddingBottom: 8,
            }}>
              {line.replace("## ", "")}
            </h2>
          )
        }
        if (line.startsWith("**") && line.endsWith("**")) {
          return (
            <p key={i} style={{ fontWeight: 700, color: "#1F2933", margin: "16px 0 4px" }}>
              {line.replace(/\*\*/g, "")}
            </p>
          )
        }
        if (line.startsWith("- ")) {
          return (
            <li key={i} style={{ color: "#1F2933", lineHeight: 1.7, marginLeft: 20 }}>
              {line.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "$1")}
            </li>
          )
        }
        if (line.startsWith("---")) {
          return <hr key={i} style={{ border: "none", borderTop: "1px solid #E6E1D9", margin: "24px 0" }} />
        }
        if (line.startsWith("*") && line.endsWith("*") && !line.startsWith("**")) {
          return (
            <p key={i} style={{ color: "#4A5568", fontSize: 13, fontStyle: "italic", margin: "8px 0" }}>
              {line.replace(/\*/g, "")}
            </p>
          )
        }
        if (line.trim() === "") return <br key={i} />

        // Handle inline bold within paragraph
        const parts = line.split(/(\*\*[^*]+\*\*)/)
        return (
          <p key={i} style={{ color: "#1F2933", lineHeight: 1.8, margin: "6px 0" }}>
            {parts.map((part, j) =>
              part.startsWith("**") && part.endsWith("**")
                ? <strong key={j}>{part.replace(/\*\*/g, "")}</strong>
                : part
            )}
          </p>
        )
      })
  }

  return (
    <div style={{ background: "#F7F4EF", minHeight: "100vh" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 80px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ color: "#7A1E2C", fontSize: 22, marginBottom: 12 }}>✦</div>
          <h1 style={{
            fontFamily: "Libre Baskerville, serif",
            fontSize: 26,
            color: "#1F2933",
            marginBottom: 8,
          }}>
            Career Clarity Blueprint
          </h1>
          {blueprint.first_name && (
            <p style={{ color: "#4A5568", fontSize: 15 }}>Prepared for {blueprint.first_name}</p>
          )}
        </div>

        {/* Blueprint content */}
        <div style={{
          background: "#fff",
          border: "1px solid #E6E1D9",
          borderRadius: 12,
          padding: "40px 40px",
        }}>
          {renderBlueprint(blueprint.blueprint_text)}
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <p style={{ color: "#4A5568", fontSize: 13 }}>
            Harmony Clarity Blueprint™ — For reflective purposes only.
          </p>
          <p style={{ color: "#4A5568", fontSize: 13 }}>
            Questions?{" "}
            <a href="mailto:support@harmonyclarity.com" style={{ color: "#7A1E2C" }}>
              support@harmonyclarity.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

const centerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  background: "#F7F4EF",
  padding: 24,
}
