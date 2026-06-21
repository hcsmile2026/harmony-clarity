# Harmony Clarity Blueprint

## What This Is
AI-powered decision reflection app. Users describe a decision, enter options, do a pressure test, and receive an AI-generated Blueprint. Costs $47/credit via Stripe.

## Launch Date
June 5, 2026

## Stack
- **Frontend**: Next.js 16 (app router), TypeScript, Tailwind, shadcn/ui
- **Backend**: Xano (https://xkyb-0esl-ybtr.n7e.xano.io)
- **Payments**: Stripe via Xano (API group: lsRTcA3V)
- **Hosting**: Vercel → app.harmonyclarity.com
- **Marketing/CRM**: GoHighLevel → harmonyclarity.com (home page is the lead magnet; /decide still exists as a separate URL)
- **Analytics**: Vercel Analytics (already wired in layout.tsx)

## User Flow
/ (login/signup) → /onboarding → /dashboard → /new-blueprint → /options → /pressure-test → /results

## Key Pages
- `/` — login + signup
- `/onboarding` — birth info + consent
- `/dashboard` — credits, past blueprints, profile
- `/new-blueprint` — decision context input
- `/options` — enter 2-4 decision options
- `/pressure-test` — 3 questions (quiet_signal, justification, energy)
- `/results` — AI-generated Blueprint
- `/view-blueprint` — view past blueprint (?session=ID)
- `/buy-credits` — Stripe checkout ($47)
- `/payment-success` — post-Stripe confirmation page
- `/decide` — public lead magnet landing page (3 Questions)
- `/terms` — Terms of Service
- `/privacy` — Privacy Policy

## Brand Design Tokens
- Background: `#F7F4EF`
- Primary/burgundy: `#7A1E2C`
- Hover: `#8F2636`
- Text primary: `#1F2933`
- Text secondary: `#4A5568`
- Border: `#E6E1D9`
- Heading font: Libre Baskerville (serif)
- Body font: Inter (sans-serif)
- Brand mark: ✦ (&#10022;)

## localStorage Keys
- `hcb_token` — auth token
- `hcb_user_id` — user ID
- `hcb_first_name` — display name
- `hcb_onboarding_done` — boolean flag
- `hcb_session_id` — current blueprint session
- `hcb_options` — JSON array of {id, name} for current session
- `hcb_options_draft` — unsaved options text
- `hcb_decision_context` — decision description text
- `hcb_pressure_q1/q2/q3` — pressure test answers
- `hcb_reflection` — cached AI reflection text

## Xano API Groups
- `Px_PC3vf` — auth (login, signup, me, onboarding, profile)
- `X8T2HoKo` — main app (sessions, options, pressure-test, reflections, credits)
- `lsRTcA3V` — payments (create-checkout)

## Pending Before Launch
1. Stripe: swap sk_test_ → sk_live_ in Xano payments/create-checkout
2. Xano: set success_url = https://app.harmonyclarity.com/payment-success
3. Xano: set cancel_url = https://app.harmonyclarity.com/buy-credits
4. GHL: wire webhook URL into ghl-decide-page.html line 429
5. Test full payment flow end-to-end

## GHL Files (not in Vercel)
- `ghl-decide-page.html` — paste into GHL /decide custom HTML block
- `ghl-blueprint-page.css` — paste into GHL /blueprint custom CSS field

## Components
All shared UI lives in `components/hcb/` — AppShell, ClarityCard, PrimaryButton, SecondaryButton, ProgressHeader, InlineError, etc.

## Auth Pattern
`useAuthCheck()` from `hooks/use-auth-check.ts` — checks localStorage for hcb_token, redirects to / if missing. `getAuthHeaders()` returns the Authorization header object.
