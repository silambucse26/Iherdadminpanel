import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Safely extracts a display string from any value (string, localized object {en, hi, mr, ...}, or number).
 * Prevents React child object crash: "Objects are not valid as a React child (found: object with keys {mr, hi, ...})"
 */
export function getLocalizedText(val: any, fallback = "—"): string {
  if (val === null || val === undefined) return fallback;
  if (typeof val === "string") return val;
  if (typeof val === "number" || typeof val === "boolean") return String(val);
  if (typeof val === "object") {
    if (Array.isArray(val)) {
      return val.map((v) => getLocalizedText(v)).filter(Boolean).join(", ") || fallback;
    }
    // Prefer English, then Hindi, or any first non-empty string in the localized object
    if (typeof val.en === "string" && val.en.trim()) return val.en;
    if (typeof val.hi === "string" && val.hi.trim()) return val.hi;
    for (const key of Object.keys(val)) {
      if (typeof val[key] === "string" && val[key].trim()) {
        return val[key];
      }
    }
    if (val.name) return getLocalizedText(val.name, fallback);
    if (val.title) return getLocalizedText(val.title, fallback);
    return fallback;
  }
  return String(val);
}

