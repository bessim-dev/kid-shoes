import React, { useEffect, useState } from "react";
import ProductOverview from "../../components/ProductsOverview/ProductOverview";
import { firestore } from "../../firebase";

const AllProducts = () => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("all-products");
    return savedData ? JSON.parse(savedData) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const LoadAllProductData = async (data) => {
    if (data.length > 0) {
      return;
    }
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
    LoadAllProductData(data);
    localStorage.setItem("all-products", JSON.stringify(data));
  }, [data]);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <ProductOverview data={data} loading={loading} error={error} />
    </div>
  );
};
export default AllProducts;
