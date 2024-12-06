import { getFirestore } from "firebase/firestore";
import firebasedb from "./firebasedb";

const fireStore = getFirestore(firebasedb);

export default fireStore;
