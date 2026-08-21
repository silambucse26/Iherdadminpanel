import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as useFirebaseCollection } from "./useFirebaseData-BghabcpM.mjs";
import { t as DataPage } from "./DataPage-8Z6gN8yJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/support-DAS3r5hs.js
var import_jsx_runtime = require_jsx_runtime();
function SupportPage() {
	const { data: issues = [], isLoading } = useFirebaseCollection("issues");
	const open = issues.filter((i) => (i.status || "").toLowerCase() === "open").length;
	const pending = issues.filter((i) => (i.status || "").toLowerCase() === "pending").length;
	const closed = issues.filter((i) => (i.status || "").toLowerCase() === "closed").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataPage, {
		title: "Customer issues",
		description: "Customer issues queue across farmers and sellers from Firestore.",
		primaryAction: "",
		filters: [
			"Open",
			"Pending",
			"Closed"
		],
		statusKey: "status",
		kpis: [
			{
				label: "Total tickets",
				value: isLoading ? "…" : issues.length.toLocaleString()
			},
			{
				label: "Open",
				value: isLoading ? "…" : open.toLocaleString()
			},
			{
				label: "Pending",
				value: isLoading ? "…" : pending.toLocaleString()
			},
			{
				label: "Closed",
				value: isLoading ? "…" : closed.toLocaleString()
			}
		],
		data: issues,
		columns: [
			{
				key: "id",
				label: "Ticket",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs",
					children: r.id || r.ticketId || "—"
				})
			},
			{
				key: "from",
				label: "From",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.from || r.userName || r.userId || r.name || "—" })
			},
			{
				key: "subject",
				label: "Subject",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.subject || r.title || r.description || "—" })
			},
			{
				key: "priority",
				label: "Priority",
				render: (r) => {
					const p = r.priority || "—";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `inline-flex rounded-md px-2 py-0.5 text-xs font-medium ${p === "High" ? "bg-destructive/15 text-destructive" : p === "Medium" ? "bg-warning/15 text-warning-foreground" : "bg-muted text-muted-foreground"}`,
						children: p
					});
				}
			},
			{
				key: "agent",
				label: "Agent",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.agent || r.assignedTo || "—" })
			},
			{
				key: "updatedAt",
				label: "Updated",
				render: (r) => {
					const d = r.updatedAt?.seconds ? /* @__PURE__ */ new Date(r.updatedAt.seconds * 1e3) : r.updatedAt ? new Date(r.updatedAt) : null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs",
						children: d ? d.toLocaleString() : r.updated || "—"
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
export { SupportPage as component };
