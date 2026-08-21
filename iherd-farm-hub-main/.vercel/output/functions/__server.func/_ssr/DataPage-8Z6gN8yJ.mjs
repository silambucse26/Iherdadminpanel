import { o as __toESM } from "../_runtime.mjs";
import { f as getLocalizedText, n as Input, t as Button } from "./router-DAnu6P_r.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { S as Search, U as Funnel, Y as Download, w as Plus } from "../_libs/lucide-react.mjs";
import { n as PageHeader, t as Card } from "./PageHeader-DLjNnuT_.mjs";
import { t as StatusBadge } from "./StatusBadge-BEhDgIFw.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Esf2WVP3.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-CuHbu1N9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/DataPage-8Z6gN8yJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DataPage({ title, description, data, columns, statusKey = "status", filters = [], kpis, primaryAction = "Add new", rowHref }) {
	const navigate = useNavigate();
	const [q, setQ] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const filtered = (0, import_react.useMemo)(() => {
		return data.filter((row) => {
			const matchQ = q ? Object.values(row).some((v) => getLocalizedText(v).toLowerCase().includes(q.toLowerCase())) : true;
			const rowStatus = getLocalizedText(row[statusKey]).toLowerCase();
			const matchF = filter === "all" ? true : rowStatus === filter.toLowerCase();
			return matchQ && matchF;
		});
	}, [
		data,
		q,
		filter,
		statusKey
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title,
			description,
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				size: "sm",
				className: "gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " Export"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				className: "gap-1.5 bg-gradient-to-br from-primary to-primary-glow",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }),
					" ",
					primaryAction
				]
			})] })
		}),
		kpis && kpis.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6",
			children: kpis.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-4 rounded-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-wide text-muted-foreground",
						children: k.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-2xl font-bold",
						children: k.value
					}),
					k.hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground mt-1",
						children: k.hint
					})
				]
			}, k.label))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "rounded-2xl overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-4 border-b sm:flex sm:flex-wrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative min-w-0 sm:w-80",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: q,
							onChange: (e) => setQ(e.target.value),
							placeholder: "Search...",
							className: "pl-9"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2 shrink-0 sm:ml-auto",
						children: filters.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: filter,
							onValueChange: setFilter,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger, {
								className: "w-40",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-4 w-4 mr-1.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "all",
								children: "All statuses"
							}), filters.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: f.toLowerCase(),
								children: f
							}, f))] })]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
						className: "bg-muted/40 hover:bg-muted/40",
						children: columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: c.className,
							children: c.label
						}, String(c.key)))
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, { children: [filtered.map((row, i) => {
						const href = rowHref?.(row);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
							className: href ? "cursor-pointer" : "",
							onClick: href ? (e) => {
								if (e.target.closest("a,button,input,select,[role=button]")) return;
								navigate({ to: href });
							} : void 0,
							children: columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: c.className,
								children: c.render ? c.render(row) : c.key === statusKey ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: getLocalizedText(row[c.key]) }) : getLocalizedText(row[c.key])
							}, String(c.key)))
						}, i);
					}), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						colSpan: columns.length,
						className: "text-center text-muted-foreground py-10",
						children: "No results found."
					}) })] })] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-t p-4 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Showing ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
							className: "text-foreground",
							children: filtered.length
						}),
						" of",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
							className: "text-foreground",
							children: data.length
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							disabled: true,
							children: "Previous"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							children: "Next"
						})]
					})]
				})
			]
		})
	] });
}
//#endregion
export { DataPage as t };
