import { o as __toESM } from "../_runtime.mjs";
import { c as useAuth, n as Input, t as Button } from "./router-DAnu6P_r.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { I as ListChecks, L as LifeBuoy, M as Mail, O as PackageCheck, _ as ShoppingBag, a as UserPlus, c as TrendingUp, d as Tag, dt as Beef, f as Store, l as TrendingDown, n as Wallet, o as UserCheck, pt as BadgeCheck, r as Users, x as Send, z as IndianRupee } from "../_libs/lucide-react.mjs";
import { n as PageHeader, t as Card } from "./PageHeader-DLjNnuT_.mjs";
import { t as StatusBadge } from "./StatusBadge-BEhDgIFw.mjs";
import { t as useFirebaseCollection } from "./useFirebaseData-BghabcpM.mjs";
import { t as Label } from "./label-I1Q4BVbY.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Esf2WVP3.mjs";
import { a as DialogFooter, c as DialogTrigger, i as DialogDescription, n as DialogClose, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-DI0ZIIwX.mjs";
import { t as useAdminUsers } from "./useAdminUsers-Dc8vArwR.mjs";
import { a as XAxis, c as CartesianGrid, d as Tooltip, f as Legend, i as YAxis, l as Bar, n as BarChart, o as Area, r as LineChart, s as Line, t as AreaChart, u as ResponsiveContainer } from "../_libs/recharts+[...].mjs";
import { t as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-BqUXPpll.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function InviteUserDialog() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [email, setEmail] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [role, setRole] = (0, import_react.useState)("farmer");
	const handleInvite = (e) => {
		e.preventDefault();
		if (!email) return;
		toast.success(`Invitation sent to ${email}`);
		setEmail("");
		setName("");
		setRole("farmer");
		setOpen(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				className: "gap-1.5 bg-gradient-to-br from-primary to-primary-glow",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-4 w-4" }), " Invite user"]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-md rounded-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-4.5 w-4.5" })
				}), "Invite a new user"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Send an invitation email to onboard a farmer, seller, or team member." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleInvite,
				className: "space-y-4 pt-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "invite-name",
							children: "Full name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "invite-name",
							placeholder: "e.g. Ravi Patel",
							value: name,
							onChange: (e) => setName(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "invite-email",
							children: "Email address"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "invite-email",
								type: "email",
								required: true,
								placeholder: "name@iherd.app",
								className: "pl-9",
								value: email,
								onChange: (e) => setEmail(e.target.value)
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "invite-role",
							children: "Role"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: role,
							onValueChange: setRole,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								id: "invite-role",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select role" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "admin",
									children: "Admin"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "farmer",
									children: "Farmer"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "seller",
									children: "Seller"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "support",
									children: "Support agent"
								})
							] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "gap-2 sm:gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								children: "Cancel"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							className: "gap-1.5 bg-gradient-to-br from-primary to-primary-glow",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" }), " Send invite"]
						})]
					})
				]
			})]
		})]
	});
}
function Kpi({ label, value, delta, up, icon: Icon, tint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "p-5 rounded-2xl relative overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-wide text-muted-foreground",
						children: label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 text-3xl font-bold tracking-tight",
						children: value
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `mt-2 inline-flex items-center gap-1 text-xs font-medium ${up ? "text-success" : "text-destructive"}`,
						children: [
							up ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "h-3.5 w-3.5" }),
							delta,
							" vs last month"
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `grid h-11 w-11 shrink-0 place-items-center rounded-xl ${tint}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
			})]
		})
	});
}
var metricRanges = {
	today: {
		label: "Today",
		mult: .03
	},
	week: {
		label: "This week",
		mult: .18
	},
	month: {
		label: "This month",
		mult: 1
	},
	quarter: {
		label: "This quarter",
		mult: 2.8
	},
	year: {
		label: "This year",
		mult: 11
	}
};
function scaleNum(base, mult) {
	const v = Math.round(base * mult);
	if (v >= 1e5) return `${(v / 1e5).toFixed(1)}L`;
	if (v >= 1e3) return v.toLocaleString();
	return v.toString();
}
var tooltipStyle = {
	background: "var(--color-card)",
	border: "1px solid var(--color-border)",
	borderRadius: 12
};
function Dashboard() {
	const [range, setRange] = (0, import_react.useState)("month");
	const m = metricRanges[range].mult;
	const { profile } = useAuth();
	const displayName = profile?.name ? profile.name.split(" ")[0] : "Admin";
	const { data: allUsers = [] } = useAdminUsers();
	const { data: cattle = [] } = useFirebaseCollection("cattle-marketplace");
	const { data: orders = [] } = useFirebaseCollection("CattleOrders");
	const { data: products = [] } = useFirebaseCollection("product_marketplace/main/products");
	const { data: productOrders = [] } = useFirebaseCollection("ProductOrders");
	const { data: issues = [] } = useFirebaseCollection("issues");
	const farmers = allUsers.filter((u) => u && (u.farms && (typeof u.farms === "object" || Array.isArray(u.farms)) || u.farmer && typeof u.farmer === "object" && Object.keys(u.farmer).length > 0 || u.roles && u.roles.includes("farmer")));
	const sellers = allUsers.filter((u) => u && (u.seller && typeof u.seller === "object" && Object.keys(u.seller).length > 0 || u.roles && u.roles.includes("seller")));
	const farmersCount = farmers.length;
	const activeFarmersCount = farmers.filter((f) => f.status === "Active").length;
	const sellersCount = sellers.length;
	const cattleCount = cattle ? cattle.length : 0;
	const ordersCount = orders ? orders.length : 0;
	const productsCount = products ? products.length : 0;
	const productOrdersCount = productOrders ? productOrders.length : 0;
	const issuesCount = issues ? issues.length : 0;
	const monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	];
	const dynamicGrowth = monthNames.map((month) => {
		return {
			m: month,
			farmers: farmers ? farmers.filter((f) => f.joined?.includes(month)).length : 0,
			sellers: sellers ? sellers.filter((s) => s.joined?.includes(month)).length : 0
		};
	});
	const feedCount = products ? products.filter((p) => p.category?.toLowerCase() === "feed").length : 0;
	const medCount = products ? products.filter((p) => p.category?.toLowerCase() === "medicine" || p.category?.toLowerCase() === "medicines").length : 0;
	const eqCount = products ? products.filter((p) => p.category?.toLowerCase() === "equipment").length : 0;
	const suppCount = products ? products.filter((p) => p.category?.toLowerCase() === "supplements" || p.category?.toLowerCase() === "supplement").length : 0;
	const accCount = products ? products.filter((p) => p.category?.toLowerCase() === "accessories" || p.category?.toLowerCase() === "accessory").length : 0;
	const dynamicActivity = [];
	if (cattle && cattle.length > 0) cattle.slice(0, 2).forEach((c) => {
		dynamicActivity.push({
			who: "Cattle Listing",
			what: `${c.title || "New listing"} · Price: ${c.price || "—"}`,
			when: c.joined || "Just now",
			tag: c.status?.toLowerCase() || "pending"
		});
	});
	if (orders && orders.length > 0) orders.slice(0, 2).forEach((o) => {
		dynamicActivity.push({
			who: `Order #${o.id}`,
			what: `Seller: ${o.seller || "—"} · Amount: ${o.amount || "—"}`,
			when: o.date || "Just now",
			tag: o.status === "Completed" ? "paid" : "pending"
		});
	});
	if (farmers && farmers.length > 0) farmers.slice(0, 1).forEach((f) => {
		dynamicActivity.push({
			who: "Farmer KYC",
			what: `${f.name} — KYC status under review`,
			when: f.joined || "Just now",
			tag: f.status?.toLowerCase() || "inreview"
		});
	});
	const pendingProductApprovals = products ? products.filter((p) => p.status === "Pending").length : 0;
	const kycPendingCount = farmers ? farmers.filter((f) => f.status === "Pending").length : 0;
	const dynamicCattleMarket = monthNames.map((month) => {
		return {
			m: month,
			listed: cattle ? cattle.filter((c) => c.joined?.includes(month)).length : 0,
			sold: orders ? orders.filter((o) => o.date?.includes(month) && o.status === "Completed").length : 0
		};
	});
	const dynamicProductSales = monthNames.map((month) => {
		return {
			m: month,
			orders: productOrders ? productOrders.filter((o) => o.date?.includes(month)).length : 0
		};
	});
	const dynamicRevenue = monthNames.map((month) => {
		return {
			m: month,
			revenue: (orders ? orders.filter((o) => o.date?.includes(month)) : []).reduce((acc, curr) => {
				const amtStr = String(curr.amount || "").replace(/[^0-9]/g, "");
				return acc + (Number(amtStr) || 0);
			}, 0)
		};
	});
	const dynamicCattleOrders = monthNames.map((month) => {
		const monthCattleOrders = orders ? orders.filter((o) => o.date?.includes(month)) : [];
		const gmvSum = monthCattleOrders.reduce((acc, curr) => {
			const amtStr = String(curr.amount || "").replace(/[^0-9]/g, "");
			return acc + (Number(amtStr) || 0);
		}, 0);
		return {
			m: month,
			orders: monthCattleOrders.length,
			gmv: Math.round(gmvSum / 1e5)
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: `Welcome back, ${displayName}`,
			description: "Here's what's happening across the iHerd marketplace today.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InviteUserDialog, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between mb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-sm font-semibold",
				children: "Key metrics"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground",
				children: ["Filtered by ", metricRanges[range].label.toLowerCase()]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
				value: range,
				onValueChange: (v) => setRange(v),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
					className: "w-[160px] h-9 rounded-xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: Object.entries(metricRanges).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
					value: k,
					children: v.label
				}, k)) })]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 md:grid-cols-2 xl:grid-cols-5 mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Total farmers",
					value: scaleNum(farmersCount, m),
					delta: "+8.2%",
					up: true,
					icon: Users,
					tint: "bg-primary/10 text-primary"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Verified farmers",
					value: scaleNum(activeFarmersCount, m),
					delta: "+6.4%",
					up: true,
					icon: BadgeCheck,
					tint: "bg-success/10 text-success"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Total sellers",
					value: scaleNum(sellersCount, m),
					delta: "+4.8%",
					up: true,
					icon: Store,
					tint: "bg-info/10 text-info"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Cattle registered",
					value: scaleNum(cattleCount, m),
					delta: "+3.6%",
					up: true,
					icon: Beef,
					tint: "bg-warning/10 text-warning-foreground"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Cattle listed for sale",
					value: scaleNum(Math.round(cattleCount * .19), m),
					delta: "+12.1%",
					up: true,
					icon: Tag,
					tint: "bg-chart-2/10 text-chart-2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Total products",
					value: scaleNum(productsCount, m),
					delta: "+5.7%",
					up: true,
					icon: ShoppingBag,
					tint: "bg-primary/10 text-primary"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Product orders",
					value: scaleNum(productOrdersCount, m),
					delta: "-1.6%",
					up: false,
					icon: PackageCheck,
					tint: "bg-info/10 text-info"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Marketplace revenue",
					value: `₹${scaleNum(0, m)}`,
					delta: "+12.4%",
					up: true,
					icon: IndianRupee,
					tint: "bg-success/10 text-success"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Active listings",
					value: scaleNum(cattleCount, m),
					delta: "+9.3%",
					up: true,
					icon: ListChecks,
					tint: "bg-chart-2/10 text-chart-2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Cattle orders",
					value: scaleNum(ordersCount, m),
					delta: "+14.2%",
					up: true,
					icon: Beef,
					tint: "bg-warning/10 text-warning-foreground"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Customer issues",
					value: scaleNum(issuesCount, m),
					delta: "-9.1%",
					up: true,
					icon: LifeBuoy,
					tint: "bg-destructive/10 text-destructive"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-2 mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5 rounded-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold",
						children: "User growth"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Farmers vs sellers — last 12 months"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-primary" }), "Farmers"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-chart-2" }), "Sellers"]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-72",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
							data: dynamicGrowth,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									strokeDasharray: "3 3",
									stroke: "var(--color-border)",
									vertical: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "m",
									stroke: "var(--color-muted-foreground)",
									fontSize: 12
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									stroke: "var(--color-muted-foreground)",
									fontSize: 12
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									type: "monotone",
									dataKey: "farmers",
									stroke: "var(--color-primary)",
									strokeWidth: 2.5,
									dot: { r: 3 },
									activeDot: { r: 5 }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									type: "monotone",
									dataKey: "sellers",
									stroke: "var(--color-chart-2)",
									strokeWidth: 2.5,
									dot: { r: 3 },
									activeDot: { r: 5 }
								})
							]
						})
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5 rounded-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-between mb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold",
						children: "Cattle marketplace growth"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Listed vs sold — last 12 months"
					})] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-72",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: dynamicCattleMarket,
							barGap: 4,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									strokeDasharray: "3 3",
									stroke: "var(--color-border)",
									vertical: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "m",
									stroke: "var(--color-muted-foreground)",
									fontSize: 12
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									stroke: "var(--color-muted-foreground)",
									fontSize: 12
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
									iconType: "circle",
									wrapperStyle: { fontSize: 12 }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "listed",
									name: "Listed",
									fill: "var(--color-primary)",
									radius: [
										8,
										8,
										0,
										0
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "sold",
									name: "Sold",
									fill: "var(--color-chart-2)",
									radius: [
										8,
										8,
										0,
										0
									]
								})
							]
						})
					})
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-2 mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5 rounded-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-between mb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold",
						children: "Product sales trend"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Monthly product orders"
					})] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-72",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
							data: dynamicProductSales,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
									id: "gOrders",
									x1: "0",
									y1: "0",
									x2: "0",
									y2: "1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "0%",
										stopColor: "var(--color-chart-2)",
										stopOpacity: .4
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "100%",
										stopColor: "var(--color-chart-2)",
										stopOpacity: 0
									})]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									strokeDasharray: "3 3",
									stroke: "var(--color-border)",
									vertical: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "m",
									stroke: "var(--color-muted-foreground)",
									fontSize: 12
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									stroke: "var(--color-muted-foreground)",
									fontSize: 12
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									type: "monotone",
									dataKey: "orders",
									stroke: "var(--color-chart-2)",
									strokeWidth: 2,
									fill: "url(#gOrders)"
								})
							]
						})
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5 rounded-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-between mb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold",
						children: "Revenue trend"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Monthly marketplace revenue (₹)"
					})] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-72",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
							data: dynamicRevenue,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
									id: "gRev",
									x1: "0",
									y1: "0",
									x2: "0",
									y2: "1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "0%",
										stopColor: "var(--color-primary)",
										stopOpacity: .4
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "100%",
										stopColor: "var(--color-primary)",
										stopOpacity: 0
									})]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									strokeDasharray: "3 3",
									stroke: "var(--color-border)",
									vertical: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "m",
									stroke: "var(--color-muted-foreground)",
									fontSize: 12
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									stroke: "var(--color-muted-foreground)",
									fontSize: 12
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									type: "monotone",
									dataKey: "revenue",
									stroke: "var(--color-primary)",
									strokeWidth: 2,
									fill: "url(#gRev)"
								})
							]
						})
					})
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-2 mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5 rounded-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold",
						children: "Cattle orders trend"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Monthly cattle orders vs GMV (₹L)"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-warning" }), "Orders"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-primary" }), "GMV"]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-72",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: dynamicCattleOrders,
							barGap: 4,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									strokeDasharray: "3 3",
									stroke: "var(--color-border)",
									vertical: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "m",
									stroke: "var(--color-muted-foreground)",
									fontSize: 12
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									stroke: "var(--color-muted-foreground)",
									fontSize: 12
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "orders",
									name: "Orders",
									fill: "var(--color-warning)",
									radius: [
										8,
										8,
										0,
										0
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "gmv",
									name: "GMV (₹L)",
									fill: "var(--color-primary)",
									radius: [
										8,
										8,
										0,
										0
									]
								})
							]
						})
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5 rounded-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-between mb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold",
						children: "Product marketplace mix"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Active products by category"
					})] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-72",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							layout: "vertical",
							data: [
								{
									name: "Feed",
									v: feedCount
								},
								{
									name: "Medicine",
									v: medCount
								},
								{
									name: "Equipment",
									v: eqCount
								},
								{
									name: "Supplements",
									v: suppCount
								},
								{
									name: "Accessories",
									v: accCount
								}
							],
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									strokeDasharray: "3 3",
									stroke: "var(--color-border)",
									horizontal: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									type: "number",
									stroke: "var(--color-muted-foreground)",
									fontSize: 12
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									type: "category",
									dataKey: "name",
									stroke: "var(--color-muted-foreground)",
									fontSize: 12,
									width: 90
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "v",
									name: "Products",
									fill: "var(--color-chart-2)",
									radius: [
										0,
										8,
										8,
										0
									]
								})
							]
						})
					})
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-3 mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "lg:col-span-2 p-5 rounded-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold",
						children: "Recent activity"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						children: "View all"
					})]
				}), dynamicActivity.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-center text-muted-foreground text-sm py-16",
					children: "No recent activity recorded in database."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y",
					children: dynamicActivity.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-3 sm:flex sm:flex-wrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-medium truncate",
								children: a.who
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground truncate",
								children: a.what
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 shrink-0 sm:ml-auto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: a.tag }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground w-20 text-right",
								children: a.when
							})]
						})]
					}, i))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5 rounded-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold mb-1",
						children: "Today at a glance"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mb-4",
						children: "Live marketplace ops"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-3",
						children: [
							{
								icon: Tag,
								label: "New cattle listings",
								val: cattleCount,
								tint: "bg-primary/10 text-primary"
							},
							{
								icon: ShoppingBag,
								label: "Pending product approvals",
								val: pendingProductApprovals,
								tint: "bg-warning/10 text-warning-foreground"
							},
							{
								icon: PackageCheck,
								label: "Orders placed",
								val: ordersCount,
								tint: "bg-info/10 text-info"
							},
							{
								icon: Wallet,
								label: "Pending payouts",
								val: "₹0",
								tint: "bg-success/10 text-success"
							},
							{
								icon: UserCheck,
								label: "KYC pending",
								val: kycPendingCount,
								tint: "bg-destructive/10 text-destructive"
							}
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 rounded-xl bg-muted/40 p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `grid h-10 w-10 shrink-0 place-items-center rounded-lg ${s.tint}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "min-w-0 flex-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm text-muted-foreground truncate",
										children: s.label
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-lg font-bold",
									children: s.val
								})
							]
						}, s.label))
					})
				]
			})]
		})
	] });
}
//#endregion
export { Dashboard as component };
