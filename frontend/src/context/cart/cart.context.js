import React, { useState } from "react";

export const cartContext = React.createContext();

export const CartContextProvider = ({ children }) => {
  const initialState = {
    cartItems: [],
    cartCount: 0,
  };

  const [cart, setCart] = useState(initialState);
  const addItemToCart = (cartItemToAdd) => {
    let newCartItems = [];
    const cartItems = cart.cartItems;
    const cartItemExists = cartItems.find(
      (cartItem) => cartItem.id === cartItemToAdd.id
    );
    if (cartItemExists) {
      newCartItems = cartItems.map((cartItem) =>
        cartItem.id === cartItemToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      newCartItems = [...cartItems, { ...cartItemToAdd, quantity: 1 }];
    }
    return setCart({
      ...cart,
      cartItems: newCartItems,
    });
  };

  const RMItemFromCart = (cartItemToRm) => {
    const cartItems = cart.cartItems;
    let newCartItems = [];

    const cartItemExists = cartItems.find(
      (cartItem) => cartItem.id === cartItemToRm.id
    );
    if (cartItemExists.quantity === 1) {
      newCartItems = cartItems.filter((cartItem) => cartItemToRm !== cartItem);
    } else {
      newCartItems = cartItems.map((cartItem) =>
        cartItem.id === cartItemToRm.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity - 1,
            }
          : cartItem
      );
    }
    return setCart({
      ...cart,
      cartItems: newCartItems,
    });
  };

  const clearItemFromCart = (cartItemToRm) => {
    const newCartItems = cart.cartItems.filter(
      (cartItem) => cartItem.id !== cartItemToRm.id
    );
    setCart({
      ...cart,
      cartItems: newCartItems,
    });
  };
  const CartTotal = () =>
    cart.cartItems.reduce(
      (acc, cartItem) => acc + cartItem.quantity * cartItem.price,
      0
    );
  const getCartCount = () =>
    cart.cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const clearCart = () => setCart(initialState);
  return (
    <cartContext.Provider
      value={{
        cart,
        addItemToCart,
        CartTotal,
        clearItemFromCart,
        RMItemFromCart,
        getCartCount,
        clearCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};
