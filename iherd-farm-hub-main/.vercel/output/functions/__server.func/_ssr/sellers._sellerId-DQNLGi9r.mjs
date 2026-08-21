import { o as __toESM } from "../_runtime.mjs";
import { i as Route$3, t as Button } from "./router-DAnu6P_r.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { D as Package, G as Eye, P as LogIn, Q as CircleX, W as FileText, c as TrendingUp, et as CircleCheck, f as Store, ft as Ban, g as ShoppingCart, ht as ArrowLeft, m as Star, pt as BadgeCheck } from "../_libs/lucide-react.mjs";
import { n as PageHeader, t as Card } from "./PageHeader-DLjNnuT_.mjs";
import { t as StatusBadge } from "./StatusBadge-BEhDgIFw.mjs";
import { t as useFirebaseCollection } from "./useFirebaseData-BghabcpM.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BF2dbrrB.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-CuHbu1N9.mjs";
import { t as ProfileHero } from "./ProfileHero-DSkzMvgH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sellers._sellerId-DQNLGi9r.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DOCUMENTS = [
	{
		name: "GST Certificate",
		type: "Tax",
		uploaded: "Jan 12, 2024",
		status: "Approved"
	},
	{
		name: "PAN Card",
		type: "ID Proof",
		uploaded: "Jan 12, 2024",
		status: "Approved"
	},
	{
		name: "Shop Establishment",
		type: "License",
		uploaded: "Jan 14, 2024",
		status: "Approved"
	},
	{
		name: "Bank Account Proof",
		type: "Banking",
		uploaded: "Jan 20, 2024",
		status: "Pending"
	}
];
var PRODUCTS = [
	{
		id: "P-7001",
		name: "Premium Cattle Feed 50kg",
		category: "Feed",
		price: "₹ 1,200",
		stock: 240,
		status: "Active"
	},
	{
		id: "P-7002",
		name: "Mineral Mixture 5kg",
		category: "Feed",
		price: "₹ 480",
		stock: 120,
		status: "Active"
	},
	{
		id: "P-7003",
		name: "Calcium Supplement",
		category: "Medicines",
		price: "₹ 320",
		stock: 0,
		status: "Out of stock"
	},
	{
		id: "P-7004",
		name: "Milking Machine Pro",
		category: "Equipment",
		price: "₹ 38,900",
		stock: 14,
		status: "Active"
	}
];
var ORDERS = [
	{
		id: "ORD-8821",
		buyer: "Selvam K",
		date: "Jun 14, 2026",
		items: "Feed x4",
		amount: "₹ 4,800",
		status: "Delivered"
	},
	{
		id: "ORD-8810",
		buyer: "Suresh Yadav",
		date: "Jun 11, 2026",
		items: "Mineral Mix",
		amount: "₹ 1,920",
		status: "Shipped"
	},
	{
		id: "ORD-8788",
		buyer: "Lakshmi Devi",
		date: "Jun 06, 2026",
		items: "Equipment",
		amount: "₹ 38,900",
		status: "Delivered"
	},
	{
		id: "ORD-8742",
		buyer: "Manoj Kumar",
		date: "May 28, 2026",
		items: "Supplements",
		amount: "₹ 1,280",
		status: "Pending"
	}
];
var PAYOUTS = [
	{
		id: "PAY-3321",
		date: "Jun 15, 2026",
		period: "Jun 1-14",
		amount: "₹ 1,84,200",
		status: "Paid"
	},
	{
		id: "PAY-3284",
		date: "Jun 01, 2026",
		period: "May 15-31",
		amount: "₹ 2,12,500",
		status: "Paid"
	},
	{
		id: "PAY-3251",
		date: "May 15, 2026",
		period: "May 1-14",
		amount: "₹ 1,68,900",
		status: "Paid"
	},
	{
		id: "PAY-3219",
		date: "May 01, 2026",
		period: "Apr 15-30",
		amount: "₹ 1,42,100",
		status: "Processing"
	}
];
var REVIEWS = [
	{
		buyer: "Selvam K",
		rating: 5,
		comment: "Top quality feed, fast delivery. Will buy again.",
		date: "Jun 14, 2026"
	},
	{
		buyer: "Manoj Kumar",
		rating: 4,
		comment: "Good products, packaging could be better.",
		date: "Jun 09, 2026"
	},
	{
		buyer: "Lakshmi Devi",
		rating: 5,
		comment: "Genuine items at fair prices. Recommended.",
		date: "Jun 02, 2026"
	}
];
var LOGIN_HISTORY = [
	{
		when: "Today, 09:20",
		device: "Chrome · Windows",
		ip: "103.21.58.12",
		location: "Ahmedabad, GJ",
		status: "Success"
	},
	{
		when: "Yesterday, 18:11",
		device: "iPhone 15 · iOS 18",
		ip: "103.21.58.12",
		location: "Ahmedabad, GJ",
		status: "Success"
	},
	{
		when: "3 days ago, 07:30",
		device: "Android · Pixel 7",
		ip: "49.36.112.4",
		location: "Surat, GJ",
		status: "Success"
	},
	{
		when: "1 week ago, 22:04",
		device: "Chrome · macOS",
		ip: "182.68.10.7",
		location: "Mumbai, MH",
		status: "Failed"
	}
];
function StatCard({ icon: Icon, label, value, highlight }) {
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
function SellerDetail() {
	const { sellerId } = Route$3.useParams();
	const { data: sellers } = useFirebaseCollection("sellers");
	const seller = sellers.find((s) => s.id === sellerId) ?? {
		id: sellerId,
		name: "Unknown Seller",
		category: "—",
		products: 0,
		gmv: "—",
		rating: 0,
		status: "Pending",
		owner: "—",
		phone: "—",
		email: "—",
		city: "—",
		state: "—",
		address: "—",
		joined: "—",
		lastLogin: "—",
		gstin: "—",
		verified: false,
		orders: 0,
		payouts: "—",
		returns: "—"
	};
	const [docs, setDocs] = (0, import_react.useState)(DOCUMENTS);
	const [status, setStatus] = (0, import_react.useState)(seller.status);
	const [verified, setVerified] = (0, import_react.useState)(seller.verified);
	const initials = seller.name.split(" ").map((n) => n[0]).slice(0, 2).join("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "ghost",
				size: "sm",
				className: "gap-1.5 -ml-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/sellers",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to sellers"]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Seller profile",
			description: `Manage and verify ${seller.name}'s account`,
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					className: "gap-1.5",
					onClick: () => {
						setStatus("Suspended");
						toast.warning(`${seller.name} suspended`);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "h-4 w-4" }), " Suspend"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					className: "gap-1.5 text-destructive",
					onClick: () => {
						setStatus("Rejected");
						toast.error(`${seller.name} rejected`);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4" }), " Reject"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					className: "gap-1.5 bg-blue-600 hover:bg-blue-700 text-white",
					onClick: () => {
						setStatus("Active");
						setVerified(true);
						setDocs((d) => d.map((x) => ({
							...x,
							status: "Approved"
						})));
						toast.success(`${seller.name} approved`);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }), " Approve"]
				})
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileHero, {
					name: seller.name,
					id: seller.id,
					subtitle: seller.category,
					subtitleIcon: Store,
					initials,
					status,
					verified,
					phone: seller.phone,
					email: seller.email,
					joined: seller.joined,
					location: `${seller.city}, ${seller.state}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-6 rounded-3xl shadow-sm border-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-base font-semibold mb-4",
						children: "Business overview"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
								icon: Package,
								label: "Products",
								value: seller.products,
								highlight: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
								icon: ShoppingCart,
								label: "Total orders",
								value: seller.orders
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
								icon: TrendingUp,
								label: "GMV (30d)",
								value: seller.gmv
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
								icon: Star,
								label: "Avg rating",
								value: `${seller.rating} / 5`
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
							children: "Verify KYC, tax and banking proofs"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							className: "gap-1.5 bg-blue-600 hover:bg-blue-700 text-white",
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
						defaultValue: "products",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
								className: "inline-flex flex-wrap h-auto w-fit justify-start gap-2 p-1.5 bg-muted/60 [&>*]:data-[state=active]:bg-primary [&>*]:data-[state=active]:text-primary-foreground [&>*]:data-[state=active]:shadow-md",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
										value: "products",
										children: [
											"Products (",
											PRODUCTS.length,
											")"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "orders",
										children: "Orders"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "payouts",
										children: "Payouts"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "reviews",
										children: "Reviews & ratings"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "logins",
										children: "Login history"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "products",
								className: "mt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "overflow-x-auto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
										className: "bg-muted/40 hover:bg-muted/40",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Product" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Category" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Price" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Stock" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" })
										]
									}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: PRODUCTS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											className: "font-medium",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-3.5 w-3.5 text-muted-foreground" }), p.name]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: p.category }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											className: "font-semibold",
											children: p.price
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: p.stock }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: p.status }) })
									] }, p.id)) })] })
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
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Buyer" }),
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
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: o.buyer }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											className: "text-muted-foreground",
											children: o.date
										}),
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
								value: "payouts",
								className: "mt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "overflow-x-auto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
										className: "bg-muted/40 hover:bg-muted/40",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Payout ID" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Date" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Period" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Amount" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" })
										]
									}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: PAYOUTS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											className: "font-mono text-xs",
											children: p.id
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: p.date }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											className: "text-muted-foreground",
											children: p.period
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											className: "font-semibold",
											children: p.amount
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: p.status }) })
									] }, p.id)) })] })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "reviews",
								className: "mt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-3",
									children: REVIEWS.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
										className: "p-4 rounded-2xl border-border/60",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold",
												children: r.buyer
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs text-muted-foreground",
												children: r.date
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex items-center gap-1",
												children: Array.from({ length: 5 }).map((_, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `h-4 w-4 ${idx < r.rating ? "fill-warning text-warning" : "text-muted-foreground/30"}` }, idx))
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground mt-2",
											children: r.comment
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
							})
						]
					})
				})
			]
		})
	] });
}
//#endregion
export { SellerDetail as component };
