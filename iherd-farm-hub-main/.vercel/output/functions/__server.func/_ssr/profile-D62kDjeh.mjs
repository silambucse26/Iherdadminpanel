import { o as __toESM } from "../_runtime.mjs";
import { c as useAuth, n as Input, t as Button } from "./router-DAnu6P_r.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { M as Mail, N as LogOut, T as Phone, j as MapPin, v as Shield } from "../_libs/lucide-react.mjs";
import { n as PageHeader, t as Card } from "./PageHeader-DLjNnuT_.mjs";
import { t as Label } from "./label-I1Q4BVbY.mjs";
import { t as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-D62kDjeh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Profile() {
	const navigate = useNavigate();
	const { profile, setProfile, logout } = useAuth();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [formData, setFormData] = (0, import_react.useState)({
		firstName: "",
		lastName: "",
		phone: ""
	});
	(0, import_react.useEffect)(() => {
		if (profile) {
			const parts = profile.name.split(" ");
			setFormData({
				firstName: parts[0] || "",
				lastName: parts.slice(1).join(" ") || "",
				phone: profile.phone || ""
			});
		}
	}, [profile]);
	const handleSignOut = async () => {
		try {
			await logout();
			navigate({ to: "/login" });
		} catch (error) {
			console.error("Sign out failed:", error);
		}
	};
	const handleSave = async () => {
		if (!profile) return;
		setLoading(true);
		try {
			const fullName = `${formData.firstName} ${formData.lastName}`.trim();
			setProfile({
				...profile,
				name: fullName,
				phone: formData.phone
			});
			toast.success("Profile updated locally (read-only mode)!");
		} catch (error) {
			console.error(error);
			toast.error(error.message || "Failed to update profile.");
		} finally {
			setLoading(false);
		}
	};
	const displayName = profile?.name || "Admin User";
	const displayEmail = profile?.email || "";
	const displayPhone = profile?.phone || "";
	const displayRole = profile?.role || "Admin";
	const initials = displayName.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "My profile",
		description: "Manage your admin account details.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "outline",
			onClick: handleSignOut,
			className: "gap-2 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Sign out"]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-6 rounded-2xl text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-primary-foreground text-3xl font-bold",
					children: initials
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-4 text-xl font-bold",
					children: displayName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [displayRole, " · iHerd HQ"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-col gap-2 text-sm text-left",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" }),
								" ",
								displayEmail
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4" }),
								" ",
								displayPhone
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }), " Bangalore, India"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-success",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-4 w-4" }), " 2FA enabled"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-5 w-full bg-gradient-to-br from-primary to-primary-glow",
					children: "Edit photo"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "lg:col-span-2 p-6 rounded-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold mb-4",
					children: "Account details"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "firstName",
							children: "First name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "firstName",
							value: formData.firstName,
							onChange: (e) => setFormData({
								...formData,
								firstName: e.target.value
							}),
							className: "mt-1.5"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "lastName",
							children: "Last name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "lastName",
							value: formData.lastName,
							onChange: (e) => setFormData({
								...formData,
								lastName: e.target.value
							}),
							className: "mt-1.5"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "profileEmail",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "profileEmail",
								value: displayEmail,
								disabled: true,
								className: "mt-1.5"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "profilePhone",
							children: "Phone"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "profilePhone",
							value: formData.phone,
							onChange: (e) => setFormData({
								...formData,
								phone: e.target.value
							}),
							className: "mt-1.5"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "profileRole",
							children: "Role"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "profileRole",
							value: displayRole,
							disabled: true,
							className: "mt-1.5"
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => profile && setFormData({
							firstName: profile.name.split(" ")[0] || "",
							lastName: profile.name.split(" ").slice(1).join(" ") || "",
							phone: profile.phone || ""
						}),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						disabled: loading,
						onClick: handleSave,
						className: "bg-gradient-to-br from-primary to-primary-glow",
						children: loading ? "Saving..." : "Save changes"
					})]
				})
			]
		})]
	})] });
}
//#endregion
export { Profile as component };
