import { f as getLocalizedText, t as Button } from "./router-DAnu6P_r.mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { it as Check, t as X } from "../_libs/lucide-react.mjs";
import { t as useFirebaseCollection } from "./useFirebaseData-BghabcpM.mjs";
import { t as DataPage } from "./DataPage-8Z6gN8yJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/marketplace.cattle-C-lo1ZOd.js
var import_jsx_runtime = require_jsx_runtime();
function CattleMarketplacePage() {
	const { data: listings = [], isLoading } = useFirebaseCollection("cattle-marketplace");
	const pendingCount = listings.filter((l) => (getLocalizedText(l.status) || "").toLowerCase() === "pending").length;
	const approvedCount = listings.filter((l) => (getLocalizedText(l.status) || "").toLowerCase() === "approved" || !l.status).length;
	const rejectedCount = listings.filter((l) => (getLocalizedText(l.status) || "").toLowerCase() === "rejected").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataPage, {
		title: "Cattle marketplace moderation",
		description: "Review and approve cattle listings from the cattle-marketplace collection.",
		primaryAction: "",
		filters: [
			"Approved",
			"Pending",
			"Rejected"
		],
		statusKey: "status",
		kpis: [
			{
				label: "Total listings",
				value: isLoading ? "…" : listings.length.toLocaleString()
			},
			{
				label: "Approved / Active",
				value: isLoading ? "…" : approvedCount.toLocaleString()
			},
			{
				label: "Pending review",
				value: isLoading ? "…" : pendingCount.toLocaleString()
			},
			{
				label: "Rejected",
				value: isLoading ? "…" : rejectedCount.toLocaleString()
			}
		],
		data: listings.map((l) => ({
			...l,
			status: getLocalizedText(l.status, "Approved"),
			title: getLocalizedText(l.title || l.breed || l.cattleType || l.name, "Cattle Listing"),
			seller: getLocalizedText(l.sellerName || l.sellerId || l.postedBy, "—"),
			price: l.price ? typeof l.price === "number" ? `₹${l.price.toLocaleString()}` : String(l.price).startsWith("₹") ? l.price : `₹${getLocalizedText(l.price)}` : "—",
			state: getLocalizedText(l.state || l.location || l.district, "—")
		})),
		columns: [
			{
				key: "id",
				label: "Listing ID",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs",
					children: getLocalizedText(r.id)
				})
			},
			{
				key: "title",
				label: "Animal / Breed",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [r.images?.[0] || r.imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: r.images?.[0] || r.imageUrl,
						alt: "",
						className: "h-8 w-8 rounded-lg object-cover bg-muted"
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: getLocalizedText(r.title)
					})]
				})
			},
			{
				key: "seller",
				label: "Seller / Owner"
			},
			{
				key: "price",
				label: "Price",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold",
					children: getLocalizedText(r.price)
				})
			},
			{
				key: "state",
				label: "Location"
			},
			{
				key: "status",
				label: "Status"
			},
			{
				key: "actions",
				label: "",
				render: (r) => r.status === "Pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-1.5 justify-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						className: "h-8 px-2 text-success border-success/30 hover:bg-success/10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						className: "h-8 px-2 text-destructive border-destructive/30 hover:bg-destructive/10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				}) : null,
				className: "text-right"
			}
		]
	});
}
//#endregion
export { CattleMarketplacePage as component };
