import { createFileRoute } from "@tanstack/react-router";
import { DataPage } from "@/components/admin/DataPage";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useFirebaseCollection } from "../hooks/useFirebaseData";

export const Route = createFileRoute("/marketplace/products")({
  head: () => ({ meta: [{ title: "Product marketplace — iHerd Admin" }] }),
  component: ProductsMarketplacePage,
});

function ProductsMarketplacePage() {
  const { data: products } = useFirebaseCollection<any>("products");

  const pendingCount = products.filter(p => p.status === "Pending").length;
  const approvedCount = products.filter(p => p.status === "Approved").length;
  const outOfStockCount = products.filter(p => p.status === "Out of stock").length;

  return (
    <DataPage
      title="Product marketplace moderation"
      description="Review and approve seller products — feed, medicines, equipment."
      primaryAction="New product"
      filters={["Pending", "Approved", "Rejected", "Out of stock"]}
      kpis={[
        { label: "Active products", value: approvedCount.toLocaleString() },
        { label: "Pending review", value: pendingCount.toLocaleString() },
        { label: "Out of stock", value: outOfStockCount.toLocaleString() },
        { label: "Total products", value: products.length.toLocaleString() },
      ]}
      data={products}
      columns={[
        { key: "id", label: "Product" },
        { key: "title", label: "Name" },
        { key: "seller", label: "Seller" },
        { key: "category", label: "Category" },
        { key: "price", label: "Price", render: (r) => <span className="font-semibold">{r.price}</span> },
        { key: "status", label: "Status" },
        {
          key: "actions",
          label: "",
          render: (r) =>
            r.status === "Pending" ? (
              <div className="flex gap-1.5 justify-end">
                <Button size="sm" variant="outline" className="h-8 px-2 text-success border-success/30 hover:bg-success/10">
                  <Check className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="h-8 px-2 text-destructive border-destructive/30 hover:bg-destructive/10">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : null,
          className: "text-right",
        },
      ]}
    />
  );
}
