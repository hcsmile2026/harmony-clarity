"use client"

import { useState, useEffect } from "react"
import {
  AppShell,
  ClarityCard,
  ProgressHeader,
  PrimaryButton,
  InlineError,
} from "@/components/hcb"
import { useAuthCheck, getAuthHeaders } from "@/hooks/use-auth-check"

export default function OnboardingPage() {
  const { isChecking } = useAuthCheck()
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [checkingProfile, setCheckingProfile] = useState(true)

  // Check on page load if onboarding is already complete
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      // 1. Fast path: check localStorage first
      if (localStorage.getItem("hcb_onboarding_done") === "true") {
        setShouldRedirect(true)
        window.location.href = "/dashboard"
        return
      }

      // 2. Fallback: call auth/me API to check profile status
      const token = localStorage.getItem("hcb_token")
      if (!token) {
        setCheckingProfile(false)
        return
      }

      try {
        const response = await fetch(
          "https://xkyb-0esl-ybtr.n7e.xano.io/api:Px_PC3vf/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )

        if (response.ok) {
          const data = await response.json()
          // If access_start_date is not null, profile is complete
          if (data.profile_complete === true) {
            localStorage.setItem("hcb_onboarding_done", "true")
            setShouldRedirect(true)
            window.location.href = "/dashboard"
            return
          }
        }
      } catch (err) {
        console.error("Failed to check profile status:", err)
      }

      setCheckingProfile(false)
    }

    checkOnboardingStatus()
  }, [])

  const [firstName, setFirstName] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [birthTime, setBirthTime] = useState("")
  const [birthTimeUnknown, setBirthTimeUnknown] = useState(false)
  const [birthCity, setBirthCity] = useState("")
  const [birthCountry, setBirthCountry] = useState("")

  const [consentTerms, setConsentTerms] = useState(false)
  const [consentAge, setConsentAge] = useState(false)
  const [consentData, setConsentData] = useState(false)

  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const isFormValid =
    firstName.trim() &&
    birthDate &&
    birthCity.trim() &&
    birthCountry.trim() &&
    consentTerms &&
    consentAge &&
    consentData

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch(
        "https://xkyb-0esl-ybtr.n7e.xano.io/api:Px_PC3vf/onboarding",
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            first_name: firstName,
            birth_date: birthDate,
            birth_time_local: birthTimeUnknown ? null : birthTime || null,
            birth_time_known: !birthTimeUnknown && !!birthTime,
            birth_timezone: "UTC",
            birth_location_label: `${birthCity}, ${birthCountry}`,
              birth_city: birthCity,
              birth_country: birthCountry,
            birth_coordinates: "0,0",
            birth_location_precision: "city",
            consent_birth_data: consentData,
            confirm_age_18: consentAge,
            confirm_tos: consentTerms,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        // If profile is already complete, redirect to dashboard instead of showing error
        const errorMessage = (data.message || "Failed to save profile").toLowerCase()
        if (
          errorMessage.includes("already complete") ||
          errorMessage.includes("already onboarded") ||
          errorMessage.includes("profile complete") ||
          errorMessage.includes("already exists") ||
          data.profile_complete === true
        ) {
          localStorage.setItem("hcb_onboarding_done", "true")
          window.location.href = "/dashboard"
          return
        }
        throw new Error(data.message || "Failed to save profile")
      }
      
      // Also check if response indicates profile is already complete
      if (data.profile_complete === true) {
        localStorage.setItem("hcb_onboarding_done", "true")
        localStorage.setItem("hcb_first_name", data.user?.first_name || firstName || "")
        window.location.href = "/dashboard"
        return
      }

      // Success: set localStorage flags before redirecting
      localStorage.setItem("hcb_onboarding_done", "true")
      localStorage.setItem("hcb_first_name", data.user?.first_name || firstName || "")
      window.location.href = "/dashboard"
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  // Effect to handle birthTimeUnknown
  useEffect(() => {
    if (birthTimeUnknown) {
      setBirthTime("")
    }
  }, [birthTimeUnknown])

  if (isChecking || shouldRedirect || checkingProfile) {
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
      <ProgressHeader
        step={1}
        totalSteps={1}
        onBack={() => (window.location.href = "/")}
      />

      <h1
        className="font-serif text-[28px] md:text-[32px] mb-2"
        style={{ color: "var(--hcb-text-primary)" }}
      >
        Birth Information
      </h1>

      <div
        className="flex items-center gap-2 mb-6"
        style={{ color: "var(--hcb-text-secondary)" }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="3"
            y="6"
            width="10"
            height="8"
            rx="1"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M5 6V4a3 3 0 116 0v2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <span className="text-sm">Your information is private and secure.</span>
      </div>

      <ClarityCard>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* First Name */}
          <div className="flex flex-col gap-2">
            <label
              className="text-sm font-medium"
              style={{ color: "var(--hcb-text-primary)" }}
            >
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Your first name"
              required
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

          {/* Birth Date */}
          <div className="flex flex-col gap-2">
            <label
              className="text-sm font-medium"
              style={{ color: "var(--hcb-text-primary)" }}
            >
              Birth Date
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
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

          {/* Birth Time */}
          <div className="flex flex-col gap-2">
            <label
              className="text-sm font-medium"
              style={{ color: "var(--hcb-text-primary)" }}
            >
              Birth Time
            </label>
            <input
              type="time"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              disabled={birthTimeUnknown}
              placeholder={birthTimeUnknown ? "Birth time not required" : ""}
              style={{
                padding: "14px 16px",
                fontSize: "16px",
                borderRadius: "10px",
                border: "1px solid var(--hcb-border)",
                backgroundColor: birthTimeUnknown
                  ? "var(--hcb-disabled-bg)"
                  : "var(--hcb-card-bg)",
                color: "var(--hcb-text-primary)",
                outline: "none",
                opacity: birthTimeUnknown ? 0.6 : 1,
              }}
              onFocus={(e) => {
                if (!birthTimeUnknown) {
                  e.currentTarget.style.boxShadow = "0 0 0 2px var(--hcb-focus-ring)"
                  e.currentTarget.style.borderColor = "var(--hcb-focus-ring)"
                }
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = "none"
                e.currentTarget.style.borderColor = "var(--hcb-border)"
              }}
            />
            <label className="flex items-center gap-3 mt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={birthTimeUnknown}
                onChange={(e) => setBirthTimeUnknown(e.target.checked)}
                style={{
                  width: "20px",
                  height: "20px",
                  accentColor: "var(--hcb-action-primary)",
                  cursor: "pointer",
                }}
              />
              <span
                className="text-sm"
                style={{ color: "var(--hcb-text-secondary)" }}
              >
                I don&apos;t know my exact birth time
              </span>
            </label>
            <p
              className="text-sm"
              style={{ color: "var(--hcb-text-secondary)" }}
            >
              Birth time improves accuracy but is optional.
            </p>
          </div>

          {/* Birth City */}
          <div className="flex flex-col gap-2">
            <label
              className="text-sm font-medium"
              style={{ color: "var(--hcb-text-primary)" }}
            >
              Birth City
            </label>
            <input
              type="text"
              value={birthCity}
              onChange={(e) => setBirthCity(e.target.value)}
              placeholder="City where you were born"
              required
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

          {/* Birth Country */}
          <div className="flex flex-col gap-2">
            <label
              className="text-sm font-medium"
              style={{ color: "var(--hcb-text-primary)" }}
            >
              Birth Country
            </label>
            <input
              type="text"
              value={birthCountry}
              onChange={(e) => setBirthCountry(e.target.value)}
              placeholder="Country where you were born"
              required
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

          {/* Consent Checkboxes */}
          <div className="flex flex-col gap-3 mt-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consentTerms}
                onChange={(e) => setConsentTerms(e.target.checked)}
                style={{
                  width: "20px",
                  height: "20px",
                  minWidth: "20px",
                  accentColor: "var(--hcb-action-primary)",
                  cursor: "pointer",
                  marginTop: "2px",
                }}
              />
              <span
                className="text-sm"
                style={{ color: "var(--hcb-text-primary)" }}
              >
                I agree to the Terms of Service
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consentAge}
                onChange={(e) => setConsentAge(e.target.checked)}
                style={{
                  width: "20px",
                  height: "20px",
                  minWidth: "20px",
                  accentColor: "var(--hcb-action-primary)",
                  cursor: "pointer",
                  marginTop: "2px",
                }}
              />
              <span
                className="text-sm"
                style={{ color: "var(--hcb-text-primary)" }}
              >
                I confirm I am 18 years or older
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consentData}
                onChange={(e) => setConsentData(e.target.checked)}
                style={{
                  width: "20px",
                  height: "20px",
                  minWidth: "20px",
                  accentColor: "var(--hcb-action-primary)",
                  cursor: "pointer",
                  marginTop: "2px",
                }}
              />
              <span
                className="text-sm"
                style={{ color: "var(--hcb-text-primary)" }}
              >
                I consent to my birth data being used for reflective analysis
              </span>
            </label>
          </div>

          {error && <InlineError message={error} />}

          <PrimaryButton
            type="submit"
            fullWidth
            disabled={!isFormValid}
            isLoading={isLoading}
          >
            Complete My Profile
          </PrimaryButton>

          <p
            className="text-sm text-center"
            style={{ color: "var(--hcb-text-secondary)" }}
          >
            Your information is kept private and never shared.
          </p>
        </form>
      </ClarityCard>
    </AppShell>
  )
}
