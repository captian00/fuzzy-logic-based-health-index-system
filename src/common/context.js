import React, { useContext } from "react";

export const Context = React.createContext();
export const useMainContext = () => useContext(Context);
