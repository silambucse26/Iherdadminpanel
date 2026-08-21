import { l as db } from "./router-DAnu6P_r.mjs";
import "../_libs/firebase.mjs";
import { i as collection, n as getDocs } from "../_libs/@firebase/firestore+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useFirebaseData-BghabcpM.js
function useFirebaseCollection(collectionPath) {
	const isMockKey = "AIzaSyAiG9ckBFyW81kLH-f1_N-Goy42yxEI7ME".includes("YOUR_ACTUAL");
	return useQuery({
		queryKey: [collectionPath],
		queryFn: async () => {
			if (isMockKey) return [];
			try {
				const segments = collectionPath.split("/").filter(Boolean);
				const colRef = collection(db, segments[0], ...segments.slice(1));
				const snapshot = await getDocs(colRef);
				if (snapshot.empty) return [];
				const results = [];
				snapshot.forEach((doc) => {
					results.push({
						id: doc.id,
						...doc.data()
					});
				});
				return results;
			} catch (error) {
				console.warn(`Error fetching ${collectionPath} from Firebase:`, error);
				return [];
			}
		},
		placeholderData: [],
		staleTime: 1e4
	});
}
//#endregion
export { useFirebaseCollection as t };
