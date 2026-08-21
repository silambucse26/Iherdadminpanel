import { t as Button } from "./router-DAnu6P_r.mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { B as Image, w as Plus } from "../_libs/lucide-react.mjs";
import { n as PageHeader, t as Card } from "./PageHeader-DLjNnuT_.mjs";
import { t as StatusBadge } from "./StatusBadge-BEhDgIFw.mjs";
import { t as useFirebaseCollection } from "./useFirebaseData-BghabcpM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/banners-BvLjIWSi.js
var import_jsx_runtime = require_jsx_runtime();
var GRAD_COLORS = [
	"from-primary to-primary-glow",
	"from-info to-primary",
	"from-warning to-primary-glow",
	"from-muted-foreground to-primary",
	"from-success to-primary",
	"from-destructive to-primary-glow"
];
function Banners() {
	const { data: banners = [], isLoading } = useFirebaseCollection("banners");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Banners & advertisements",
		description: "Manage promotional banners across app and marketplace.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			size: "sm",
			className: "gap-1.5 bg-gradient-to-br from-primary to-primary-glow",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " New banner"]
		})
	}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
		children: [
			1,
			2,
			3,
			4
		].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "rounded-2xl overflow-hidden p-0 animate-pulse",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-32 bg-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 bg-muted rounded w-3/4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 bg-muted rounded w-1/2" })]
			})]
		}, i))
	}) : banners.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "rounded-2xl p-12 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-10 w-10 mx-auto text-muted-foreground mb-3" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-semibold",
				children: "No banners found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground mt-1",
				children: "No banner data in the Firestore 'banners' collection yet."
			})
		]
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
		children: banners.map((b, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "rounded-2xl overflow-hidden p-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `relative h-32 bg-gradient-to-br ${GRAD_COLORS[idx % GRAD_COLORS.length]}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 grid place-items-center text-white/90",
					children: b.imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: b.imageUrl,
						alt: b.title,
						className: "h-full w-full object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-8 w-8" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute top-3 right-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: b.status || "Draft" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-semibold truncate",
						children: b.title || b.name || "Untitled banner"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: b.placement || b.location || "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid grid-cols-2 gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: "Clicks"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-semibold",
							children: (b.clicks ?? 0).toLocaleString()
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: "CTR"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-semibold",
							children: b.ctr || "—"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							className: "flex-1",
							children: "Edit"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							className: "flex-1",
							children: "Pause"
						})]
					})
				]
			})]
		}, b.id || idx))
	})] });
}
//#endregion
export { Banners as component };
