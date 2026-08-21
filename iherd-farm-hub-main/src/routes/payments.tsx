import { createFileRoute } from "@tanstack/react-router";
import { DataPage } from "@/components/admin/DataPage";
import { useFirebaseCollection } from "../hooks/useFirebaseData";

export const Route = createFileRoute("/payments")({
  head: () => ({ meta: [{ title: "Payments — iHerd Admin" }] }),
  component: PaymentsPage,
});

function PaymentsPage() {
  const { data: payments = [], isLoading } = useFirebaseCollection<any>("payments");

  const total = payments.length;
  const paid = payments.filter((p: any) => p.status === "Paid" || p.status === "paid").length;
  const pending = payments.filter((p: any) => p.status === "Pending" || p.status === "pending").length;
  const failed = payments.filter((p: any) => p.status === "Failed" || p.status === "failed").length;

  return (
    <DataPage
      title="Payments & commissions"
      description="Transactions, payouts and platform commissions from Firestore."
      primaryAction=""
      filters={["Paid", "Pending", "Failed"]}
      statusKey="status"
      kpis={[
        { label: "Total transactions", value: isLoading ? "…" : total.toLocaleString() },
        { label: "Paid", value: isLoading ? "…" : paid.toLocaleString() },
        { label: "Pending", value: isLoading ? "…" : pending.toLocaleString() },
        { label: "Failed", value: isLoading ? "…" : failed.toLocaleString() },
      ]}
      data={payments}
      columns={[
        { key: "id", label: "Transaction", render: (r) => <span className="font-mono text-xs">{r.id || r.transactionId || "—"}</span> },
        { key: "party", label: "Party", render: (r) => <span>{r.party || r.name || r.userName || r.userId || "—"}</span> },
        { key: "type", label: "Type", render: (r) => <span>{r.type || r.paymentType || "—"}</span> },
        { key: "method", label: "Method", render: (r) => <span>{r.method || r.paymentMethod || "—"}</span> },
        { key: "amount", label: "Amount", render: (r) => <span className="font-semibold">{r.amount ? `₹${Number(r.amount).toLocaleString()}` : "—"}</span> },
        { key: "createdAt", label: "Date", render: (r) => {
          const d = r.createdAt?.seconds ? new Date(r.createdAt.seconds * 1000) : r.createdAt ? new Date(r.createdAt) : null;
          return <span className="text-xs">{d ? d.toLocaleString() : "—"}</span>;
        }},
        { key: "status", label: "Status" },
      ]}
    />
  );
}
