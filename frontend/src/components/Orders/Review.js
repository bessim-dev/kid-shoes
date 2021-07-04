import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { cartContext } from "../../context/cart/cart.context";
import { DeleteRounded, AddRounded, RemoveRounded } from "@material-ui/icons";
import { IconButton, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 2),
    background: "#d8dcf0",
    marginBottom: 15,
    borderRadius: 10,
    boxShadow: "1px 1px 9px 5px rgba(0,0,0,0.20)",
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function Review() {
  const { cart, CartTotal, addItemToCart, clearItemFromCart, RMItemFromCart } =
    useContext(cartContext);
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <Paper elevation={7} className={classes.paper}>
        <List>
          {cart.cartItems.map((product) => (
            <ListItem className={classes.listItem} key={product.id}>
              <ListItemText
                primary={product.name}
                secondary={product.price + " Dinar"}
              />
              <IconButton onClick={() => RMItemFromCart(product)}>
                <RemoveRounded color="secondary" />
              </IconButton>
              <Typography variant="body2">{product.quantity}</Typography>
              <IconButton onClick={() => addItemToCart(product)}>
                <AddRounded color="primary" />
              </IconButton>
              <IconButton onClick={() => clearItemFromCart(product)}>
                <DeleteRounded color="error" />
              </IconButton>
            </ListItem>
          ))}
          <ListItem className={classes.listItem}>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" className={classes.total}>
              ${CartTotal()}
            </Typography>
          </ListItem>
        </List>
      </Paper>
    </React.Fragment>
  );
}
