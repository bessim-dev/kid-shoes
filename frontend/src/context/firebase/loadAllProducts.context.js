import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase";

export const loadAllProductContext = React.createContext();

export const LoadAllProductContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const LoadAllProductData = async () => {
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
    LoadAllProductData();
  }, []);
  return (
    <loadAllProductContext.Provider
      value={{
        LoadAllProductData,
        data,
        loading,
        error,
      }}
    >
      {children}
    </loadAllProductContext.Provider>
  );
};
