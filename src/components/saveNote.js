import { Alert } from "react-native";
import { db, notesRef } from "./../utils/firebase";
import { addDoc, doc, updateDoc } from "firebase/firestore";

export default async function SaveNote(note, navigation) {
  if (note.note === "" || note.title === "") {
    Alert.alert("ERROR", "Vui lòng điền đầy đủ thông tin!", [
      {
        text: "OK",
        style: "cancel",
      },
    ]);
    return;
  } else {
    try {
      if (note.id) {
        // Updating an existing note
        const docRef = doc(db, "Notes", note.id);
        delete note.id;
        await updateDoc(docRef, note);
      } else {
        // Creating a new note
        await addDoc(notesRef, { ...note });
      }
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert("ERROR", "Enter Some Info before Saving.", [
        {
          text: "OK",
          style: "cancel",
        },
      ]);
    }
  }
}
