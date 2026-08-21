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
  AlertTriangle,
  Send,
  Search,
  CheckCircle2,
  Smartphone,
  Clock,
  Plus,
} from "lucide-react";
import { useFirebaseCollection } from "../hooks/useFirebaseData";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — iHerd Admin" }] }),
  component: NotificationCenter,
});

type PushItem = {
  title: string;
  message: string;
  farms: string;
  sent: string;
  delivered: string;
  opened: string;
  status: "Delivered" | "Scheduled";
};

function NotificationCenter() {
  const [receivedQuery, setReceivedQuery] = useState("");
  const [pushQuery, setPushQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [localPush, setLocalPush] = useState<PushItem[]>([]);

  // Real data from Firestore
  const { data: notifications = [], isLoading: nLoading } = useFirebaseCollection<any>("notifications");
  const { data: pushHistory = [], isLoading: pLoading } = useFirebaseCollection<any>("push_notifications");
  const { data: farmers = [] } = useFirebaseCollection<any>("farmers");

  // Combine Firestore push history with locally sent ones (for this session)
  const allPush: PushItem[] = [
    ...localPush,
    ...pushHistory.map((p: any) => ({
      title: p.title || "—",
      message: p.message || p.body || "—",
      farms: p.farms || p.targetFarms || "—",
      sent: p.sentAt?.seconds
        ? new Date(p.sentAt.seconds * 1000).toLocaleString()
        : p.sentAt || p.sent || "—",
      delivered: String(p.delivered ?? p.deliveredCount ?? "—"),
      opened: String(p.opened ?? p.openedCount ?? "—"),
      status: (p.status === "Scheduled" ? "Scheduled" : "Delivered") as "Delivered" | "Scheduled",
    })),
  ];

  const unread = notifications.filter((n: any) =>
    (n.status || "").toLowerCase() === "unread"
  ).length;

  const scheduled = allPush.filter((p) => p.status === "Scheduled").length;

  const filteredReceived = useMemo(
    () =>
      notifications.filter((n: any) =>
        (String(n.title || "") + String(n.message || n.body || "") + String(n.sender || n.from || ""))
          .toLowerCase()
          .includes(receivedQuery.toLowerCase()),
      ),
    [notifications, receivedQuery],
  );

  const filteredPush = useMemo(
    () =>
      allPush.filter((p) =>
        (p.title + p.message + p.farms).toLowerCase().includes(pushQuery.toLowerCase()),
      ),
    [allPush, pushQuery],
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
          { label: "Unread", value: nLoading ? "…" : String(unread), icon: Bell, tint: "bg-primary/10 text-primary" },
          { label: "Total received", value: nLoading ? "…" : String(notifications.length), icon: AlertTriangle, tint: "bg-info/10 text-info" },
          { label: "Push sent", value: pLoading ? "…" : String(allPush.length), icon: CheckCircle2, tint: "bg-success/10 text-success" },
          { label: "Scheduled", value: pLoading ? "…" : String(scheduled), icon: Clock, tint: "bg-warning/10 text-warning-foreground" },
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
                <p className="text-xs text-muted-foreground mt-0.5">Alerts from Firestore 'notifications' collection.</p>
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
                    <th className="px-5 py-3 text-left font-medium">Date & time</th>
                    <th className="px-5 py-3 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {nLoading ? (
                    <tr><td colSpan={5} className="px-5 py-10 text-center text-sm text-muted-foreground">Loading…</td></tr>
                  ) : filteredReceived.length === 0 ? (
                    <tr><td colSpan={5} className="px-5 py-10 text-center text-sm text-muted-foreground">
                      {notifications.length === 0 ? "No notifications in Firestore 'notifications' collection yet." : "No notifications match your search."}
                    </td></tr>
                  ) : filteredReceived.map((n: any, i: number) => {
                    const status = n.status || "Read";
                    const d = n.createdAt?.seconds
                      ? new Date(n.createdAt.seconds * 1000).toLocaleString()
                      : n.createdAt ? new Date(n.createdAt).toLocaleString() : n.datetime || "—";
                    return (
                      <tr key={n.id || i} className="hover:bg-muted/20">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                              <Bell className="h-4 w-4" />
                            </div>
                            <span className="font-medium">{n.title || n.subject || "—"}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-muted-foreground max-w-md">{n.message || n.body || "—"}</td>
                        <td className="px-5 py-3 text-muted-foreground">{n.sender || n.from || "System"}</td>
                        <td className="px-5 py-3 text-muted-foreground whitespace-nowrap">{d}</td>
                        <td className="px-5 py-3">
                          <span className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ${
                            status === "Unread" || status === "unread"
                              ? "bg-primary/15 text-primary"
                              : "bg-muted text-muted-foreground"
                          }`}>
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
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
                <h3 className="font-semibold">Push notification history</h3>
                <p className="text-xs text-muted-foreground mt-0.5">From Firestore 'push_notifications' collection.</p>
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
                  {pLoading ? (
                    <tr><td colSpan={6} className="px-5 py-10 text-center text-sm text-muted-foreground">Loading…</td></tr>
                  ) : filteredPush.length === 0 ? (
                    <tr><td colSpan={6} className="px-5 py-10 text-center text-sm text-muted-foreground">
                      {allPush.length === 0 ? "No push notifications sent yet." : "No push notifications match your search."}
                    </td></tr>
                  ) : filteredPush.map((p, i) => (
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
                        <span className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ${
                          p.status === "Delivered"
                            ? "bg-success/15 text-success"
                            : "bg-warning/15 text-warning-foreground"
                        }`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <SendPushDialog
        open={open}
        onOpenChange={setOpen}
        farmers={farmers}
        onSend={(item) => {
          setLocalPush((prev) => [item, ...prev]);
          toast.success("Push notification sent", { description: `Delivered to ${item.farms}` });
        }}
      />
    </div>
  );
}

function SendPushDialog({
  open,
  onOpenChange,
  farmers,
  onSend,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  farmers: any[];
  onSend: (p: PushItem) => void;
}) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  const farmsList = farmers.map((f: any) => ({
    id: f.id,
    name: f.name || f.farmName || f.displayName || f.id,
    location: f.location || f.state || f.address || "—",
    herd: f.herdSize || f.totalAnimals || f.cattleCount || 0,
  }));

  const filtered = useMemo(
    () =>
      farmsList.filter((f) =>
        (f.name + f.location + f.id).toLowerCase().includes(query.toLowerCase()),
      ),
    [farmsList, query],
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
    const farmsLabel =
      selected.length === farmsList.length
        ? `All farms · ${farmsList.length}`
        : `${selected.length} farm${selected.length > 1 ? "s" : ""}`;
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
    <Dialog open={open} onOpenChange={(v) => { if (!v) reset(); onOpenChange(v); }}>
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
                <label htmlFor="select-all" className="font-medium cursor-pointer">Select all visible</label>
              </div>
              <ul className="divide-y">
                {filtered.length === 0 ? (
                  <li className="px-4 py-6 text-center text-sm text-muted-foreground">
                    {farmsList.length === 0 ? "No farmers found in Firestore." : "No farms match your search."}
                  </li>
                ) : filtered.map((f) => {
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
