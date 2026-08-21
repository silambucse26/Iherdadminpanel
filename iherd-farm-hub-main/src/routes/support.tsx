import { createFileRoute } from "@tanstack/react-router";
import { DataPage } from "@/components/admin/DataPage";

export const Route = createFileRoute("/support")({
  head: () => ({ meta: [{ title: "Customer Issues — iHerd Admin" }] }),
  component: () => (
    <DataPage
      title="Customer issues"
      description="Customer issues queue across farmers and sellers."
      primaryAction="New issue"
      filters={["Open", "Pending", "Closed"]}
      kpis={[
        { label: "Open tickets", value: "47" },
        { label: "Avg response", value: "1h 22m" },
        { label: "Resolution rate", value: "92%" },
        { label: "CSAT", value: "4.6 / 5" },
      ]}
      data={[
        { id: "TK-9912", from: "Rajesh Farms", subject: "Feed delivery delayed by 3 days", priority: "High", agent: "Sneha", updated: "5m ago", status: "Open" },
        { id: "TK-9911", from: "Dr. Imran Khan", subject: "Payout not received for last week", priority: "High", agent: "Vikram", updated: "32m ago", status: "Open" },
        { id: "TK-9910", from: "Lakshmi Devi", subject: "Unable to upload cattle photo", priority: "Low", agent: "Sneha", updated: "1h ago", status: "Pending" },
        { id: "TK-9909", from: "GreenFeed Co.", subject: "Refund request for order IH-7715", priority: "Medium", agent: "Aarav", updated: "2h ago", status: "Open" },
        { id: "TK-9908", from: "Suresh Yadav", subject: "Tele-consult video issue", priority: "Medium", agent: "Vikram", updated: "Yesterday", status: "Closed" },
      ]}
      columns={[
        { key: "id", label: "Ticket" },
        { key: "from", label: "From" },
        { key: "subject", label: "Subject" },
        {
          key: "priority",
          label: "Priority",
          render: (r) => {
            const c =
              r.priority === "High"
                ? "bg-destructive/15 text-destructive"
                : r.priority === "Medium"
                ? "bg-warning/15 text-warning-foreground"
                : "bg-muted text-muted-foreground";
            return <span className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ${c}`}>{r.priority}</span>;
          },
        },
        { key: "agent", label: "Agent" },
        { key: "updated", label: "Updated" },
        { key: "status", label: "Status" },
      ]}
    />
  ),
});
