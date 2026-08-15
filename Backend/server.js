require("dotenv").config();
const express = require("express");
const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors()); // Enable CORS for development
app.use(express.json());

// Initialize Firebase Admin SDK
// Looks for serviceAccountKey.json in the same folder first. If not found, falls back to default initialization.
try {
  const serviceAccountPath = path.join(__dirname, "serviceAccountKey.json");
  if (fs.existsSync(serviceAccountPath)) {
    const serviceAccount = require(serviceAccountPath);
    initializeApp({
      credential: cert(serviceAccount),
      projectId: process.env.VITE_FIREBASE_PROJECT_ID
    });
    console.log("Firebase Admin SDK initialized using serviceAccountKey.json");
  } else {
    // Attempts to load from defaults but explicitly configures projectId from env
    initializeApp({
      projectId: process.env.VITE_FIREBASE_PROJECT_ID
    });
    console.log(`Firebase Admin SDK initialized using defaults/env variables with Project ID: ${process.env.VITE_FIREBASE_PROJECT_ID}`);
  }
} catch (error) {
  console.error("Error initializing Firebase Admin SDK. Make sure to download your serviceAccountKey.json and place it in the Backend directory.", error);
}

const { getFirestore } = require("firebase-admin/firestore");

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

