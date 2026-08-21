import { createFileRoute } from "@tanstack/react-router";
import { DataPage } from "@/components/admin/DataPage";
import { useFirebaseCollection } from "../hooks/useFirebaseData";

export const Route = createFileRoute("/orders/products")({
  head: () => ({ meta: [{ title: "Product orders — iHerd Admin" }] }),
  component: ProductOrdersPage,
});

function ProductOrdersPage() {
  const { data: orders } = useFirebaseCollection<any>("product_orders");

  const totalCount = orders.length;
  const processingCount = orders.filter(o => o.status === "Processing").length;

  return (
    <DataPage
      title="Product orders"
      description="All marketplace orders — feed, medicines and equipment."
      primaryAction="Create order"
      filters={["Pending", "Processing", "Shipped", "Completed", "Cancelled"]}
      kpis={[
        { label: "Orders (30d)", value: totalCount.toLocaleString() },
        { label: "Processing", value: processingCount.toLocaleString() },
        { label: "Revenue (30d)", value: "₹0" },
        { label: "Avg order value", value: "₹0" },
      ]}
      data={orders}
      columns={[
        { key: "id", label: "Order" },
        { key: "farmer", label: "Farmer" },
        { key: "seller", label: "Seller" },
        { key: "items", label: "Items" },
        { key: "amount", label: "Amount", render: (r) => <span className="font-semibold">{r.amount}</span> },
        { key: "date", label: "Date" },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
