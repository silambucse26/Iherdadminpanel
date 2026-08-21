import { o as __toESM } from "../_runtime.mjs";
import { n as Input } from "./router-DAnu6P_r.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { B as Image, S as Search, V as HardDrive, W as FileText, Y as Download, _ as ShoppingBag, i as User, q as ExternalLink } from "../_libs/lucide-react.mjs";
import { n as PageHeader, t as Card } from "./PageHeader-DLjNnuT_.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BF2dbrrB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/storage-BgSE0485.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var API_BASE = "http://localhost:5000".replace(/\/$/, "") || "https://iherdadminpanel.onrender.com";
async function fetchStorage() {
	const res = await fetch(`${API_BASE}/api/admin/storage`);
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return res.json();
}
function formatBytes(bytes) {
	if (!bytes) return "—";
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
	return `${(bytes / 1048576).toFixed(1)} MB`;
}
function fileLabel(name) {
	return name.split("/").pop() || name;
}
function isImage(contentType) {
	return contentType.startsWith("image/");
}
function FileGrid({ files, query }) {
	const filtered = (0, import_react.useMemo)(() => files.filter((f) => f.name.toLowerCase().includes(query.toLowerCase())), [files, query]);
	if (filtered.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "py-16 text-center text-sm text-muted-foreground",
		children: files.length === 0 ? "No files found in this storage path." : "No files match your search."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3",
		children: filtered.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "rounded-xl overflow-hidden p-0 group hover:shadow-md transition-shadow",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-28 bg-muted flex items-center justify-center overflow-hidden",
				children: [isImage(f.contentType) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: f.url,
					alt: fileLabel(f.name),
					className: "h-full w-full object-cover",
					onError: (e) => {
						e.target.style.display = "none";
					}
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-10 w-10 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: f.url,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "grid h-8 w-8 place-items-center rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors",
						title: "Open",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: f.url,
						download: fileLabel(f.name),
						className: "grid h-8 w-8 place-items-center rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors",
						title: "Download",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" })
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs font-medium truncate",
					title: fileLabel(f.name),
					children: fileLabel(f.name)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] text-muted-foreground mt-0.5 truncate",
					children: formatBytes(f.size)
				})]
			})]
		}, i))
	});
}
function StoragePage() {
	const [query, setQuery] = (0, import_react.useState)("");
	const { data, isLoading, error } = useQuery({
		queryKey: ["adminStorage"],
		queryFn: fetchStorage,
		staleTime: 3e4
	});
	const totals = data?.totals ?? {
		userImages: 0,
		invoices: 0,
		cattleMarketplace: 0,
		marketplace: 0,
		total: 0
	};
	const kpis = [
		{
			label: "User Images",
			value: totals.userImages,
			icon: User,
			tint: "bg-primary/10 text-primary"
		},
		{
			label: "Invoices",
			value: totals.invoices,
			icon: FileText,
			tint: "bg-info/10 text-info"
		},
		{
			label: "Cattle Media",
			value: totals.cattleMarketplace,
			icon: Image,
			tint: "bg-success/10 text-success"
		},
		{
			label: "Marketplace Media",
			value: totals.marketplace,
			icon: ShoppingBag,
			tint: "bg-warning/10 text-warning-foreground"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Storage",
			description: "All files stored in Firebase Storage across UserImages, invoices, cattle-marketplace and marketplace paths.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardDrive, { className: "h-4 w-4" }), isLoading ? "Loading…" : `${totals.total} total files`]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6",
			children: kpis.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
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
						children: isLoading ? "…" : k.value
					})] })]
				})
			}, k.label))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mb-5 max-w-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: query,
				onChange: (e) => setQuery(e.target.value),
				placeholder: "Search files by name…",
				className: "pl-9"
			})]
		}),
		error || data?.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-8 rounded-2xl border-destructive/20 bg-destructive/5 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-destructive font-semibold text-base",
					children: "Storage Access Restricted"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-2 max-w-xl mx-auto",
					children: data?.error?.message || String(error)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground mt-3",
					children: [
						"💡 To enable Storage viewing: in Firebase/Google Cloud IAM, ensure your Service Account has the ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Storage Admin" }),
						" or ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Storage Object Viewer" }),
						" role."
					]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "userImages",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "mb-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "userImages",
							children: ["User Images ", !isLoading && `(${totals.userImages})`]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "cattleMarketplace",
							children: ["Cattle Media ", !isLoading && `(${totals.cattleMarketplace})`]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "marketplace",
							children: ["Marketplace Media ", !isLoading && `(${totals.marketplace})`]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "invoices",
							children: ["Invoices ", !isLoading && `(${totals.invoices})`]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "userImages",
					children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSkeleton, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileGrid, {
						files: data?.userImages ?? [],
						query
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "cattleMarketplace",
					children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSkeleton, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileGrid, {
						files: data?.cattleMarketplace ?? [],
						query
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "marketplace",
					children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSkeleton, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileGrid, {
						files: data?.marketplace ?? [],
						query
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "invoices",
					children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSkeleton, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileGrid, {
						files: data?.invoices ?? [],
						query
					})
				})
			]
		})
	] });
}
function LoadingSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3",
		children: Array.from({ length: 12 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "rounded-xl overflow-hidden p-0 animate-pulse",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-28 bg-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-2 space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 bg-muted rounded w-3/4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2.5 bg-muted rounded w-1/2" })]
			})]
		}, i))
	});
}
//#endregion
export { StoragePage as component };
