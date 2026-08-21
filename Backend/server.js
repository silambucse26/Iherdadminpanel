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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});


