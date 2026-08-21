import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/admin/PageHeader";
import { Plus, Image as ImageIcon } from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { useFirebaseCollection } from "../hooks/useFirebaseData";

export const Route = createFileRoute("/banners")({
  head: () => ({ meta: [{ title: "Banners — iHerd Admin" }] }),
  component: Banners,
});

const GRAD_COLORS = [
  "from-primary to-primary-glow",
  "from-info to-primary",
  "from-warning to-primary-glow",
  "from-muted-foreground to-primary",
  "from-success to-primary",
  "from-destructive to-primary-glow",
];

function Banners() {
  const { data: banners = [], isLoading } = useFirebaseCollection<any>("banners");

  return (
    <div>
      <PageHeader
        title="Banners & advertisements"
        description="Manage promotional banners across app and marketplace."
        actions={
          <Button size="sm" className="gap-1.5 bg-gradient-to-br from-primary to-primary-glow">
            <Plus className="h-4 w-4" /> New banner
          </Button>
        }
      />

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="rounded-2xl overflow-hidden p-0 animate-pulse">
              <div className="h-32 bg-muted" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
            </Card>
          ))}
        </div>
      ) : banners.length === 0 ? (
        <Card className="rounded-2xl p-12 text-center">
          <ImageIcon className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
          <p className="font-semibold">No banners found</p>
          <p className="text-sm text-muted-foreground mt-1">No banner data in the Firestore 'banners' collection yet.</p>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {banners.map((b: any, idx: number) => (
            <Card key={b.id || idx} className="rounded-2xl overflow-hidden p-0">
              <div className={`relative h-32 bg-gradient-to-br ${GRAD_COLORS[idx % GRAD_COLORS.length]}`}>
                <div className="absolute inset-0 grid place-items-center text-white/90">
                  {b.imageUrl ? (
                    <img src={b.imageUrl} alt={b.title} className="h-full w-full object-cover" />
                  ) : (
                    <ImageIcon className="h-8 w-8" />
                  )}
                </div>
                <div className="absolute top-3 right-3">
                  <StatusBadge status={b.status || "Draft"} />
                </div>
              </div>
              <div className="p-4">
                <div className="font-semibold truncate">{b.title || b.name || "Untitled banner"}</div>
                <div className="text-xs text-muted-foreground">{b.placement || b.location || "—"}</div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <div className="text-xs text-muted-foreground">Clicks</div>
                    <div className="font-semibold">{(b.clicks ?? 0).toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">CTR</div>
                    <div className="font-semibold">{b.ctr || "—"}</div>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                  <Button variant="outline" size="sm" className="flex-1">Pause</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
