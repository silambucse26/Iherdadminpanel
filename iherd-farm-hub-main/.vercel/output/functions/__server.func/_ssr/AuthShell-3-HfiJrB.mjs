import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { y as ShieldCheck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AuthShell-3-HfiJrB.js
var import_jsx_runtime = require_jsx_runtime();
var POPPINS = { fontFamily: "'Poppins', system-ui, sans-serif" };
function AuthShell({ title, subtitle, badge, children, footer }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: POPPINS,
		className: "relative min-h-screen w-full overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 -z-20 bg-cover bg-center",
				style: { backgroundImage: "url('/cow-bg.jpg')" },
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 -z-10",
				style: { background: "linear-gradient(135deg, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.80) 50%, rgba(232,245,233,0.82) 100%)" },
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -left-32 -top-32 -z-10 h-96 w-96 rounded-full bg-white/60 blur-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -bottom-32 -right-24 -z-10 h-[28rem] w-[28rem] rounded-full bg-[#66BB6A]/20 blur-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-10 lg:py-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "flex flex-col justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "https://play-lh.googleusercontent.com/cfoVS1sVUQ7GcwUxpvEhDNghb5ax2l0_Z7TwA4ktRmMj2KytuT8Cd50ELbIwjl4UO5P9hAjmKHu535SOF-4Pufw=w480-h960-rw",
								alt: "iHerd logo",
								width: 160,
								height: 160,
								className: "h-32 w-32 object-contain sm:h-40 sm:w-40"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "mt-6 max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-[42px]",
								children: [
									"Manage your herd, sellers & marketplace —",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[#2E7D32]",
										children: "all in one console."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 hidden items-center justify-center gap-4 text-xs text-gray-600 lg:flex",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5 text-[#2E7D32]" }), "ISO-grade security"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1 w-1 rounded-full bg-gray-400" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Trusted by 12,000+ farmers" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1 w-1 rounded-full bg-gray-400" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "598 verified sellers" })
								]
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full max-w-md",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl border border-white/60 bg-white/80 p-7 shadow-[0_20px_60px_-20px_rgba(27,94,32,0.35)] backdrop-blur-xl sm:p-9",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 text-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "inline-flex items-center gap-2 rounded-full bg-[#E8F5E9] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#2E7D32]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3 w-3" }), badge]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
											className: "pt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-[28px]",
											children: title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-gray-600",
											children: subtitle
										})
									]
								}), children]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 text-center text-sm text-gray-700",
								children: footer
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-center text-xs text-gray-500",
								children: [
									"© ",
									(/* @__PURE__ */ new Date()).getFullYear(),
									" iHerd · Smart Cattle Care Platform"
								]
							})
						]
					})
				})]
			})
		]
	});
}
//#endregion
export { AuthShell as t };
