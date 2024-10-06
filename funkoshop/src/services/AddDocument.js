import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { firestore } from "../credentials.js";

const addDocument = async (uid) => {
  try {
    await setDoc(doc(firestore, "users", uid), {role: "user"});
    console.log('User added to Firestore with role: user');
  } catch (error) {
    console.error('Error adding user to Firestore:', error);
  }
  
  //try {
  //  const docRef = await addDoc(collection(firestore, collectionName), {
  //    rol: "user"
  //  });
  //  console.log("Documento añadido con ID: ", docRef.id);
  //} catch (e) {
  //  console.error("Error añadiendo documento: ", e);
  //}
};

export default addDocument;