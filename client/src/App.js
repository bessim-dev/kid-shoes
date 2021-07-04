import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { ServerContext } from "./context/services/SendDataToServer";
import AllProducts from "./pages/AllProducts/AllProducts";
import Genre from "./pages/Genre/Genre";
import Home from "./pages/Home/Home";
import Order from "./pages/Order/Order";
const App = () => {
  const { error, notification, setNotification } = useContext(ServerContext);
  useEffect(
    () =>
      notification.length > 0
        ? setTimeout(() => {
            setNotification("");
          }, 5000)
        : null,
    [notification, setNotification]
  );
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/genres/:genre">
          <Genre />
        </Route>
        <Route path="/order">
          <Order />
        </Route>
        <Route path="/products">
          <AllProducts />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
      <Footer />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={notification.length > 0}
        autoHideDuration={6000}
      >
        <Alert severity={error ? "error" : "success"}>{notification}</Alert>
      </Snackbar>
    </Router>
  );
};

export default App;
