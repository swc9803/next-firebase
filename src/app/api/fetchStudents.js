import { getDocs, collection } from "firebase/firestore";
import fireStore from "../firebase/firestore";

export async function fetchStudents(selectedClass) {
	const querySnapshot = await getDocs(collection(fireStore, "학교", "1학년", selectedClass));
	return querySnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
}
