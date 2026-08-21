import { createServerFn } from "@tanstack/react-start";
import { getAdminAuth } from "../firebase.admin.server";

/**
 * Server function — lists all Firebase Auth users.
 * Runs exclusively on the server; the firebase-admin SDK never reaches the browser.
 */
export const getAdminUsers = createServerFn({ method: "GET" }).handler(
  async () => {
    const auth = getAdminAuth();
    const result = await auth.listUsers(1000); // up to 1000 users per call

    const users = result.users.map((u) => ({
      uid: u.uid,
      email: u.email ?? null,
      displayName: u.displayName ?? null,
      phoneNumber: u.phoneNumber ?? null,
      photoURL: u.photoURL ?? null,
      disabled: u.disabled,
      emailVerified: u.emailVerified,
      createdAt: u.metadata.creationTime ?? null,
      lastLoginAt: u.metadata.lastSignInTime ?? null,
      roles: (u.customClaims as Record<string, unknown> | undefined)?.roles ?? [],
    }));

    return { users };
  },
);
