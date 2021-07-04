import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import ProductOverview from "../../components/ProductsOverview/ProductOverview";
import { firestore } from "../../firebase";

const Genre = () => {
  const match = useRouteMatch();
  const genre = match.params.genre;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    loadGenreData();
  }, [genre]);
  const loadGenreData = async (genre) => {
    try {
      setLoading(true);
      const collectionRef = await firestore
        .collection("products")
        .where("boy", "==", genre !== "fille")
        .get();
      const docsRef = await collectionRef.docs;
      const shoes = docsRef.map((doc) => ({ id: doc.id, ...doc.data() }));
      setData(shoes);
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

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

export default Genre;
