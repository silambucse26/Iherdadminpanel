import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ShoppingBag,
  Plus,
  Search,
  Flame,
  Pencil,
  Trash2,
  Package,
  IndianRupee,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import { useAdminProducts, useFirebaseCollection, useBestSellers } from "@/hooks/useFirebaseData";
import { getLocalizedText } from "@/lib/utils";

export const Route = createFileRoute("/marketplace/products")({
  head: () => ({ meta: [{ title: "Product Marketplace — iHerd Admin" }] }),
  component: ProductsMarketplacePage,
});

function ProductsMarketplacePage() {
  const { data: products = [], isLoading, saveProduct, deleteProduct } = useAdminProducts();
  const { data: categories = [] } = useFirebaseCollection<any>("product_marketplace/main/categories");
  const { toggleBestSeller } = useBestSellers();

  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Edit / Add modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  const [productId, setProductId] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [nameHi, setNameHi] = useState("");
  const [price, setPrice] = useState("");
  const [mrp, setMrp] = useState("");
  const [stock, setStock] = useState("100");
  const [quantity, setQuantity] = useState("1");
  const [quantityUnit, setQuantityUnit] = useState("Unit");
  const [weight, setWeight] = useState("0");
  const [weightUnit, setWeightUnit] = useState("g");
  const [categoryId, setCategoryId] = useState("cat_disease_management");
  const [subCategoryId, setSubCategoryId] = useState("subcat_breeding_detection");
  const [sellerName, setSellerName] = useState("iHerd Official");
  const [status, setStatus] = useState("Approved");
  const [gst, setGst] = useState("18");
  const [bestSeller, setBestSeller] = useState(false);
  const [description, setDescription] = useState("");
  const [instructionsToUse, setInstructionsToUse] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  // Category mapping
  const categoryMap = new Map();
  categories.forEach((cat) => {
    categoryMap.set(cat.id, getLocalizedText(cat.name, cat.id));
  });

  const openAddModal = () => {
    setEditingProduct(null);
    setProductId(`PRD-${Date.now().toString().slice(-6)}`);
    setNameEn("");
    setNameHi("");
    setPrice("500");
    setMrp("600");
    setStock("100");
    setQuantity("1");
    setQuantityUnit("Unit");
    setWeight("100");
    setWeightUnit("g");
    setCategoryId(categories[0]?.id || "cat_disease_management");
    setSubCategoryId("subcat_breeding_detection");
    setSellerName("iHerd Official");
    setStatus("Approved");
    setGst("18");
    setBestSeller(false);
    setDescription("");
    setInstructionsToUse("");
    setThumbnailUrl("");
    setModalOpen(true);
  };

  const openEditModal = (p: any) => {
    setEditingProduct(p);
    setProductId(p.id || "");
    
    // Extract English & Hindi name strings
    if (typeof p.name === "object") {
      setNameEn(p.name.en || p.name.mr || "");
      setNameHi(p.name.hi || p.name.en || "");
    } else {
      setNameEn(String(p.name || p.title || ""));
      setNameHi(String(p.name || p.title || ""));
    }

    setPrice(String(p.price || 0));
    setMrp(String(p.mrp || p.price || 0));
    setStock(String(p.stock !== undefined ? p.stock : 100));
    setQuantity(String(p.quantity || 1));
    setQuantityUnit(p.quantityUnit || "Unit");
    setWeight(String(p.weight || 0));
    setWeightUnit(p.weightUnit || "g");
    setCategoryId(p.categoryId || "cat_disease_management");
    setSubCategoryId(p.subCategoryId || "subcat_breeding_detection");
    setSellerName(getLocalizedText(p.sellerName, "iHerd Official"));
    setStatus(getLocalizedText(p.status, "Approved"));
    setGst(String(p.gst || 18));
    setBestSeller(Boolean(p.bestSeller || p.isBestSeller));
    setDescription(getLocalizedText(p.description, ""));
    setInstructionsToUse(getLocalizedText(p.instructionsToUse, ""));
    setThumbnailUrl(p.thumbnailUrl || p.imageUrls?.[0] || p.images?.[0] || "");
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameEn.trim() && !nameHi.trim()) {
      toast.error("Please provide a product name");
      return;
    }

    const payload = {
      id: productId.trim(),
      name: {
        en: nameEn.trim() || nameHi.trim(),
        hi: nameHi.trim() || nameEn.trim(),
      },
      price: Number(price) || 0,
      mrp: Number(mrp) || Number(price) || 0,
      stock: Number(stock) || 0,
      quantity: Number(quantity) || 1,
      quantityUnit,
      weight: Number(weight) || 0,
      weightUnit,
      categoryId,
      subCategoryId,
      sellerName,
      status,
      gst: Number(gst) || 0,
      bestSeller,
      isBestSeller: bestSeller,
      description,
      instructionsToUse,
      thumbnailUrl,
      imageUrls: thumbnailUrl ? [thumbnailUrl] : [],
    };

    try {
      await saveProduct.mutateAsync(payload);
      toast.success(editingProduct ? "Product details updated successfully!" : "New product created successfully!");
      setModalOpen(false);
    } catch (err: any) {
      toast.error(`Failed to save product: ${err.message}`);
    }
  };

  const handleDelete = async (p: any) => {
    const pName = getLocalizedText(p.name || p.title, p.id);
    if (!confirm(`Are you sure you want to delete "${pName}"? This action cannot be undone.`)) return;
    try {
      await deleteProduct.mutateAsync(p.id);
      toast.success(`Product "${pName}" deleted.`);
    } catch (err: any) {
      toast.error(`Failed to delete product: ${err.message}`);
    }
  };

  const handleToggleBestSeller = async (p: any) => {
    const isBs = Boolean(p.bestSeller || p.isBestSeller);
    try {
      await toggleBestSeller.mutateAsync({
        productId: p.id,
        isBestSeller: !isBs,
      });
      toast.success(!isBs ? `Marked "${getLocalizedText(p.name || p.title)}" as Best Seller` : `Removed Best Seller status`);
    } catch (err: any) {
      toast.error(`Error updating best seller: ${err.message}`);
    }
  };

  // KPIs
  const totalCount = products.length;
  const approvedCount = products.filter(
    (p) => (getLocalizedText(p.status) || "").toLowerCase() === "approved" || (getLocalizedText(p.status) || "").toLowerCase() === "active" || !p.status
  ).length;
  const bestSellerCount = products.filter((p) => p.bestSeller || p.isBestSeller).length;
  const outOfStockCount = products.filter(
    (p) => (getLocalizedText(p.status) || "").toLowerCase() === "out of stock" || p.stock === 0
  ).length;

  const filteredProducts = products.filter((p) => {
    const nameStr = getLocalizedText(p.name || p.title, "").toLowerCase();
    const idStr = (p.id || "").toLowerCase();
    const matchesQ = q ? nameStr.includes(q.toLowerCase()) || idStr.includes(q.toLowerCase()) : true;

    const pStatus = getLocalizedText(p.status, "Approved").toLowerCase();
    const isBs = Boolean(p.bestSeller || p.isBestSeller);

    const matchesF =
      filter === "all"
        ? true
        : filter === "best_sellers"
        ? isBs
        : filter === "approved"
        ? pStatus === "approved" || pStatus === "active" || !p.status
        : filter === "out_of_stock"
        ? pStatus === "out of stock" || p.stock === 0
        : pStatus === filter;

    const matchesCat = categoryFilter === "all" ? true : p.categoryId === categoryFilter;

    return matchesQ && matchesF && matchesCat;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Product marketplace & catalog"
        description="Manage catalog products, modify prices, stock levels, specifications, and best seller badges."
        actions={
          <Button
            size="sm"
            onClick={openAddModal}
            className="gap-1.5 bg-gradient-to-br from-primary to-primary-glow font-medium shadow-sm"
          >
            <Plus className="h-4 w-4" /> Add new product
          </Button>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 rounded-2xl bg-card border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Total Products</span>
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-primary/10 text-primary">
              <Package className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold">{isLoading ? "…" : totalCount.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground mt-1">Live in marketplace</div>
        </Card>

        <Card className="p-4 rounded-2xl bg-card border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Active / Approved</span>
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-600">{isLoading ? "…" : approvedCount.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground mt-1">Available for buyer purchase</div>
        </Card>

        <Card className="p-4 rounded-2xl bg-card border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Best Sellers</span>
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-amber-500/10 text-amber-600">
              <Flame className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-amber-600">{isLoading ? "…" : bestSellerCount.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground mt-1">Featured in app store front</div>
        </Card>

        <Card className="p-4 rounded-2xl bg-card border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Out of Stock</span>
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-destructive/10 text-destructive">
              <AlertCircle className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-destructive">{isLoading ? "…" : outOfStockCount.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground mt-1">Zero stock count</div>
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
              placeholder="Search products by name or ID..."
              className="pl-9 bg-muted/50 border-transparent focus-visible:bg-background"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-36 bg-muted/50">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="approved">Active / Approved</SelectItem>
                <SelectItem value="best_sellers">Best Sellers</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="out_of_stock">Out of stock</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-44 bg-muted/50">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {getLocalizedText(c.name, c.id)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="w-16">Image</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Product ID</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Selling Price</TableHead>
                <TableHead>MRP</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={9} className="py-4 text-center">
                      <div className="h-4 bg-muted rounded animate-pulse w-3/4 mx-auto" />
                    </TableCell>
                  </TableRow>
                ))
              ) : filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center text-muted-foreground py-12">
                    <Package className="h-8 w-8 mx-auto text-muted-foreground/50 mb-2" />
                    No products match your search or filter.
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((p) => {
                  const img = p.thumbnailUrl || p.imageUrls?.[0] || p.images?.[0];
                  const prodName = getLocalizedText(p.name || p.title, p.id);
                  const isBs = Boolean(p.bestSeller || p.isBestSeller);
                  const catName = categoryMap.get(p.categoryId) || p.category || "General";
                  const pStatus = getLocalizedText(p.status, p.stock === 0 ? "Out of stock" : "Approved");

                  return (
                    <TableRow key={p.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell>
                        <div className="h-10 w-10 rounded-xl bg-muted overflow-hidden flex items-center justify-center border shrink-0">
                          {img ? (
                            <img src={img} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <Package className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-0.5 max-w-xs">
                          <div className="font-medium text-sm text-foreground flex items-center gap-1.5">
                            <span className="truncate">{prodName}</span>
                            {isBs && (
                              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 text-[10px] font-bold bg-amber-500/10 text-amber-600 rounded">
                                <Flame className="h-2.5 w-2.5" /> Best Seller
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground truncate">
                            {p.sellerName ? getLocalizedText(p.sellerName) : "iHerd Official"}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <span className="font-mono text-xs text-muted-foreground">{getLocalizedText(p.id)}</span>
                      </TableCell>

                      <TableCell>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs bg-muted font-medium">
                          {getLocalizedText(catName)}
                        </span>
                      </TableCell>

                      <TableCell>
                        <span className="font-bold text-foreground">₹{Number(p.price || 0).toLocaleString()}</span>
                      </TableCell>

                      <TableCell>
                        <span className="text-xs text-muted-foreground line-through">
                          {p.mrp ? `₹${Number(p.mrp).toLocaleString()}` : "—"}
                        </span>
                      </TableCell>

                      <TableCell>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${Number(p.stock) === 0 ? "bg-destructive/10 text-destructive" : "bg-muted text-foreground"}`}>
                          {p.stock !== undefined ? p.stock : 100}
                        </span>
                      </TableCell>

                      <TableCell>
                        <StatusBadge status={pStatus} />
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            size="sm"
                            variant={isBs ? "default" : "outline"}
                            onClick={() => handleToggleBestSeller(p)}
                            className={`h-8 px-2 text-xs gap-1 ${isBs ? "bg-amber-500 hover:bg-amber-600 text-white" : "border-amber-500/30 text-amber-600 hover:bg-amber-50"}`}
                            title={isBs ? "Remove from Best Sellers" : "Feature as Best Seller"}
                          >
                            <Flame className="h-3 w-3" />
                            {isBs ? "Featured" : "Feature"}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEditModal(p)}
                            className="h-8 px-2.5 text-xs gap-1 font-medium"
                          >
                            <Pencil className="h-3.5 w-3.5" /> Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(p)}
                            className="h-8 w-8 p-0 text-destructive/80 hover:text-destructive hover:bg-destructive/10"
                            title="Delete product"
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
            Showing <b className="text-foreground">{filteredProducts.length}</b> of{" "}
            <b className="text-foreground">{products.length}</b> products in catalog
          </span>
        </div>
      </Card>

      {/* Edit / Add Product Modal Dialog */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-2xl rounded-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
                <ShoppingBag className="h-4.5 w-4.5" />
              </span>
              {editingProduct ? "Edit Product & Price" : "Add New Product"}
            </DialogTitle>
            <DialogDescription>
              Modify pricing, stock inventory, category, and specifications in Firestore.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4 pt-2">
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5 col-span-1">
                <Label htmlFor="prod-id">Product ID *</Label>
                <Input
                  id="prod-id"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  required
                  disabled={!!editingProduct}
                  className="font-mono text-xs"
                />
              </div>
              <div className="space-y-1.5 col-span-2">
                <Label htmlFor="prod-name-en">Product Name (English) *</Label>
                <Input
                  id="prod-name-en"
                  placeholder="e.g. Quadmastest Device"
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="prod-name-hi">Product Name (Hindi / Localized)</Label>
              <Input
                id="prod-name-hi"
                placeholder="e.g. क्वाडमास्टेस्ट उपकरण"
                value={nameHi}
                onChange={(e) => setNameHi(e.target.value)}
              />
            </div>

            {/* Pricing & Stock Row */}
            <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-muted/40 border">
              <div className="space-y-1.5">
                <Label htmlFor="prod-price" className="text-primary font-semibold">Selling Price (₹) *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">₹</span>
                  <Input
                    id="prod-price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="pl-7 font-bold text-base"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="prod-mrp">MRP Price (₹)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                  <Input
                    id="prod-mrp"
                    type="number"
                    value={mrp}
                    onChange={(e) => setMrp(e.target.value)}
                    className="pl-7 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="prod-stock">Stock Units</Label>
                <Input
                  id="prod-stock"
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
            </div>

            {/* Category & Status */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {getLocalizedText(c.name, c.id)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label>Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Approved">Approved / Active</SelectItem>
                    <SelectItem value="Pending">Pending Review</SelectItem>
                    <SelectItem value="Out of stock">Out of Stock</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Pack / Weight & GST */}
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="prod-qty">Pack / Quantity</Label>
                <div className="flex gap-1">
                  <Input
                    id="prod-qty"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-20"
                  />
                  <Input
                    placeholder="Unit"
                    value={quantityUnit}
                    onChange={(e) => setQuantityUnit(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="prod-weight">Weight</Label>
                <div className="flex gap-1">
                  <Input
                    id="prod-weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-20"
                  />
                  <Input
                    placeholder="g / kg"
                    value={weightUnit}
                    onChange={(e) => setWeightUnit(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="prod-gst">GST (%)</Label>
                <Input
                  id="prod-gst"
                  type="number"
                  value={gst}
                  onChange={(e) => setGst(e.target.value)}
                  placeholder="18"
                />
              </div>
            </div>

            {/* Image URL & Seller */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="prod-thumb">Image / Thumbnail URL</Label>
                <Input
                  id="prod-thumb"
                  placeholder="https://..."
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="prod-seller">Seller Name</Label>
                <Input
                  id="prod-seller"
                  placeholder="iHerd Official"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label htmlFor="prod-desc">Product Description</Label>
              <Textarea
                id="prod-desc"
                rows={2}
                placeholder="Detailed description of the item..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Instructions */}
            <div className="space-y-1.5">
              <Label htmlFor="prod-inst">Instructions to Use</Label>
              <Textarea
                id="prod-inst"
                rows={2}
                placeholder="Directions for use or storage instructions..."
                value={instructionsToUse}
                onChange={(e) => setInstructionsToUse(e.target.value)}
              />
            </div>

            {/* Best Seller Checkbox */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="prod-bs"
                checked={bestSeller}
                onChange={(e) => setBestSeller(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
              />
              <Label htmlFor="prod-bs" className="cursor-pointer font-normal flex items-center gap-1.5">
                <Flame className="h-4 w-4 text-amber-500" />
                Feature this product in <b>Best Sellers</b> collection & mobile app front
              </Label>
            </div>

            <DialogFooter className="pt-3">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-br from-primary to-primary-glow">
                {editingProduct ? "Save Changes" : "Create Product"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
