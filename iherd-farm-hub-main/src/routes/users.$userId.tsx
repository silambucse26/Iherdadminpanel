import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useFirebaseDoc, useFirebaseCollection } from "../hooks/useFirebaseData";
import { useAuth } from "@/hooks/useAuth";
import {
  ArrowLeft,
  Phone,
  Mail,
  Calendar,
  ShieldCheck,
  User,
  Clock,
  Store,
  Tractor,
  Stethoscope,
  Briefcase,
  GraduationCap,
  MapPin,
  Building,
  Activity,
  BadgeAlert,
  BadgeCheck,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/admin/PageHeader";

export const Route = createFileRoute("/users/$userId")({
  head: () => ({ meta: [{ title: "User Details — iHerd Admin" }] }),
  component: UserDetail,
});

function InfoRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-sm font-semibold truncate">{value}</div>
      </div>
    </div>
  );
}

function UserDetail() {
  const { userId } = Route.useParams();
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch authenticated users from backend server to match details
  const { data: authUsers = [], isLoading: authLoading } = useQuery({
    queryKey: ["backend_auth_users"],
    queryFn: async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/users");
        const data = await res.json();
        return data.users || [];
      } catch (error) {
        console.error("Error fetching users from backend:", error);
        return [];
      }
    },
    initialData: [],
  });

  const authUser = authUsers.find((u: any) => u.uid === userId);

  // Fetch Firestore documents from full collections to handle flexible IDs and search by phone/email/uid
  const { data: allFarmers = [], isLoading: farmerLoading } = useFirebaseCollection<any>("farmers");
  const { data: allSellers = [], isLoading: sellerLoading } = useFirebaseCollection<any>("sellers");
  const { data: allVets = [], isLoading: vetLoading } = useFirebaseCollection<any>("vets");
  const { data: allUsers = [], isLoading: firestoreUserLoading } = useFirebaseCollection<any>("users");

  // Find primary user in Firestore users list
  const firestoreUser = allUsers.find(item => item && (item.id === userId || item.uid === userId || item.userId === userId));

  const userPhone = firestoreUser?.phoneNumber || firestoreUser?.phone || authUser?.phoneNumber || "";
  const userEmail = firestoreUser?.email || authUser?.email || "";

  const normalizePhone = (num?: string) => {
    if (!num) return "";
    const clean = num.replace(/\D/g, "");
    return clean.slice(-10);
  };

  const normalizedUserPhone = normalizePhone(userPhone);

  const findMatch = (list: any[]) => {
    return list.find((item) => {
      if (!item) return false;
      // 1. Match by document ID
      if (item.id === userId) return true;
      // 2. Match by uid / userId field
      if (item.uid === userId || item.userId === userId) return true;
      // 3. Match by phone number
      if (normalizedUserPhone && (
        normalizePhone(item.phone) === normalizedUserPhone ||
        normalizePhone(item.phoneNumber) === normalizedUserPhone ||
        normalizePhone(item.mobile) === normalizedUserPhone
      )) {
        return true;
      }
      // 4. Match by email
      if (userEmail && item.email && item.email.toLowerCase() === userEmail.toLowerCase()) {
        return true;
      }
      return false;
    });
  };

  const farmerDoc = firestoreUser?.farms || findMatch(allFarmers);
  const sellerDoc = firestoreUser?.seller || findMatch(allSellers);
  const vetDoc = firestoreUser?.veterinarian || firestoreUser?.vet || findMatch(allVets);

  const isLoading = authLoading || firestoreUserLoading || farmerLoading || sellerLoading || vetLoading;

  const roles = firestoreUser?.roles || (firestoreUser?.role ? [firestoreUser.role] : authUser?.roles || ["User"]);
  
  // Resolve userName checking all profiles
  const userName = firestoreUser?.name || 
                   firestoreUser?.displayName || 
                   farmerDoc?.name || 
                   sellerDoc?.name || 
                   vetDoc?.name || 
                   authUser?.displayName || 
                   "iHerd User";

  // Resolve displayEmail checking all profiles
  const displayEmail = firestoreUser?.email || 
                       farmerDoc?.email || 
                       sellerDoc?.email || 
                       vetDoc?.email || 
                       authUser?.email || 
                       "No email provided";

  // Resolve displayPhone checking all profiles
  const displayPhone = firestoreUser?.phoneNumber || 
                       firestoreUser?.phone || 
                       farmerDoc?.phone || 
                       farmerDoc?.phoneNumber || 
                       sellerDoc?.phone || 
                       vetDoc?.phone || 
                       authUser?.phoneNumber || 
                       "—";

  const joinedDate = firestoreUser?.createdAt 
    ? new Date(firestoreUser.createdAt.seconds ? firestoreUser.createdAt.seconds * 1000 : firestoreUser.createdAt).toLocaleDateString()
    : authUser?.createdAt 
    ? new Date(authUser.createdAt).toLocaleDateString()
    : "—";

  const initials = userName.split(" ").map((n: string) => n[0]).slice(0, 2).join("").toUpperCase();

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading user accounts data...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <Button asChild variant="ghost" size="sm" className="gap-1.5 -ml-2">
          <Link to="/users">
            <ArrowLeft className="h-4 w-4" /> Back to users
          </Link>
        </Button>
      </div>

      <PageHeader
        title="User Account Details"
        description={`View Firestore and Authentication profile for ${userName}`}
      />

      {/* Hero card */}
      <Card className="p-6 rounded-3xl border border-border/60 mb-6 bg-card">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 items-center">
          <div className="flex justify-center md:justify-start">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 text-primary text-2xl font-bold ring-4 ring-primary/10 shadow-sm">
              {initials}
            </div>
          </div>
          <div className="text-center md:text-left space-y-2">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{userName}</h2>
              <p className="text-sm font-mono text-muted-foreground select-all">{userId}</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-1">
              {roles.map((role: string) => (
                <span
                  key={role}
                  className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary border border-primary/20"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-muted/60 p-1 rounded-xl">
          <TabsTrigger value="overview" className="rounded-lg gap-2">
            <User className="h-4 w-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="farmer" className="rounded-lg gap-2">
            <Tractor className="h-4 w-4" /> Farmer Profile
            {farmerDoc && <span className="h-2 w-2 rounded-full bg-success animate-pulse" />}
          </TabsTrigger>
          <TabsTrigger value="seller" className="rounded-lg gap-2">
            <Store className="h-4 w-4" /> Seller Profile
            {sellerDoc && <span className="h-2 w-2 rounded-full bg-success animate-pulse" />}
          </TabsTrigger>
          <TabsTrigger value="vet" className="rounded-lg gap-2">
            <Stethoscope className="h-4 w-4" /> Vet Profile
            {vetDoc && <span className="h-2 w-2 rounded-full bg-success animate-pulse" />}
          </TabsTrigger>
        </TabsList>

        {/* OVERVIEW TAB */}
        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6 rounded-2xl border">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-foreground">
                <ShieldCheck className="h-5 w-5 text-primary" /> Firestore Data
              </h3>
              <div className="space-y-1">
                <InfoRow icon={User} label="Name / Display Name" value={userName !== "iHerd User" ? userName : "—"} />
                <InfoRow icon={Mail} label="Email Address" value={displayEmail !== "No email provided" ? displayEmail : "—"} />
                <InfoRow icon={Phone} label="Phone Number" value={displayPhone} />
                <InfoRow 
                  icon={Clock} 
                  label="Registered Roles" 
                  value={firestoreUser?.roles ? firestoreUser.roles.join(", ") : firestoreUser?.role || "—"} 
                />
                <InfoRow 
                  icon={Calendar} 
                  label="Firestore Created At" 
                  value={firestoreUser?.createdAt 
                    ? new Date(firestoreUser.createdAt.seconds ? firestoreUser.createdAt.seconds * 1000 : firestoreUser.createdAt).toLocaleString() 
                    : "—"
                  } 
                />
              </div>
            </Card>

            <Card className="p-6 rounded-2xl border">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-foreground">
                <Clock className="h-5 w-5 text-primary" /> Firebase Authentication
              </h3>
              <div className="space-y-1">
                <InfoRow icon={Mail} label="Auth Email" value={authUser?.email || "—"} />
                <InfoRow icon={Phone} label="Auth Phone" value={authUser?.phoneNumber || "—"} />
                <InfoRow 
                  icon={Calendar} 
                  label="Auth Created At" 
                  value={authUser?.createdAt ? new Date(authUser.createdAt).toLocaleString() : "—"} 
                />
                <InfoRow 
                  icon={Activity} 
                  label="Last Activity / Login" 
                  value={authUser?.lastLoginAt ? new Date(authUser.lastLoginAt).toLocaleString() : "—"} 
                />
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* FARMER TAB */}
        <TabsContent value="farmer">
          {farmerDoc ? (
            <Card className="p-6 rounded-2xl border space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold flex items-center gap-2 text-foreground">
                  <Tractor className="h-5 w-5 text-primary" /> Farmer Registered Data
                </h3>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1 text-xs font-medium text-success border border-success/20">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Active Farmer
                  </span>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-1">
                  <InfoRow icon={User} label="Farmer Name" value={farmerDoc.name || "—"} />
                  <InfoRow icon={Building} label="Farm Name" value={farmerDoc.farm || "—"} />
                  <InfoRow icon={MapPin} label="State" value={farmerDoc.state || "—"} />
                  <InfoRow icon={Activity} label="Status" value={farmerDoc.status || "—"} />
                </div>
                <div className="space-y-1">
                  <InfoRow icon={Activity} label="Cattle Managed" value={String(farmerDoc.cattle ?? 0)} />
                  <InfoRow icon={Phone} label="Contact Phone" value={farmerDoc.phone || "—"} />
                  <InfoRow icon={Mail} label="Contact Email" value={farmerDoc.email || "—"} />
                  <InfoRow icon={Calendar} label="Date Joined" value={farmerDoc.joined || "—"} />
                </div>
              </div>
              
              {farmerDoc.address && (
                <>
                  <Separator />
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Registered Farm Address</h4>
                    <p className="text-sm text-foreground bg-muted/40 p-4 rounded-xl font-medium">{farmerDoc.address}</p>
                  </div>
                </>
              )}
            </Card>
          ) : (
            <Card className="p-8 rounded-2xl border text-center space-y-4">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-muted text-muted-foreground">
                <BadgeAlert className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-lg text-foreground">No Farmer Profile</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  This user doesn't have an active farmer registration record in the Firestore 'farmers' collection.
                </p>
              </div>
            </Card>
          )}
        </TabsContent>

        {/* SELLER TAB */}
        <TabsContent value="seller">
          {sellerDoc ? (
            <Card className="p-6 rounded-2xl border space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold flex items-center gap-2 text-foreground">
                  <Store className="h-5 w-5 text-primary" /> Seller Registered Data
                </h3>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1 text-xs font-medium text-success border border-success/20">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Verified Seller
                  </span>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-1">
                  <InfoRow icon={Store} label="Store Name / Seller" value={sellerDoc.name || "—"} />
                  <InfoRow icon={Briefcase} label="Category" value={sellerDoc.category || "—"} />
                  <InfoRow icon={Activity} label="Products Count" value={String(sellerDoc.products ?? 0)} />
                  <InfoRow icon={Activity} label="GMV (30 days)" value={sellerDoc.gmv || "—"} />
                </div>
                <div className="space-y-1">
                  <InfoRow icon={User} label="Business Owner" value={sellerDoc.owner || "—"} />
                  <InfoRow icon={Phone} label="Seller Phone" value={sellerDoc.phone || "—"} />
                  <InfoRow icon={Mail} label="Seller Email" value={sellerDoc.email || "—"} />
                  <InfoRow icon={Calendar} label="Date Registered" value={sellerDoc.joined || "—"} />
                </div>
              </div>

              {sellerDoc.address && (
                <>
                  <Separator />
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Registered Store Address</h4>
                    <p className="text-sm text-foreground bg-muted/40 p-4 rounded-xl font-medium">{sellerDoc.address}</p>
                  </div>
                </>
              )}
            </Card>
          ) : (
            <Card className="p-8 rounded-2xl border text-center space-y-4">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-muted text-muted-foreground">
                <BadgeAlert className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-lg text-foreground">No Seller Profile</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  This user doesn't have an active seller registration record in the Firestore 'sellers' collection.
                </p>
              </div>
            </Card>
          )}
        </TabsContent>

        {/* VET TAB */}
        <TabsContent value="vet">
          {vetDoc ? (
            <Card className="p-6 rounded-2xl border space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold flex items-center gap-2 text-foreground">
                  <Stethoscope className="h-5 w-5 text-primary" /> Veterinarian Registered Data
                </h3>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1 text-xs font-medium text-success border border-success/20">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Verified Vet
                  </span>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-1">
                  <InfoRow icon={User} label="Vet Name" value={vetDoc.name || "—"} />
                  <InfoRow icon={GraduationCap} label="Qualification" value={vetDoc.qualification || "—"} />
                  <InfoRow icon={Briefcase} label="Specialization" value={vetDoc.specialization || "—"} />
                  <InfoRow icon={Briefcase} label="Years of Experience" value={vetDoc.experience ? `${vetDoc.experience} years` : "—"} />
                </div>
                <div className="space-y-1">
                  <InfoRow icon={Building} label="Hospital / Clinic" value={vetDoc.clinic || vetDoc.hospital || "—"} />
                  <InfoRow icon={Phone} label="Vet Phone" value={vetDoc.phone || "—"} />
                  <InfoRow icon={Mail} label="Vet Email" value={vetDoc.email || "—"} />
                  <InfoRow icon={MapPin} label="Service Location" value={vetDoc.location || vetDoc.city || "—"} />
                </div>
              </div>

              {vetDoc.address && (
                <>
                  <Separator />
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Clinic Address</h4>
                    <p className="text-sm text-foreground bg-muted/40 p-4 rounded-xl font-medium">{vetDoc.address}</p>
                  </div>
                </>
              )}
            </Card>
          ) : (
            <Card className="p-8 rounded-2xl border text-center space-y-4">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-muted text-muted-foreground">
                <BadgeAlert className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-lg text-foreground">No Veterinarian Profile</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  This user doesn't have an active veterinarian registration record in the Firestore 'vets' collection.
                </p>
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
