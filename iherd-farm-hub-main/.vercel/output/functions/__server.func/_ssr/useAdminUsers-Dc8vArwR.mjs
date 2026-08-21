import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useAdminUsers-Dc8vArwR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var API_BASE = "http://localhost:5000".replace(/\/$/, "") || "https://iherdadminpanel.onrender.com";
var KEEP_ALIVE_INTERVAL_MS = 6e5;
async function pingBackend() {
	try {
		await fetch(`${API_BASE}/`, { method: "GET" });
	} catch {}
}
async function fetchAdminUsers() {
	const MAX_RETRIES = 3;
	const RETRY_DELAY_MS = 3e3;
	let lastError;
	for (let attempt = 0; attempt < MAX_RETRIES; attempt++) try {
		const res = await fetch(`${API_BASE}/api/admin/users`);
		if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
		const users = (await res.json()).users || [];
		console.log(`[useAdminUsers] loaded ${users.length} users from ${API_BASE}`);
		return users;
	} catch (err) {
		lastError = err;
		console.warn(`[useAdminUsers] attempt ${attempt + 1}/${MAX_RETRIES} failed:`, err);
		if (attempt < 2) {
			await pingBackend();
			await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
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
function useAdminUsers() {
	const intervalRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		pingBackend();
		intervalRef.current = setInterval(pingBackend, KEEP_ALIVE_INTERVAL_MS);
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, []);
	return useQuery({
		queryKey: ["adminUsers"],
		queryFn: fetchAdminUsers,
		placeholderData: [],
		retry: false,
		staleTime: 0
	});
}
//#endregion
export { useAdminUsers as t };
