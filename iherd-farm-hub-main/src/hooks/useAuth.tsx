import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { 
  type User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  updateProfile
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  setProfile: (profile: UserProfile | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, phone: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || "iherdadmin@gmail.com";
  const adminPass = import.meta.env.VITE_ADMIN_PASSWORD || "adminpassword123";
  const isMockKey = 
    !import.meta.env.VITE_FIREBASE_API_KEY || 
    import.meta.env.VITE_FIREBASE_API_KEY === "mock-api-key" || 
    import.meta.env.VITE_FIREBASE_API_KEY.includes("YOUR_ACTUAL");

  useEffect(() => {
    // Check if we have a saved mock session first
    if (isMockKey && typeof window !== "undefined" && window.localStorage.getItem("iherd_local_auth") === "1") {
      setUser({
        uid: "admin-uid",
        email: adminEmail,
        displayName: "Admin User",
      } as User);
      setProfile({
        uid: "admin-uid",
        name: "Admin User",
        email: adminEmail,
        phone: "+91 98xxx 21034",
        role: "Super Admin",
        createdAt: new Date().toISOString()
      });
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Restrict to configured admin email if set
        if (currentUser.email && currentUser.email !== adminEmail) {
          await firebaseSignOut(auth);
          setUser(null);
          setProfile(null);
          setLoading(false);
          return;
        }

        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            setProfile(docSnap.data() as UserProfile);
          } else {
            const fallbackProfile: UserProfile = {
              uid: currentUser.uid,
              name: currentUser.displayName || "Admin User",
              email: currentUser.email || "",
              phone: currentUser.phoneNumber || "+91 98xxx 21034",
              role: "Super Admin",
              createdAt: new Date().toISOString()
            };
            setProfile(fallbackProfile);
            
            // Create the admin profile in Firestore so the security rules can detect the 'Super Admin' role
            await setDoc(userDocRef, {
              uid: currentUser.uid,
              name: fallbackProfile.name,
              email: fallbackProfile.email,
              phoneNumber: fallbackProfile.phone,
              roles: ["Super Admin"],
              createdAt: new Date(),
              updatedAt: new Date()
            });
          }
        } catch (err) {
          console.error("Error fetching user profile:", err);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [adminEmail, isMockKey]);

  const signIn = async (email: string, password: string) => {
    if (email !== adminEmail) {
      throw new Error("Unauthorized. Only the designated administrator is allowed.");
    }

    if (isMockKey) {
      if (password === adminPass) {
        setUser({
          uid: "admin-uid",
          email: adminEmail,
          displayName: "Admin User",
        } as User);
        setProfile({
          uid: "admin-uid",
          name: "Admin User",
          email: adminEmail,
          phone: "+91 98xxx 21034",
          role: "Super Admin",
          createdAt: new Date().toISOString()
        });
        if (typeof window !== "undefined") {
          window.localStorage.setItem("iherd_local_auth", "1");
        }
        return;
      } else {
        throw new Error("Invalid password.");
      }
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      if (err.code === "auth/user-not-found" || (err.message && err.message.includes("auth/user-not-found"))) {
        if (password === adminPass) {
          try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: "Admin User" });
            return;
          } catch (signUpErr: any) {
            throw new Error("Admin account not found and auto-registration failed: " + signUpErr.message);
          }
        }
        throw new Error("Admin account not found in database. Please click 'Create one' below to register this admin email.");
      }
      throw err;
    }
  };

  const signUp = async (email: string, password: string, name: string, phone: string) => {
    if (email !== adminEmail) {
      throw new Error("Unauthorized. Only the designated administrator email can register.");
    }

    if (isMockKey) {
      setUser({
        uid: "admin-uid",
        email: adminEmail,
        displayName: name,
      } as User);
      setProfile({
        uid: "admin-uid",
        name: name,
        email: adminEmail,
        phone: phone,
        role: "Super Admin",
        createdAt: new Date().toISOString()
      });
      if (typeof window !== "undefined") {
        window.localStorage.setItem("iherd_local_auth", "1");
      }
      return;
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, { displayName: name });
    // Database writes removed to maintain strict read-only access
  };

  const logout = async () => {
    if (isMockKey) {
      setUser(null);
      setProfile(null);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("iherd_local_auth");
      }
      return;
    }
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, setProfile, signIn, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
