import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as DataPage } from "./DataPage-8Z6gN8yJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders.products-vDjOfYNk.js
var import_jsx_runtime = require_jsx_runtime();
var API_BASE = "http://localhost:5000".replace(/\/$/, "") || "https://iherdadminpanel.onrender.com";
async function fetchProductOrders() {
	try {
		const res = await fetch(`${API_BASE}/api/admin/product-orders`);
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		return (await res.json()).orders || [];
	} catch (err) {
		console.warn("Error fetching product orders from backend:", err);
		return [];
	}
}
function ProductOrdersPage() {
	const { data: orders = [], isLoading } = useQuery({
		queryKey: ["adminProductOrders"],
		queryFn: fetchProductOrders,
		placeholderData: [],
		staleTime: 15e3
	});
	const totalCount = orders.length;
	const processingCount = orders.filter((o) => (o.status || "").toLowerCase() === "processing" || (o.status || "").toLowerCase() === "pending").length;
	const completedCount = orders.filter((o) => (o.status || "").toLowerCase() === "completed" || (o.status || "").toLowerCase() === "delivered").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataPage, {
		title: "Product orders",
		description: "All marketplace orders from ProductOrders and received_orders collections.",
		primaryAction: "",
		filters: [
			"Pending",
			"Processing",
			"Shipped",
			"Completed",
			"Cancelled"
		],
		statusKey: "status",
		kpis: [
			{
				label: "Total orders",
				value: isLoading ? "…" : totalCount.toLocaleString()
			},
			{
				label: "Processing / Pending",
				value: isLoading ? "…" : processingCount.toLocaleString()
			},
			{
				label: "Completed",
				value: isLoading ? "…" : completedCount.toLocaleString()
			},
			{
				label: "Cancelled",
				value: isLoading ? "…" : orders.filter((o) => (o.status || "").toLowerCase() === "cancelled").length.toLocaleString()
			}
		],
		data: orders.map((o) => ({
			...o,
			status: o.status || "Pending",
			id: o.id || o.orderId || "—",
			farmer: o.userName || o.buyerName || o.userId || "—",
			seller: o.sellerName || o.sellerId || "—",
			items: o.items?.length ? `${o.items.length} items` : o.productName || o.itemTitle || "1 item",
			amount: o.totalAmount ? typeof o.totalAmount === "number" ? `₹${o.totalAmount.toLocaleString()}` : o.totalAmount : o.amount ? `₹${o.amount}` : "—",
			date: o.createdAt?.seconds ? (/* @__PURE__ */ new Date(o.createdAt.seconds * 1e3)).toLocaleDateString() : o.createdAt || o.date || "—"
		})),
		columns: [
			{
				key: "id",
				label: "Order ID",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs",
					children: r.id
				})
			},
			{
				key: "farmer",
				label: "Buyer / User"
			},
			{
				key: "seller",
				label: "Seller"
			},
			{
				key: "items",
				label: "Items"
			},
			{
				key: "amount",
				label: "Amount",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold",
					children: r.amount
				})
			},
			{
				key: "date",
				label: "Date"
			},
			{
				key: "status",
				label: "Status"
			}
		]
	});
}
//#endregion
export { ProductOrdersPage as component };
