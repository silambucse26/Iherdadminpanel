import { o as __toESM } from "../_runtime.mjs";
import { a as Route$9, t as Button } from "./router-DAnu6P_r.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { F as Lock, G as Eye, J as EllipsisVertical, P as LogIn, Q as CircleX, W as FileText, X as Clock, ct as Building2, dt as Beef, et as CircleCheck, f as Store, ft as Ban, g as ShoppingCart, ht as ArrowLeft, pt as BadgeCheck, s as TriangleAlert, u as Tractor } from "../_libs/lucide-react.mjs";
import { n as PageHeader, t as Card } from "./PageHeader-DLjNnuT_.mjs";
import { t as StatusBadge } from "./StatusBadge-BEhDgIFw.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BF2dbrrB.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-CuHbu1N9.mjs";
import { t as ProfileHero } from "./ProfileHero-DSkzMvgH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/farmers._farmerId-BvNRpuVk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var farmer_selvam_png_asset_default = {
	version: 1,
	asset_id: "41006d75-d985-4914-92a1-82ebc1f2042d",
	project_id: "002f0ed6-6615-423b-a1f8-8f25c7ecf40e",
	url: "/__l5e/assets-v1/41006d75-d985-4914-92a1-82ebc1f2042d/farmer-selvam.png",
	r2_key: "a/v1/002f0ed6-6615-423b-a1f8-8f25c7ecf40e/41006d75-d985-4914-92a1-82ebc1f2042d/farmer-selvam.png",
	original_filename: "farmer-selvam.png",
	size: 2235744,
	content_type: "image/png",
	created_at: "2026-06-18T10:42:58Z"
};
var FARMERS = {
	"F-1024": {
		id: "F-1024",
		name: "Selvam K",
		farm: "Patel Dairy Farm",
		state: "Gujarat",
		cattle: 84,
		joined: "Jan 12, 2024",
		status: "Active",
		phone: "+91 98250 11234",
		email: "ravi.patel@example.com",
		city: "Anand",
		address: "Plot 12, Village Sojitra, Anand, Gujarat 388450",
		verified: true
	},
	"F-1025": {
		id: "F-1025",
		name: "Suresh Yadav",
		farm: "Green Pastures",
		state: "UP",
		cattle: 56,
		joined: "Feb 02, 2024",
		status: "Active",
		phone: "+91 99100 23344",
		email: "suresh.y@example.com",
		city: "Meerut",
		address: "House 88, Sardhana Road, Meerut, UP 250001",
		verified: true
	},
	"F-1026": {
		id: "F-1026",
		name: "Lakshmi Devi",
		farm: "Devi Goshala",
		state: "Karnataka",
		cattle: 120,
		joined: "Feb 18, 2024",
		status: "Pending",
		phone: "+91 90080 55677",
		email: "lakshmi.d@example.com",
		city: "Mysuru",
		address: "Goshala Lane, Srirangapatna, Mysuru, KA 571438",
		verified: false
	},
	"F-1027": {
		id: "F-1027",
		name: "Manoj Kumar",
		farm: "Kumar Farms",
		state: "Punjab",
		cattle: 38,
		joined: "Mar 05, 2024",
		status: "Active",
		phone: "+91 98765 43210",
		email: "manoj.k@example.com",
		city: "Ludhiana",
		address: "Village Doraha, Ludhiana, Punjab 141421",
		verified: true
	},
	"F-1028": {
		id: "F-1028",
		name: "Rajesh Sharma",
		farm: "Sharma Dairy",
		state: "Haryana",
		cattle: 210,
		joined: "Mar 22, 2024",
		status: "Suspended",
		phone: "+91 99999 11122",
		email: "rajesh.s@example.com",
		city: "Karnal",
		address: "Sector 7, Karnal, Haryana 132001",
		verified: true
	},
	"F-1029": {
		id: "F-1029",
		name: "Priya Nair",
		farm: "Coastal Cattle",
		state: "Kerala",
		cattle: 24,
		joined: "Apr 04, 2024",
		status: "Active",
		phone: "+91 94470 88991",
		email: "priya.n@example.com",
		city: "Kochi",
		address: "Marine Drive, Kochi, Kerala 682011",
		verified: true
	},
	"F-1030": {
		id: "F-1030",
		name: "Arjun Singh",
		farm: "Singh Goshala",
		state: "Rajasthan",
		cattle: 92,
		joined: "Apr 19, 2024",
		status: "Pending",
		phone: "+91 97200 33445",
		email: "arjun.s@example.com",
		city: "Jaipur",
		address: "Tonk Road, Jaipur, Rajasthan 302015",
		verified: false
	}
};
var DOCUMENTS = [
	{
		name: "Aadhaar Card",
		type: "ID Proof",
		uploaded: "Jan 10, 2024",
		status: "Approved"
	},
	{
		name: "PAN Card",
		type: "ID Proof",
		uploaded: "Jan 10, 2024",
		status: "Approved"
	},
	{
		name: "Farm Ownership Deed",
		type: "Ownership",
		uploaded: "Jan 12, 2024",
		status: "Pending"
	},
	{
		name: "Land Records (7/12)",
		type: "Ownership",
		uploaded: "Jan 12, 2024",
		status: "Approved"
	}
];
var ALL_CATTLE = [
	{
		id: "C-2001",
		tag: "RFID-88231",
		breed: "Gir",
		age: "3y",
		status: "Farm",
		health: "Healthy"
	},
	{
		id: "C-2002",
		tag: "RFID-88232",
		breed: "Sahiwal",
		age: "5y",
		status: "Marketplace",
		health: "Healthy"
	},
	{
		id: "C-2003",
		tag: "RFID-88233",
		breed: "Holstein",
		age: "2y",
		status: "Farm",
		health: "Vaccinated"
	},
	{
		id: "C-2004",
		tag: "RFID-88234",
		breed: "Jersey",
		age: "4y",
		status: "Marketplace",
		health: "Healthy"
	},
	{
		id: "C-2005",
		tag: "RFID-88235",
		breed: "Red Sindhi",
		age: "6y",
		status: "Farm",
		health: "Under care"
	},
	{
		id: "C-2006",
		tag: "RFID-88236",
		breed: "Gir",
		age: "1y",
		status: "Marketplace",
		health: "Healthy"
	}
];
var ACTIVITY = [
	{
		when: "2h ago",
		action: "Listed 'Gir Cow' on marketplace",
		meta: "C-2006"
	},
	{
		when: "Yesterday",
		action: "Updated profile address",
		meta: ""
	},
	{
		when: "3 days ago",
		action: "Uploaded ownership document",
		meta: "Land Records"
	},
	{
		when: "1 week ago",
		action: "Completed KYC verification",
		meta: "Aadhaar"
	},
	{
		when: "2 weeks ago",
		action: "Registered new cattle",
		meta: "C-2005"
	}
];
var LOGIN_HISTORY = [
	{
		when: "Today, 09:42",
		device: "iPhone 14 · iOS 17",
		ip: "103.21.58.12",
		location: "Anand, Gujarat",
		status: "Success"
	},
	{
		when: "Yesterday, 18:11",
		device: "Chrome · Windows",
		ip: "103.21.58.12",
		location: "Anand, Gujarat",
		status: "Success"
	},
	{
		when: "3 days ago, 07:30",
		device: "Android · Pixel 7",
		ip: "49.36.112.4",
		location: "Ahmedabad, Gujarat",
		status: "Success"
	},
	{
		when: "1 week ago, 22:04",
		device: "Chrome · macOS",
		ip: "182.68.10.7",
		location: "Mumbai, MH",
		status: "Failed"
	},
	{
		when: "2 weeks ago, 11:20",
		device: "Safari · iPad",
		ip: "103.21.58.12",
		location: "Anand, Gujarat",
		status: "Success"
	}
];
var ORDERS = [
	{
		id: "ORD-5521",
		date: "Jun 14, 2026",
		items: "Cattle Feed Premium x4",
		amount: "₹ 4,800",
		status: "Delivered"
	},
	{
		id: "ORD-5489",
		date: "Jun 02, 2026",
		items: "Veterinary Kit",
		amount: "₹ 2,150",
		status: "Delivered"
	},
	{
		id: "ORD-5402",
		date: "May 19, 2026",
		items: "Milking Machine",
		amount: "₹ 38,900",
		status: "Shipped"
	},
	{
		id: "ORD-5318",
		date: "May 04, 2026",
		items: "Mineral Mixture x10",
		amount: "₹ 1,250",
		status: "Pending"
	}
];
var MARKET_ACTIVITY = [
	{
		id: "L-9012",
		item: "Gir Cow · 3y",
		listed: "Jun 16, 2026",
		price: "₹ 85,000",
		views: 312,
		status: "Active"
	},
	{
		id: "L-8990",
		item: "Sahiwal Heifer",
		listed: "Jun 09, 2026",
		price: "₹ 62,000",
		views: 188,
		status: "Active"
	},
	{
		id: "L-8876",
		item: "Jersey Calf",
		listed: "May 28, 2026",
		price: "₹ 28,000",
		views: 421,
		status: "Sold"
	},
	{
		id: "L-8721",
		item: "Holstein Bull",
		listed: "May 12, 2026",
		price: "₹ 1,10,000",
		views: 96,
		status: "Withdrawn"
	}
];
function FarmStat({ icon: Icon, label, value, highlight }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: `p-4 rounded-2xl flex items-center gap-3 ${highlight ? "bg-primary/5 border-primary/30" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `grid h-11 w-11 shrink-0 place-items-center rounded-xl ${highlight ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-lg font-bold truncate",
				children: value
			})]
		})]
	});
}
function FarmerDetail() {
	const { farmerId } = Route$9.useParams();
	const farmer = FARMERS[farmerId] ?? {
		id: farmerId,
		name: "Unknown Farmer",
		farm: "—",
		state: "—",
		cattle: 0,
		joined: "—",
		status: "Pending",
		phone: "—",
		email: "—",
		city: "—",
		address: "—",
		verified: false
	};
	const [docs, setDocs] = (0, import_react.useState)(DOCUMENTS);
	const [status, setStatus] = (0, import_react.useState)(farmer.status);
	const [verified, setVerified] = (0, import_react.useState)(farmer.verified);
	const initials = farmer.name.split(" ").map((n) => n[0]).slice(0, 2).join("");
	const marketplaceCattle = ALL_CATTLE.filter((c) => c.status === "Marketplace");
	const farmCattle = ALL_CATTLE.filter((c) => c.status === "Farm");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "ghost",
				size: "sm",
				className: "gap-1.5 -ml-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/farmers",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to farmers"]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Farmer profile",
			description: `Manage and verify ${farmer.name}'s account`,
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					className: "gap-1.5",
					onClick: () => {
						setStatus("Suspended");
						toast.warning(`${farmer.name} suspended`);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "h-4 w-4" }), " Suspend"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					className: "gap-1.5 text-destructive",
					onClick: () => {
						setStatus("Rejected");
						toast.error(`${farmer.name} rejected`);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4" }), " Reject"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					className: "gap-1.5 bg-blue-600 hover:bg-blue-700 text-white",
					onClick: () => {
						setStatus("Active");
						toast.success(`${farmer.name} approved`);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }), " Approve"]
				})
			] })
		}),
		!verified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mb-6 p-4 rounded-2xl border-warning/40 bg-warning/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-warning/20 text-warning-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm font-semibold flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3.5 w-3.5" }), " Account access restricted — pending verification"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground mt-0.5",
							children: "This farmer cannot list cattle, accept orders, or use marketplace features until an admin verifies their documents and approves the account."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							className: "gap-1.5",
							onClick: () => {
								setStatus("Rejected");
								toast.error(`${farmer.name} rejected`);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4" }), " Reject"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							className: "gap-1.5 bg-blue-600 hover:bg-blue-700 text-white",
							onClick: () => {
								setStatus("Active");
								setVerified(true);
								setDocs((d) => d.map((x) => ({
									...x,
									status: "Approved"
								})));
								toast.success(`${farmer.name} verified & approved`);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-4 w-4" }), " Verify & approve"]
						})]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileHero, {
					name: farmer.name,
					id: farmer.id,
					subtitle: farmer.farm,
					subtitleIcon: Building2,
					avatarUrl: farmer.id === "F-1024" ? farmer_selvam_png_asset_default.url : "",
					initials,
					status,
					verified,
					phone: farmer.phone,
					email: farmer.email,
					joined: farmer.joined,
					location: `${farmer.city}, ${farmer.state}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-6 rounded-3xl shadow-sm border-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-base font-semibold mb-4",
						children: "Farm overview"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FarmStat, {
								icon: Building2,
								label: "Farm name",
								value: farmer.farm,
								highlight: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FarmStat, {
								icon: Tractor,
								label: "Total farms",
								value: 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FarmStat, {
								icon: Beef,
								label: "Cattle registered",
								value: farmer.cattle
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FarmStat, {
								icon: Store,
								label: "Cattle in market",
								value: marketplaceCattle.length
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-6 rounded-3xl shadow-sm border-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-4 gap-3 flex-wrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base font-semibold",
							children: "Uploaded documents"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground mt-0.5",
							children: "Review KYC and ownership proofs"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							className: "gap-1.5 bg-gradient-to-br from-primary to-primary-glow",
							onClick: () => {
								setDocs((d) => d.map((x) => ({
									...x,
									status: "Approved"
								})));
								setVerified(true);
								toast.success("All documents verified");
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-4 w-4" }), " Verify all documents"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							className: "bg-muted/40 hover:bg-muted/40",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Document" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Type" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Uploaded" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									className: "text-right",
									children: "Actions"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: docs.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: d.name
								})]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-muted-foreground",
								children: d.type
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-muted-foreground",
								children: d.uploaded
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: d.status }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "inline-flex gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											variant: "ghost",
											className: "gap-1.5",
											onClick: () => toast(`Viewing ${d.name}`),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" }), " View"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											variant: "ghost",
											className: "gap-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50",
											onClick: () => {
												setDocs((arr) => arr.map((x) => x.name === d.name ? {
													...x,
													status: "Approved"
												} : x));
												toast.success(`${d.name} approved`);
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }), " Approve"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											variant: "ghost",
											className: "gap-1.5 text-destructive hover:text-destructive",
											onClick: () => {
												setDocs((arr) => arr.map((x) => x.name === d.name ? {
													...x,
													status: "Rejected"
												} : x));
												toast.error(`${d.name} rejected`);
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4" }), " Reject"]
										})
									]
								})
							})
						] }, d.name)) })] })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "p-6 rounded-3xl shadow-sm border-border/60",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
						defaultValue: "all",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
								className: "inline-flex flex-wrap h-auto w-fit justify-start gap-2 p-1.5 bg-muted/60 [&>*]:data-[state=active]:bg-primary [&>*]:data-[state=active]:text-primary-foreground [&>*]:data-[state=active]:shadow-md",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
										value: "all",
										children: [
											"All Cattle (",
											ALL_CATTLE.length,
											")"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
										value: "market",
										children: [
											"Marketplace (",
											marketplaceCattle.length,
											")"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
										value: "farm",
										children: [
											"Farm (",
											farmCattle.length,
											")"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "activity",
										children: "Activity"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "logins",
										children: "Login history"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "orders",
										children: "Orders"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "listings",
										children: "Marketplace activity"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "all",
								className: "mt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CattleTable, { rows: ALL_CATTLE })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "market",
								className: "mt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CattleTable, { rows: marketplaceCattle })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "farm",
								className: "mt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CattleTable, { rows: farmCattle })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "activity",
								className: "mt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
									className: "relative border-l border-border ml-2 space-y-4 pl-5",
									children: ACTIVITY.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute -left-[27px] top-1 grid h-4 w-4 place-items-center rounded-full bg-primary/15 ring-4 ring-background",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-2.5 w-2.5 text-primary" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start justify-between gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-sm font-medium",
												children: a.action
											}), a.meta && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs text-muted-foreground",
												children: a.meta
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs text-muted-foreground whitespace-nowrap",
												children: a.when
											})]
										})]
									}, i))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "logins",
								className: "mt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "overflow-x-auto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
										className: "bg-muted/40 hover:bg-muted/40",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "When" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Device" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "IP" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Location" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" })
										]
									}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: LOGIN_HISTORY.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											className: "font-medium",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "h-3.5 w-3.5 text-muted-foreground" }), l.when]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: l.device }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											className: "font-mono text-xs",
											children: l.ip
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: l.location }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: l.status }) })
									] }, i)) })] })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "orders",
								className: "mt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "overflow-x-auto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
										className: "bg-muted/40 hover:bg-muted/40",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Order ID" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Date" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Items" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Amount" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" })
										]
									}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: ORDERS.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											className: "font-medium",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-3.5 w-3.5 text-muted-foreground" }), o.id]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: o.date }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: o.items }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											className: "font-semibold",
											children: o.amount
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: o.status }) })
									] }, o.id)) })] })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "listings",
								className: "mt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "overflow-x-auto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
										className: "bg-muted/40 hover:bg-muted/40",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Listing" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Item" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Listed on" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Price" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Views" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" })
										]
									}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: MARKET_ACTIVITY.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											className: "font-medium",
											children: m.id
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: m.item }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: m.listed }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											className: "font-semibold",
											children: m.price
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: m.views }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: m.status }) })
									] }, m.id)) })] })
								})
							})
						]
					})
				})
			]
		})
	] });
}
function CattleTable({ rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
			className: "bg-muted/40 hover:bg-muted/40",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { className: "w-12" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "ID" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Tag" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Breed" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Age" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Location" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Health" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { className: "w-12" })
			]
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, { children: [rows.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
			className: "cursor-pointer",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Beef, { className: "h-4 w-4" })
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-medium",
					children: c.id
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "inline-flex items-center rounded-full bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 text-xs font-medium",
					children: c.tag
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: c.breed }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: c.age }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: c.status }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: c.health }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-right",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon",
						variant: "ghost",
						className: "h-8 w-8",
						onClick: () => toast(`Options for ${c.id}`),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { className: "h-4 w-4" })
					})
				})
			]
		}, c.id)), rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			colSpan: 8,
			className: "text-center text-muted-foreground py-8",
			children: "No cattle in this view."
		}) })] })] })
	});
}
//#endregion
export { FarmerDetail as component };
