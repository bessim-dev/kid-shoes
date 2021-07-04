import React, { useState } from "react";

export const ServerContext = React.createContext();

export const ServerContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [notification, setNotification] = useState("");
  const submitOrder = async (e, body) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    setNotification(false);
    const res = await fetch("http://localhost:5000/submit-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const text = JSON.parse(await res.text());

    if (res.status >= 400 && res.status < 600) {
      setLoading(false);
      setError(text);
      setNotification(text);
    } else {
      setLoading(false);
      setSuccess(true);
      setNotification("votre vonte est validé, nous vous contacter bientôt");
    }
  };
  return (
    <ServerContext.Provider
      value={{
        submitOrder,
        loading,
        error,
        success,
        setSuccess,
        notification,
        setNotification,
      }}
    >
      {children}
    </ServerContext.Provider>
  );
};
