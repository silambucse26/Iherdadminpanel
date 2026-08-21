import { o as __toESM } from "../_runtime.mjs";
import { c as useAuth, n as Input, t as Button } from "./router-DAnu6P_r.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { F as Lock, G as Eye, K as EyeOff, M as Mail, y as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as Label } from "./label-I1Q4BVbY.mjs";
import { t as Checkbox } from "./checkbox-XLDTz5KS.mjs";
import { t as AuthShell } from "./AuthShell-3-HfiJrB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-Ct71sQjS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var inputClass = "h-12 rounded-xl border-gray-200 bg-white/80 pl-10 text-sm focus-visible:border-[#66BB6A] focus-visible:ring-[#66BB6A]/30";
function SignInPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthShell, {
		badge: "Admin Portal",
		title: "Welcome back 👋",
		subtitle: "Sign in to your iHerd admin account to continue.",
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			"Don't have an account?",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/signup",
				className: "font-semibold text-[#2E7D32] hover:underline",
				children: "Create one"
			})
		] }),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignInForm, {})
	});
}
function SignInForm() {
	const navigate = useNavigate();
	const { signIn } = useAuth();
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const onSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		try {
			await signIn(email, password);
			navigate({ to: "/dashboard" });
		} catch (err) {
			console.error(err);
			setError(err.message || "Failed to sign in. Please check your credentials.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "mt-5 space-y-5",
		children: [
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "email",
					className: "text-xs font-semibold text-gray-700",
					children: "Admin email"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "email",
						type: "email",
						autoComplete: "email",
						required: true,
						value: email,
						onChange: (e) => setEmail(e.target.value),
						placeholder: "admin@iherd.com",
						className: inputClass
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "password",
					className: "text-xs font-semibold text-gray-700",
					children: "Password"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "password",
							type: showPassword ? "text" : "password",
							autoComplete: "current-password",
							required: true,
							value: password,
							onChange: (e) => setPassword(e.target.value),
							placeholder: "Enter your password",
							className: "h-12 rounded-xl border-gray-200 bg-white/80 pl-10 text-sm focus-visible:border-[#66BB6A] focus-visible:ring-[#66BB6A]/30 pr-10"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowPassword((v) => !v),
							className: "absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-[#2E7D32]",
							"aria-label": showPassword ? "Hide password" : "Show password",
							children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
					id: "remember",
					className: "h-4 w-4 rounded border-gray-300 data-[state=checked]:border-[#2E7D32] data-[state=checked]:bg-[#2E7D32]"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "remember",
					className: "text-sm font-normal text-gray-600",
					children: "Remember me"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				disabled: loading,
				className: "h-12 w-full rounded-xl border-0 text-base font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-[1.04] disabled:opacity-70",
				style: { background: "linear-gradient(135deg,#2E7D32 0%,#66BB6A 100%)" },
				children: loading ? "Signing in…" : "Sign In"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-xs font-semibold text-[#2E7D32] hover:underline",
					children: "Forgot password?"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-center gap-1.5 pt-1 text-xs text-gray-500",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5 text-[#2E7D32]" }), "Secure login · 256-bit SSL encryption"]
			})
		]
	});
}
//#endregion
export { SignInPage as component };
