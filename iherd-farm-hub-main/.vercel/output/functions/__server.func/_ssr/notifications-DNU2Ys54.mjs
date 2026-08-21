import { o as __toESM } from "../_runtime.mjs";
import { d as cn, n as Input, t as Button } from "./router-DAnu6P_r.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { S as Search, X as Clock, et as CircleCheck, h as Smartphone, s as TriangleAlert, ut as Bell, w as Plus, x as Send } from "../_libs/lucide-react.mjs";
import { n as PageHeader, t as Card } from "./PageHeader-DLjNnuT_.mjs";
import { t as useFirebaseCollection } from "./useFirebaseData-BghabcpM.mjs";
import { t as Label } from "./label-I1Q4BVbY.mjs";
import { a as DialogFooter, i as DialogDescription, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-DI0ZIIwX.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BF2dbrrB.mjs";
import { t as Checkbox } from "./checkbox-XLDTz5KS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notifications-DNU2Ys54.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
function NotificationCenter() {
	const [receivedQuery, setReceivedQuery] = (0, import_react.useState)("");
	const [pushQuery, setPushQuery] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [localPush, setLocalPush] = (0, import_react.useState)([]);
	const { data: notifications = [], isLoading: nLoading } = useFirebaseCollection("notifications");
	const { data: pushHistory = [], isLoading: pLoading } = useFirebaseCollection("push_notifications");
	const { data: farmers = [] } = useFirebaseCollection("farmers");
	const allPush = [...localPush, ...pushHistory.map((p) => ({
		title: p.title || "—",
		message: p.message || p.body || "—",
		farms: p.farms || p.targetFarms || "—",
		sent: p.sentAt?.seconds ? (/* @__PURE__ */ new Date(p.sentAt.seconds * 1e3)).toLocaleString() : p.sentAt || p.sent || "—",
		delivered: String(p.delivered ?? p.deliveredCount ?? "—"),
		opened: String(p.opened ?? p.openedCount ?? "—"),
		status: p.status === "Scheduled" ? "Scheduled" : "Delivered"
	}))];
	const unread = notifications.filter((n) => (n.status || "").toLowerCase() === "unread").length;
	const scheduled = allPush.filter((p) => p.status === "Scheduled").length;
	const filteredReceived = (0, import_react.useMemo)(() => notifications.filter((n) => (String(n.title || "") + String(n.message || n.body || "") + String(n.sender || n.from || "")).toLowerCase().includes(receivedQuery.toLowerCase())), [notifications, receivedQuery]);
	const filteredPush = (0, import_react.useMemo)(() => allPush.filter((p) => (p.title + p.message + p.farms).toLowerCase().includes(pushQuery.toLowerCase())), [allPush, pushQuery]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Notification center",
			description: "Manage incoming alerts and send push notifications to farms.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				size: "sm",
				children: "Mark all read"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				className: "bg-gradient-to-br from-primary to-primary-glow",
				onClick: () => setOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4 mr-1.5" }), "Send push notification"]
			})] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 md:grid-cols-4 mb-6",
			children: [
				{
					label: "Unread",
					value: nLoading ? "…" : String(unread),
					icon: Bell,
					tint: "bg-primary/10 text-primary"
				},
				{
					label: "Total received",
					value: nLoading ? "…" : String(notifications.length),
					icon: TriangleAlert,
					tint: "bg-info/10 text-info"
				},
				{
					label: "Push sent",
					value: pLoading ? "…" : String(allPush.length),
					icon: CircleCheck,
					tint: "bg-success/10 text-success"
				},
				{
					label: "Scheduled",
					value: pLoading ? "…" : String(scheduled),
					icon: Clock,
					tint: "bg-warning/10 text-warning-foreground"
				}
			].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "p-5 rounded-2xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `grid h-10 w-10 place-items-center rounded-xl ${k.tint}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(k.icon, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: k.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xl font-semibold tracking-tight",
						children: k.value
					})] })]
				})
			}, k.label))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "received",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "received",
					children: "Received Notifications"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "push",
					children: "Push Notifications"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "received",
					className: "mt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-0 rounded-2xl overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3 p-5 border-b",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold",
								children: "All received notifications"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground mt-0.5",
								children: "Alerts from Firestore 'notifications' collection."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative w-full max-w-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: receivedQuery,
									onChange: (e) => setReceivedQuery(e.target.value),
									placeholder: "Search notifications",
									className: "pl-9"
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-5 py-3 text-left font-medium",
											children: "Title"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-5 py-3 text-left font-medium",
											children: "Message"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-5 py-3 text-left font-medium",
											children: "Sender"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-5 py-3 text-left font-medium",
											children: "Date & time"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-5 py-3 text-left font-medium",
											children: "Status"
										})
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
									className: "divide-y",
									children: nLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										colSpan: 5,
										className: "px-5 py-10 text-center text-sm text-muted-foreground",
										children: "Loading…"
									}) }) : filteredReceived.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										colSpan: 5,
										className: "px-5 py-10 text-center text-sm text-muted-foreground",
										children: notifications.length === 0 ? "No notifications in Firestore 'notifications' collection yet." : "No notifications match your search."
									}) }) : filteredReceived.map((n, i) => {
										const status = n.status || "Read";
										const d = n.createdAt?.seconds ? (/* @__PURE__ */ new Date(n.createdAt.seconds * 1e3)).toLocaleString() : n.createdAt ? new Date(n.createdAt).toLocaleString() : n.datetime || "—";
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "hover:bg-muted/20",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-5 py-3",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-3",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4" })
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-medium",
															children: n.title || n.subject || "—"
														})]
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-5 py-3 text-muted-foreground max-w-md",
													children: n.message || n.body || "—"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-5 py-3 text-muted-foreground",
													children: n.sender || n.from || "System"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-5 py-3 text-muted-foreground whitespace-nowrap",
													children: d
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-5 py-3",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: `inline-flex rounded-md px-2 py-0.5 text-xs font-medium ${status === "Unread" || status === "unread" ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`,
														children: status
													})
												})
											]
										}, n.id || i);
									})
								})]
							})
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "push",
					className: "mt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-0 rounded-2xl overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3 p-5 border-b",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold",
								children: "Push notification history"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground mt-0.5",
								children: "From Firestore 'push_notifications' collection."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative w-full max-w-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: pushQuery,
										onChange: (e) => setPushQuery(e.target.value),
										placeholder: "Search push history",
										className: "pl-9"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									className: "bg-gradient-to-br from-primary to-primary-glow",
									onClick: () => setOpen(true),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4 mr-1.5" }), "Send push notification"]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-5 py-3 text-left font-medium",
											children: "Notification"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-5 py-3 text-left font-medium",
											children: "Target farms"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-5 py-3 text-left font-medium",
											children: "Sent"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-5 py-3 text-left font-medium",
											children: "Delivered"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-5 py-3 text-left font-medium",
											children: "Opened"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-5 py-3 text-left font-medium",
											children: "Status"
										})
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
									className: "divide-y",
									children: pLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										colSpan: 6,
										className: "px-5 py-10 text-center text-sm text-muted-foreground",
										children: "Loading…"
									}) }) : filteredPush.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										colSpan: 6,
										className: "px-5 py-10 text-center text-sm text-muted-foreground",
										children: allPush.length === 0 ? "No push notifications sent yet." : "No push notifications match your search."
									}) }) : filteredPush.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "hover:bg-muted/20 align-top",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-5 py-3",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-start gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "h-4 w-4" })
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "min-w-0",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "font-medium",
															children: p.title
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "text-xs text-muted-foreground mt-0.5 max-w-sm",
															children: p.message
														})]
													})]
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-5 py-3 text-muted-foreground whitespace-nowrap",
												children: p.farms
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-5 py-3 text-muted-foreground whitespace-nowrap",
												children: p.sent
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-5 py-3",
												children: p.delivered
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-5 py-3",
												children: p.opened
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-5 py-3",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `inline-flex rounded-md px-2 py-0.5 text-xs font-medium ${p.status === "Delivered" ? "bg-success/15 text-success" : "bg-warning/15 text-warning-foreground"}`,
													children: p.status
												})
											})
										]
									}, i))
								})]
							})
						})]
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SendPushDialog, {
			open,
			onOpenChange: setOpen,
			farmers,
			onSend: (item) => {
				setLocalPush((prev) => [item, ...prev]);
				toast.success("Push notification sent", { description: `Delivered to ${item.farms}` });
			}
		})
	] });
}
function SendPushDialog({ open, onOpenChange, farmers, onSend }) {
	const [title, setTitle] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	const [selected, setSelected] = (0, import_react.useState)([]);
	const [query, setQuery] = (0, import_react.useState)("");
	const farmsList = farmers.map((f) => ({
		id: f.id,
		name: f.name || f.farmName || f.displayName || f.id,
		location: f.location || f.state || f.address || "—",
		herd: f.herdSize || f.totalAnimals || f.cattleCount || 0
	}));
	const filtered = (0, import_react.useMemo)(() => farmsList.filter((f) => (f.name + f.location + f.id).toLowerCase().includes(query.toLowerCase())), [farmsList, query]);
	const allVisibleSelected = filtered.length > 0 && filtered.every((f) => selected.includes(f.id));
	function toggle(id) {
		setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
	}
	function toggleAllVisible() {
		if (allVisibleSelected) setSelected((s) => s.filter((id) => !filtered.some((f) => f.id === id)));
		else setSelected((s) => Array.from(/* @__PURE__ */ new Set([...s, ...filtered.map((f) => f.id)])));
	}
	function reset() {
		setTitle("");
		setMessage("");
		setSelected([]);
		setQuery("");
	}
	function handleSend() {
		if (!title.trim() || !message.trim() || selected.length === 0) {
			toast.error("Please add a title, message and select at least one farm.");
			return;
		}
		const farmsLabel = selected.length === farmsList.length ? `All farms · ${farmsList.length}` : `${selected.length} farm${selected.length > 1 ? "s" : ""}`;
		onSend({
			title: title.trim(),
			message: message.trim(),
			farms: farmsLabel,
			sent: "Just now",
			delivered: String(selected.length),
			opened: "0",
			status: "Delivered"
		});
		reset();
		onOpenChange(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (v) => {
			if (!v) reset();
			onOpenChange(v);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Send push notification" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Compose a message and pick the farms it should reach." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "push-title",
								children: "Title"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "push-title",
								value: title,
								onChange: (e) => setTitle(e.target.value),
								maxLength: 80,
								placeholder: "e.g. Monsoon vaccination drive starts today"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "push-message",
									children: "Message"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									id: "push-message",
									value: message,
									onChange: (e) => setMessage(e.target.value),
									maxLength: 200,
									rows: 3,
									placeholder: "Short message shown in the notification banner"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[11px] text-muted-foreground text-right",
									children: [message.length, "/200"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Target farms" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-muted-foreground",
										children: [
											selected.length,
											" of ",
											farmsList.length,
											" selected"
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: query,
										onChange: (e) => setQuery(e.target.value),
										placeholder: "Search farms by name, location or ID",
										className: "pl-9"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border max-h-64 overflow-y-auto",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 px-4 py-2.5 border-b bg-muted/30 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
											checked: allVisibleSelected,
											onCheckedChange: toggleAllVisible,
											id: "select-all"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "select-all",
											className: "font-medium cursor-pointer",
											children: "Select all visible"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "divide-y",
										children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
											className: "px-4 py-6 text-center text-sm text-muted-foreground",
											children: farmsList.length === 0 ? "No farmers found in Firestore." : "No farms match your search."
										}) : filtered.map((f) => {
											const checked = selected.includes(f.id);
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-center gap-3 px-4 py-2.5 hover:bg-muted/20 cursor-pointer",
												onClick: () => toggle(f.id),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
													checked,
													onCheckedChange: () => toggle(f.id)
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex-1 min-w-0",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "text-sm font-medium truncate",
														children: f.name
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "text-xs text-muted-foreground truncate",
														children: [
															f.id,
															" · ",
															f.location,
															" · ",
															f.herd,
															" animals"
														]
													})]
												})]
											}, f.id);
										})
									})]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => onOpenChange(false),
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "bg-gradient-to-br from-primary to-primary-glow",
					onClick: handleSend,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4 mr-1.5" }), "Send notification"]
				})] })
			]
		})
	});
}
//#endregion
export { NotificationCenter as component };
