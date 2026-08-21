import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

// Use env var if set, otherwise fall back to the known Render backend
const API_BASE =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "") ||
  "https://iherdadminpanel.onrender.com";

// How often to ping the backend to keep Render awake (every 10 minutes)
const KEEP_ALIVE_INTERVAL_MS = 10 * 60 * 1000;

// Warm up the backend immediately when the app loads
async function pingBackend() {
  try {
    await fetch(`${API_BASE}/`, { method: "GET" });
  } catch {
    // Silently ignore — this is just a warm-up
  }
}

async function fetchAdminUsers(): Promise<any[]> {
  const MAX_RETRIES = 3;
  const RETRY_DELAY_MS = 3000; // 3 s between retries (gives Render time to wake up)

  let lastError: unknown;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(`${API_BASE}/api/admin/users`);
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      const data = await res.json();
      const users = data.users || [];
      console.log(`[useAdminUsers] loaded ${users.length} users from ${API_BASE}`);
      return users;
    } catch (err) {
      lastError = err;
      console.warn(`[useAdminUsers] attempt ${attempt + 1}/${MAX_RETRIES} failed:`, err);
      if (attempt < MAX_RETRIES - 1) {
        await pingBackend();
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
      }
    }
  }

  console.error("[useAdminUsers] all retries failed:", lastError);
  return [];
}

/**
 * Shared hook — fetches all Firebase Auth users from the Express backend.
 * - Uses placeholderData (not initialData) so the fetch always runs on mount.
 * - Retries up to 3 times with a delay to survive Render cold starts.
 * - Keeps the backend alive with a periodic ping every 10 minutes.
 */
export function useAdminUsers() {
  // Keep-alive: ping the backend every 10 minutes to prevent Render sleeping
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    pingBackend(); // Ping immediately on mount
    intervalRef.current = setInterval(pingBackend, KEEP_ALIVE_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return useQuery<any[]>({
    queryKey: ["adminUsers"],
    queryFn: fetchAdminUsers,
    // placeholderData shows [] while loading but still triggers the fetch.
    // initialData would suppress the fetch (bug: data never loaded).
    placeholderData: [],
    retry: false,   // retries handled inside fetchAdminUsers with delays
    staleTime: 0,   // always refetch on mount — data is never considered stale
  });
}
