import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (typeof window === "undefined") {
      throw redirect({ to: "/login" });
    }
    const authed = window.localStorage.getItem("iherd_auth") === "1";
    throw redirect({ to: authed ? "/dashboard" : "/login" });
  },
  component: () => null,
});
