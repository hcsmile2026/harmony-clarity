"use client"

import { useState, useEffect } from "react"
import {
  AppShell,
  ClarityCard,
  PrimaryButton,
  SecondaryButton,
  CreditsCard,
} from "@/components/hcb"
import { useAuthCheck, getAuthHeaders } from "@/hooks/use-auth-check"

interface UserProfile {
  first_name: string
  birth_date: string
  birth_time_local: string
  birth_city: string
  birth_country: string
}

interface Session {
  id: number
  decision_topic: string
  decision_context: string
  created_at: string
  status: string
  session_status: string
}

export default function DashboardPage() {
  const { isChecking } = useAuthCheck()

  const [firstName, setFirstName] = useState("there")
  const [credits, setCredits] = useState<number | null>(null)
  const [sessions, setSessions] = useState<Session[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState<UserProfile | null>(null)

  // Read first name from localStorage on mount
  useEffect(() => {
    const storedName = localStorage.getItem("hcb_first_name")
    if (storedName) {
      setFirstName(storedName)
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("hcb_token")
      const userId = localStorage.getItem("hcb_user_id")
      
      if (!token) {
        setIsLoading(false)
        return
      }
      
      const headers: HeadersInit = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }

      try {
        const [creditsRes, sessionsRes, profileRes] = await Promise.all([
          fetch(`https://xkyb-0esl-ybtr.n7e.xano.io/api:X8T2HoKo/credits/balance?user_id=${userId}`, {
            headers,
          }),
          fetch(`https://xkyb-0esl-ybtr.n7e.xano.io/api:X8T2HoKo/sessions/list?user_id=${userId}`, {
            headers,
          }),
          fetch(`https://xkyb-0esl-ybtr.n7e.xano.io/api:Px_PC3vf/auth/me?user_id=${userId}`, { headers }),
        ])

        if (creditsRes.ok) {
          const creditsData = await creditsRes.json()
          setCredits(creditsData.credits_remaining ?? 0)
        }

        if (sessionsRes.ok) {
          const sessionsData = await sessionsRes.json()
          // Handle response shape: { sessions: [...] } or direct array
          const sessionsList = sessionsData.sessions || sessionsData
          setSessions(Array.isArray(sessionsList) ? [...sessionsList].sort((a,b)=>b.created_at-a.created_at) : [])
        }
        if (profileRes && profileRes.ok) {
          const pd = await profileRes.json()
          setProfile(pd)
          if (pd.first_name) { setFirstName(pd.first_name); localStorage.setItem("hcb_first_name", pd.first_name) }
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (!isChecking) {
      fetchData()
    }
  }, [isChecking])

  const handleLogout = () => {
    const keysToRemove = [
      "hcb_token",
      "hcb_user_id",
      "hcb_onboarding_done",
      "hcb_session_id",
      "hcb_options",
      "hcb_decision_context",
      "hcb_pressure_q1",
      "hcb_pressure_q2",
      "hcb_pressure_q3",
    ]
    keysToRemove.forEach((key) => localStorage.removeItem(key))
    window.location.href = "/"
  }

  if (isChecking || isLoading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div
            className="animate-spin h-8 w-8 border-2 rounded-full"
            style={{
              borderColor: "var(--hcb-border)",
              borderTopColor: "var(--hcb-action-primary)",
            }}
          />
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <span
          className="text-sm font-medium"
          style={{ color: "var(--hcb-text-secondary)" }}
        >
          Harmony Clarity
        </span>
        <button
          onClick={handleLogout}
          className="text-sm cursor-pointer"
          style={{ color: "var(--hcb-text-secondary)" }}
        >
          Log out
        </button>
      </div>

      {/* Welcome */}
      <h1
        className="font-serif text-[28px] md:text-[32px] mb-6"
        style={{ color: "var(--hcb-text-primary)" }}
      >
        Welcome back, {firstName || "there"}
      </h1>

      {/* Credits Card */}
      <div className="mb-6">
        <CreditsCard credits={credits ?? 0} />
      </div>

      {/* Low Credits Warning */}
      {credits === 0 && (
        <div
          className="rounded-lg p-4 mb-6 flex items-center justify-between flex-wrap gap-4"
          style={{
            backgroundColor: "#FEF3C7",
            border: "1px solid #F59E0B",
          }}
        >
          <span
            className="text-sm font-medium"
            style={{ color: "#92400E" }}
          >
            You have no credits remaining.
          </span>
          <SecondaryButton onClick={() => (window.location.href = "/buy-credits")}>
            Get More Credits
          </SecondaryButton>
        </div>
      )}

      {/* Start New Blueprint */}
      <div className="mb-8">
        <PrimaryButton fullWidth onClick={() => { ["hcb_session_id","hcb_options","hcb_decision_context","hcb_pressure_q1","hcb_pressure_q2","hcb_pressure_q3","hcb_options_draft"].forEach(k => localStorage.removeItem(k)); window.location.href = "/new-blueprint"; }}>Start New Blueprint</PrimaryButton>
      </div>
        <ClarityCard>
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2 flex-1">
              {profile?.birth_date && (
                <div className="flex gap-2 text-sm"><span className="font-medium" style={{ color: "var(--hcb-text-primary)", minWidth: "120px" }}>Date of Birth:</span><span style={{ color: "var(--hcb-text-secondary)" }}>{(() => { const [y,m,d]=profile.birth_date.split("-"); const mn=["January","February","March","April","May","June","July","August","September","October","November","December"]; return `${parseInt(d)} ${mn[parseInt(m)-1]}, ${y}`; })()}</span></div>
              )}
              {profile?.birth_time_local && (
                <div className="flex gap-2 text-sm"><span className="font-medium" style={{ color: "var(--hcb-text-primary)", minWidth: "120px" }}>Time of Birth:</span><span style={{ color: "var(--hcb-text-secondary)" }}>{profile.birth_time_local}</span></div>
              )}
              {(profile?.birth_city || profile?.birth_country) && (
                <div className="flex gap-2 text-sm"><span className="font-medium" style={{ color: "var(--hcb-text-primary)", minWidth: "120px" }}>Location:</span><span style={{ color: "var(--hcb-text-secondary)" }}>{[profile?.birth_city, profile?.birth_country].filter(Boolean).join(", ")}</span></div>
              )}
            </div>
            <button onClick={() => (window.location.href = "/profile")} className="text-sm cursor-pointer shrink-0" style={{ color: "var(--hcb-action-primary)", fontWeight: 500 }}>Edit →</button>
          </div>
        </ClarityCard>
      </div>

      {/* Past Sessions */}
      <div>
        <h2
          className="font-serif text-xl mb-4"
          style={{ color: "var(--hcb-text-primary)" }}
        >
          Past Blueprints
        </h2>

        {sessions.length === 0 ? (
          <ClarityCard>
            <p
              className="text-center py-4"
              style={{ color: "var(--hcb-text-secondary)" }}
            >
              You haven&apos;t created any Blueprints yet.
            </p>
          </ClarityCard>
        ) : (
          <div className="flex flex-col gap-3">
            {sessions.map((session) => (
              <div key={session.id} onClick={function(){window.location.href="/view-blueprint?session="+session.id}} style={{cursor:"pointer"}}><ClarityCard>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-base font-medium truncate"
                      style={{ color: "var(--hcb-text-primary)" }}
                    >
                      {session.decision_topic || session.decision_context || "Untitled Decision"}
                    </p>
                    <p
                      className="text-sm mt-1"
                      style={{ color: "var(--hcb-text-secondary)" }}
                    >
                      {new Date(session.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                  {(session.session_status || session.status) === "closed" && <span className="text-xs font-medium mr-2" style={{ color: "var(--hcb-action-primary)" }}>View u2192</span>}
                    className="text-xs px-2 py-1 rounded"
                    style={{
                      backgroundColor:
                        (session.session_status || session.status) === "closed"
                          ? "#D1FAE5"
                          : "var(--hcb-bg)",
                      color:
                        (session.session_status || session.status) === "closed"
                          ? "#065F46"
                          : "var(--hcb-text-secondary)",
                    }}
                  >
                    {(session.session_status || session.status) === "closed" ? "Completed" : "Draft"}
                  </span>
                </div>
              </ClarityCard></div>
            ))}
          </div>
        )}
      </div>

      {/* Buy Credits Link */}
      <div className="mt-6 text-center">
        <button
          onClick={() => (window.location.href = "/buy-credits")}
          className="text-sm cursor-pointer"
          style={{ color: "var(--hcb-action-secondary)" }}
        >
          Need more credits? Buy Credits &rarr;
        </button>
      </div>
    </AppShell>
  )
}
