import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Modal } from "@material-ui/core";
import ProductDetails from "../ProductDetails/ProductDetails";
const useStyles = makeStyles({
  root: {
    maxWidth: 250,

    boxShadow: "7px 3px 20px 1px rgba(0,0,0,0.6)",
    margin: 10,
  },
  center: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  centerH: {
    display: "flex",
    width: "60%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  media: {
    objectFit: "cover",
  },
  title: {
    fontFamily: "Cairo",
    fontWeight: "bolder",
    color: "#202225",
  },
  price: {
    fontFamily: "Cairo",
    fontWeight: "bold",
    fontSize: 20,
    color: "#34383f",
  },
  options: {
    height: 40,
    maxWidth: 280,
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 5,
    fontFamily: "Cairo",
    fontSize: 17,
    color: "#202225",
    overflowY: "hidden",
    overflowX: "auto",
  },
  option: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    border: "1px solid #7f8db0",
    margin: 5,
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const ProductCard = ({ product }) => {
  const { name, price, imageUrl, colors, sizes } = product;
  const classes = useStyles();
  //modal
  const [modalOpen, setModalOpen] = useState(false);

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        component="img"
        alt="shoes mamo"
        height="220"
        image={imageUrl}
        title="shoes mamo"
        className={classes.media}
      />
      <CardContent className={classes.center}>
        <Typography
          gutterBottom
          component="h2"
          variant="h5"
          className={classes.title}
        >
          {name.toUpperCase()}
        </Typography>
        <Typography
          variant="body1"
          color="textPrimary"
          component="p"
          className={classes.price}
        >
          {price} TND
        </Typography>
      </CardContent>
      <div className={classes.options}>
        sizes :{" "}
        {sizes.map((size) => (
          <span className={classes.option}>{size}</span>
        ))}
      </div>
      <div className={classes.options}>
        coleurs :{" "}
        {colors.map((color) => (
          <span className={classes.option} style={{ background: color }}></span>
        ))}
      </div>

      <CardActions className={classes.center}>
        <Button
          size="medium"
          color="primary"
          variant="contained"
          fullWidth
          onClick={() => setModalOpen(true)}
        >
          Voir Details
        </Button>
        <Modal
          open={modalOpen}
          onClose={handleClose}
          aria-labelledby="product-details"
          aria-describedby="product-details-description"
        >
          <ProductDetails product={product} handleCloseModal={handleClose} />
        </Modal>
      </CardActions>
    </Card>
  );
};
export default ProductCard;
