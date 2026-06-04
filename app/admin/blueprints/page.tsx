"use client"

import { useEffect, useState } from "react"
import { useAuthCheck } from "@/hooks/use-auth-check"

const XANO = "https://xkyb-0esl-ybtr.n7e.xano.io/api:lsRTcA3V"

interface BlueprintItem {
  blueprint_id: number
  order_id: number
  blueprint_text: string
  attempt_number: number
  created_at: string
  first_name: string
  email: string
  career_question: string
  date_of_birth: string
  time_of_birth: string
  location: string
}

export default function AdminBlueprintsPage() {
  useAuthCheck()

  const [items, setItems] = useState<BlueprintItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeId, setActiveId] = useState<number | null>(null)
  const [actionLoading, setActionLoading] = useState<number | null>(null)
  const [toast, setToast] = useState("")

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${XANO}/admin/pending-blueprints`)
      const data = await res.json()
      if (data.success) setItems(data.items || [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(""), 3500)
  }

  const handleApprove = async (id: number) => {
    setActionLoading(id)
    try {
      const res = await fetch(`${XANO}/blueprints/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blueprint_id: id }),
      })
      const data = await res.json()
      if (data.success) {
        showToast(`Approved and sent to customer.`)
        setActiveId(null)
        setItems((prev) => prev.filter((i) => i.blueprint_id !== id))
      } else {
        showToast("Approval failed. Try again.")
      }
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async (id: number) => {
    setActionLoading(id)
    try {
      const res = await fetch(`${XANO}/blueprints/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blueprint_id: id }),
      })
      const data = await res.json()
      if (data.success) {
        showToast("Rejected. New Blueprint is generating…")
        setActiveId(null)
        setItems((prev) => prev.filter((i) => i.blueprint_id !== id))
        setTimeout(load, 8000)
      } else {
        showToast("Rejection failed. Try again.")
      }
    } finally {
      setActionLoading(null)
    }
  }

  const active = items.find((i) => i.blueprint_id === activeId)

  return (
    <div style={{ background: "#F7F4EF", minHeight: "100vh" }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)",
          background: "#1F2933", color: "#fff", padding: "12px 24px",
          borderRadius: 8, zIndex: 100, fontSize: 14,
        }}>
          {toast}
        </div>
      )}

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <div>
            <div style={{ color: "#7A1E2C", fontSize: 18, marginBottom: 4 }}>✦</div>
            <h1 style={{ fontFamily: "Libre Baskerville, serif", fontSize: 24, color: "#1F2933", margin: 0 }}>
              Blueprint Review Queue
            </h1>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{
              background: items.length > 0 ? "#7A1E2C" : "#E6E1D9",
              color: items.length > 0 ? "#fff" : "#4A5568",
              borderRadius: 20, padding: "4px 12px", fontSize: 13, fontWeight: 600,
            }}>
              {items.length} pending
            </span>
            <button onClick={load} style={{
              background: "none", border: "1px solid #E6E1D9", borderRadius: 8,
              padding: "8px 16px", fontSize: 13, color: "#4A5568", cursor: "pointer",
            }}>
              Refresh
            </button>
          </div>
        </div>

        {loading ? (
          <p style={{ color: "#4A5568" }}>Loading…</p>
        ) : items.length === 0 ? (
          <div style={{
            background: "#fff", border: "1px solid #E6E1D9", borderRadius: 12,
            padding: "48px 32px", textAlign: "center",
          }}>
            <div style={{ color: "#7A1E2C", fontSize: 24, marginBottom: 12 }}>✦</div>
            <p style={{ color: "#4A5568", fontSize: 16 }}>No Blueprints pending review.</p>
          </div>
        ) : (
          <div style={{ display: "flex", gap: 24 }}>
            {/* List */}
            <div style={{ width: 280, flexShrink: 0 }}>
              {items.map((item) => (
                <div
                  key={item.blueprint_id}
                  onClick={() => setActiveId(item.blueprint_id)}
                  style={{
                    background: activeId === item.blueprint_id ? "#fff" : "#FDFBF8",
                    border: `1px solid ${activeId === item.blueprint_id ? "#7A1E2C" : "#E6E1D9"}`,
                    borderRadius: 10,
                    padding: "16px 18px",
                    marginBottom: 10,
                    cursor: "pointer",
                  }}
                >
                  <p style={{ margin: 0, fontWeight: 600, color: "#1F2933", fontSize: 15 }}>
                    {item.first_name || "Unknown"}
                  </p>
                  <p style={{ margin: "2px 0 0", color: "#4A5568", fontSize: 13 }}>{item.email}</p>
                  {item.attempt_number > 1 && (
                    <span style={{
                      display: "inline-block", marginTop: 6,
                      background: "#FFF3CD", color: "#856404",
                      fontSize: 11, padding: "2px 8px", borderRadius: 4,
                    }}>
                      Attempt {item.attempt_number}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Detail */}
            {active ? (
              <div style={{ flex: 1 }}>
                <div style={{
                  background: "#fff", border: "1px solid #E6E1D9",
                  borderRadius: 12, padding: 28, marginBottom: 16,
                }}>
                  <p style={{ margin: "0 0 4px", fontWeight: 600, color: "#1F2933" }}>
                    {active.first_name} — {active.email}
                  </p>
                  <p style={{ margin: "0 0 12px", color: "#4A5568", fontSize: 13 }}>
                    {[active.date_of_birth, active.time_of_birth, active.location].filter(Boolean).join(" · ")}
                  </p>
                  <div style={{
                    background: "#F7F4EF", borderRadius: 8,
                    padding: "12px 16px", marginBottom: 16,
                  }}>
                    <p style={{ margin: 0, color: "#4A5568", fontSize: 13, fontStyle: "italic" }}>
                      "{active.career_question}"
                    </p>
                  </div>
                  <div style={{
                    maxHeight: 480, overflowY: "auto",
                    border: "1px solid #E6E1D9", borderRadius: 8, padding: 20,
                    fontSize: 14, color: "#1F2933", lineHeight: 1.8,
                    whiteSpace: "pre-wrap",
                  }}>
                    {active.blueprint_text}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    onClick={() => handleApprove(active.blueprint_id)}
                    disabled={actionLoading === active.blueprint_id}
                    style={{
                      flex: 1, padding: "14px 0",
                      background: "#7A1E2C", color: "#fff",
                      border: "none", borderRadius: 8,
                      fontSize: 15, fontWeight: 600, cursor: "pointer",
                    }}
                  >
                    {actionLoading === active.blueprint_id ? "Processing…" : "Approve & Send to Customer"}
                  </button>
                  <button
                    onClick={() => handleReject(active.blueprint_id)}
                    disabled={actionLoading === active.blueprint_id}
                    style={{
                      padding: "14px 20px",
                      background: "#fff", color: "#4A5568",
                      border: "1px solid #E6E1D9", borderRadius: 8,
                      fontSize: 15, cursor: "pointer",
                    }}
                  >
                    Reject & Regenerate
                  </button>
                </div>
              </div>
            ) : (
              <div style={{
                flex: 1, background: "#fff", border: "1px solid #E6E1D9",
                borderRadius: 12, padding: 40, textAlign: "center",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <p style={{ color: "#4A5568" }}>Select a Blueprint to review.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
