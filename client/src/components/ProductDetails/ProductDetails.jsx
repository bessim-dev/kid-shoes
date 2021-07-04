import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../context/cart/cart.context";
import { firestore } from "../../firebase";
import Slider from "../Slider/Slider";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const ProductDetails = ({ product, handleCloseModal }) => {
  const { addItemToCart } = useContext(cartContext);

  const classes = useStyles();
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("product-pics");
    return savedData ? JSON.parse(savedData) : [];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const chousedProduct = {
    color,
    size,
    id: product.id,
    name: product.name,
    price: product.price,
  };

  const LoadProductImages = async (product, data) => {
    if (data.length > 0) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const collectionRef = await firestore
        .collection("products")
        .doc(product.id)
        .collection("images")
        .get();
      const docsRef = await collectionRef.docs;
      const shoes = docsRef.map((doc) => doc.data());
      setData(shoes);
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    LoadProductImages(product, data);
    localStorage.setItem("product-pics", JSON.stringify(data));
  }, [product, data]);
  if (error) {
    alert(error);
  }
  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <Paper elevation={2} variant="outlined" className="ProductDetails">
          <h3 className="product-title">{product.name}</h3>
          <Slider images={data[0].images} />
          <div className="options">
            <FormControl className={classes.formControl}>
              <InputLabel id="color-select-label">coleur</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={color}
                onChange={(event) => setColor(event.target.value)}
              >
                {product.colors.map((c) => (
                  <MenuItem value={c}>{c}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="pointure-select-label">pointures</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={size}
                onChange={(event) => setSize(event.target.value)}
              >
                {product.sizes.map((c) => (
                  <MenuItem value={c}>{c}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <Button
            size="medium"
            color="primary"
            variant="contained"
            fullWidth
            onClick={() => {
              addItemToCart({ ...chousedProduct });
              handleCloseModal(false);
            }}
          >
            Commander!
          </Button>
        </Paper>
      )}
    </div>
  );
};

export default ProductDetails;
