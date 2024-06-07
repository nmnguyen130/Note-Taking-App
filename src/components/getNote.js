import { getDocs, query } from "firebase/firestore";
import { notesRef } from "./../utils/firebase";

export default async function GetNote() {
  try {
    const q = query(notesRef);
    const snapshot = await getDocs(q);

    const notes = await Promise.all(
      snapshot.docs.map(async (doc) => {
        return { id: doc.id, ...doc.data() };
      })
    );
    return notes;
  } catch (error) {
    console.error(`Error fetching notes:`, error);
    throw error;
  }
}
