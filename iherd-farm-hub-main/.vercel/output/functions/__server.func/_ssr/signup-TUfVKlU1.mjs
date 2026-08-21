import { o as __toESM } from "../_runtime.mjs";
import { c as useAuth, n as Input, t as Button } from "./router-DAnu6P_r.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { F as Lock, G as Eye, K as EyeOff, M as Mail, T as Phone, i as User, y as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as Label } from "./label-I1Q4BVbY.mjs";
import { t as AuthShell } from "./AuthShell-3-HfiJrB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/signup-TUfVKlU1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var inputClass = "h-12 rounded-xl border-gray-200 bg-white/80 pl-10 text-sm focus-visible:border-[#66BB6A] focus-visible:ring-[#66BB6A]/30";
function SignUpPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthShell, {
		badge: "Admin Portal",
		title: "Welcome to iHerd 🐄",
		subtitle: "Create your admin account to access the dashboard.",
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			"Already have an account?",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/login",
				className: "font-semibold text-[#2E7D32] hover:underline",
				children: "Sign in"
			})
		] }),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignUpForm, {})
	});
}
function SignUpForm() {
	const navigate = useNavigate();
	const { signUp } = useAuth();
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [showConfirm, setShowConfirm] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		email: "",
		phone: "",
		password: "",
		confirm: ""
	});
	const [error, setError] = (0, import_react.useState)(null);
	const update = (k) => (e) => setForm((f) => ({
		...f,
		[k]: e.target.value
	}));
	const onSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		if (form.password.length < 8) return setError("Password must be at least 8 characters.");
		if (form.password !== form.confirm) return setError("Passwords do not match.");
		setLoading(true);
		try {
			await signUp(form.email, form.password, form.name, form.phone);
			navigate({ to: "/dashboard" });
		} catch (err) {
			console.error(err);
			setError(err.message || "Failed to create account. Please try again.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "mt-5 space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "name",
					className: "text-xs font-semibold text-gray-700",
					children: "Admin name"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "name",
						required: true,
						value: form.name,
						onChange: update("name"),
						placeholder: "Jane Doe",
						className: inputClass
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "su-email",
					className: "text-xs font-semibold text-gray-700",
					children: "Email address"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "su-email",
						type: "email",
						autoComplete: "email",
						required: true,
						value: form.email,
						onChange: update("email"),
						placeholder: "admin@iherd.com",
						className: inputClass
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "phone",
					className: "text-xs font-semibold text-gray-700",
					children: "Phone number"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "phone",
						type: "tel",
						autoComplete: "tel",
						required: true,
						value: form.phone,
						onChange: update("phone"),
						placeholder: "+1 555 000 0000",
						className: inputClass
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "su-password",
						className: "text-xs font-semibold text-gray-700",
						children: "Password"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "su-password",
								type: showPassword ? "text" : "password",
								autoComplete: "new-password",
								required: true,
								value: form.password,
								onChange: update("password"),
								placeholder: "••••••••",
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
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "confirm",
						className: "text-xs font-semibold text-gray-700",
						children: "Confirm password"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "confirm",
								type: showConfirm ? "text" : "password",
								autoComplete: "new-password",
								required: true,
								value: form.confirm,
								onChange: update("confirm"),
								placeholder: "••••••••",
								className: "h-12 rounded-xl border-gray-200 bg-white/80 pl-10 text-sm focus-visible:border-[#66BB6A] focus-visible:ring-[#66BB6A]/30 pr-10"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setShowConfirm((v) => !v),
								className: "absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-[#2E7D32]",
								"aria-label": showConfirm ? "Hide password" : "Show password",
								children: showConfirm ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
							})
						]
					})]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				disabled: loading,
				className: "h-12 w-full rounded-xl border-0 text-base font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-[1.04] disabled:opacity-70",
				style: { background: "linear-gradient(135deg,#2E7D32 0%,#66BB6A 100%)" },
				children: loading ? "Creating account…" : "Create Account & Continue"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-center gap-1.5 pt-1 text-xs text-gray-500",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5 text-[#2E7D32]" }), "Your data is protected with 256-bit SSL encryption"]
			})
		]
	});
}
//#endregion
export { SignUpPage as component };
