import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Calendar,
  ShieldCheck,
  FileText,
  Eye,
  CheckCircle2,
  XCircle,
  Ban,
  BadgeCheck,
  Building2,
  Beef,
  Store,
  Tractor,
  Clock,
  LogIn,
  ShoppingCart,
  AlertTriangle,
  Lock,
  Camera,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { PageHeader } from "@/components/admin/PageHeader";
import { ProfileHero } from "@/components/admin/ProfileHero";
import { toast } from "sonner";
import farmerSelvamAsset from "@/assets/farmer-selvam.png.asset.json";

const FARMERS: Record<string, any> = {
  "F-1024": { id: "F-1024", name: "Selvam K", farm: "Patel Dairy Farm", state: "Gujarat", cattle: 84, joined: "Jan 12, 2024", status: "Active", phone: "+91 98250 11234", email: "ravi.patel@example.com", city: "Anand", address: "Plot 12, Village Sojitra, Anand, Gujarat 388450", verified: true },
  "F-1025": { id: "F-1025", name: "Suresh Yadav", farm: "Green Pastures", state: "UP", cattle: 56, joined: "Feb 02, 2024", status: "Active", phone: "+91 99100 23344", email: "suresh.y@example.com", city: "Meerut", address: "House 88, Sardhana Road, Meerut, UP 250001", verified: true },
  "F-1026": { id: "F-1026", name: "Lakshmi Devi", farm: "Devi Goshala", state: "Karnataka", cattle: 120, joined: "Feb 18, 2024", status: "Pending", phone: "+91 90080 55677", email: "lakshmi.d@example.com", city: "Mysuru", address: "Goshala Lane, Srirangapatna, Mysuru, KA 571438", verified: false },
  "F-1027": { id: "F-1027", name: "Manoj Kumar", farm: "Kumar Farms", state: "Punjab", cattle: 38, joined: "Mar 05, 2024", status: "Active", phone: "+91 98765 43210", email: "manoj.k@example.com", city: "Ludhiana", address: "Village Doraha, Ludhiana, Punjab 141421", verified: true },
  "F-1028": { id: "F-1028", name: "Rajesh Sharma", farm: "Sharma Dairy", state: "Haryana", cattle: 210, joined: "Mar 22, 2024", status: "Suspended", phone: "+91 99999 11122", email: "rajesh.s@example.com", city: "Karnal", address: "Sector 7, Karnal, Haryana 132001", verified: true },
  "F-1029": { id: "F-1029", name: "Priya Nair", farm: "Coastal Cattle", state: "Kerala", cattle: 24, joined: "Apr 04, 2024", status: "Active", phone: "+91 94470 88991", email: "priya.n@example.com", city: "Kochi", address: "Marine Drive, Kochi, Kerala 682011", verified: true },
  "F-1030": { id: "F-1030", name: "Arjun Singh", farm: "Singh Goshala", state: "Rajasthan", cattle: 92, joined: "Apr 19, 2024", status: "Pending", phone: "+91 97200 33445", email: "arjun.s@example.com", city: "Jaipur", address: "Tonk Road, Jaipur, Rajasthan 302015", verified: false },
};

const DOCUMENTS = [
  { name: "Aadhaar Card", type: "ID Proof", uploaded: "Jan 10, 2024", status: "Approved" },
  { name: "PAN Card", type: "ID Proof", uploaded: "Jan 10, 2024", status: "Approved" },
  { name: "Farm Ownership Deed", type: "Ownership", uploaded: "Jan 12, 2024", status: "Pending" },
  { name: "Land Records (7/12)", type: "Ownership", uploaded: "Jan 12, 2024", status: "Approved" },
];

const ALL_CATTLE = [
  { id: "C-2001", tag: "RFID-88231", breed: "Gir", age: "3y", status: "Farm", health: "Healthy" },
  { id: "C-2002", tag: "RFID-88232", breed: "Sahiwal", age: "5y", status: "Marketplace", health: "Healthy" },
  { id: "C-2003", tag: "RFID-88233", breed: "Holstein", age: "2y", status: "Farm", health: "Vaccinated" },
  { id: "C-2004", tag: "RFID-88234", breed: "Jersey", age: "4y", status: "Marketplace", health: "Healthy" },
  { id: "C-2005", tag: "RFID-88235", breed: "Red Sindhi", age: "6y", status: "Farm", health: "Under care" },
  { id: "C-2006", tag: "RFID-88236", breed: "Gir", age: "1y", status: "Marketplace", health: "Healthy" },
];

const ACTIVITY = [
  { when: "2h ago", action: "Listed 'Gir Cow' on marketplace", meta: "C-2006" },
  { when: "Yesterday", action: "Updated profile address", meta: "" },
  { when: "3 days ago", action: "Uploaded ownership document", meta: "Land Records" },
  { when: "1 week ago", action: "Completed KYC verification", meta: "Aadhaar" },
  { when: "2 weeks ago", action: "Registered new cattle", meta: "C-2005" },
];

const LOGIN_HISTORY = [
  { when: "Today, 09:42", device: "iPhone 14 · iOS 17", ip: "103.21.58.12", location: "Anand, Gujarat", status: "Success" },
  { when: "Yesterday, 18:11", device: "Chrome · Windows", ip: "103.21.58.12", location: "Anand, Gujarat", status: "Success" },
  { when: "3 days ago, 07:30", device: "Android · Pixel 7", ip: "49.36.112.4", location: "Ahmedabad, Gujarat", status: "Success" },
  { when: "1 week ago, 22:04", device: "Chrome · macOS", ip: "182.68.10.7", location: "Mumbai, MH", status: "Failed" },
  { when: "2 weeks ago, 11:20", device: "Safari · iPad", ip: "103.21.58.12", location: "Anand, Gujarat", status: "Success" },
];

const ORDERS = [
  { id: "ORD-5521", date: "Jun 14, 2026", items: "Cattle Feed Premium x4", amount: "₹ 4,800", status: "Delivered" },
  { id: "ORD-5489", date: "Jun 02, 2026", items: "Veterinary Kit", amount: "₹ 2,150", status: "Delivered" },
  { id: "ORD-5402", date: "May 19, 2026", items: "Milking Machine", amount: "₹ 38,900", status: "Shipped" },
  { id: "ORD-5318", date: "May 04, 2026", items: "Mineral Mixture x10", amount: "₹ 1,250", status: "Pending" },
];

const MARKET_ACTIVITY = [
  { id: "L-9012", item: "Gir Cow · 3y", listed: "Jun 16, 2026", price: "₹ 85,000", views: 312, status: "Active" },
  { id: "L-8990", item: "Sahiwal Heifer", listed: "Jun 09, 2026", price: "₹ 62,000", views: 188, status: "Active" },
  { id: "L-8876", item: "Jersey Calf", listed: "May 28, 2026", price: "₹ 28,000", views: 421, status: "Sold" },
  { id: "L-8721", item: "Holstein Bull", listed: "May 12, 2026", price: "₹ 1,10,000", views: 96, status: "Withdrawn" },
];

export const Route = createFileRoute("/farmers/$farmerId")({
  head: () => ({ meta: [{ title: "Farmer Details — iHerd Admin" }] }),
  component: FarmerDetail,
});

function InfoRow({ icon: Icon, label, value, valueClass }: { icon: any; label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className={`text-sm font-semibold truncate ${valueClass ?? ""}`}>{value}</div>
      </div>
    </div>
  );
}

function FarmStat({ icon: Icon, label, value, highlight }: { icon: any; label: string; value: string | number; highlight?: boolean }) {
  return (
    <Card className={`p-4 rounded-2xl flex items-center gap-3 ${highlight ? "bg-primary/5 border-primary/30" : ""}`}>
      <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${highlight ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-lg font-bold truncate">{value}</div>
      </div>
    </Card>
  );
}

function FarmerDetail() {
  const { farmerId } = Route.useParams();
  const farmer = FARMERS[farmerId] ?? {
    id: farmerId, name: "Unknown Farmer", farm: "—", state: "—", cattle: 0,
    joined: "—", status: "Pending", phone: "—", email: "—", city: "—",
    address: "—", verified: false,
  };

  const [docs, setDocs] = useState(DOCUMENTS);
  const [status, setStatus] = useState<string>(farmer.status);
  const [verified, setVerified] = useState<boolean>(farmer.verified);

  const initials = farmer.name.split(" ").map((n: string) => n[0]).slice(0, 2).join("");
  const marketplaceCattle = ALL_CATTLE.filter((c) => c.status === "Marketplace");
  const farmCattle = ALL_CATTLE.filter((c) => c.status === "Farm");

  return (
    <div>
      <div className="mb-4">
        <Button asChild variant="ghost" size="sm" className="gap-1.5 -ml-2">
          <Link to="/farmers">
            <ArrowLeft className="h-4 w-4" /> Back to farmers
          </Link>
        </Button>
      </div>

      <PageHeader
        title="Farmer profile"
        description={`Manage and verify ${farmer.name}'s account`}
        actions={
          <>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => { setStatus("Suspended"); toast.warning(`${farmer.name} suspended`); }}
            >
              <Ban className="h-4 w-4" /> Suspend
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-destructive"
              onClick={() => { setStatus("Rejected"); toast.error(`${farmer.name} rejected`); }}
            >
              <XCircle className="h-4 w-4" /> Reject
            </Button>
            <Button
              size="sm"
              className="gap-1.5 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => { setStatus("Active"); toast.success(`${farmer.name} approved`); }}
            >
              <CheckCircle2 className="h-4 w-4" /> Approve
            </Button>
          </>
        }
      />

      {!verified && (
        <Card className="mb-6 p-4 rounded-2xl border-warning/40 bg-warning/10">
          <div className="flex items-start gap-3">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-warning/20 text-warning-foreground">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold flex items-center gap-2">
                <Lock className="h-3.5 w-3.5" /> Account access restricted — pending verification
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                This farmer cannot list cattle, accept orders, or use marketplace features
                until an admin verifies their documents and approves the account.
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5"
                onClick={() => { setStatus("Rejected"); toast.error(`${farmer.name} rejected`); }}
              >
                <XCircle className="h-4 w-4" /> Reject
              </Button>
              <Button
                size="sm"
                className="gap-1.5 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => {
                  setStatus("Active");
                  setVerified(true);
                  setDocs((d) => d.map((x) => ({ ...x, status: "Approved" })));
                  toast.success(`${farmer.name} verified & approved`);
                }}
              >
                <BadgeCheck className="h-4 w-4" /> Verify & approve
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-6">
        <ProfileHero
          name={farmer.name}
          id={farmer.id}
          subtitle={farmer.farm}
          subtitleIcon={Building2}
          avatarUrl={farmer.id === "F-1024" ? farmerSelvamAsset.url : ""}
          initials={initials}
          status={status}
          verified={verified}
          phone={farmer.phone}
          email={farmer.email}
          joined={farmer.joined}
          location={`${farmer.city}, ${farmer.state}`}
        />

        {/* Farm overview */}
        <Card className="p-6 rounded-3xl shadow-sm border-border/60">
          <h3 className="text-base font-semibold mb-4">Farm overview</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <FarmStat icon={Building2} label="Farm name" value={farmer.farm} highlight />
            <FarmStat icon={Tractor} label="Total farms" value={1} />
            <FarmStat icon={Beef} label="Cattle registered" value={farmer.cattle} />
            <FarmStat icon={Store} label="Cattle in market" value={marketplaceCattle.length} />
          </div>
        </Card>

        {/* Documents */}
        <Card className="p-6 rounded-3xl shadow-sm border-border/60">
          <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
            <div>
              <h3 className="text-base font-semibold">Uploaded documents</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Review KYC and ownership proofs</p>
            </div>
            <Button
              size="sm"
              className="gap-1.5 bg-gradient-to-br from-primary to-primary-glow"
              onClick={() => {
                setDocs((d) => d.map((x) => ({ ...x, status: "Approved" })));
                setVerified(true);
                toast.success("All documents verified");
              }}
            >
              <BadgeCheck className="h-4 w-4" /> Verify all documents
            </Button>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead>Document</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Uploaded</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {docs.map((d) => (
                  <TableRow key={d.name}>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
                          <FileText className="h-4 w-4" />
                        </div>
                        <span className="font-medium">{d.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{d.type}</TableCell>
                    <TableCell className="text-muted-foreground">{d.uploaded}</TableCell>
                    <TableCell><StatusBadge status={d.status} /></TableCell>
                    <TableCell className="text-right">
                      <div className="inline-flex gap-1">
                        <Button size="sm" variant="ghost" className="gap-1.5" onClick={() => toast(`Viewing ${d.name}`)}>
                          <Eye className="h-4 w-4" /> View
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="gap-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          onClick={() => {
                            setDocs((arr) => arr.map((x) => x.name === d.name ? { ...x, status: "Approved" } : x));
                            toast.success(`${d.name} approved`);
                          }}
                        >
                          <CheckCircle2 className="h-4 w-4" /> Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="gap-1.5 text-destructive hover:text-destructive"
                          onClick={() => {
                            setDocs((arr) => arr.map((x) => x.name === d.name ? { ...x, status: "Rejected" } : x));
                            toast.error(`${d.name} rejected`);
                          }}
                        >
                          <XCircle className="h-4 w-4" /> Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Activity tabs */}
        <Card className="p-6 rounded-3xl shadow-sm border-border/60">
        <Tabs defaultValue="all">
          <TabsList className="inline-flex flex-wrap h-auto w-fit justify-start gap-2 p-1.5 bg-muted/60 [&>*]:data-[state=active]:bg-primary [&>*]:data-[state=active]:text-primary-foreground [&>*]:data-[state=active]:shadow-md">
            <TabsTrigger value="all">All Cattle ({ALL_CATTLE.length})</TabsTrigger>
            <TabsTrigger value="market">Marketplace ({marketplaceCattle.length})</TabsTrigger>
            <TabsTrigger value="farm">Farm ({farmCattle.length})</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="logins">Login history</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="listings">Marketplace activity</TabsTrigger>
          </TabsList>



          <TabsContent value="all" className="mt-4">
            <CattleTable rows={ALL_CATTLE} />
          </TabsContent>
          <TabsContent value="market" className="mt-4">
            <CattleTable rows={marketplaceCattle} />
          </TabsContent>
          <TabsContent value="farm" className="mt-4">
            <CattleTable rows={farmCattle} />
          </TabsContent>

          <TabsContent value="activity" className="mt-4">
            <ol className="relative border-l border-border ml-2 space-y-4 pl-5">
              {ACTIVITY.map((a, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[27px] top-1 grid h-4 w-4 place-items-center rounded-full bg-primary/15 ring-4 ring-background">
                    <Clock className="h-2.5 w-2.5 text-primary" />
                  </span>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-medium">{a.action}</div>
                      {a.meta && <div className="text-xs text-muted-foreground">{a.meta}</div>}
                    </div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">{a.when}</div>
                  </div>
                </li>
              ))}
            </ol>
          </TabsContent>

          <TabsContent value="logins" className="mt-4">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead>When</TableHead>
                    <TableHead>Device</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {LOGIN_HISTORY.map((l, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <LogIn className="h-3.5 w-3.5 text-muted-foreground" />
                          {l.when}
                        </div>
                      </TableCell>
                      <TableCell>{l.device}</TableCell>
                      <TableCell className="font-mono text-xs">{l.ip}</TableCell>
                      <TableCell>{l.location}</TableCell>
                      <TableCell><StatusBadge status={l.status} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="mt-4">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ORDERS.map((o) => (
                    <TableRow key={o.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <ShoppingCart className="h-3.5 w-3.5 text-muted-foreground" />
                          {o.id}
                        </div>
                      </TableCell>
                      <TableCell>{o.date}</TableCell>
                      <TableCell>{o.items}</TableCell>
                      <TableCell className="font-semibold">{o.amount}</TableCell>
                      <TableCell><StatusBadge status={o.status} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="listings" className="mt-4">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead>Listing</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Listed on</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MARKET_ACTIVITY.map((m) => (
                    <TableRow key={m.id}>
                      <TableCell className="font-medium">{m.id}</TableCell>
                      <TableCell>{m.item}</TableCell>
                      <TableCell>{m.listed}</TableCell>
                      <TableCell className="font-semibold">{m.price}</TableCell>
                      <TableCell>{m.views}</TableCell>
                      <TableCell><StatusBadge status={m.status} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
      </div>

    </div>
  );
}

function CattleTable({ rows }: { rows: typeof ALL_CATTLE }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            <TableHead className="w-12"></TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Tag</TableHead>
            <TableHead>Breed</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Health</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((c) => (
            <TableRow key={c.id} className="cursor-pointer">
              <TableCell>
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Beef className="h-4 w-4" />
                </div>
              </TableCell>
              <TableCell className="font-medium">{c.id}</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 text-xs font-medium">
                  {c.tag}
                </span>
              </TableCell>
              <TableCell>{c.breed}</TableCell>
              <TableCell>{c.age}</TableCell>
              <TableCell>{c.status}</TableCell>
              <TableCell><StatusBadge status={c.health} /></TableCell>
              <TableCell className="text-right">
                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => toast(`Options for ${c.id}`)}>
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                No cattle in this view.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
