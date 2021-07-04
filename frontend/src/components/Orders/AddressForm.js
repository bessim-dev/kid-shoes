import React, { useContext, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { cartContext } from "../../context/cart/cart.context";
import { ServerContext } from "../../context/services/SendDataToServer";

export default function AddressForm() {
  const { cart, CartTotal } = useContext(cartContext);
  const { submitOrder } = useContext(ServerContext);

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const body = {
    cart: {
      cart: cart.cartItems,
      CartTotal: CartTotal(),
    },
    person: {
      name,
      lastName,
      email,
      address,
      city,
      state,
      zip,
      phoneNumber,
    },
  };
  return (
    <form onSubmit={(e) => submitOrder(e, body)}>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            autoComplete="shipping address"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
            autoComplete="shipping address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            value={state}
            onChange={(e) => setState(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            fullWidth
            autoComplete="shipping postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phoneNumber"
            name="phoneNumber"
            label="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
            autoComplete="phone"
          />
        </Grid>
        <button type="submit" id="submitbut" style={{ display: "none" }} />
      </Grid>
    </form>
  );
}
