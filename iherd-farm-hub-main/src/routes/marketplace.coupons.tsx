import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/admin/StatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Ticket,
  Plus,
  Search,
  Percent,
  IndianRupee,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Calendar,
  Layers,
  Trash2,
  Power,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { useCoupons, type Coupon } from "@/hooks/useFirebaseData";

export const Route = createFileRoute("/marketplace/coupons")({
  head: () => ({ meta: [{ title: "Coupon Codes — iHerd Admin" }] }),
  component: CouponsPage,
});

function CouponsPage() {
  const { data: coupons = [], isLoading, saveCoupon, toggleCouponStatus, deleteCoupon } = useCoupons();

  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Create / Edit modal state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState<"PERCENT" | "FIXED">("PERCENT");
  const [value, setValue] = useState("10");
  const [minOrder, setMinOrder] = useState("0");
  const [maxDiscount, setMaxDiscount] = useState("1000");
  const [expiryDate, setExpiryDate] = useState("");
  const [active, setActive] = useState(true);

  const handleCopy = (couponCode: string) => {
    navigator.clipboard.writeText(couponCode);
    setCopiedCode(couponCode);
    toast.success(`Coupon code ${couponCode} copied to clipboard!`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const openCreateDialog = () => {
    setEditingCoupon(null);
    setCode("");
    setDiscountType("PERCENT");
    setValue("10");
    setMinOrder("0");
    setMaxDiscount("1000");
    // Default 30 days from now
    const d = new Date();
    d.setDate(d.getDate() + 30);
    setExpiryDate(d.toISOString().slice(0, 10));
    setActive(true);
    setDialogOpen(true);
  };

  const openEditDialog = (c: Coupon) => {
    setEditingCoupon(c);
    setCode(c.code || c.id);
    setDiscountType(c.type?.toUpperCase() === "FIXED" ? "FIXED" : "PERCENT");
    setValue(String(c.value || 0));
    setMinOrder(String(c.minOrder || 0));
    setMaxDiscount(String(c.maxDiscount || 0));
    const exp = c.expiresAtFormatted ? c.expiresAtFormatted.slice(0, 10) : "";
    setExpiryDate(exp);
    setActive(c.active !== false);
    setDialogOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      toast.error("Please provide a valid coupon code");
      return;
    }

    try {
      await saveCoupon.mutateAsync({
        code: code.trim().toUpperCase(),
        type: discountType,
        value: Number(value) || 0,
        minOrder: Number(minOrder) || 0,
        maxDiscount: Number(maxDiscount) || 0,
        active: active,
        expiresAt: expiryDate ? new Date(expiryDate).toISOString() : null,
      });

      toast.success(editingCoupon ? "Coupon updated successfully" : "Coupon created successfully");
      setDialogOpen(false);
    } catch (err: any) {
      toast.error(`Error saving coupon: ${err.message}`);
    }
  };

  const handleToggle = async (c: Coupon) => {
    try {
      await toggleCouponStatus.mutateAsync({ id: c.id, active: !c.active });
      toast.success(`Coupon ${c.code} is now ${!c.active ? "Active" : "Inactive"}`);
    } catch (err: any) {
      toast.error(`Failed to toggle coupon status: ${err.message}`);
    }
  };

  const handleDelete = async (c: Coupon) => {
    if (!confirm(`Are you sure you want to delete coupon ${c.code}?`)) return;
    try {
      await deleteCoupon.mutateAsync(c.id);
      toast.success(`Coupon ${c.code} deleted`);
    } catch (err: any) {
      toast.error(`Failed to delete coupon: ${err.message}`);
    }
  };

  // KPIs
  const totalCoupons = coupons.length;
  const activeCoupons = coupons.filter((c) => c.active !== false).length;
  const totalRedemptions = coupons.reduce((sum, c) => sum + (c.usedCount || (c.usedUserIds?.length || 0)), 0);
  const percentCoupons = coupons.filter((c) => (c.type || "PERCENT").toUpperCase() === "PERCENT").length;

  const filteredCoupons = coupons.filter((c) => {
    const codeMatch = (c.code || c.id || "").toLowerCase().includes(q.toLowerCase());
    const matchStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "active"
        ? c.active !== false
        : c.active === false;
    const matchType =
      typeFilter === "all"
        ? true
        : (c.type || "PERCENT").toUpperCase() === typeFilter.toUpperCase();

    return codeMatch && matchStatus && matchType;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Coupon codes & discounts"
        description="Manage marketplace promotional coupons, discount rules, and customer usage limits."
        actions={
          <Button
            size="sm"
            onClick={openCreateDialog}
            className="gap-1.5 bg-gradient-to-br from-primary to-primary-glow font-medium shadow-sm"
          >
            <Plus className="h-4 w-4" /> Create coupon
          </Button>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 rounded-2xl bg-card border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Total Coupons</span>
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-primary/10 text-primary">
              <Ticket className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold">{isLoading ? "…" : totalCoupons}</div>
          <div className="text-xs text-muted-foreground mt-1">Available in database</div>
        </Card>

        <Card className="p-4 rounded-2xl bg-card border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Active Coupons</span>
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-600">{isLoading ? "…" : activeCoupons}</div>
          <div className="text-xs text-muted-foreground mt-1">Currently redeemable by users</div>
        </Card>

        <Card className="p-4 rounded-2xl bg-card border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Total Redemptions</span>
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-purple-500/10 text-purple-600">
              <Sparkles className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold">{isLoading ? "…" : totalRedemptions}</div>
          <div className="text-xs text-muted-foreground mt-1">Used across product orders</div>
        </Card>

        <Card className="p-4 rounded-2xl bg-card border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Discount Models</span>
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-blue-500/10 text-blue-600">
              <Percent className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold">{isLoading ? "…" : `${percentCoupons} % / ${totalCoupons - percentCoupons} Fixed`}</div>
          <div className="text-xs text-muted-foreground mt-1">Percentage vs Flat discount</div>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card className="rounded-2xl overflow-hidden border-border">
        <div className="p-4 border-b flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search coupon codes..."
              className="pl-9 bg-muted/50 border-transparent focus-visible:bg-background"
            />
          </div>

          <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32 bg-muted/50">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="active">Active only</SelectItem>
                <SelectItem value="inactive">Inactive only</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-32 bg-muted/50">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                <SelectItem value="PERCENT">Percentage (%)</SelectItem>
                <SelectItem value="FIXED">Flat (₹)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="w-48">Coupon Code</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Min. Order</TableHead>
                <TableHead>Max. Cap</TableHead>
                <TableHead>Redemptions</TableHead>
                <TableHead>Expiry</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={8} className="py-4 text-center">
                      <div className="h-4 bg-muted rounded animate-pulse w-3/4 mx-auto" />
                    </TableCell>
                  </TableRow>
                ))
              ) : filteredCoupons.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground py-12">
                    <Ticket className="h-8 w-8 mx-auto text-muted-foreground/50 mb-2" />
                    No coupon codes match your search.
                  </TableCell>
                </TableRow>
              ) : (
                filteredCoupons.map((c) => {
                  const isPercent = (c.type || "PERCENT").toUpperCase() === "PERCENT";
                  const isCopied = copiedCode === c.code;

                  return (
                    <TableRow key={c.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="font-mono font-bold text-sm bg-primary/10 text-primary px-2.5 py-1 rounded-lg border border-primary/20 flex items-center gap-1.5">
                            <Ticket className="h-3.5 w-3.5" />
                            {c.code || c.id}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopy(c.code || c.id)}
                            className="text-muted-foreground hover:text-foreground p-1 rounded transition-colors"
                            title="Copy code"
                          >
                            {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                          </button>
                        </div>
                      </TableCell>

                      <TableCell>
                        <span className="font-semibold text-foreground">
                          {isPercent ? `${c.value}% OFF` : `₹${c.value} OFF`}
                        </span>
                      </TableCell>

                      <TableCell>
                        <span className="text-muted-foreground">
                          {c.minOrder ? `₹${c.minOrder.toLocaleString()}` : "No min"}
                        </span>
                      </TableCell>

                      <TableCell>
                        <span className="text-muted-foreground">
                          {c.maxDiscount ? `₹${c.maxDiscount.toLocaleString()}` : "—"}
                        </span>
                      </TableCell>

                      <TableCell>
                        <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          {c.usedCount || 0} uses
                        </span>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          {c.expiresAtFormatted ? new Date(c.expiresAtFormatted).toLocaleDateString() : "No expiry"}
                        </div>
                      </TableCell>

                      <TableCell>
                        <StatusBadge status={c.active !== false ? "Active" : "Inactive"} />
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggle(c)}
                            className={`h-8 w-8 p-0 ${c.active !== false ? "text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50" : "text-muted-foreground hover:text-foreground"}`}
                            title={c.active !== false ? "Deactivate coupon" : "Activate coupon"}
                          >
                            <Power className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(c)}
                            className="h-8 px-2.5 text-xs"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(c)}
                            className="h-8 w-8 p-0 text-destructive/80 hover:text-destructive hover:bg-destructive/10"
                            title="Delete coupon"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        <div className="p-4 border-t text-xs text-muted-foreground flex justify-between items-center">
          <span>
            Showing <b className="text-foreground">{filteredCoupons.length}</b> of{" "}
            <b className="text-foreground">{coupons.length}</b> coupons from <code>product_marketplace/main/coupons_code</code>
          </span>
        </div>
      </Card>

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
                <Ticket className="h-4.5 w-4.5" />
              </span>
              {editingCoupon ? "Edit Coupon" : "Create Coupon Code"}
            </DialogTitle>
            <DialogDescription>
              Set discount rates, minimum order value, and expiration dates for customers.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="coupon-code">Coupon Code *</Label>
              <Input
                id="coupon-code"
                placeholder="e.g. FESTIVE20"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                required
                className="font-mono uppercase font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Discount Type</Label>
                <Select value={discountType} onValueChange={(v: any) => setDiscountType(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PERCENT">Percentage (%)</SelectItem>
                    <SelectItem value="FIXED">Flat (₹)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="coupon-value">{discountType === "PERCENT" ? "Percentage Value (%)" : "Flat Amount (₹)"}</Label>
                <Input
                  id="coupon-value"
                  type="number"
                  placeholder="20"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="min-order">Min Order (₹)</Label>
                <Input
                  id="min-order"
                  type="number"
                  placeholder="0"
                  value={minOrder}
                  onChange={(e) => setMinOrder(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="max-discount">Max Discount Cap (₹)</Label>
                <Input
                  id="max-discount"
                  type="number"
                  placeholder="1000"
                  value={maxDiscount}
                  onChange={(e) => setMaxDiscount(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="expiry-date">Expiry Date</Label>
              <Input
                id="expiry-date"
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="coupon-active"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="coupon-active" className="cursor-pointer font-normal">
                Coupon is active and available for redemption
              </Label>
            </div>

            <DialogFooter className="pt-3">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-br from-primary to-primary-glow">
                {editingCoupon ? "Update coupon" : "Save coupon"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
