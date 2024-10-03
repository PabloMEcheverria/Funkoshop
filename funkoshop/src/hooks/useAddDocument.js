import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../credentials.js";

const useAddDocument = (collectionName) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addDocument = async (data) => {
    setLoading(true);
    try {
      const docRef = await addDoc(collection(firestore, collectionName), data);
      setLoading(false);
      return docRef.id;
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };

  return { addDocument, loading, error };
};

export default useAddDocument;