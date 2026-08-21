import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as StatusBadge } from "./StatusBadge-BEhDgIFw.mjs";
import { t as useAdminUsers } from "./useAdminUsers-Dc8vArwR.mjs";
import { t as DataPage } from "./DataPage-8Z6gN8yJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/farmers.index-xIpskdr3.js
var import_jsx_runtime = require_jsx_runtime();
function FarmersPage() {
	const { data: allUsers = [] } = useAdminUsers();
	const farmers = allUsers.filter((u) => u && (u.farms && (typeof u.farms === "object" || Array.isArray(u.farms)) || u.farmer && typeof u.farmer === "object" && Object.keys(u.farmer).length > 0 || u.roles && u.roles.includes("farmer"))).map((u) => {
		const farmerProfile = u.farmer || {};
		const farmDetails = u.farms && !Array.isArray(u.farms) ? u.farms : {};
		return {
			id: u.uid || u.id,
			name: farmerProfile.name || farmDetails.name || u.displayName || u.name || "Unknown Farmer",
			farm: farmDetails.name || farmerProfile.village || farmerProfile.address || "—",
			state: farmerProfile.state || farmDetails.state || "—",
			cattle: farmDetails.cattle || farmerProfile.cattle || u.cattle || 0,
			joined: u.createdAt ? new Date(u.createdAt.seconds ? u.createdAt.seconds * 1e3 : u.createdAt).toLocaleDateString() : u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—",
			status: u.status || "Active"
		};
	});
	const totalFarmers = farmers.length;
	const activeFarmers = farmers.filter((f) => f.status === "Active").length;
	const pendingFarmers = farmers.filter((f) => f.status === "Pending").length;
	const suspendedFarmers = farmers.filter((f) => f.status === "Suspended").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataPage, {
		title: "Farmer management",
		description: "Onboard, verify and manage farmers on iHerd.",
		primaryAction: "Add farmer",
		filters: [
			"Active",
			"Pending",
			"Suspended"
		],
		rowHref: (r) => `/users/${r.id}`,
		kpis: [
			{
				label: "Total farmers",
				value: totalFarmers.toLocaleString(),
				hint: `+${pendingFarmers} pending KYC`
			},
			{
				label: "Active",
				value: activeFarmers.toLocaleString()
			},
			{
				label: "Pending KYC",
				value: pendingFarmers.toLocaleString()
			},
			{
				label: "Suspended",
				value: suspendedFarmers.toLocaleString()
			}
		],
		data: farmers,
		columns: [
			{
				key: "name",
				label: "Farmer",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/users/$userId",
					params: { userId: r.id },
					className: "flex items-center gap-3 min-w-0 group",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary text-xs font-semibold",
						children: r.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
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
				key: "farm",
				label: "Farm"
			},
			{
				key: "state",
				label: "State"
			},
			{
				key: "cattle",
				label: "Cattle",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium",
					children: r.cattle
				})
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
export { FarmersPage as component };
