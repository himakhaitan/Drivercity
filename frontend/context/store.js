import React, { Component, useEffect, useState } from "react";

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

  const [user, setUser] = useState({});

  const checkout = async () => {
    if (booking._isReadToCheckOut) {
    }
  };

  const handleAuth = () => {};

  useEffect(() => {}, []);

  return (
    <GLOBAL_CONTEXT.Provider value={{ booking, setBooking, user, setUser }}>
      {children}
    </GLOBAL_CONTEXT.Provider>
  );
};

export default GLOBAL_CONTEXT;
