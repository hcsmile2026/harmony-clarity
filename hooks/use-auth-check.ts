"use client"
import { useEffect, useState } from "react"

export function useAuthCheck() {
  const [isChecking, setIsChecking] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("hcb_token")
    if (!token) {
      window.location.href = "/"
    } else {
      setIsAuthenticated(true)
    }
  }, [])

  return { isChecking, isAuthenticated }
}

export function getAuthHeaders(): HeadersInit {
  if (typeof window === "undefined") {
    return { "Content-Type": "application/json" }
  }
  const token = localStorage.getItem("hcb_token")
  const headers: HeadersInit = { "Content-Type": "application/json" }
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }
  return headers
}
