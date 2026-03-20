"use client"
import { useState, useEffect } from "react"
import { AppShell, ClarityCard, PrimaryButton, SecondaryButton, InlineError } from "@/components/hcb"
import { useAuthCheck, getAuthHeaders } from "@/hooks/use-auth-check"

export default function ProfilePage() {
  const { isChecking } = useAuthCheck()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [birthTime, setBirthTime] = useState("")
  const [birthTimeUnknown, setBirthTimeUnknown] = useState(false)
  const [birthCity, setBirthCity] = useState("")
  const [birthCountry, setBirthCountry] = useState("")

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("hcb_token")
      if (!token) { setIsLoading(false); return }
      try {
        const res = await fetch("https://xkyb-0esl-ybtr.n7e.xano.io/api:Px_PC3vf/auth/me", {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        })
        if (res.ok) {
          const d = await res.json()
          setFirstName(d.first_name || "")
          setBirthDate(d.birth_date || "")
          setBirthTime(d.birth_time_local || "")
          setBirthTimeUnknown(!d.birth_time_local)
          setBirthCity(d.birth_city || "")
          setBirthCountry(d.birth_country || "")
        }
      } catch(e) { console.error(e) } finally { setIsLoading(false) }
    }
    if (!isChecking) fetchProfile()
  }, [isChecking])

  const handleSave = async () => {
    setError(""); setSuccess(false); setIsSaving(true)
    try {
      const res = await fetch("https://xkyb-0esl-ybtr.n7e.xano.io/api:Px_PC3vf/profile/update", {
        method: "POST", headers: getAuthHeaders(),
        body: JSON.stringify({
          user_id: Number(localStorage.getItem("hcb_user_id")),
          first_name: firstName, birth_date: birthDate,
          birth_time_local: birthTimeUnknown ? null : birthTime || null,
          birth_time_known: !birthTimeUnknown && !!birthTime,
          birth_city: birthCity, birth_country: birthCountry,
          birth_location_label: `${birthCity}, ${birthCountry}`,
        }),
      })
      const d = await res.json()
      if (!res.ok) throw new Error(d.message || "Failed")
      localStorage.setItem("hcb_first_name", firstName)
      setSuccess(true)
      setTimeout(() => { window.location.href = "/dashboard" }, 1500)
    } catch(e) { setError(e instanceof Error ? e.message : "Something went wrong") }
    finally { setIsSaving(false) }
  }

  const s = { padding:"14px 16px", fontSize:"16px", borderRadius:"10px", border:"1px solid var(--hcb-border)", backgroundColor:"var(--hcb-card-bg)", color:"var(--hcb-text-primary)", outline:"none", width:"100%" }

  if (isChecking || isLoading) return (
    <AppShell><div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin h-8 w-8 border-2 rounded-full" style={{ borderColor:"var(--hcb-border)", borderTopColor:"var(--hcb-action-primary)" }} />
    </div></AppShell>
  )

  return (
    <AppShell>
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => (window.location.href="/dashboard")} className="text-sm cursor-pointer" style={{ color:"var(--hcb-text-secondary)" }}>← Back to Dashboard</button>
      </div>
      <h1 className="font-serif text-[28px] md:text-[32px] mb-2" style={{ color:"var(--hcb-text-primary)" }}>Edit Profile</h1>
      <p className="text-base mb-6" style={{ color:"var(--hcb-text-secondary)" }}>Update your birth information. This affects your Blueprint calculations.</p>
      <ClarityCard>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" style={{ color:"var(--hcb-text-primary)" }}>First Name</label>
            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Your first name" style={s} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" style={{ color:"var(--hcb-text-primary)" }}>Date of Birth</label>
            <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} style={s} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" style={{ color:"var(--hcb-text-primary)" }}>Time of Birth</label>
            <input type="time" value={birthTime} onChange={e => setBirthTime(e.target.value)} disabled={birthTimeUnknown} style={{ ...s, opacity: birthTimeUnknown ? 0.5 : 1 }} />
            <label className="flex items-center gap-3 cursor-pointer mt-1">
              <input type="checkbox" checked={birthTimeUnknown} onChange={e => { setBirthTimeUnknown(e.target.checked); if(e.target.checked) setBirthTime("") }} style={{ width:"20px", height:"20px", accentColor:"var(--hcb-action-primary)", cursor:"pointer" }} />
              <span className="text-sm" style={{ color:"var(--hcb-text-secondary)" }}>I don't know my exact birth time</span>
            </label>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" style={{ color:"var(--hcb-text-primary)" }}>Birth City</label>
            <input type="text" value={birthCity} onChange={e => setBirthCity(e.target.value)} placeholder="City where you were born" style={s} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" style={{ color:"var(--hcb-text-primary)" }}>Birth Country</label>
            <input type="text" value={birthCountry} onChange={e => setBirthCountry(e.target.value)} placeholder="Country where you were born" style={s} />
          </div>
          {error && <InlineError message={error} />}
          {success && <p className="text-sm text-center font-medium" style={{ color:"#065F46" }}>✓ Profile updated! Redirecting...</p>}
          <PrimaryButton fullWidth onClick={handleSave} isLoading={isSaving}>Save Changes</PrimaryButton>
          <SecondaryButton fullWidth onClick={() => (window.location.href="/dashboard")}>Cancel</SecondaryButton>
        </div>
      </ClarityCard>
    </AppShell>
  )
}