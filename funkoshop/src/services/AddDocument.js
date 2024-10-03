import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../credentials.js";

const addDocument = async (collectionName) => {
  try {
    const docRef = await addDoc(collection(firestore, collectionName), {
      rol: "user"
    });
    console.log("Documento añadido con ID: ", docRef.id);
  } catch (e) {
    console.error("Error añadiendo documento: ", e);
  }
};

export default addDocument;