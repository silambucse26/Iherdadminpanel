import { f as getLocalizedText, t as Button } from "./router-DAnu6P_r.mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { it as Check, t as X } from "../_libs/lucide-react.mjs";
import { t as useFirebaseCollection } from "./useFirebaseData-BghabcpM.mjs";
import { t as DataPage } from "./DataPage-8Z6gN8yJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/marketplace.products-CA-ZGdOJ.js
var import_jsx_runtime = require_jsx_runtime();
function ProductsMarketplacePage() {
	const { data: products = [], isLoading } = useFirebaseCollection("product_marketplace/main/products");
	const approvedCount = products.filter((p) => (getLocalizedText(p.status) || "").toLowerCase() === "approved" || (getLocalizedText(p.status) || "").toLowerCase() === "active" || !p.status).length;
	const pendingCount = products.filter((p) => (getLocalizedText(p.status) || "").toLowerCase() === "pending").length;
	const outOfStockCount = products.filter((p) => (getLocalizedText(p.status) || "").toLowerCase() === "out of stock" || p.stock === 0 || p.quantity === 0).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataPage, {
		title: "Product marketplace moderation",
		description: "Review and manage products from product_marketplace/main/products.",
		primaryAction: "",
		filters: [
			"Approved",
			"Pending",
			"Out of stock",
			"Rejected"
		],
		statusKey: "status",
		kpis: [
			{
				label: "Total products",
				value: isLoading ? "…" : products.length.toLocaleString()
			},
			{
				label: "Active products",
				value: isLoading ? "…" : approvedCount.toLocaleString()
			},
			{
				label: "Pending review",
				value: isLoading ? "…" : pendingCount.toLocaleString()
			},
			{
				label: "Out of stock",
				value: isLoading ? "…" : outOfStockCount.toLocaleString()
			}
		],
		data: products.map((p) => ({
			...p,
			status: getLocalizedText(p.status, p.stock === 0 ? "Out of stock" : "Approved"),
			title: getLocalizedText(p.title || p.productName || p.name, "Product"),
			seller: getLocalizedText(p.sellerName || p.postedByUid || p.sellerId, "—"),
			category: getLocalizedText(p.categoryName || p.category || p.subCategory, "General"),
			price: p.price ? typeof p.price === "number" ? `₹${p.price.toLocaleString()}` : String(p.price).startsWith("₹") ? p.price : `₹${getLocalizedText(p.price)}` : "—"
		})),
		columns: [
			{
				key: "id",
				label: "Product ID",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs",
					children: getLocalizedText(r.id)
				})
			},
			{
				key: "title",
				label: "Product Name",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [r.images?.[0] || r.imageUrl || r.thumbnail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: r.images?.[0] || r.imageUrl || r.thumbnail,
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
				label: "Seller"
			},
			{
				key: "category",
				label: "Category"
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
export { ProductsMarketplacePage as component };
