import { f as getLocalizedText } from "./router-DAnu6P_r.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as useFirebaseCollection } from "./useFirebaseData-BghabcpM.mjs";
import { t as useAdminUsers } from "./useAdminUsers-Dc8vArwR.mjs";
import { t as DataPage } from "./DataPage-8Z6gN8yJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/users.index-CZ-n3C1x.js
var import_jsx_runtime = require_jsx_runtime();
function UsersPage() {
	const { data: authUsers = [], isLoading: authLoading } = useAdminUsers();
	const { data: firestoreUsers = [], isLoading: firestoreLoading } = useFirebaseCollection("users");
	const sortedUsers = [...authUsers.map((authUser) => {
		const fsUser = firestoreUsers.find((fu) => fu.id === authUser.uid || fu.uid === authUser.uid);
		const roles = fsUser?.roles || (fsUser?.role ? [fsUser.role] : authUser.roles || ["User"]);
		let primaryRole = "other";
		if (roles.includes("farmer") || fsUser && (fsUser.farms || fsUser.farmer)) primaryRole = "farmer";
		else if (roles.includes("seller") || fsUser && fsUser.seller) primaryRole = "seller";
		else if (roles.includes("veterinarian") || roles.includes("vet") || fsUser && (fsUser.veterinarian || fsUser.vet)) primaryRole = "veterinarian";
		return {
			...authUser,
			roles,
			role: primaryRole,
			displayName: fsUser?.name || fsUser?.displayName || authUser.displayName || "User",
			phoneNumber: fsUser?.phoneNumber || fsUser?.phone || authUser.phoneNumber || "—",
			createdAt: fsUser?.createdAt ? fsUser.createdAt.seconds ? fsUser.createdAt.seconds * 1e3 : fsUser.createdAt : authUser.createdAt,
			lastLoginAt: authUser.lastLoginAt || fsUser?.updatedAt || null,
			farms: fsUser?.farms || null,
			farmer: fsUser?.farmer || null,
			seller: fsUser?.seller || null,
			veterinarian: fsUser?.veterinarian || fsUser?.vet || null
		};
	})].sort((a, b) => {
		const timeA = a.lastLoginAt ? new Date(a.lastLoginAt).getTime() : 0;
		const timeB = b.lastLoginAt ? new Date(b.lastLoginAt).getTime() : 0;
		if (timeA === 0 && timeB === 0) return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
		return timeB - timeA;
	});
	const totalUsers = sortedUsers.length;
	const farmerUsers = sortedUsers.filter((u) => u.role === "farmer").length;
	const sellerUsers = sortedUsers.filter((u) => u.role === "seller").length;
	const vetUsers = sortedUsers.filter((u) => u.role === "veterinarian").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataPage, {
		title: "User Accounts",
		description: "View app users, registration dates, phone numbers, and roles from Firebase Auth & Firestore.",
		primaryAction: "",
		filters: [
			"Farmer",
			"Seller",
			"Veterinarian",
			"Other"
		],
		statusKey: "role",
		rowHref: (r) => `/users/${r.uid}`,
		kpis: [
			{
				label: "Total Users",
				value: totalUsers.toLocaleString()
			},
			{
				label: "Farmers",
				value: farmerUsers.toLocaleString()
			},
			{
				label: "Sellers",
				value: sellerUsers.toLocaleString()
			},
			{
				label: "Vets",
				value: vetUsers.toLocaleString()
			}
		],
		data: sortedUsers,
		columns: [
			{
				key: "uid",
				label: "User ID / UID",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/users/$userId",
					params: { userId: r.uid },
					className: "flex items-center gap-3 min-w-0 group hover:underline decoration-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary text-xs font-semibold",
						children: "US"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-xs font-medium truncate max-w-[150px] group-hover:text-primary transition-colors",
							children: r.uid
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground truncate",
							children: r.email || "No email"
						})]
					})]
				})
			},
			{
				key: "phoneNumber",
				label: "Phone Number",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium",
					children: r.phoneNumber || "—"
				})
			},
			{
				key: "roles",
				label: "Roles",
				render: (r) => {
					const rolesList = r.roles || (r.role ? [r.role] : []);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1",
						children: rolesList.length > 0 ? rolesList.map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20",
							children: role
						}, role)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground text-xs",
							children: "—"
						})
					});
				}
			},
			{
				key: "profileDetails",
				label: "Profile Details",
				render: (r) => {
					if (r.farms && typeof r.farms === "object" && !Array.isArray(r.farms) || r.farmer && typeof r.farmer === "object") {
						const farmerInfo = r.farmer || r.farms || {};
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-primary",
									children: "🌾 Farm: "
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: getLocalizedText(farmerInfo.name, "Unnamed Farm") }),
								farmerInfo.state && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground",
									children: [
										" (",
										getLocalizedText(farmerInfo.state),
										")"
									]
								})
							]
						});
					}
					if (r.seller && typeof r.seller === "object") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-emerald-600",
								children: "🏪 Store: "
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: getLocalizedText(r.seller.name || r.seller.shopName, "Unnamed Store") }),
							r.seller.category && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: [
									" (",
									getLocalizedText(r.seller.category),
									")"
								]
							})
						]
					});
					if (r.veterinarian && typeof r.veterinarian === "object") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-sky-600",
								children: "🩺 Vet: "
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: getLocalizedText(r.veterinarian.clinic || r.veterinarian.hospital, "Unnamed Clinic") }),
							r.veterinarian.qualification && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: [
									" (",
									getLocalizedText(r.veterinarian.qualification),
									")"
								]
							})
						]
					});
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground text-xs",
						children: "—"
					});
				}
			},
			{
				key: "createdAt",
				label: "Created At",
				render: (r) => {
					if (!r.createdAt) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground text-xs",
						children: "—"
					});
					const date = new Date(r.createdAt);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs",
						children: date.toLocaleString()
					});
				}
			}
		]
	});
}
//#endregion
export { UsersPage as component };
