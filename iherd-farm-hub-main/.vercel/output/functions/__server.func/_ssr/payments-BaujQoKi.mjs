import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as useFirebaseCollection } from "./useFirebaseData-BghabcpM.mjs";
import { t as DataPage } from "./DataPage-8Z6gN8yJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/payments-BaujQoKi.js
var import_jsx_runtime = require_jsx_runtime();
function PaymentsPage() {
	const { data: payments = [], isLoading } = useFirebaseCollection("payments");
	const total = payments.length;
	const paid = payments.filter((p) => p.status === "Paid" || p.status === "paid").length;
	const pending = payments.filter((p) => p.status === "Pending" || p.status === "pending").length;
	const failed = payments.filter((p) => p.status === "Failed" || p.status === "failed").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataPage, {
		title: "Payments & commissions",
		description: "Transactions, payouts and platform commissions from Firestore.",
		primaryAction: "",
		filters: [
			"Paid",
			"Pending",
			"Failed"
		],
		statusKey: "status",
		kpis: [
			{
				label: "Total transactions",
				value: isLoading ? "…" : total.toLocaleString()
			},
			{
				label: "Paid",
				value: isLoading ? "…" : paid.toLocaleString()
			},
			{
				label: "Pending",
				value: isLoading ? "…" : pending.toLocaleString()
			},
			{
				label: "Failed",
				value: isLoading ? "…" : failed.toLocaleString()
			}
		],
		data: payments,
		columns: [
			{
				key: "id",
				label: "Transaction",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs",
					children: r.id || r.transactionId || "—"
				})
			},
			{
				key: "party",
				label: "Party",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.party || r.name || r.userName || r.userId || "—" })
			},
			{
				key: "type",
				label: "Type",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.type || r.paymentType || "—" })
			},
			{
				key: "method",
				label: "Method",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.method || r.paymentMethod || "—" })
			},
			{
				key: "amount",
				label: "Amount",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold",
					children: r.amount ? `₹${Number(r.amount).toLocaleString()}` : "—"
				})
			},
			{
				key: "createdAt",
				label: "Date",
				render: (r) => {
					const d = r.createdAt?.seconds ? /* @__PURE__ */ new Date(r.createdAt.seconds * 1e3) : r.createdAt ? new Date(r.createdAt) : null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs",
						children: d ? d.toLocaleString() : "—"
					});
				}
			},
			{
				key: "status",
				label: "Status"
			}
		]
	});
}
//#endregion
export { PaymentsPage as component };
