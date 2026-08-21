import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PageHeader } from "@/components/admin/PageHeader";
import { toast } from "sonner";
import {
  Bell,
  ShoppingBag,
  Stethoscope,
  AlertTriangle,
  Wallet,
  Send,
  Search,
  CheckCircle2,
  Smartphone,
  Clock,
  Plus,
} from "lucide-react";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — iHerd Admin" }] }),
  component: NotificationCenter,
});

const received = [
  { icon: ShoppingBag, tint: "bg-warning/10 text-warning-foreground", title: "Marketplace listings pending review", message: "23 new listings need approval before going live.", sender: "Marketplace Bot", datetime: "Jun 19, 2026 · 10:42 AM", status: "Unread" },
  { icon: Stethoscope, tint: "bg-info/10 text-info", title: "Seller KYC submitted", message: "Sharma Feeds uploaded GST and PAN documents for review.", sender: "Onboarding", datetime: "Jun 19, 2026 · 10:18 AM", status: "Unread" },
  { icon: AlertTriangle, tint: "bg-destructive/10 text-destructive", title: "Payment failure spike detected", message: "UPI gateway failure rate crossed 4% in the last hour.", sender: "System Health", datetime: "Jun 19, 2026 · 09:56 AM", status: "Unread" },
  { icon: Wallet, tint: "bg-success/10 text-success", title: "Weekly payout batch completed", message: "₹4.2L disbursed across 312 sellers.", sender: "Payments", datetime: "Jun 19, 2026 · 08:30 AM", status: "Read" },
  { icon: Bell, tint: "bg-primary/10 text-primary", title: "Campaign 'Monsoon care' ending soon", message: "Banner campaign will auto-pause tomorrow at 6 PM.", sender: "Marketing", datetime: "Jun 18, 2026 · 06:12 PM", status: "Read" },
  { icon: ShoppingBag, tint: "bg-warning/10 text-warning-foreground", title: "High value order awaiting approval", message: "Order IH-7819 (₹1.8L) flagged for manual review.", sender: "Orders", datetime: "Jun 18, 2026 · 03:44 PM", status: "Read" },
];

const farmsList = [
  { id: "F-101", name: "Rajesh Dairy Farm", location: "Anand, Gujarat", herd: 84 },
  { id: "F-102", name: "GreenPasture Cattle Co.", location: "Mysuru, Karnataka", herd: 156 },
  { id: "F-103", name: "Lakshmi Goshala", location: "Erode, Tamil Nadu", herd: 42 },
  { id: "F-104", name: "Suresh Yadav Farms", location: "Meerut, UP", herd: 67 },
  { id: "F-105", name: "Patel Livestock", location: "Surat, Gujarat", herd: 128 },
  { id: "F-106", name: "Himalaya Herd", location: "Dehradun, UK", herd: 38 },
  { id: "F-107", name: "Konkan Cattle Hub", location: "Ratnagiri, MH", herd: 92 },
  { id: "F-108", name: "Deccan Agro Farms", location: "Hyderabad, TS", herd: 211 },
];

type PushItem = {
  title: string;
  message: string;
  farms: string;
  sent: string;
  delivered: string;
  opened: string;
  status: "Delivered" | "Scheduled";
};

const initialPush: PushItem[] = [
  { title: "Monsoon vaccination drive starts today", message: "Book a slot for your herd before Friday.", farms: "All farms · 412", sent: "Jun 19, 2026 · 09:00 AM", delivered: "408", opened: "172", status: "Delivered" },
  { title: "New payout cycle is live", message: "Weekly payouts for sellers begin tomorrow.", farms: "12 farms", sent: "Jun 18, 2026 · 04:20 PM", delivered: "12", opened: "9", status: "Delivered" },
  { title: "Fresh cattle listings posted", message: "Browse new Gir & Sahiwal cattle listed near you.", farms: "All farms · 412", sent: "Jun 17, 2026 · 11:00 AM", delivered: "401", opened: "188", status: "Delivered" },
  { title: "Verify bank details before Friday", message: "Required for uninterrupted payouts.", farms: "34 farms", sent: "Scheduled · Jun 20, 2026 · 10:00 AM", delivered: "—", opened: "—", status: "Scheduled" },
];

function NotificationCenter() {
  const [receivedQuery, setReceivedQuery] = useState("");
  const [pushQuery, setPushQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [pushItems, setPushItems] = useState<PushItem[]>(initialPush);

  const filteredReceived = useMemo(
    () =>
      received.filter((r) =>
        (r.title + r.message + r.sender).toLowerCase().includes(receivedQuery.toLowerCase()),
      ),
    [receivedQuery],
  );

  const filteredPush = useMemo(
    () =>
      pushItems.filter((p) =>
        (p.title + p.message + p.farms).toLowerCase().includes(pushQuery.toLowerCase()),
      ),
    [pushItems, pushQuery],
  );

  return (
    <div>
      <PageHeader
        title="Notification center"
        description="Manage incoming alerts and send push notifications to farms."
        actions={
          <>
            <Button variant="outline" size="sm">Mark all read</Button>
            <Button size="sm" className="bg-gradient-to-br from-primary to-primary-glow" onClick={() => setOpen(true)}>
              <Send className="h-4 w-4 mr-1.5" />
              Send push notification
            </Button>
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        {[
          { label: "Unread", value: "3", icon: Bell, tint: "bg-primary/10 text-primary" },
          { label: "Sent (30d)", value: "182", icon: Send, tint: "bg-info/10 text-info" },
          { label: "Delivery rate", value: "98.4%", icon: CheckCircle2, tint: "bg-success/10 text-success" },
          { label: "Scheduled", value: "4", icon: Clock, tint: "bg-warning/10 text-warning-foreground" },
        ].map((k) => (
          <Card key={k.label} className="p-5 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className={`grid h-10 w-10 place-items-center rounded-xl ${k.tint}`}>
                <k.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">{k.label}</div>
                <div className="text-xl font-semibold tracking-tight">{k.value}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="received">
        <TabsList>
          <TabsTrigger value="received">Received Notifications</TabsTrigger>
          <TabsTrigger value="push">Push Notifications</TabsTrigger>
        </TabsList>

        {/* RECEIVED */}
        <TabsContent value="received" className="mt-5">
          <Card className="p-0 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between gap-3 p-5 border-b">
              <div>
                <h3 className="font-semibold">All received notifications</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Alerts triggered by platform events and operators.</p>
              </div>
              <div className="relative w-full max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={receivedQuery}
                  onChange={(e) => setReceivedQuery(e.target.value)}
                  placeholder="Search notifications"
                  className="pl-9"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-5 py-3 text-left font-medium">Title</th>
                    <th className="px-5 py-3 text-left font-medium">Message</th>
                    <th className="px-5 py-3 text-left font-medium">Sender</th>
                    <th className="px-5 py-3 text-left font-medium">Date &amp; time</th>
                    <th className="px-5 py-3 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredReceived.map((n, i) => (
                    <tr key={i} className="hover:bg-muted/20">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${n.tint}`}>
                            <n.icon className="h-4 w-4" />
                          </div>
                          <span className="font-medium">{n.title}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-muted-foreground max-w-md">{n.message}</td>
                      <td className="px-5 py-3 text-muted-foreground">{n.sender}</td>
                      <td className="px-5 py-3 text-muted-foreground whitespace-nowrap">{n.datetime}</td>
                      <td className="px-5 py-3">
                        <span
                          className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ${
                            n.status === "Unread"
                              ? "bg-primary/15 text-primary"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {n.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredReceived.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-5 py-10 text-center text-sm text-muted-foreground">
                        No notifications match your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* PUSH */}
        <TabsContent value="push" className="mt-5">
          <Card className="p-0 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between gap-3 p-5 border-b">
              <div>
                <h3 className="font-semibold">Recent push notifications</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Push alerts sent by admins to selected farms.</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative w-full max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={pushQuery}
                    onChange={(e) => setPushQuery(e.target.value)}
                    placeholder="Search push history"
                    className="pl-9"
                  />
                </div>
                <Button size="sm" className="bg-gradient-to-br from-primary to-primary-glow" onClick={() => setOpen(true)}>
                  <Plus className="h-4 w-4 mr-1.5" />
                  Send push notification
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-5 py-3 text-left font-medium">Notification</th>
                    <th className="px-5 py-3 text-left font-medium">Target farms</th>
                    <th className="px-5 py-3 text-left font-medium">Sent</th>
                    <th className="px-5 py-3 text-left font-medium">Delivered</th>
                    <th className="px-5 py-3 text-left font-medium">Opened</th>
                    <th className="px-5 py-3 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredPush.map((p, i) => (
                    <tr key={i} className="hover:bg-muted/20 align-top">
                      <td className="px-5 py-3">
                        <div className="flex items-start gap-3">
                          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                            <Smartphone className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium">{p.title}</div>
                            <div className="text-xs text-muted-foreground mt-0.5 max-w-sm">{p.message}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-muted-foreground whitespace-nowrap">{p.farms}</td>
                      <td className="px-5 py-3 text-muted-foreground whitespace-nowrap">{p.sent}</td>
                      <td className="px-5 py-3">{p.delivered}</td>
                      <td className="px-5 py-3">{p.opened}</td>
                      <td className="px-5 py-3">
                        <span
                          className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ${
                            p.status === "Delivered"
                              ? "bg-success/15 text-success"
                              : "bg-warning/15 text-warning-foreground"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredPush.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-5 py-10 text-center text-sm text-muted-foreground">
                        No push notifications match your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <SendPushDialog
        open={open}
        onOpenChange={setOpen}
        onSend={(item) => {
          setPushItems((prev) => [item, ...prev]);
          toast.success("Push notification sent", { description: `Delivered to ${item.farms}` });
        }}
      />
    </div>
  );
}

function SendPushDialog({
  open,
  onOpenChange,
  onSend,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSend: (p: PushItem) => void;
}) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      farmsList.filter((f) =>
        (f.name + f.location + f.id).toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  const allVisibleSelected = filtered.length > 0 && filtered.every((f) => selected.includes(f.id));

  function toggle(id: string) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  function toggleAllVisible() {
    if (allVisibleSelected) {
      setSelected((s) => s.filter((id) => !filtered.some((f) => f.id === id)));
    } else {
      setSelected((s) => Array.from(new Set([...s, ...filtered.map((f) => f.id)])));
    }
  }

  function reset() {
    setTitle("");
    setMessage("");
    setSelected([]);
    setQuery("");
  }

  function handleSend() {
    if (!title.trim() || !message.trim() || selected.length === 0) {
      toast.error("Please add a title, message and select at least one farm.");
      return;
    }
    const farmsLabel = selected.length === farmsList.length ? `All farms · ${farmsList.length}` : `${selected.length} farm${selected.length > 1 ? "s" : ""}`;
    onSend({
      title: title.trim(),
      message: message.trim(),
      farms: farmsLabel,
      sent: "Just now",
      delivered: String(selected.length),
      opened: "0",
      status: "Delivered",
    });
    reset();
    onOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) reset();
        onOpenChange(v);
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Send push notification</DialogTitle>
          <DialogDescription>Compose a message and pick the farms it should reach.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="push-title">Title</Label>
            <Input
              id="push-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={80}
              placeholder="e.g. Monsoon vaccination drive starts today"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="push-message">Message</Label>
            <Textarea
              id="push-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={200}
              rows={3}
              placeholder="Short message shown in the notification banner"
            />
            <div className="text-[11px] text-muted-foreground text-right">{message.length}/200</div>
          </div>

          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label>Target farms</Label>
              <span className="text-xs text-muted-foreground">
                {selected.length} of {farmsList.length} selected
              </span>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search farms by name, location or ID"
                className="pl-9"
              />
            </div>
            <div className="rounded-xl border max-h-64 overflow-y-auto">
              <div className="flex items-center gap-3 px-4 py-2.5 border-b bg-muted/30 text-xs">
                <Checkbox checked={allVisibleSelected} onCheckedChange={toggleAllVisible} id="select-all" />
                <label htmlFor="select-all" className="font-medium cursor-pointer">
                  Select all visible
                </label>
              </div>
              <ul className="divide-y">
                {filtered.map((f) => {
                  const checked = selected.includes(f.id);
                  return (
                    <li
                      key={f.id}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted/20 cursor-pointer"
                      onClick={() => toggle(f.id)}
                    >
                      <Checkbox checked={checked} onCheckedChange={() => toggle(f.id)} />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{f.name}</div>
                        <div className="text-xs text-muted-foreground truncate">
                          {f.id} · {f.location} · {f.herd} animals
                        </div>
                      </div>
                    </li>
                  );
                })}
                {filtered.length === 0 && (
                  <li className="px-4 py-6 text-center text-sm text-muted-foreground">No farms match your search.</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button className="bg-gradient-to-br from-primary to-primary-glow" onClick={handleSend}>
            <Send className="h-4 w-4 mr-1.5" />
            Send notification
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
