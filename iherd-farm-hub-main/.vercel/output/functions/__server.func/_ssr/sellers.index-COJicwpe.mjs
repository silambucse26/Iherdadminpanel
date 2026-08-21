import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as useAdminUsers } from "./useAdminUsers-Dc8vArwR.mjs";
import { t as DataPage } from "./DataPage-8Z6gN8yJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sellers.index-COJicwpe.js
var import_jsx_runtime = require_jsx_runtime();
function SellersPage() {
	const { data: allUsers = [] } = useAdminUsers();
	const sellers = allUsers.filter((u) => u && (u.seller && typeof u.seller === "object" && Object.keys(u.seller).length > 0 || u.roles && u.roles.includes("seller"))).map((u) => {
		const sellerProfile = u.seller || {};
		return {
			id: u.uid || u.id,
			name: sellerProfile.name || sellerProfile.shopName || u.displayName || u.name || "Unknown Seller",
			category: sellerProfile.category || "—",
			products: sellerProfile.products || 0,
			gmv: sellerProfile.gmv || "—",
			rating: sellerProfile.rating || 0,
			status: u.status || "Active",
			verified: sellerProfile.verified || false
		};
	});
	const totalSellers = sellers.length;
	const verifiedSellers = sellers.filter((s) => s.verified).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataPage, {
		title: "Seller management",
		description: "Manage marketplace sellers — feed, equipment, medicines and cattle.",
		primaryAction: "Add seller",
		filters: [
			"Active",
			"Pending",
			"Suspended"
		],
		kpis: [
			{
				label: "Total sellers",
				value: totalSellers.toLocaleString()
			},
			{
				label: "Verified",
				value: verifiedSellers.toLocaleString()
			},
			{
				label: "GMV (30d)",
				value: "₹0"
			},
			{
				label: "Avg payout",
				value: "₹0"
			}
		],
		data: sellers,
		rowHref: (row) => `/users/${row.id}`,
		columns: [
			{
				key: "name",
				label: "Seller",
				render: (row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/users/$userId",
					params: { userId: row.id },
					className: "font-medium text-primary hover:underline underline-offset-2",
					children: row.name
				})
			},
			{
				key: "category",
				label: "Category"
			},
			{
				key: "products",
				label: "Products"
			},
			{
				key: "gmv",
				label: "GMV (30d)"
			},
			{
				key: "rating",
				label: "Rating"
			},
			{
				key: "status",
				label: "Status"
			}
		]
	});
}
//#endregion
export { SellersPage as component };
