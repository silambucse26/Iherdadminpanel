require("dotenv").config();
const express = require("express");
const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

// Explicit CORS — handles preflight OPTIONS requests that fail during Render cold starts
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  credentials: false,
}));
app.options(/.*/, cors()); // Handle preflight for all routes — regex works in all Express versions

app.use(express.json());

// Keep-alive ping endpoint — frontend pings this to prevent Render from sleeping
app.get("/ping", (req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

// Root path handler to check backend status
app.get("/", (req, res) => {
  res.send("iHerd Admin Console Backend API is running successfully!");
});

// Initialize Firebase Admin SDK
const bucketName = process.env.VITE_FIREBASE_STORAGE_BUCKET || "auth-b404a.appspot.com";
try {
  const serviceAccountPath = path.join(__dirname, "serviceAccountKey.json");
  if (fs.existsSync(serviceAccountPath)) {
    const serviceAccount = require(serviceAccountPath);
    initializeApp({
      credential: cert(serviceAccount),
      projectId: process.env.VITE_FIREBASE_PROJECT_ID || serviceAccount.project_id || "auth-b404a",
      storageBucket: bucketName
    });
    console.log(`Firebase Admin SDK initialized with Storage Bucket: ${bucketName}`);
  } else {
    initializeApp({
      projectId: process.env.VITE_FIREBASE_PROJECT_ID || "auth-b404a",
      storageBucket: bucketName
    });
    console.log(`Firebase Admin SDK initialized using defaults with Project ID: ${process.env.VITE_FIREBASE_PROJECT_ID}`);
  }
} catch (error) {
  console.error("Error initializing Firebase Admin SDK:", error);
}

const { getFirestore } = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage");

// Helper: list all files under a storage prefix
async function listFilesUnderPrefix(bucket, prefix) {
  try {
    const [files] = await bucket.getFiles({ prefix });
    return files
      .filter((f) => !f.name.endsWith("/")) // skip folder placeholders
      .map((f) => ({
        name: f.name,
        size: f.metadata.size ? parseInt(f.metadata.size) : 0,
        contentType: f.metadata.contentType || "application/octet-stream",
        updated: f.metadata.updated || null,
        url: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(f.name)}?alt=media`,
      }));
  } catch (err) {
    console.warn(`Warning: Could not list files for prefix "${prefix}" on bucket "${bucket.name}":`, err.message);
    return [];
  }
}

// REST API: list all Firebase Storage files across all known paths
app.get("/api/admin/storage", async (req, res) => {
  try {
    const defaultBucketName = process.env.VITE_FIREBASE_STORAGE_BUCKET || "auth-b404a.appspot.com";
    const candidateBuckets = [
      defaultBucketName,
      "auth-b404a.firebasestorage.app",
      "auth-b404a.appspot.com"
    ];

    let bucket = getStorage().bucket(defaultBucketName);
    let userImages = [];
    let invoices = [];
    let cattleMarketplace = [];
    let marketplace = [];
    let success = false;
    let lastError = null;

    // Try candidate bucket names
    for (const bName of Array.from(new Set(candidateBuckets))) {
      try {
        const testBucket = getStorage().bucket(bName);
        const [files] = await testBucket.getFiles({ maxResults: 1 });
        bucket = testBucket;
        success = true;
        console.log(`Successfully connected to Storage Bucket: ${bName}`);
        break;
      } catch (bErr) {
        lastError = bErr;
        console.warn(`Bucket check for "${bName}" failed:`, bErr.message);
      }
    }

    if (!success) {
      console.error("All storage bucket attempts failed:", lastError?.message);
      return res.status(403).json({
        error: {
          code: 403,
          message: `Storage permission denied or bucket not found. Ensure the Service Account has 'Storage Admin' or 'Storage Object Viewer' role in Google Cloud IAM. (${lastError?.message})`
        },
        userImages: [],
        invoices: [],
        cattleMarketplace: [],
        marketplace: [],
        totals: { userImages: 0, invoices: 0, cattleMarketplace: 0, marketplace: 0, total: 0 }
      });
    }

    [userImages, invoices, cattleMarketplace, marketplace] = await Promise.all([
      listFilesUnderPrefix(bucket, "UserImages/"),
      listFilesUnderPrefix(bucket, "invoices/"),
      listFilesUnderPrefix(bucket, "cattle-marketplace/"),
      listFilesUnderPrefix(bucket, "marketplace/"),
    ]);

    res.json({
      userImages,
      invoices,
      cattleMarketplace,
      marketplace,
      totals: {
        userImages: userImages.length,
        invoices: invoices.length,
        cattleMarketplace: cattleMarketplace.length,
        marketplace: marketplace.length,
        total: userImages.length + invoices.length + cattleMarketplace.length + marketplace.length,
      },
    });
  } catch (error) {
    console.error("Error in /api/admin/storage:", error);
    res.status(500).json({ error: error.message });
  }
});


// REST API to list all Firebase Authentication users
app.get("/api/admin/users", async (req, res) => {
  try {
    const auth = getAuth();
    const db = getFirestore();
    
    // Prefetch all Firestore user documents to merge profile metadata
    const fsSnapshot = await db.collection("users").get();
    const fsUsersMap = {};
    fsSnapshot.forEach((doc) => {
      fsUsersMap[doc.id] = doc.data();
    });

    let authUsers = [];
    let nextPageToken = undefined;

    // Define the list users operation as a Promise
    const listUsersPromise = (async () => {
      do {
        const listUsersResult = await auth.listUsers(1000, nextPageToken);
        const batch = listUsersResult.users.map((userRecord) => {
          const fsUser = fsUsersMap[userRecord.uid] || {};
          const roles = fsUser.roles || (fsUser.role ? [fsUser.role] : ["User"]);
          
          return {
            uid: userRecord.uid,
            email: userRecord.email || fsUser.email || null,
            phoneNumber: userRecord.phoneNumber || fsUser.phoneNumber || fsUser.phone || "—",
            displayName: userRecord.displayName || fsUser.name || fsUser.displayName || "User",
            roles: roles,
            createdAt: userRecord.metadata.creationTime || fsUser.createdAt || null,
            lastLoginAt: userRecord.metadata.lastSignInTime || fsUser.updatedAt || null,
            farms: fsUser.farms || null,
            seller: fsUser.seller || null,
            veterinarian: fsUser.veterinarian || fsUser.vet || null,
          };
        });
        
        authUsers = authUsers.concat(batch);
        nextPageToken = listUsersResult.pageToken;
      } while (nextPageToken);
      return authUsers;
    })();

    // 6-second timeout promise
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout calling Firebase Auth Service")), 6000)
    );

    // Race list users against a 6-second timeout
    let result = [];
    try {
      result = await Promise.race([listUsersPromise, timeoutPromise]);
    } catch (authError) {
      console.warn("Auth list users failed or timed out, returning Firestore profiles directly:", authError.message);
      // Fallback: Map all users from Firestore map
      result = Object.keys(fsUsersMap).map((uid) => {
        const fsUser = fsUsersMap[uid];
        const roles = fsUser.roles || (fsUser.role ? [fsUser.role] : ["User"]);
        return {
          uid: uid,
          email: fsUser.email || null,
          phoneNumber: fsUser.phoneNumber || fsUser.phone || "—",
          displayName: fsUser.name || fsUser.displayName || "User",
          roles: roles,
          createdAt: fsUser.createdAt ? (fsUser.createdAt.seconds ? fsUser.createdAt.seconds * 1000 : fsUser.createdAt) : null,
          lastLoginAt: fsUser.updatedAt ? (fsUser.updatedAt.seconds ? fsUser.updatedAt.seconds * 1000 : fsUser.updatedAt) : null,
          farms: fsUser.farms || null,
          seller: fsUser.seller || null,
          veterinarian: fsUser.veterinarian || fsUser.vet || null,
        };
      });
    }

    res.json({ users: result });
  } catch (error) {
    console.error("Error in /api/admin/users:", error);
    res.status(500).json({ error: error.message });
  }
});

// REST API to list all Product Orders (bypasses client security rules)
app.get("/api/admin/product-orders", async (req, res) => {
  try {
    const db = getFirestore();
    const [pSnap, rSnap, legacySnap] = await Promise.all([
      db.collection("ProductOrders").get().catch(() => ({ docs: [] })),
      db.collection("received_orders").get().catch(() => ({ docs: [] })),
      db.collection("product_orders").get().catch(() => ({ docs: [] })),
    ]);

    const ordersMap = new Map();
    const addDoc = (doc) => {
      if (!ordersMap.has(doc.id)) {
        ordersMap.set(doc.id, { id: doc.id, ...doc.data() });
      }
    };

    pSnap.docs?.forEach(addDoc);
    rSnap.docs?.forEach(addDoc);
    legacySnap.docs?.forEach(addDoc);

    console.log(`Fetched ${ordersMap.size} product orders from Firestore via Admin SDK`);
    res.json({ orders: Array.from(ordersMap.values()) });
  } catch (error) {
    console.error("Error in /api/admin/product-orders:", error);
    res.status(500).json({ error: error.message, orders: [] });
  }
});

// REST API to list all Cattle Orders (bypasses client security rules)
app.get("/api/admin/cattle-orders", async (req, res) => {
  try {
    const db = getFirestore();
    const [cSnap, legacySnap] = await Promise.all([
      db.collection("CattleOrders").get().catch(() => ({ docs: [] })),
      db.collection("cattle_orders").get().catch(() => ({ docs: [] })),
    ]);

    const ordersMap = new Map();
    const addDoc = (doc) => {
      if (!ordersMap.has(doc.id)) {
        ordersMap.set(doc.id, { id: doc.id, ...doc.data() });
      }
    };

    cSnap.docs?.forEach(addDoc);
    legacySnap.docs?.forEach(addDoc);

    console.log(`Fetched ${ordersMap.size} cattle orders from Firestore via Admin SDK`);
    res.json({ orders: Array.from(ordersMap.values()) });
  } catch (error) {
    console.error("Error in /api/admin/cattle-orders:", error);
    res.status(500).json({ error: error.message, orders: [] });
  }
});

// REST API to get and update Token Advance rates
app.get("/api/admin/token-advance", async (req, res) => {
  try {
    const db = getFirestore();
    const snap = await db.collection("token-advance").get();
    const docs = [];
    let rates = { cow: 200, buffalo: 250, goat: 100, sheep: 50 };

    snap.forEach((doc) => {
      const data = doc.data();
      docs.push({ id: doc.id, ...data });
      if (doc.id === "token-advance" || doc.id === "default") {
        rates = { ...rates, ...data };
      }
    });

    res.json({ rates, items: docs });
  } catch (error) {
    console.error("Error in /api/admin/token-advance GET:", error);
    res.status(500).json({ error: error.message, rates: { cow: 200, buffalo: 250, goat: 100, sheep: 50 }, items: [] });
  }
});

app.post("/api/admin/token-advance", async (req, res) => {
  try {
    const db = getFirestore();
    const { cow, buffalo, goat, sheep, ...otherRates } = req.body;
    const docId = req.body.id || "token-advance";
    
    const updateData = {
      cow: Number(cow) || 0,
      buffalo: Number(buffalo) || 0,
      goat: Number(goat) || 0,
      sheep: Number(sheep) || 0,
      ...otherRates,
      updatedAt: new Date().toISOString(),
    };

    await db.collection("token-advance").doc(docId).set(updateData, { merge: true });
    console.log(`Updated token advance rates in doc ${docId}:`, updateData);
    res.json({ success: true, rates: updateData });
  } catch (error) {
    console.error("Error in /api/admin/token-advance POST:", error);
    res.status(500).json({ error: error.message });
  }
});

// REST API for Coupons
app.get("/api/admin/coupons", async (req, res) => {
  try {
    const db = getFirestore();
    const snap = await db.collection("product_marketplace").doc("main").collection("coupons_code").get();
    const coupons = [];
    
    snap.forEach((doc) => {
      const data = doc.data();
      let expiresAtFormatted = null;
      if (data.expiresAt) {
        if (data.expiresAt.toDate) {
          expiresAtFormatted = data.expiresAt.toDate().toISOString();
        } else if (data.expiresAt._seconds) {
          expiresAtFormatted = new Date(data.expiresAt._seconds * 1000).toISOString();
        } else if (data.expiresAt.seconds) {
          expiresAtFormatted = new Date(data.expiresAt.seconds * 1000).toISOString();
        } else {
          expiresAtFormatted = data.expiresAt;
        }
      }

      coupons.push({
        id: doc.id,
        ...data,
        expiresAtFormatted,
        usedCount: Array.isArray(data.usedUserIds) ? data.usedUserIds.filter(Boolean).length : 0,
      });
    });

    res.json({ coupons });
  } catch (error) {
    console.error("Error in /api/admin/coupons GET:", error);
    res.status(500).json({ error: error.message, coupons: [] });
  }
});

app.post("/api/admin/coupons", async (req, res) => {
  try {
    const db = getFirestore();
    const { code, type = "PERCENT", value = 0, minOrder = 0, maxDiscount = 1000, active = true, expiresAt, allowedFlow = "PRODUCT", excludedProductIds = [], productIds = [] } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: "Coupon code is required" });
    }

    const docId = code.trim().toUpperCase();
    const couponData = {
      code: code.trim(),
      type: type.toUpperCase(),
      value: Number(value) || 0,
      minOrder: Number(minOrder) || 0,
      maxDiscount: Number(maxDiscount) || 0,
      active: Boolean(active),
      allowedFlow,
      excludedProductIds: Array.isArray(excludedProductIds) ? excludedProductIds : [],
      productIds: Array.isArray(productIds) ? productIds : [],
      usedUserIds: req.body.usedUserIds || [],
      updatedAt: new Date().toISOString(),
    };

    if (expiresAt) {
      couponData.expiresAt = new Date(expiresAt);
    }

    await db.collection("product_marketplace").doc("main").collection("coupons_code").doc(docId).set(couponData, { merge: true });
    console.log(`Created/Updated coupon: ${docId}`);
    res.json({ success: true, id: docId, coupon: couponData });
  } catch (error) {
    console.error("Error in /api/admin/coupons POST:", error);
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/admin/coupons/:id", async (req, res) => {
  try {
    const db = getFirestore();
    const { id } = req.params;
    const updateData = { ...req.body, updatedAt: new Date().toISOString() };
    
    if (updateData.expiresAt && typeof updateData.expiresAt === "string") {
      updateData.expiresAt = new Date(updateData.expiresAt);
    }

    await db.collection("product_marketplace").doc("main").collection("coupons_code").doc(id).set(updateData, { merge: true });
    console.log(`Updated coupon: ${id}`);
    res.json({ success: true, id, updated: updateData });
  } catch (error) {
    console.error(`Error in /api/admin/coupons/${req.params.id} PUT:`, error);
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/admin/coupons/:id", async (req, res) => {
  try {
    const db = getFirestore();
    const { id } = req.params;
    await db.collection("product_marketplace").doc("main").collection("coupons_code").doc(id).delete();
    console.log(`Deleted coupon: ${id}`);
    res.json({ success: true, id });
  } catch (error) {
    console.error(`Error in /api/admin/coupons/${req.params.id} DELETE:`, error);
    res.status(500).json({ error: error.message });
  }
});

// REST API for Best Sellers & Product Marketplace
app.get("/api/admin/best-sellers", async (req, res) => {
  try {
    const db = getFirestore();
    const [pSnap, bsSnap] = await Promise.all([
      db.collection("product_marketplace").doc("main").collection("products").get().catch(() => ({ docs: [] })),
      db.collection("product_marketplace").doc("main").collection("best_seller").get().catch(() => ({ docs: [] })),
    ]);

    const bestSellerIds = new Set();
    bsSnap.docs?.forEach((d) => bestSellerIds.add(d.id));

    const products = [];
    pSnap.docs?.forEach((doc) => {
      const data = doc.data();
      const isBs = Boolean(data.bestSeller || data.isBestSeller || bestSellerIds.has(doc.id));
      if (isBs) {
        products.push({ id: doc.id, ...data, bestSeller: true });
      }
    });

    res.json({ bestSellers: products, totalCount: products.length });
  } catch (error) {
    console.error("Error in /api/admin/best-sellers GET:", error);
    res.status(500).json({ error: error.message, bestSellers: [] });
  }
});

app.post("/api/admin/best-sellers/toggle", async (req, res) => {
  try {
    const db = getFirestore();
    const { productId, isBestSeller } = req.body;
    
    if (!productId) {
      return res.status(400).json({ error: "productId is required" });
    }

    const prodRef = db.collection("product_marketplace").doc("main").collection("products").doc(productId);
    const prodDoc = await prodRef.get();
    
    if (!prodDoc.exists) {
      return res.status(404).json({ error: "Product not found" });
    }

    const prodData = prodDoc.data();
    const newStatus = isBestSeller !== undefined ? Boolean(isBestSeller) : !prodData.bestSeller;

    // Update product document
    await prodRef.update({
      bestSeller: newStatus,
      isBestSeller: newStatus,
      updatedAt: new Date().toISOString(),
    });

    // Also sync to best_seller collection
    const bsRef = db.collection("product_marketplace").doc("main").collection("best_seller").doc(productId);
    if (newStatus) {
      await bsRef.set({
        ...prodData,
        id: productId,
        bestSeller: true,
        isBestSeller: true,
        featuredAt: new Date().toISOString(),
      }, { merge: true });
    } else {
      await bsRef.delete().catch(() => {});
    }

    console.log(`Toggled bestSeller for ${productId} to ${newStatus}`);
    res.json({ success: true, productId, bestSeller: newStatus });
  } catch (error) {
    console.error("Error in /api/admin/best-sellers/toggle:", error);
    res.status(500).json({ error: error.message });
  }
});

// REST API for Products CRUD
app.get("/api/admin/products", async (req, res) => {
  try {
    const db = getFirestore();
    const snap = await db.collection("product_marketplace").doc("main").collection("products").get();
    const products = [];
    snap.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    res.json({ products, total: products.length });
  } catch (error) {
    console.error("Error in /api/admin/products GET:", error);
    res.status(500).json({ error: error.message, products: [] });
  }
});

app.post("/api/admin/products", async (req, res) => {
  try {
    const db = getFirestore();
    const { id, name, price, mrp, categoryId, subCategoryId, stock, quantity, quantityUnit, weight, weightUnit, description, instructionsToUse, gst, sellerName, sellerType, thumbnailUrl, imageUrls, bestSeller, status } = req.body;
    
    const docId = id ? id.trim() : `PRD-${Date.now()}`;
    
    // Support multi-language or string name
    const formattedName = typeof name === "object" ? name : { en: String(name || "Product"), hi: String(name || "उत्पाद") };
    
    const productData = {
      id: docId,
      name: formattedName,
      price: Number(price) || 0,
      mrp: Number(mrp) || Number(price) || 0,
      categoryId: categoryId || "cat_disease_management",
      subCategoryId: subCategoryId || "subcat_breeding_detection",
      stock: stock !== undefined ? Number(stock) : 100,
      quantity: quantity !== undefined ? Number(quantity) : 1,
      quantityUnit: quantityUnit || "Unit",
      weight: weight !== undefined ? Number(weight) : 0,
      weightUnit: weightUnit || "g",
      description: description || "",
      instructionsToUse: instructionsToUse || "",
      gst: gst !== undefined ? Number(gst) : 0,
      sellerName: sellerName || "iHerd Official",
      sellerType: sellerType || "Official",
      thumbnailUrl: thumbnailUrl || imageUrls?.[0] || "",
      imageUrls: Array.isArray(imageUrls) ? imageUrls : thumbnailUrl ? [thumbnailUrl] : [],
      bestSeller: Boolean(bestSeller),
      isBestSeller: Boolean(bestSeller),
      status: status || "Approved",
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    await db.collection("product_marketplace").doc("main").collection("products").doc(docId).set(productData, { merge: true });
    
    // Sync best seller
    if (productData.bestSeller) {
      await db.collection("product_marketplace").doc("main").collection("best_seller").doc(docId).set({
        ...productData,
        featuredAt: new Date().toISOString(),
      }, { merge: true });
    }

    console.log(`Created product ${docId}:`, productData.name);
    res.json({ success: true, id: docId, product: productData });
  } catch (error) {
    console.error("Error in /api/admin/products POST:", error);
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/admin/products/:id", async (req, res) => {
  try {
    const db = getFirestore();
    const { id } = req.params;
    const body = req.body;
    
    const updateData = {
      ...body,
      updatedAt: new Date().toISOString(),
    };

    if (body.price !== undefined) updateData.price = Number(body.price);
    if (body.mrp !== undefined) updateData.mrp = Number(body.mrp);
    if (body.stock !== undefined) updateData.stock = Number(body.stock);
    if (body.quantity !== undefined) updateData.quantity = Number(body.quantity);
    if (body.weight !== undefined) updateData.weight = Number(body.weight);
    if (body.gst !== undefined) updateData.gst = Number(body.gst);
    if (body.bestSeller !== undefined) {
      updateData.bestSeller = Boolean(body.bestSeller);
      updateData.isBestSeller = Boolean(body.bestSeller);
    }

    const prodRef = db.collection("product_marketplace").doc("main").collection("products").doc(id);
    await prodRef.set(updateData, { merge: true });

    // Sync with best_seller collection
    const bsRef = db.collection("product_marketplace").doc("main").collection("best_seller").doc(id);
    if (updateData.bestSeller) {
      const snap = await prodRef.get();
      await bsRef.set({ ...snap.data(), featuredAt: new Date().toISOString() }, { merge: true });
    } else if (body.bestSeller === false) {
      await bsRef.delete().catch(() => {});
    }

    console.log(`Updated product ${id}: price=${updateData.price}, bestSeller=${updateData.bestSeller}`);
    res.json({ success: true, id, updated: updateData });
  } catch (error) {
    console.error(`Error in /api/admin/products/${req.params.id} PUT:`, error);
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/admin/products/:id", async (req, res) => {
  try {
    const db = getFirestore();
    const { id } = req.params;
    
    await db.collection("product_marketplace").doc("main").collection("products").doc(id).delete();
    await db.collection("product_marketplace").doc("main").collection("best_seller").doc(id).delete().catch(() => {});
    
    console.log(`Deleted product ${id}`);
    res.json({ success: true, id });
  } catch (error) {
    console.error(`Error in /api/admin/products/${req.params.id} DELETE:`, error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});




