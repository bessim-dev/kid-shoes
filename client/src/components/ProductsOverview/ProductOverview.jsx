import { CircularProgress, Snackbar } from "@material-ui/core";
import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ProductOverview({ data, loading, error }) {
  return (
    <div className="productOverviewContainer">
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Snackbar autoHideDuration={3000}>
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      ) : (
        data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
}

export default React.memo(ProductOverview);
