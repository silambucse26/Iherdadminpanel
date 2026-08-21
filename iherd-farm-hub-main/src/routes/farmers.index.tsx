import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { DataPage } from "@/components/admin/DataPage";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { getAdminUsers } from "../lib/api/admin.users.server";

export const Route = createFileRoute("/farmers/")({
  head: () => ({ meta: [{ title: "Farmers — iHerd Admin" }] }),
  component: FarmersPage,
});

function FarmersPage() {
  const { data: allUsers = [] } = useQuery<any[]>({
    queryKey: ["adminUsers"],
    queryFn: async () => {
      try {
        const result = await getAdminUsers();
        return result.users || [];
      } catch (error) {
        console.error("Error fetching users from backend:", error);
        return [];
      }
    },
    initialData: [],
  });

  // Extract farmers from users collection who have a 'farms' object or 'farmer' profile
  const farmers = allUsers
    .filter(u => u && (
      (u.farms && (typeof u.farms === "object" || Array.isArray(u.farms))) ||
      (u.farmer && typeof u.farmer === "object" && Object.keys(u.farmer).length > 0) ||
      (u.roles && u.roles.includes("farmer"))
    ))
    .map(u => {
      const farmerProfile = u.farmer || {};
      const farmDetails = (u.farms && !Array.isArray(u.farms)) ? u.farms : {};
      
      return {
        id: u.uid || u.id,
        name: farmerProfile.name || farmDetails.name || u.displayName || u.name || "Unknown Farmer",
        farm: farmDetails.name || farmerProfile.village || farmerProfile.address || "—",
        state: farmerProfile.state || farmDetails.state || "—",
        cattle: farmDetails.cattle || farmerProfile.cattle || u.cattle || 0,
        joined: u.createdAt 
          ? new Date(u.createdAt.seconds ? u.createdAt.seconds * 1000 : u.createdAt).toLocaleDateString()
          : u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—",
        status: u.status || "Active",
      };
    });

  const totalFarmers = farmers.length;
  const activeFarmers = farmers.filter(f => f.status === "Active").length;
  const pendingFarmers = farmers.filter(f => f.status === "Pending").length;
  const suspendedFarmers = farmers.filter(f => f.status === "Suspended").length;

  return (
    <DataPage
      title="Farmer management"
      description="Onboard, verify and manage farmers on iHerd."
      primaryAction="Add farmer"
      filters={["Active", "Pending", "Suspended"]}
      rowHref={(r) => `/users/${r.id}`}
      kpis={[
        { label: "Total farmers", value: totalFarmers.toLocaleString(), hint: `+${pendingFarmers} pending KYC` },
        { label: "Active", value: activeFarmers.toLocaleString() },
        { label: "Pending KYC", value: pendingFarmers.toLocaleString() },
        { label: "Suspended", value: suspendedFarmers.toLocaleString() },
      ]}
      data={farmers}
      columns={[
        {
          key: "name",
          label: "Farmer",
          render: (r) => (
            <Link
              to="/users/$userId"
              params={{ userId: r.id }}
              className="flex items-center gap-3 min-w-0 group"
            >
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                {r.name.split(" ").map((n: string) => n[0]).slice(0, 2).join("").toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="font-medium truncate group-hover:text-primary transition-colors">{r.name}</div>
                <div className="text-xs text-muted-foreground truncate">{r.id}</div>
              </div>
            </Link>
          ),
        },
        { key: "farm", label: "Farm" },
        { key: "state", label: "State" },
        { key: "cattle", label: "Cattle", render: (r) => <span className="font-medium">{r.cattle}</span> },
        { key: "joined", label: "Joined" },
        { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
      ]}
    />
  );
}
