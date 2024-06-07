import { deleteDoc, doc } from "firebase/firestore";
import { Alert } from "react-native";
import { db } from "../utils/firebase";

export default async function delNote(note, navigation) {
  if (note.id === undefined) {
    Alert.alert("ERROR", "Ghi chú không xác định!", [
      {
        text: "OK",
        style: "cancel",
      },
    ]);
  } else {
    try {
      if (note.id) {
        const docRef = doc(db, "Notes", note.id);
        await deleteDoc(docRef);
      }
      navigation.goBack();
    } catch (err) {
      console.log(err);
      Alert.alert("ERROR", "Không thể xóa ghi chú này!", [
        {
          text: "OK",
          style: "cancel",
        },
      ]);
    }
  }
}
