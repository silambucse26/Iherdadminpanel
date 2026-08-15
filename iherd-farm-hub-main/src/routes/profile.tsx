import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/admin/PageHeader";
import { Mail, Phone, Shield, MapPin, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — iHerd Admin" }] }),
  component: Profile,
});

function Profile() {
  const navigate = useNavigate();
  const { profile, setProfile, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  useEffect(() => {
    if (profile) {
      const parts = profile.name.split(" ");
      setFormData({
        firstName: parts[0] || "",
        lastName: parts.slice(1).join(" ") || "",
        phone: profile.phone || "",
      });
    }
  }, [profile]);

  const handleSignOut = async () => {
    try {
      await logout();
      navigate({ to: "/login" });
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  const handleSave = async () => {
    if (!profile) return;
    setLoading(true);
    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      // Firestore database update removed to maintain strict read-only behavior

      setProfile({
        ...profile,
        name: fullName,
        phone: formData.phone,
      });

      toast.success("Profile updated locally (read-only mode)!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const displayName = profile?.name || "Admin User";
  const displayEmail = profile?.email || "";
  const displayPhone = profile?.phone || "";
  const displayRole = profile?.role || "Admin";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div>
      <PageHeader
        title="My profile"
        description="Manage your admin account details."
        actions={
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="gap-2 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        }
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 rounded-2xl text-center">
          <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-primary-foreground text-3xl font-bold">
            {initials}
          </div>
          <h3 className="mt-4 text-xl font-bold">{displayName}</h3>
          <p className="text-sm text-muted-foreground">{displayRole} · iHerd HQ</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-left">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" /> {displayEmail}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" /> {displayPhone}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" /> Bangalore, India
            </div>
            <div className="flex items-center gap-2 text-success">
              <Shield className="h-4 w-4" /> 2FA enabled
            </div>
          </div>
          <Button className="mt-5 w-full bg-gradient-to-br from-primary to-primary-glow">Edit photo</Button>
        </Card>

        <Card className="lg:col-span-2 p-6 rounded-2xl">
          <h3 className="font-semibold mb-4">Account details</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="mt-1.5"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="profileEmail">Email</Label>
              <Input id="profileEmail" value={displayEmail} disabled className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="profilePhone">Phone</Label>
              <Input
                id="profilePhone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="profileRole">Role</Label>
              <Input id="profileRole" value={displayRole} disabled className="mt-1.5" />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline" onClick={() => profile && setFormData({
              firstName: profile.name.split(" ")[0] || "",
              lastName: profile.name.split(" ").slice(1).join(" ") || "",
              phone: profile.phone || "",
            })}>Cancel</Button>
            <Button
              disabled={loading}
              onClick={handleSave}
              className="bg-gradient-to-br from-primary to-primary-glow"
            >
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
