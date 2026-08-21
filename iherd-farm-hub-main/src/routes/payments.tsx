import { createFileRoute } from "@tanstack/react-router";
import { DataPage } from "@/components/admin/DataPage";

export const Route = createFileRoute("/payments")({
  head: () => ({ meta: [{ title: "Payments — iHerd Admin" }] }),
  component: () => (
    <DataPage
      title="Payments & commissions"
      description="Transactions, payouts and platform commissions."
      primaryAction="Initiate payout"
      filters={["Paid", "Pending", "Failed"]}
      kpis={[
        { label: "Gross volume (30d)", value: "₹1.24 Cr" },
        { label: "Commission (30d)", value: "₹14.8L" },
        { label: "Pending payouts", value: "₹1.84L" },
        { label: "Refunds (30d)", value: "₹62,400" },
      ]}
      data={[
        { id: "TXN-22014", party: "GreenFeed Co.", type: "Payout", method: "UPI", amount: "₹38,400", date: "Today · 09:12", status: "Paid" },
        { id: "TXN-22013", party: "Ravi Patel", type: "Order payment", method: "Card", amount: "₹4,820", date: "Today · 08:44", status: "Paid" },
        { id: "TXN-22012", party: "VetMed Supplies", type: "Commission", method: "—", amount: "₹1,240", date: "Today · 08:30", status: "Paid" },
        { id: "TXN-22011", party: "Dr. Meera Singh", type: "Vet payout", method: "Bank", amount: "₹12,800", date: "Yesterday", status: "Pending" },
        { id: "TXN-22010", party: "Manoj Kumar", type: "Order payment", method: "UPI", amount: "₹18,500", date: "Yesterday", status: "Failed" },
      ]}
      columns={[
        { key: "id", label: "Transaction" },
        { key: "party", label: "Party" },
        { key: "type", label: "Type" },
        { key: "method", label: "Method" },
        { key: "amount", label: "Amount", render: (r) => <span className="font-semibold">{r.amount}</span> },
        { key: "date", label: "Date" },
        { key: "status", label: "Status" },
      ]}
    />
  ),
});
