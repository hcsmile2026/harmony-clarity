"use client"

import { useState } from "react"
import { AppShell, ClarityCard, PrimaryButton, InlineError } from "@/components/hcb"

type AuthMode = "login" | "signup"

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const endpoint =
      mode === "login"
        ? "https://xkyb-0esl-ybtr.n7e.xano.io/api:Px_PC3vf/auth/login"
        : "https://xkyb-0esl-ybtr.n7e.xano.io/api:Px_PC3vf/auth/signup"

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed")
      }

      // Store auth data
      console.log("[v0] Login response data:", JSON.stringify(data))
      localStorage.setItem("hcb_token", data.authToken)
      
      // Handle user data - check if user object exists
      if (data.user) {
        console.log("[v0] User object found:", data.user)
        localStorage.setItem("hcb_user_id", String(data.user.id))
        localStorage.setItem("hcb_first_name", data.user.first_name || "")
      } else {
        console.log("[v0] No user object in response, checking top-level id")
        // Fallback: try top-level properties
        if (data.id) {
          localStorage.setItem("hcb_user_id", String(data.id))
        }
        if (data.first_name) {
          localStorage.setItem("hcb_first_name", data.first_name)
        }
      }
      
      console.log("[v0] Saved to localStorage - user_id:", localStorage.getItem("hcb_user_id"), "first_name:", localStorage.getItem("hcb_first_name"))

      // Redirect based on profile completion
      const profileComplete = data.profile_complete === true || data.user?.profile_complete === true
      if (mode === "login" && profileComplete) {
        console.log("[v0] Redirecting to dashboard")
        window.location.href = "/dashboard"
      } else {
        console.log("[v0] Redirecting to onboarding")
        window.location.href = "/onboarding"
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AppShell maxWidth="sm">
      <div className="flex flex-col items-center">
        {/* Logo */}
        <div
          className="text-3xl mb-4"
          style={{ color: "var(--hcb-action-primary)" }}
        >
          &#10022;
        </div>

        {/* Title */}
        <h1
          className="font-serif text-[32px] text-center mb-2"
          style={{ color: "var(--hcb-text-primary)" }}
        >
          Harmony Clarity Blueprint
        </h1>
        <p
          className="text-base mb-8"
          style={{ color: "var(--hcb-text-secondary)" }}
        >
          Clarity for your most important decisions
        </p>

        {/* Auth Card */}
        <ClarityCard className="w-full">
          {/* Tab Switcher */}
          <div className="flex mb-6">
            <button
              type="button"
              onClick={() => setMode("login")}
              style={{
                backgroundColor: mode === "login" ? "#2F4F3E" : "#FFFFFF",
                color: mode === "login" ? "#FFFFFF" : "#1F2933",
                padding: "10px 24px",
                borderRadius: "8px 8px 0 0",
                border: mode === "login" ? "none" : "1px solid #E6E1D9",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              style={{
                backgroundColor: mode === "signup" ? "#2F4F3E" : "#FFFFFF",
                color: mode === "signup" ? "#FFFFFF" : "#1F2933",
                padding: "10px 24px",
                borderRadius: "8px 8px 0 0",
                border: mode === "signup" ? "none" : "1px solid #E6E1D9",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" suppressHydrationWarning>
            <div className="flex flex-col gap-2" suppressHydrationWarning>
              <label
                className="text-sm font-medium"
                style={{ color: "var(--hcb-text-primary)" }}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                suppressHydrationWarning
                style={{
                  padding: "14px 16px",
                  fontSize: "16px",
                  borderRadius: "10px",
                  border: "1px solid var(--hcb-border)",
                  backgroundColor: "var(--hcb-card-bg)",
                  color: "var(--hcb-text-primary)",
                  outline: "none",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 0 2px var(--hcb-focus-ring)"
                  e.currentTarget.style.borderColor = "var(--hcb-focus-ring)"
                }}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = "none"
                  e.currentTarget.style.borderColor = "var(--hcb-border)"
                }}
              />
            </div>

            <div className="flex flex-col gap-2" suppressHydrationWarning>
              <label
                className="text-sm font-medium"
                style={{ color: "var(--hcb-text-primary)" }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                suppressHydrationWarning
                style={{
                  padding: "14px 16px",
                  fontSize: "16px",
                  borderRadius: "10px",
                  border: "1px solid var(--hcb-border)",
                  backgroundColor: "var(--hcb-card-bg)",
                  color: "var(--hcb-text-primary)",
                  outline: "none",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 0 2px var(--hcb-focus-ring)"
                  e.currentTarget.style.borderColor = "var(--hcb-focus-ring)"
                }}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = "none"
                  e.currentTarget.style.borderColor = "var(--hcb-border)"
                }}
              />
            </div>

            {error && <InlineError message={error} />}

            <PrimaryButton type="submit" fullWidth isLoading={isLoading}>
              {mode === "login" ? "Log In" : "Sign Up"}
            </PrimaryButton>
          </form>
        </ClarityCard>

        {/* Footer */}
        <p
          className="text-sm text-center mt-6 max-w-xs"
          style={{ color: "var(--hcb-text-secondary)" }}
        >
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </AppShell>
  )
}
