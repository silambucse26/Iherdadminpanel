import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as DataPage } from "./DataPage-8Z6gN8yJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders.cattle-1GlSqtTy.js
var import_jsx_runtime = require_jsx_runtime();
var API_BASE = "http://localhost:5000".replace(/\/$/, "") || "https://iherdadminpanel.onrender.com";
async function fetchCattleOrders() {
	try {
		const res = await fetch(`${API_BASE}/api/admin/cattle-orders`);
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		return (await res.json()).orders || [];
	} catch (err) {
		console.warn("Error fetching cattle orders from backend:", err);
		return [];
	}
}
function CattleOrdersPage() {
	const { data: orders = [], isLoading } = useQuery({
		queryKey: ["adminCattleOrders"],
		queryFn: fetchCattleOrders,
		placeholderData: [],
		staleTime: 15e3
	});
	const totalCount = orders.length;
	const escrowCount = orders.filter((o) => (o.status || "").toLowerCase().includes("escrow") || (o.status || "").toLowerCase() === "pending").length;
	const completedCount = orders.filter((o) => (o.status || "").toLowerCase() === "completed" || (o.status || "").toLowerCase() === "delivered").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataPage, {
		title: "Cattle orders",
		description: "Track buyer–seller cattle transactions from CattleOrders collection.",
		primaryAction: "",
		filters: [
			"Pending",
			"In escrow",
			"In transit",
			"Completed",
			"Cancelled"
		],
		statusKey: "status",
		kpis: [
			{
				label: "Total cattle orders",
				value: isLoading ? "…" : totalCount.toLocaleString()
			},
			{
				label: "In escrow / Pending",
				value: isLoading ? "…" : escrowCount.toLocaleString()
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
			buyer: o.buyerName || o.userName || o.userId || "—",
			seller: o.sellerName || o.sellerId || "—",
			animal: o.cattleBreed || o.animalType || o.breed || o.title || "Cattle",
			amount: o.amount ? typeof o.amount === "number" ? `₹${o.amount.toLocaleString()}` : o.amount : o.price ? `₹${o.price}` : "—",
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
				key: "buyer",
				label: "Buyer"
			},
			{
				key: "seller",
				label: "Seller"
			},
			{
				key: "animal",
				label: "Animal"
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
export { CattleOrdersPage as component };
