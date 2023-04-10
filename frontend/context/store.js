import React, { Component, useState } from "react";

const GLOBAL_CONTEXT = React.createContext();

export const Provider = ({ children }) => {
  const [booking, setBooking] = useState({});
  return <GLOBAL_CONTEXT.Provider>{children}</GLOBAL_CONTEXT.Provider>;
};

export default GLOBAL_CONTEXT;
