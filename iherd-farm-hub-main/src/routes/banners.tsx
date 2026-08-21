import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Plus, Image as ImageIcon } from "lucide-react";

export const Route = createFileRoute("/banners")({
  head: () => ({ meta: [{ title: "Banners — iHerd Admin" }] }),
  component: Banners,
});

const banners = [
  { id: "B-01", title: "Monsoon cattle care", placement: "Home hero", clicks: 12480, ctr: "4.8%", status: "Active", grad: "from-primary to-primary-glow" },
  { id: "B-02", title: "20% off vet medicines", placement: "Marketplace top", clicks: 8240, ctr: "3.2%", status: "Active", grad: "from-info to-primary" },
  { id: "B-03", title: "Refer a farmer · earn ₹500", placement: "App drawer", clicks: 2104, ctr: "1.1%", status: "Scheduled", grad: "from-warning to-primary-glow" },
  { id: "B-04", title: "Buffalo breed expo", placement: "Marketplace banner", clicks: 0, ctr: "—", status: "Draft", grad: "from-muted-foreground to-primary" },
];

function Banners() {
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

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {banners.map((b) => (
          <Card key={b.id} className="rounded-2xl overflow-hidden p-0">
            <div className={`relative h-32 bg-gradient-to-br ${b.grad}`}>
              <div className="absolute inset-0 grid place-items-center text-white/90">
                <ImageIcon className="h-8 w-8" />
              </div>
              <div className="absolute top-3 right-3">
                <StatusBadge status={b.status} />
              </div>
            </div>
            <div className="p-4">
              <div className="font-semibold truncate">{b.title}</div>
              <div className="text-xs text-muted-foreground">{b.placement}</div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <div className="text-xs text-muted-foreground">Clicks</div>
                  <div className="font-semibold">{b.clicks.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">CTR</div>
                  <div className="font-semibold">{b.ctr}</div>
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
    </div>
  );
}
