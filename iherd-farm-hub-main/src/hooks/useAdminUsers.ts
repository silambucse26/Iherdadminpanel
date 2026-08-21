import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL as string;

// How often to ping the backend to keep Render awake (every 10 minutes)
const KEEP_ALIVE_INTERVAL_MS = 10 * 60 * 1000;

// Warm up the backend immediately when the app loads
async function pingBackend() {
  try {
    await fetch(`${API_BASE}/ping`, { method: "GET" });
  } catch {
    // Silently ignore — this is just a warm-up
  }
}

async function fetchAdminUsers(): Promise<any[]> {
  const MAX_RETRIES = 3;
  const RETRY_DELAY_MS = 3000; // Wait 3 s between retries (gives Render time to wake up)

  let lastError: unknown;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(`${API_BASE}/api/admin/users`);
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      const data = await res.json();
      return data.users || [];
    } catch (err) {
      lastError = err;
      console.warn(`Attempt ${attempt + 1} failed fetching users:`, err);
      if (attempt < MAX_RETRIES - 1) {
        // Ping to help wake up Render, then wait before retrying
        await pingBackend();
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
      }
    }
  }

  console.error("Error fetching users from backend after retries:", lastError);
  return [];
}

/**
 * Shared hook — fetches all Firebase Auth users from the Express backend.
 * Retries automatically on failure (handles Render cold-start CORS-like errors).
 * Also keeps the backend alive with a periodic ping.
 */
export function useAdminUsers() {
  const queryClient = useQueryClient();

  // Keep-alive: ping the backend every 10 minutes to prevent Render sleeping
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    // Ping immediately on mount
    pingBackend();

    // Then ping every 10 minutes
    intervalRef.current = setInterval(pingBackend, KEEP_ALIVE_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return useQuery<any[]>({
    queryKey: ["adminUsers"],
    queryFn: fetchAdminUsers,
    initialData: [],
    retry: 3,
    retryDelay: (attempt) => Math.min(3000 * (attempt + 1), 10000),
    staleTime: 60_000, // Cache for 1 minute — avoids refetching on every tab switch
  });
}
