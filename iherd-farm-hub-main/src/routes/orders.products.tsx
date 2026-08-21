import { createFileRoute } from "@tanstack/react-router";
import { DataPage } from "@/components/admin/DataPage";
import { useQuery } from "@tanstack/react-query";
import { getLocalizedText } from "@/lib/utils";

export const Route = createFileRoute("/orders/products")({
  head: () => ({ meta: [{ title: "Product orders — iHerd Admin" }] }),
  component: ProductOrdersPage,
});

const API_BASE =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "") ||
  "https://iherdadminpanel.onrender.com";

async function fetchProductOrders() {
  try {
    const res = await fetch(`${API_BASE}/api/admin/product-orders`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.orders || [];
  } catch (err) {
    console.warn("Error fetching product orders from backend:", err);
    return [];
  }
}

function ProductOrdersPage() {
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["adminProductOrders"],
    queryFn: fetchProductOrders,
    placeholderData: [],
    staleTime: 15_000,
  });

  const totalCount = orders.length;
  const processingCount = orders.filter(o => (o.status || "").toLowerCase() === "processing" || (o.status || "").toLowerCase() === "pending").length;
  const completedCount = orders.filter(o => (o.status || "").toLowerCase() === "completed" || (o.status || "").toLowerCase() === "delivered").length;

  return (
    <DataPage
      title="Product orders"
      description="All marketplace orders from ProductOrders and received_orders collections."
      primaryAction=""
      filters={["Pending", "Processing", "Shipped", "Completed", "Cancelled"]}
      statusKey="status"
      kpis={[
        { label: "Total orders", value: isLoading ? "…" : totalCount.toLocaleString() },
        { label: "Processing / Pending", value: isLoading ? "…" : processingCount.toLocaleString() },
        { label: "Completed", value: isLoading ? "…" : completedCount.toLocaleString() },
        { label: "Cancelled", value: isLoading ? "…" : orders.filter(o => (o.status || "").toLowerCase() === "cancelled").length.toLocaleString() },
      ]}
      data={orders.map(o => ({
        ...o,
        status: o.status || "Pending",
        id: o.id || o.orderId || "—",
        farmer: o.userName || o.buyerName || o.userId || "—",
        seller: o.sellerName || o.sellerId || "—",
        items: o.items?.length ? `${o.items.length} items` : o.productName || o.itemTitle || "1 item",
        amount: o.totalAmount ? (typeof o.totalAmount === "number" ? `₹${o.totalAmount.toLocaleString()}` : o.totalAmount) : o.amount ? `₹${o.amount}` : "—",
        date: o.createdAt?.seconds ? new Date(o.createdAt.seconds * 1000).toLocaleDateString() : o.createdAt || o.date || "—",
      }))}
      columns={[
        { key: "id", label: "Order ID", render: (r) => <span className="font-mono text-xs">{r.id}</span> },
        { key: "farmer", label: "Buyer / User" },
        { key: "seller", label: "Seller" },
        { key: "items", label: "Items" },
        { key: "amount", label: "Amount", render: (r) => <span className="font-semibold">{r.amount}</span> },
        { key: "date", label: "Date" },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
