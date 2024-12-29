"use client";
import { createContext, useState } from "react";

export const globalContext = createContext();

const GlobalContext = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  return (
    <globalContext.Provider value={{ tasks, setTasks }}>
      {children}
    </globalContext.Provider>
  );
};

export default GlobalContext;
