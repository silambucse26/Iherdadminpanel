import { o as __toESM } from "../_runtime.mjs";
import { o as Separator, r as Route$1, t as Button } from "./router-DAnu6P_r.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { H as GraduationCap, M as Mail, T as Phone, X as Clock, et as CircleCheck, f as Store, gt as Activity, ht as ArrowLeft, i as User, j as MapPin, lt as Briefcase, mt as BadgeAlert, ot as Calendar, p as Stethoscope, st as Building, u as Tractor, y as ShieldCheck } from "../_libs/lucide-react.mjs";
import { n as PageHeader, t as Card } from "./PageHeader-DLjNnuT_.mjs";
import { t as useFirebaseCollection } from "./useFirebaseData-BghabcpM.mjs";
import { t as useAdminUsers } from "./useAdminUsers-Dc8vArwR.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BF2dbrrB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/users._userId-CpKpxy3i.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function InfoRow({ icon: Icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start gap-3 py-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm font-semibold truncate",
				children: value
			})]
		})]
	});
}
function UserDetail() {
	const { userId } = Route$1.useParams();
	const [activeTab, setActiveTab] = (0, import_react.useState)("overview");
	const { data: authUsers = [], isLoading: authLoading } = useAdminUsers();
	const authUser = authUsers.find((u) => u.uid === userId);
	const { data: allFarmers = [], isLoading: farmerLoading } = useFirebaseCollection("farmers");
	const { data: allSellers = [], isLoading: sellerLoading } = useFirebaseCollection("sellers");
	const { data: allVets = [], isLoading: vetLoading } = useFirebaseCollection("vets");
	const { data: allUsers = [], isLoading: firestoreUserLoading } = useFirebaseCollection("users");
	const firestoreUser = allUsers.find((item) => item && (item.id === userId || item.uid === userId || item.userId === userId));
	const userPhone = firestoreUser?.phoneNumber || firestoreUser?.phone || authUser?.phoneNumber || "";
	const userEmail = firestoreUser?.email || authUser?.email || "";
	const normalizePhone = (num) => {
		if (!num) return "";
		return num.replace(/\D/g, "").slice(-10);
	};
	const normalizedUserPhone = normalizePhone(userPhone);
	const findMatch = (list) => {
		return list.find((item) => {
			if (!item) return false;
			if (item.id === userId) return true;
			if (item.uid === userId || item.userId === userId) return true;
			if (normalizedUserPhone && (normalizePhone(item.phone) === normalizedUserPhone || normalizePhone(item.phoneNumber) === normalizedUserPhone || normalizePhone(item.mobile) === normalizedUserPhone)) return true;
			if (userEmail && item.email && item.email.toLowerCase() === userEmail.toLowerCase()) return true;
			return false;
		});
	};
	const farmerDoc = firestoreUser?.farms || findMatch(allFarmers);
	const sellerDoc = firestoreUser?.seller || findMatch(allSellers);
	const vetDoc = firestoreUser?.veterinarian || firestoreUser?.vet || findMatch(allVets);
	const isLoading = authLoading || firestoreUserLoading || farmerLoading || sellerLoading || vetLoading;
	const roles = firestoreUser?.roles || (firestoreUser?.role ? [firestoreUser.role] : authUser?.roles || ["User"]);
	const userName = firestoreUser?.name || firestoreUser?.displayName || farmerDoc?.name || sellerDoc?.name || vetDoc?.name || authUser?.displayName || "iHerd User";
	const displayEmail = firestoreUser?.email || farmerDoc?.email || sellerDoc?.email || vetDoc?.email || authUser?.email || "No email provided";
	const displayPhone = firestoreUser?.phoneNumber || firestoreUser?.phone || farmerDoc?.phone || farmerDoc?.phoneNumber || sellerDoc?.phone || vetDoc?.phone || authUser?.phoneNumber || "—";
	firestoreUser?.createdAt ? new Date(firestoreUser.createdAt.seconds ? firestoreUser.createdAt.seconds * 1e3 : firestoreUser.createdAt).toLocaleDateString() : authUser?.createdAt && new Date(authUser.createdAt).toLocaleDateString();
	const initials = userName.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-[400px] items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Loading user accounts data..."
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "ghost",
				size: "sm",
				className: "gap-1.5 -ml-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/users",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to users"]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "User Account Details",
			description: `View Firestore and Authentication profile for ${userName}`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "p-6 rounded-3xl border border-border/60 mb-6 bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center md:justify-start",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 text-primary text-2xl font-bold ring-4 ring-primary/10 shadow-sm",
						children: initials
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center md:text-left space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-bold text-foreground",
						children: userName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-mono text-muted-foreground select-all",
						children: userId
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap justify-center md:justify-start gap-2 pt-1",
						children: roles.map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary border border-primary/20",
							children: role
						}, role))
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			value: activeTab,
			onValueChange: setActiveTab,
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "bg-muted/60 p-1 rounded-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "overview",
							className: "rounded-lg gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4" }), " Overview"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "farmer",
							className: "rounded-lg gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tractor, { className: "h-4 w-4" }),
								" Farmer Profile",
								farmerDoc && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-success animate-pulse" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "seller",
							className: "rounded-lg gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "h-4 w-4" }),
								" Seller Profile",
								sellerDoc && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-success animate-pulse" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "vet",
							className: "rounded-lg gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stethoscope, { className: "h-4 w-4" }),
								" Vet Profile",
								vetDoc && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-success animate-pulse" })
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "overview",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-6 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-6 rounded-2xl border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-lg font-bold mb-4 flex items-center gap-2 text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5 text-primary" }), " Firestore Data"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
										icon: User,
										label: "Name / Display Name",
										value: userName !== "iHerd User" ? userName : "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
										icon: Mail,
										label: "Email Address",
										value: displayEmail !== "No email provided" ? displayEmail : "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
										icon: Phone,
										label: "Phone Number",
										value: displayPhone
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
										icon: Clock,
										label: "Registered Roles",
										value: firestoreUser?.roles ? firestoreUser.roles.join(", ") : firestoreUser?.role || "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
										icon: Calendar,
										label: "Firestore Created At",
										value: firestoreUser?.createdAt ? new Date(firestoreUser.createdAt.seconds ? firestoreUser.createdAt.seconds * 1e3 : firestoreUser.createdAt).toLocaleString() : "—"
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-6 rounded-2xl border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-lg font-bold mb-4 flex items-center gap-2 text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-5 w-5 text-primary" }), " Firebase Authentication"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
										icon: Mail,
										label: "Auth Email",
										value: authUser?.email || "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
										icon: Phone,
										label: "Auth Phone",
										value: authUser?.phoneNumber || "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
										icon: Calendar,
										label: "Auth Created At",
										value: authUser?.createdAt ? new Date(authUser.createdAt).toLocaleString() : "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
										icon: Activity,
										label: "Last Activity / Login",
										value: authUser?.lastLoginAt ? new Date(authUser.lastLoginAt).toLocaleString() : "—"
									})
								]
							})]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "farmer",
					children: farmerDoc ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6 rounded-2xl border space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-lg font-bold flex items-center gap-2 text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tractor, { className: "h-5 w-5 text-primary" }), " Farmer Registered Data"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1 text-xs font-medium text-success border border-success/20",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5" }), "Active Farmer"]
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-6 md:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
											icon: User,
											label: "Farmer Name",
											value: farmerDoc.name || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
											icon: Building,
											label: "Farm Name",
											value: farmerDoc.farm || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
											icon: MapPin,
											label: "State",
											value: farmerDoc.state || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
											icon: Activity,
											label: "Status",
											value: farmerDoc.status || "—"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
											icon: Activity,
											label: "Cattle Managed",
											value: String(farmerDoc.cattle ?? 0)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
											icon: Phone,
											label: "Contact Phone",
											value: farmerDoc.phone || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
											icon: Mail,
											label: "Contact Email",
											value: farmerDoc.email || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
											icon: Calendar,
											label: "Date Joined",
											value: farmerDoc.joined || "—"
										})
									]
								})]
							}),
							farmerDoc.address && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2",
								children: "Registered Farm Address"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-foreground bg-muted/40 p-4 rounded-xl font-medium",
								children: farmerDoc.address
							})] })] })
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-8 rounded-2xl border text-center space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto grid h-12 w-12 place-items-center rounded-full bg-muted text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeAlert, { className: "h-6 w-6" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-lg text-foreground",
								children: "No Farmer Profile"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground max-w-md mx-auto",
								children: "This user doesn't have an active farmer registration record in the Firestore 'farmers' collection."
							})]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "seller",
					children: sellerDoc ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6 rounded-2xl border space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-lg font-bold flex items-center gap-2 text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "h-5 w-5 text-primary" }), " Seller Registered Data"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1 text-xs font-medium text-success border border-success/20",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5" }), "Verified Seller"]
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-6 md:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
											icon: Store,
											label: "Store Name / Seller",
											value: sellerDoc.name || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
											icon: Briefcase,
											label: "Category",
											value: sellerDoc.category || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
											icon: Activity,
											label: "Products Count",
											value: String(sellerDoc.products ?? 0)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
											icon: Activity,
											label: "GMV (30 days)",
											value: sellerDoc.gmv || "—"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
											icon: User,
											label: "Business Owner",
											value: sellerDoc.owner || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
											icon: Phone,
											label: "Seller Phone",
											value: sellerDoc.phone || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
											icon: Mail,
											label: "Seller Email",
											value: sellerDoc.email || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
											icon: Calendar,
											label: "Date Registered",
											value: sellerDoc.joined || "—"
										})
									]
								})]
							}),
							sellerDoc.address && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2",
								children: "Registered Store Address"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-foreground bg-muted/40 p-4 rounded-xl font-medium",
								children: sellerDoc.address
							})] })] })
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-8 rounded-2xl border text-center space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto grid h-12 w-12 place-items-center rounded-full bg-muted text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeAlert, { className: "h-6 w-6" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-lg text-foreground",
								children: "No Seller Profile"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground max-w-md mx-auto",
								children: "This user doesn't have an active seller registration record in the Firestore 'sellers' collection."
							})]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "vet",
					children: vetDoc ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6 rounded-2xl border space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-lg font-bold flex items-center gap-2 text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stethoscope, { className: "h-5 w-5 text-primary" }), " Veterinarian Registered Data"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1 text-xs font-medium text-success border border-success/20",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5" }), "Verified Vet"]
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-6 md:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
											icon: User,
											label: "Vet Name",
											value: vetDoc.name || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
											icon: GraduationCap,
											label: "Qualification",
											value: vetDoc.qualification || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
											icon: Briefcase,
											label: "Specialization",
											value: vetDoc.specialization || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
											icon: Briefcase,
											label: "Years of Experience",
											value: vetDoc.experience ? `${vetDoc.experience} years` : "—"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
											icon: Building,
											label: "Hospital / Clinic",
											value: vetDoc.clinic || vetDoc.hospital || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
											icon: Phone,
											label: "Vet Phone",
											value: vetDoc.phone || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
											icon: Mail,
											label: "Vet Email",
											value: vetDoc.email || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
											icon: MapPin,
											label: "Service Location",
											value: vetDoc.location || vetDoc.city || "—"
										})
									]
								})]
							}),
							vetDoc.address && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2",
								children: "Clinic Address"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-foreground bg-muted/40 p-4 rounded-xl font-medium",
								children: vetDoc.address
							})] })] })
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-8 rounded-2xl border text-center space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto grid h-12 w-12 place-items-center rounded-full bg-muted text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeAlert, { className: "h-6 w-6" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-lg text-foreground",
								children: "No Veterinarian Profile"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground max-w-md mx-auto",
								children: "This user doesn't have an active veterinarian registration record in the Firestore 'vets' collection."
							})]
						})]
					})
				})
			]
		})
	] });
}
//#endregion
export { UserDetail as component };
