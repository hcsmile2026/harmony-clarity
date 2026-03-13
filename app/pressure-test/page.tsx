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

const fearOptions = [
  "Missing out on something better",
  "Disappointing someone I care about",
  "Wasting time or money",
  "Not knowing until it's too late",
]

const approachOptions = [
  "Mostly with logic and analysis",
  "Mostly with gut feeling and intuition",
  "Equally both",
  "I honestly don't know yet",
]

interface RadioGroupProps {
  name: string
  options: string[]
  value: string
  onChange: (value: string) => void
}

function RadioGroup({ name, options, value, onChange }: RadioGroupProps) {
  return (
    <div className="flex flex-col gap-3">
      {options.map((option) => (
        <label
          key={option}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center"
            style={{
              border: value === option ? "none" : "2px solid var(--hcb-border)",
              backgroundColor: value === option ? "var(--hcb-action-primary)" : "transparent",
            }}
          >
            {value === option && (
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "#FFFFFF" }}
              />
            )}
          </div>
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={(e) => onChange(e.target.value)}
            className="sr-only"
          />
          <span
            className="text-base"
            style={{ color: "var(--hcb-text-primary)" }}
          >
            {option}
          </span>
        </label>
      ))}
    </div>
  )
}

export default function PressureTestPage() {
  const { isChecking } = useAuthCheck()

  const [options, setOptions] = useState<{ id: number; name: string }[]>([])
  const [q1, setQ1] = useState("")
  const [q2, setQ2] = useState("")
  const [q3, setQ3] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Restore from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedOptions = localStorage.getItem("hcb_options")
      if (savedOptions) {
        try {
          setOptions(JSON.parse(savedOptions))
        } catch {
          setOptions([])
        }
      }

      const savedQ1 = localStorage.getItem("hcb_pressure_q1")
      const savedQ2 = localStorage.getItem("hcb_pressure_q2")
      const savedQ3 = localStorage.getItem("hcb_pressure_q3")

      if (savedQ1) setQ1(savedQ1)
      if (savedQ2) setQ2(savedQ2)
      if (savedQ3) setQ3(savedQ3)
    }
  }, [])

  // Save to localStorage on change
  useEffect(() => {
    if (q1) localStorage.setItem("hcb_pressure_q1", q1)
  }, [q1])

  useEffect(() => {
    if (q2) localStorage.setItem("hcb_pressure_q2", q2)
  }, [q2])

  useEffect(() => {
    if (q3) localStorage.setItem("hcb_pressure_q3", q3)
  }, [q3])

  const isValid = q1 && q2 && q3

  const handleSubmit = async () => {
    setError("")
    setIsLoading(true)

    const sessionId = localStorage.getItem("hcb_session_id")
    if (!sessionId) {
      setError("Session not found. Please start over.")
      setIsLoading(false)
      return
    }

    // Get the selected option's ID
    const selectedOption = options.find((o) => o.name === q1)
    if (!selectedOption) {
      setError("Please select an option for the first question.")
      setIsLoading(false)
      return
    }

    const token = localStorage.getItem("hcb_token")
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }

    try {
      // Submit Q1 (leaning) - uses option_id
      const res1 = await fetch(
        "https://xkyb-0esl-ybtr.n7e.xano.io/api:X8T2HoKo/pressure-test/submit",
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            option_id: Number(selectedOption.id),
            question_type: "leaning",
            question_text: "If you had to decide right now, which option would you lean toward?",
            user_response: q1,
          }),
        }
      )
      if (!res1.ok) {
        const data = await res1.json()
        throw new Error(data.message || "Failed to submit answer")
      }

      // Submit Q2 (fear) - uses first option's ID as reference
      const res2 = await fetch(
        "https://xkyb-0esl-ybtr.n7e.xano.io/api:X8T2HoKo/pressure-test/submit",
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            option_id: Number(selectedOption.id),
            question_type: "fear",
            question_text: "What's your biggest concern about making the wrong choice?",
            user_response: q2,
          }),
        }
      )
      if (!res2.ok) {
        const data = await res2.json()
        throw new Error(data.message || "Failed to submit answer")
      }

      // Submit Q3 (approach) - uses first option's ID as reference
      const res3 = await fetch(
        "https://xkyb-0esl-ybtr.n7e.xano.io/api:X8T2HoKo/pressure-test/submit",
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            option_id: Number(selectedOption.id),
            question_type: "approach",
            question_text: "How are you approaching this decision?",
            user_response: q3,
          }),
        }
      )
      if (!res3.ok) {
        const data = await res3.json()
        throw new Error(data.message || "Failed to submit answer")
      }

      window.location.href = "/results"
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  if (isChecking) {
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
        step={3}
        totalSteps={6}
        onBack={() => (window.location.href = "/options")}
      />

      <h1
        className="font-serif text-[28px] md:text-[32px] mb-2"
        style={{ color: "var(--hcb-text-primary)" }}
      >
        Pressure Test
      </h1>
      <p
        className="text-base mb-6"
        style={{ color: "var(--hcb-text-secondary)" }}
      >
        Answer honestly. There are no right answers.
      </p>

      <div className="flex flex-col gap-6">
        {/* Question 1 */}
        <ClarityCard>
          <h2
            className="font-serif text-lg mb-4"
            style={{ color: "var(--hcb-text-primary)" }}
          >
            If you had to decide right now, which option would you lean toward?
          </h2>
          <RadioGroup
            name="q1"
            options={options.map((o) => o.name)}
            value={q1}
            onChange={setQ1}
          />
        </ClarityCard>

        {/* Question 2 */}
        <ClarityCard>
          <h2
            className="font-serif text-lg mb-4"
            style={{ color: "var(--hcb-text-primary)" }}
          >
            What&apos;s your biggest concern about making the wrong choice?
          </h2>
          <RadioGroup
            name="q2"
            options={fearOptions}
            value={q2}
            onChange={setQ2}
          />
        </ClarityCard>

        {/* Question 3 */}
        <ClarityCard>
          <h2
            className="font-serif text-lg mb-4"
            style={{ color: "var(--hcb-text-primary)" }}
          >
            How are you approaching this decision?
          </h2>
          <RadioGroup
            name="q3"
            options={approachOptions}
            value={q3}
            onChange={setQ3}
          />
        </ClarityCard>
      </div>

      <p
        className="text-sm italic my-6 text-center"
        style={{ color: "var(--hcb-text-secondary)" }}
      >
        You don&apos;t need to overthink these. Go with your first instinct.
      </p>

      {error && (
        <div className="mb-4">
          <InlineError message={error} />
        </div>
      )}

      <PrimaryButton
        fullWidth
        disabled={!isValid}
        isLoading={isLoading}
        onClick={handleSubmit}
      >
        Generate My Blueprint &rarr;
      </PrimaryButton>
    </AppShell>
  )
}
