import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, limit, query, doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export function useFirebaseCollection<T>(collectionName: string) {
  const isMockKey = !import.meta.env.VITE_FIREBASE_API_KEY || 
                    import.meta.env.VITE_FIREBASE_API_KEY === "mock-api-key" || 
                    import.meta.env.VITE_FIREBASE_API_KEY.includes("YOUR_ACTUAL");

  return useQuery({
    queryKey: [collectionName],
    queryFn: async () => {
      if (isMockKey) {
        return [];
      }
      try {
        const colRef = collection(db, collectionName);
        const snapshot = await getDocs(colRef);
        if (snapshot.empty) {
          return [];
        }
        const results: any[] = [];
        snapshot.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        return results as T[];
      } catch (error) {
        console.warn(`Error fetching ${collectionName} from Firebase:`, error);
        return [];
      }
    },
    initialData: [],
  });
}

export function useFirebaseDoc<T>(collectionName: string, docId: string) {
  const isMockKey = !import.meta.env.VITE_FIREBASE_API_KEY || 
                    import.meta.env.VITE_FIREBASE_API_KEY === "mock-api-key" || 
                    import.meta.env.VITE_FIREBASE_API_KEY.includes("YOUR_ACTUAL");

  return useQuery({
    queryKey: [collectionName, docId],
    queryFn: async () => {
      if (isMockKey || !docId) {
        return null;
      }
      try {
        const docRef = doc(db, collectionName, docId);
        const snapshot = await getDoc(docRef);
        if (!snapshot.exists()) {
          return null;
        }
        return { id: snapshot.id, ...snapshot.data() } as T;
      } catch (error) {
        console.warn(`Error fetching ${collectionName}/${docId} from Firebase:`, error);
        return null;
      }
    },
    enabled: !!docId,
    initialData: null,
  });
}

