import { createFileRoute } from "@tanstack/react-router";
import { DataPage } from "@/components/admin/DataPage";
import { useQuery } from "@tanstack/react-query";
import { getLocalizedText } from "@/lib/utils";

export const Route = createFileRoute("/orders/cattle")({
  head: () => ({ meta: [{ title: "Cattle orders — iHerd Admin" }] }),
  component: CattleOrdersPage,
});

const API_BASE =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "") ||
  "https://iherdadminpanel.onrender.com";

async function fetchCattleOrders() {
  try {
    const res = await fetch(`${API_BASE}/api/admin/cattle-orders`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.orders || [];
  } catch (err) {
    console.warn("Error fetching cattle orders from backend:", err);
    return [];
  }
}

function CattleOrdersPage() {
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["adminCattleOrders"],
    queryFn: fetchCattleOrders,
    placeholderData: [],
    staleTime: 15_000,
  });

  const totalCount = orders.length;
  const escrowCount = orders.filter(o => (o.status || "").toLowerCase().includes("escrow") || (o.status || "").toLowerCase() === "pending").length;
  const completedCount = orders.filter(o => (o.status || "").toLowerCase() === "completed" || (o.status || "").toLowerCase() === "delivered").length;

  return (
    <DataPage
      title="Cattle orders"
      description="Track buyer–seller cattle transactions from CattleOrders collection."
      primaryAction=""
      filters={["Pending", "In escrow", "In transit", "Completed", "Cancelled"]}
      statusKey="status"
      kpis={[
        { label: "Total cattle orders", value: isLoading ? "…" : totalCount.toLocaleString() },
        { label: "In escrow / Pending", value: isLoading ? "…" : escrowCount.toLocaleString() },
        { label: "Completed", value: isLoading ? "…" : completedCount.toLocaleString() },
        { label: "Cancelled", value: isLoading ? "…" : orders.filter(o => (o.status || "").toLowerCase() === "cancelled").length.toLocaleString() },
      ]}
      data={orders.map(o => ({
        ...o,
        status: o.status || "Pending",
        id: o.id || o.orderId || "—",
        buyer: o.buyerName || o.userName || o.userId || "—",
        seller: o.sellerName || o.sellerId || "—",
        animal: o.cattleBreed || o.animalType || o.breed || o.title || "Cattle",
        amount: o.amount ? (typeof o.amount === "number" ? `₹${o.amount.toLocaleString()}` : o.amount) : o.price ? `₹${o.price}` : "—",
        date: o.createdAt?.seconds ? new Date(o.createdAt.seconds * 1000).toLocaleDateString() : o.createdAt || o.date || "—",
      }))}
      columns={[
        { key: "id", label: "Order ID", render: (r) => <span className="font-mono text-xs">{r.id}</span> },
        { key: "buyer", label: "Buyer" },
        { key: "seller", label: "Seller" },
        { key: "animal", label: "Animal" },
        { key: "amount", label: "Amount", render: (r) => <span className="font-semibold">{r.amount}</span> },
        { key: "date", label: "Date" },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
