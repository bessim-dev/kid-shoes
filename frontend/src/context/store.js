import React from "react";
import { CartContextProvider } from "./cart/cart.context";
import { FirebaseContextProvider } from "./firebase/firebase.context";
import { ServerContextProvider } from "./services/SendDataToServer";

export default function Store({ children }) {
  return (
    <CartContextProvider>
      <FirebaseContextProvider>
        <ServerContextProvider>{children}</ServerContextProvider>
      </FirebaseContextProvider>
    </CartContextProvider>
  );
}
