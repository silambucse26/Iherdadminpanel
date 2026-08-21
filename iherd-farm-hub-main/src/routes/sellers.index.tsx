import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { DataPage } from "@/components/admin/DataPage";

export const Route = createFileRoute("/sellers/")({
  head: () => ({ meta: [{ title: "Sellers — iHerd Admin" }] }),
  component: SellersPage,
});

function SellersPage() {
  const { data: allUsers = [] } = useQuery<any[]>({
    queryKey: ["adminUsers"],
    queryFn: async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/users`);
        const data = await res.json();
        return data.users || [];
      } catch (error) {
        console.error("Error fetching users from backend:", error);
        return [];
      }
    },
    initialData: [],
  });

  // Extract sellers from users collection who have a 'seller' object or roles array
  const sellers = allUsers
    .filter(u => u && (
      (u.seller && typeof u.seller === "object" && Object.keys(u.seller).length > 0) ||
      (u.roles && u.roles.includes("seller"))
    ))
    .map(u => {
      const sellerProfile = u.seller || {};
      return {
        id: u.uid || u.id,
        name: sellerProfile.name || sellerProfile.shopName || u.displayName || u.name || "Unknown Seller",
        category: sellerProfile.category || "—",
        products: sellerProfile.products || 0,
        gmv: sellerProfile.gmv || "—",
        rating: sellerProfile.rating || 0,
        status: u.status || "Active",
        verified: sellerProfile.verified || false,
      };
    });

  const totalSellers = sellers.length;
  const verifiedSellers = sellers.filter(s => s.verified).length;

  return (
    <DataPage
      title="Seller management"
      description="Manage marketplace sellers — feed, equipment, medicines and cattle."
      primaryAction="Add seller"
      filters={["Active", "Pending", "Suspended"]}
      kpis={[
        { label: "Total sellers", value: totalSellers.toLocaleString() },
        { label: "Verified", value: verifiedSellers.toLocaleString() },
        { label: "GMV (30d)", value: "₹0" },
        { label: "Avg payout", value: "₹0" },
      ]}
      data={sellers}
      rowHref={(row) => `/users/${row.id}`}
      columns={[
        {
          key: "name",
          label: "Seller",
          render: (row) => (
            <Link
              to="/users/$userId"
              params={{ userId: row.id }}
              className="font-medium text-primary hover:underline underline-offset-2"
            >
              {row.name}
            </Link>
          ),
        },
        { key: "category", label: "Category" },
        { key: "products", label: "Products" },
        { key: "gmv", label: "GMV (30d)" },
        { key: "rating", label: "Rating" },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
