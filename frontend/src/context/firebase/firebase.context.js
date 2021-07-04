import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase";

export const firebaseContext = React.createContext();

export const FirebaseContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getDataFromFirebase = async () => {
    try {
      setLoading(true);
      const collectionRef = await firestore.collection("products").get();
      const docsRef = await collectionRef.docs;
      const shoes = docsRef.map((doc) => ({ id: doc.id, ...doc.data() }));
      setData(shoes);
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getDataFromFirebase();
  }, []);
  return (
    <firebaseContext.Provider
      value={{
        getDataFromFirebase,
        data,
        loading,
        error,
      }}
    >
      {children}
    </firebaseContext.Provider>
  );
};
