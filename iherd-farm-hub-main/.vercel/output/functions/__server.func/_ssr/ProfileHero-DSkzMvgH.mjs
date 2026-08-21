import { o as __toESM } from "../_runtime.mjs";
import { d as cn, t as Button } from "./router-DAnu6P_r.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as AvatarFallback$1, p as require_jsx_runtime, r as AvatarImage$1, t as Avatar$1 } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { M as Mail, T as Phone, j as MapPin, k as MessageSquare, ot as Calendar, pt as BadgeCheck, y as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as Card } from "./PageHeader-DLjNnuT_.mjs";
import { t as StatusBadge } from "./StatusBadge-BEhDgIFw.mjs";
import { t as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProfileHero-DSkzMvgH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Avatar = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar$1, {
	ref,
	className: cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className),
	...props
}));
Avatar.displayName = Avatar$1.displayName;
var AvatarImage = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage$1, {
	ref,
	className: cn("aspect-square h-full w-full", className),
	...props
}));
AvatarImage.displayName = AvatarImage$1.displayName;
var AvatarFallback = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback$1, {
	ref,
	className: cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className),
	...props
}));
AvatarFallback.displayName = AvatarFallback$1.displayName;
function MetaItem({ icon: Icon, label, value, valueClass }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start gap-3 min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `text-sm font-semibold truncate ${valueClass ?? ""}`,
				children: value
			})]
		})]
	});
}
function ProfileHero({ name, id, subtitle, subtitleIcon: SubIcon, avatarUrl, initials, status, verified, phone, email, joined, location }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-6 rounded-3xl shadow-sm border-border/60",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 lg:grid-cols-[minmax(0,280px)_1fr] gap-6 items-stretch",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center text-center lg:items-start lg:text-left lg:border-r lg:border-border/60 lg:pr-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center lg:flex-row lg:items-center gap-4 w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
						className: "h-20 w-20 ring-4 ring-primary/15 shadow-md shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
							src: avatarUrl ?? "",
							alt: name,
							className: "object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
							className: "bg-gradient-to-br from-primary/20 to-primary/5 text-primary text-xl font-bold",
							children: initials
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-bold truncate",
								children: name
							}),
							subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-sm font-medium text-primary mt-0.5 flex items-center gap-1.5 justify-center lg:justify-start",
								children: [SubIcon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubIcon, { className: "h-3.5 w-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: subtitle
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground mt-0.5",
								children: id
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid grid-cols-2 gap-2 w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						className: "gap-1.5",
						onClick: () => toast(`Calling ${phone}`),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4" }), " Call"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						className: "gap-1.5",
						onClick: () => toast(`Messaging ${name}`),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-4 w-4" }), " Message"]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaItem, {
						icon: ShieldCheck,
						label: "Account status",
						value: status,
						valueClass: status === "Active" ? "text-success" : ""
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaItem, {
						icon: BadgeCheck,
						label: "Verification",
						value: verified ? "Verified" : "Pending verification",
						valueClass: verified ? "text-success" : "text-warning-foreground"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaItem, {
						icon: Phone,
						label: "Phone",
						value: phone
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaItem, {
						icon: Mail,
						label: "Email",
						value: email
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaItem, {
						icon: Calendar,
						label: "Joined on",
						value: joined
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaItem, {
						icon: MapPin,
						label: "Location",
						value: location
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 flex flex-wrap items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: `inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${verified ? "bg-success/15 text-success border-success/20" : "bg-warning/15 text-warning-foreground border-warning/30"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-3.5 w-3.5" }), verified ? "Verified account" : "Unverified account"]
			})]
		})]
	});
}
//#endregion
export { ProfileHero as t };
