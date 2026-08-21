import { createFileRoute } from "@tanstack/react-router";
import { DataPage } from "@/components/admin/DataPage";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useFirebaseCollection } from "../hooks/useFirebaseData";

import { getLocalizedText } from "@/lib/utils";

export const Route = createFileRoute("/marketplace/products")({
  head: () => ({ meta: [{ title: "Product marketplace — iHerd Admin" }] }),
  component: ProductsMarketplacePage,
});

function ProductsMarketplacePage() {
  const { data: products = [], isLoading } = useFirebaseCollection<any>("product_marketplace/main/products");

  const approvedCount = products.filter(p => (getLocalizedText(p.status) || "").toLowerCase() === "approved" || (getLocalizedText(p.status) || "").toLowerCase() === "active" || !p.status).length;
  const pendingCount = products.filter(p => (getLocalizedText(p.status) || "").toLowerCase() === "pending").length;
  const outOfStockCount = products.filter(p => (getLocalizedText(p.status) || "").toLowerCase() === "out of stock" || p.stock === 0 || p.quantity === 0).length;

  return (
    <DataPage
      title="Product marketplace moderation"
      description="Review and manage products from product_marketplace/main/products."
      primaryAction=""
      filters={["Approved", "Pending", "Out of stock", "Rejected"]}
      statusKey="status"
      kpis={[
        { label: "Total products", value: isLoading ? "…" : products.length.toLocaleString() },
        { label: "Active products", value: isLoading ? "…" : approvedCount.toLocaleString() },
        { label: "Pending review", value: isLoading ? "…" : pendingCount.toLocaleString() },
        { label: "Out of stock", value: isLoading ? "…" : outOfStockCount.toLocaleString() },
      ]}
      data={products.map(p => ({
        ...p,
        status: getLocalizedText(p.status, p.stock === 0 ? "Out of stock" : "Approved"),
        title: getLocalizedText(p.title || p.productName || p.name, "Product"),
        seller: getLocalizedText(p.sellerName || p.postedByUid || p.sellerId, "—"),
        category: getLocalizedText(p.categoryName || p.category || p.subCategory, "General"),
        price: p.price ? (typeof p.price === "number" ? `₹${p.price.toLocaleString()}` : String(p.price).startsWith("₹") ? p.price : `₹${getLocalizedText(p.price)}`) : "—",
      }))}
      columns={[
        { key: "id", label: "Product ID", render: (r) => <span className="font-mono text-xs">{getLocalizedText(r.id)}</span> },
        { key: "title", label: "Product Name", render: (r) => (
          <div className="flex items-center gap-2">
            {r.images?.[0] || r.imageUrl || r.thumbnail ? (
              <img src={r.images?.[0] || r.imageUrl || r.thumbnail} alt="" className="h-8 w-8 rounded-lg object-cover bg-muted" />
            ) : null}
            <span className="font-medium">{getLocalizedText(r.title)}</span>
          </div>
        )},
        { key: "seller", label: "Seller" },
        { key: "category", label: "Category" },
        { key: "price", label: "Price", render: (r) => <span className="font-semibold">{getLocalizedText(r.price)}</span> },
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
