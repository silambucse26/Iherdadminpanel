import { createFileRoute, Link } from "@tanstack/react-router";
import { DataPage } from "@/components/admin/DataPage";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { useAdminUsers } from "../hooks/useAdminUsers";

export const Route = createFileRoute("/vets/")({
  head: () => ({ meta: [{ title: "Veterinarians — iHerd Admin" }] }),
  component: VetsPage,
});

function VetsPage() {
  const { data: allUsers = [] } = useAdminUsers();

  // Filter users who have a 'veterinarian' or 'vet' profile details or roles array
  const vets = allUsers
    .filter(u => u && (
      (u.veterinarian && typeof u.veterinarian === "object") ||
      (u.vet && typeof u.vet === "object") ||
      (u.roles && (u.roles.includes("veterinarian") || u.roles.includes("vet")))
    ))
    .map(u => {
      const vetDetails = u.veterinarian || u.vet || {};
      return {
        id: u.uid || u.id,
        name: vetDetails.name || u.displayName || u.name || "Unknown Vet",
        clinic: vetDetails.clinic || vetDetails.hospital || "—",
        qualification: vetDetails.qualification || "—",
        experience: vetDetails.experience ? `${vetDetails.experience} Years` : "—",
        joined: u.createdAt 
          ? new Date(u.createdAt.seconds ? u.createdAt.seconds * 1000 : u.createdAt).toLocaleDateString()
          : u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—",
        status: u.status || "Active",
        verified: vetDetails.verified || false,
      };
    });

  const totalVets = vets.length;
  const activeVets = vets.filter(v => v.status === "Active").length;
  const pendingVets = vets.filter(v => v.status === "Pending" || v.status === "In Review").length;

  return (
    <DataPage
      title="Veterinarian management"
      description="Approve certifications, qualifications, and manage veterinary doctors on iHerd."
      primaryAction="Register vet"
      filters={["Active", "Pending", "Suspended"]}
      rowHref={(r) => `/users/${r.id}`}
      kpis={[
        { label: "Total Veterinarians", value: totalVets.toLocaleString() },
        { label: "Active Doctors", value: activeVets.toLocaleString() },
        { label: "Pending Verification", value: pendingVets.toLocaleString() },
        { label: "Joined this month", value: "0" },
      ]}
      data={vets}
      columns={[
        {
          key: "name",
          label: "Veterinarian",
          render: (r) => (
            <Link
              to="/users/$userId"
              params={{ userId: r.id }}
              className="flex items-center gap-3 min-w-0 group"
            >
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                DR
              </div>
              <div className="min-w-0">
                <div className="font-medium truncate group-hover:text-primary transition-colors">{r.name}</div>
                <div className="text-xs text-muted-foreground truncate">{r.id}</div>
              </div>
            </Link>
          ),
        },
        { key: "clinic", label: "Clinic / Hospital" },
        { key: "qualification", label: "Qualification" },
        { key: "experience", label: "Experience" },
        { key: "joined", label: "Joined" },
        { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
      ]}
    />
  );
}
