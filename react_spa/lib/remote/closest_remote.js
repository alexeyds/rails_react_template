import { createContext, useContext } from "react";

export let ClosestRemoteContext = createContext();
export let useClosestRemote = () => useContext(ClosestRemoteContext);
