import React, { Component, useEffect, useState } from "react";
import { auth, registerAuth } from "../utils";

const GLOBAL_CONTEXT = React.createContext();

export const Provider = ({ children }) => {
  const [booking, setBooking] = useState({
    from: null,
    to: null,
    mode: null,
    transport_id: null,
    _date: new Date(),
    _isReadToCheckOut: false,
  });

  const [user, setUser] = useState({ _isAuthenticated: false, name: "" });

  const checkout = async () => {
    if (booking._isReadToCheckOut) {
    }
  };
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const handleAuth = async () => {
    setIsAuthenticating(true);
    let res = await auth(user);
    console.log(res);
    if (res && res.token) {
      localStorage.setItem("token", res.token);
      setUser({
        ...user,
        _isAuthenticated: true,
        name: res.name,
      });
    }
    setIsAuthenticating(false);
  };

  // const registerUser = () => {};

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUser({
        ...user,
        _isAuthenticated: true,
      });
    }
  }, []);

  return (
    <GLOBAL_CONTEXT.Provider
      value={{
        isAuthenticating,
        setIsAuthenticating,
        handleAuth,
        booking,
        setBooking,
        user,
        setUser,
      }}
    >
      {children}
    </GLOBAL_CONTEXT.Provider>
  );
};

export default GLOBAL_CONTEXT;
