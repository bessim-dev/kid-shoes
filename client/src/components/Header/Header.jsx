import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { Badge, Button, MenuItem } from "@material-ui/core";
import { withRouter } from "react-router";
import { ContactSupport, ShoppingBasket } from "@material-ui/icons";
import { ReactComponent as Logo } from "../../images/Shoe.svg";
import { cartContext } from "../../context/cart/cart.context";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  container: {
    flexGrow: 1,
    height: "7vh",
    justifyContent: "center",
  },
  logo: {
    height: 50,
    width: 80,
  },
  menuButton: {
    background: "transparent",
    marginRight: theme.spacing(2),
    border: "none",
    color: "blue",
  },
  root: {
    height: "7vh",
    cursor: "pointer",
  },
}));

const Header = ({ history }) => {
  const { getCartCount } = useContext(cartContext);
  const classes = useStyles();

  return (
    <>
      <AppBar position="static" className={classes.container}>
        <Toolbar>
          <MenuItem className={classes.root}>
            <button
              className={classes.menuButton}
              onClick={() => history.push("/")}
            >
              <Logo className={classes.logo} />
            </button>
          </MenuItem>
          <MenuItem className={classes.root}>
            <Typography className={classes.title} variant="h6" noWrap>
              <Button
                disableRipple
                color="inherit"
                onClick={() => history.push("/products")}
              >
                tous produit
              </Button>
            </Typography>
          </MenuItem>
          <div className={classes.grow} />
          <div style={{ display: "flex" }}>
            <MenuItem
              onClick={() =>
                getCartCount() > 0
                  ? history.push("/order")
                  : alert("order first")
              }
              color="inherit"
              className={classes.root}
            >
              <IconButton disableRipple color="inherit">
                <Badge badgeContent={getCartCount()} color="secondary">
                  <ShoppingBasket />
                </Badge>
              </IconButton>
              <p>Orders</p>
            </MenuItem>
            <MenuItem
              onClick={() => history.push("/contact")}
              color="inherit"
              className={classes.root}
            >
              <IconButton disableRipple color="inherit">
                <ContactSupport />
              </IconButton>
              <p>Contact</p>
            </MenuItem>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default withRouter(Header);
