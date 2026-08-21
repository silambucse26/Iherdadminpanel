import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PageHeader } from "@/components/admin/PageHeader";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — iHerd Admin" }] }),
  component: Settings,
});

function Settings() {
  return (
    <div>
      <PageHeader title="Settings" description="Platform-wide configuration for iHerd." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 rounded-2xl">
          <h3 className="font-semibold">Platform</h3>
          <p className="text-xs text-muted-foreground mb-4">General platform configuration</p>
          <div className="space-y-4">
            <div>
              <Label>Platform name</Label>
              <Input defaultValue="iHerd" className="mt-1.5" />
            </div>
            <div>
              <Label>Support email</Label>
              <Input defaultValue="support@iherd.farm" className="mt-1.5" />
            </div>
            <div>
              <Label>Default commission (%)</Label>
              <Input defaultValue="12" type="number" className="mt-1.5" />
            </div>
          </div>
        </Card>

        <Card className="p-6 rounded-2xl">
          <h3 className="font-semibold">Operations</h3>
          <p className="text-xs text-muted-foreground mb-4">Toggles that affect daily operations</p>
          <ul className="space-y-4">
            {[
              { l: "Auto-approve verified sellers", d: "Skip manual review for sellers with >50 fulfilled orders", on: true },
              { l: "Enable home visit booking", d: "Allow farmers to request on-site vet visits", on: true },
              { l: "Marketplace cattle listings", d: "Accept new cattle listings from sellers", on: true },
              { l: "Maintenance mode", d: "Show maintenance banner across the platform", on: false },
            ].map((r) => (
              <li key={r.l} className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-sm font-medium">{r.l}</div>
                  <div className="text-xs text-muted-foreground">{r.d}</div>
                </div>
                <Switch defaultChecked={r.on} />
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6 rounded-2xl">
          <h3 className="font-semibold">Notifications</h3>
          <p className="text-xs text-muted-foreground mb-4">Default channels for admin alerts</p>
          <ul className="space-y-4">
            {["Email digest (daily)", "SMS for critical alerts", "In-app push", "Slack webhook"].map((c) => (
              <li key={c} className="flex items-center justify-between">
                <span className="text-sm">{c}</span>
                <Switch defaultChecked />
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6 rounded-2xl">
          <h3 className="font-semibold">Security</h3>
          <p className="text-xs text-muted-foreground mb-4">Authentication and access</p>
          <ul className="space-y-4">
            {[
              { l: "Require 2FA for all admins", on: true },
              { l: "Allow session sharing across devices", on: false },
              { l: "Audit log export", on: true },
            ].map((r) => (
              <li key={r.l} className="flex items-center justify-between">
                <span className="text-sm">{r.l}</span>
                <Switch defaultChecked={r.on} />
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline">Reset</Button>
            <Button className="bg-gradient-to-br from-primary to-primary-glow">Save settings</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
