import { createFileRoute } from "@tanstack/react-router";
import { DataPage } from "@/components/admin/DataPage";
import { useFirebaseCollection } from "../hooks/useFirebaseData";

export const Route = createFileRoute("/orders/cattle")({
  head: () => ({ meta: [{ title: "Cattle orders — iHerd Admin" }] }),
  component: CattleOrdersPage,
});

function CattleOrdersPage() {
  const { data: orders } = useFirebaseCollection<any>("cattle_orders");

  const totalCount = orders.length;
  const escrowCount = orders.filter(o => o.status === "In escrow").length;

  return (
    <DataPage
      title="Cattle orders"
      description="Track buyer–seller cattle transactions across the marketplace."
      primaryAction="Create order"
      filters={["Pending", "In escrow", "In transit", "Completed", "Cancelled"]}
      kpis={[
        { label: "Cattle orders (30d)", value: totalCount.toLocaleString() },
        { label: "In escrow", value: escrowCount.toLocaleString() },
        { label: "GMV (30d)", value: "₹0" },
        { label: "Avg deal size", value: "₹0" },
      ]}
      data={orders}
      columns={[
        { key: "id", label: "Order" },
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
