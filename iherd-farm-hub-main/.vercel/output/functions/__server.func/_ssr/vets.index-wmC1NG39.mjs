import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as StatusBadge } from "./StatusBadge-BEhDgIFw.mjs";
import { t as useAdminUsers } from "./useAdminUsers-Dc8vArwR.mjs";
import { t as DataPage } from "./DataPage-8Z6gN8yJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vets.index-wmC1NG39.js
var import_jsx_runtime = require_jsx_runtime();
function VetsPage() {
	const { data: allUsers = [] } = useAdminUsers();
	const vets = allUsers.filter((u) => u && (u.veterinarian && typeof u.veterinarian === "object" || u.vet && typeof u.vet === "object" || u.roles && (u.roles.includes("veterinarian") || u.roles.includes("vet")))).map((u) => {
		const vetDetails = u.veterinarian || u.vet || {};
		return {
			id: u.uid || u.id,
			name: vetDetails.name || u.displayName || u.name || "Unknown Vet",
			clinic: vetDetails.clinic || vetDetails.hospital || "—",
			qualification: vetDetails.qualification || "—",
			experience: vetDetails.experience ? `${vetDetails.experience} Years` : "—",
			joined: u.createdAt ? new Date(u.createdAt.seconds ? u.createdAt.seconds * 1e3 : u.createdAt).toLocaleDateString() : u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—",
			status: u.status || "Active",
			verified: vetDetails.verified || false
		};
	});
	const totalVets = vets.length;
	const activeVets = vets.filter((v) => v.status === "Active").length;
	const pendingVets = vets.filter((v) => v.status === "Pending" || v.status === "In Review").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataPage, {
		title: "Veterinarian management",
		description: "Approve certifications, qualifications, and manage veterinary doctors on iHerd.",
		primaryAction: "Register vet",
		filters: [
			"Active",
			"Pending",
			"Suspended"
		],
		rowHref: (r) => `/users/${r.id}`,
		kpis: [
			{
				label: "Total Veterinarians",
				value: totalVets.toLocaleString()
			},
			{
				label: "Active Doctors",
				value: activeVets.toLocaleString()
			},
			{
				label: "Pending Verification",
				value: pendingVets.toLocaleString()
			},
			{
				label: "Joined this month",
				value: "0"
			}
		],
		data: vets,
		columns: [
			{
				key: "name",
				label: "Veterinarian",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/users/$userId",
					params: { userId: r.id },
					className: "flex items-center gap-3 min-w-0 group",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary text-xs font-semibold",
						children: "DR"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-medium truncate group-hover:text-primary transition-colors",
							children: r.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground truncate",
							children: r.id
						})]
					})]
				})
			},
			{
				key: "clinic",
				label: "Clinic / Hospital"
			},
			{
				key: "qualification",
				label: "Qualification"
			},
			{
				key: "experience",
				label: "Experience"
			},
			{
				key: "joined",
				label: "Joined"
			},
			{
				key: "status",
				label: "Status",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: r.status })
			}
		]
	});
}
//#endregion
export { VetsPage as component };
