"use client"

import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import { AppShell, PrimaryButton, SecondaryButton, InlineError } from "@/components/hcb"
import { useAuthCheck } from "@/hooks/use-auth-check"

export default function ViewBlueprintPage() {
  const { isChecking } = useAuthCheck()
  const [reflection, setReflection] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [sessionId, setSessionId] = useState("")

  useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    setSessionId(p.get("session") || "")
  }, [])

  useEffect(() => {
    if (isChecking || sessionId === "") return
    const run = async () => {
      const token = localStorage.getItem("hcb_token")
      try {
        const res = await fetch("https://xkyb-0esl-ybtr.n7e.xano.io/api:X8T2HoKo/reflections/list?session_id=" + sessionId, { headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token } })
        const data = await res.json()
        const r = (data.reflections || []).find((x: any) => x.reflection_type === "ai_generated")
        if (r && r.reflection_text) { setReflection(r.reflection_text) } else { setError("No blueprint found for this session.") }
      } catch { setError("Something went wrong.") }
      finally { setIsLoading(false) }
    }
    run()
  }, [isChecking, sessionId])

  if (isChecking || isLoading) return (<AppShell><div className="flex items-center justify-center min-h-[60vh]"><div className="animate-spin h-8 w-8 border-2 rounded-full" style={{ borderColor: "var(--hcb-border)", borderTopColor: "var(--hcb-action-primary)" }} /></div></AppShell>)
  if (error) return (<AppShell><div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6"><InlineError message={error} /><SecondaryButton onClick={() => (window.location.href = "/dashboard")}>Back to Dashboard</SecondaryButton></div></AppShell>)

  return (
    <>
      <AppShell>
        <div className="flex items-center justify-between mb-6 no-print">
          <button onClick={() => (window.location.href = "/dashboard")} className="text-sm cursor-pointer" style={{ color: "var(--hcb-action-primary)", fontWeight: 500 }}>Back to Dashboard</button>
          <button onClick={() => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([reflection], { type: "text/plain" })); a.download = "blueprint.txt"; a.click() }} className="text-sm cursor-pointer" style={{ color: "var(--hcb-text-secondary)" }}>Download as Text</button>
        </div>
        <h1 className="font-serif text-[28px] text-center mb-2" style={{ color: "var(--hcb-text-primary)" }}>Your Blueprint</h1>
        <p className="text-base text-center mb-8" style={{ color: "var(--hcb-text-secondary)" }}>Your past clarity blueprint</p>
        {reflection && (<div className="rounded-[14px] p-6 prose prose-slate max-w-none" style={{ backgroundColor: "var(--hcb-card-bg)", border: "1px solid var(--hcb-border-card)", color: "var(--hcb-text-primary)" }}><ReactMarkdown>{reflection}</ReactMarkdown></div>)}
        <div className="flex flex-col gap-3 mt-8 no-print">
          <PrimaryButton fullWidth onClick={() => window.print()}>Save to PDF</PrimaryButton>
          <SecondaryButton fullWidth onClick={() => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([reflection], { type: "text/plain" })); a.download = "blueprint.txt"; a.click() }}>Download as Text</SecondaryButton>
          <SecondaryButton fullWidth onClick={() => (window.location.href = "/dashboard")}>Back to Dashboard</SecondaryButton>
        </div>
        <p className="text-[13px] text-center mt-8 no-print" style={{ color: "var(--hcb-text-secondary)" }}>This Blueprint is for reflective and educational purposes only.</p>
      </AppShell>
    </>
  )
}
