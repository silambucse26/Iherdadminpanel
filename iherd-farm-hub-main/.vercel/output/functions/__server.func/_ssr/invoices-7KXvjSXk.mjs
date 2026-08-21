import { o as __toESM } from "../_runtime.mjs";
import { n as Input, t as Button, u as storage } from "./router-DAnu6P_r.mjs";
import "../_libs/firebase.mjs";
import { a as ref, i as listAll, n as getMetadata, t as getDownloadURL } from "../_libs/firebase__storage.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { C as RefreshCw, G as Eye, W as FileText, Y as Download } from "../_libs/lucide-react.mjs";
import { n as PageHeader, t as Card } from "./PageHeader-DLjNnuT_.mjs";
import { i as DialogDescription, n as DialogClose, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-DI0ZIIwX.mjs";
import { t as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/invoices-7KXvjSXk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function formatBytes(bytes, decimals = 2) {
	if (!bytes) return "0 Bytes";
	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = [
		"Bytes",
		"KB",
		"MB",
		"GB"
	];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
function InvoicesPage() {
	const [invoices, setInvoices] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [selectedInvoice, setSelectedInvoice] = (0, import_react.useState)(null);
	const [detailOpen, setDetailOpen] = (0, import_react.useState)(false);
	const fetchInvoices = async () => {
		setLoading(true);
		if ("AIzaSyAiG9ckBFyW81kLH-f1_N-Goy42yxEI7ME".includes("YOUR_ACTUAL")) {
			setInvoices([]);
			setLoading(false);
			return;
		}
		try {
			const invoicesRef = ref(storage, "invoices");
			const res = await listAll(invoicesRef);
			const allItems = [];
			const directItems = await Promise.all(res.items.map(async (itemRef) => {
				const url = await getDownloadURL(itemRef);
				const meta = await getMetadata(itemRef);
				return {
					name: itemRef.name,
					url,
					size: formatBytes(meta.size),
					updated: meta.updated,
					path: itemRef.fullPath
				};
			}));
			allItems.push(...directItems);
			await Promise.all(res.prefixes.map(async (folderRef) => {
				try {
					const folderRes = await listAll(folderRef);
					const folderItems = await Promise.all(folderRes.items.map(async (itemRef) => {
						const url = await getDownloadURL(itemRef);
						const meta = await getMetadata(itemRef);
						return {
							name: itemRef.name,
							url,
							size: formatBytes(meta.size),
							updated: meta.updated,
							path: itemRef.fullPath
						};
					}));
					allItems.push(...folderItems);
				} catch (err) {
					console.error("Error listing folder files:", err);
				}
			}));
			setInvoices(allItems.sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime()));
		} catch (error) {
			console.error("Error listing storage invoices:", error);
			toast.error("Failed to retrieve storage invoices.");
			setInvoices([]);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchInvoices();
	}, []);
	const handleOpenDetail = (inv) => {
		setSelectedInvoice(inv);
		setDetailOpen(true);
	};
	const filteredInvoices = invoices.filter((inv) => inv.name.toLowerCase().includes(searchQuery.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Order Invoices",
			description: "Generated PDF invoices stored under gs://auth-b404a.appspot.com/invoices",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				size: "sm",
				onClick: fetchInvoices,
				className: "gap-1.5",
				disabled: loading,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `h-4 w-4 ${loading ? "animate-spin" : ""}` }), " Refresh"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "rounded-2xl overflow-hidden p-4 mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-3 mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1 max-w-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: searchQuery,
						onChange: (e) => setSearchQuery(e.target.value),
						placeholder: "Search invoice files...",
						className: "pl-9"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" })]
				})
			}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center py-20 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Listing files from Firebase Storage..."
				})]
			}) : filteredInvoices.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center text-muted-foreground py-20",
				children: "No invoices found in storage."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full border-collapse text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b bg-muted/40 text-muted-foreground font-medium",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-4",
								children: "File Name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-4",
								children: "Storage Path"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-4",
								children: "Size"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-4",
								children: "Uploaded At"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-4 text-right",
								children: "Actions"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y",
						children: filteredInvoices.map((inv) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "hover:bg-muted/30 transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "p-4 font-medium flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4.5 w-4.5 text-primary" }), inv.name]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-4 text-muted-foreground text-xs font-mono",
									children: inv.path
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-4",
									children: inv.size
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-4 text-muted-foreground",
									children: new Date(inv.updated).toLocaleString()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-4 text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-end gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "outline",
											size: "sm",
											onClick: () => handleOpenDetail(inv),
											className: "gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5" }), " View Details"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											asChild: true,
											className: "bg-gradient-to-br from-primary to-primary-glow",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: inv.url,
												download: inv.name,
												className: "gap-1.5 flex items-center",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5" }), " Download"]
											})
										})]
									})
								})
							]
						}, inv.name))
					})]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: detailOpen,
			onOpenChange: setDetailOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
				className: "max-w-4xl rounded-2xl p-6 overflow-y-auto max-h-[90vh]",
				children: selectedInvoice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
							className: "border-b pb-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center justify-between",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-primary font-bold text-lg",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: selectedInvoice.name })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
									className: "mt-2 text-xl font-bold",
									children: "Storage Invoice Viewer"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
									"File Path: ",
									selectedInvoice.path,
									" | Size: ",
									selectedInvoice.size
								] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "border rounded-xl overflow-hidden bg-muted/20 h-[600px] w-full",
							children: selectedInvoice.url !== "#" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
								src: selectedInvoice.url,
								className: "w-full h-full border-none",
								title: "Invoice PDF Viewer"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center justify-center h-full text-muted-foreground text-sm",
								children: "Unable to load PDF preview link."
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-2 border-t pt-4 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "sm",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: selectedInvoice.url,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "gap-1 flex items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5" }), " Open in New Tab"]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									asChild: true,
									className: "bg-gradient-to-br from-primary to-primary-glow",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: selectedInvoice.url,
										download: selectedInvoice.name,
										className: "gap-1 flex items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5" }), " Download PDF"]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "secondary",
										children: "Close"
									})
								})
							]
						})
					]
				})
			})
		})
	] });
}
//#endregion
export { InvoicesPage as component };
