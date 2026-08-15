import { createFileRoute } from "@tanstack/react-router";
import { DataPage } from "@/components/admin/DataPage";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useFirebaseCollection } from "../hooks/useFirebaseData";

export const Route = createFileRoute("/marketplace/cattle")({
  head: () => ({ meta: [{ title: "Cattle marketplace — iHerd Admin" }] }),
  component: CattleMarketplacePage,
});

function CattleMarketplacePage() {
  const { data: listings } = useFirebaseCollection<any>("cattle");

  const pendingCount = listings.filter(l => l.status === "Pending").length;
  const approvedCount = listings.filter(l => l.status === "Approved").length;
  const rejectedCount = listings.filter(l => l.status === "Rejected").length;

  return (
    <DataPage
      title="Cattle marketplace moderation"
      description="Review and approve cattle listings before they go live."
      primaryAction="New listing"
      filters={["Pending", "Approved", "Rejected"]}
      kpis={[
        { label: "Pending review", value: pendingCount.toLocaleString() },
        { label: "Approved", value: approvedCount.toLocaleString() },
        { label: "Rejected", value: rejectedCount.toLocaleString() },
        { label: "Total listings", value: listings.length.toLocaleString() },
      ]}
      data={listings}
      columns={[
        { key: "id", label: "Listing" },
        { key: "title", label: "Animal" },
        { key: "seller", label: "Seller" },
        { key: "price", label: "Price", render: (r) => <span className="font-semibold">{r.price}</span> },
        { key: "state", label: "State" },
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
