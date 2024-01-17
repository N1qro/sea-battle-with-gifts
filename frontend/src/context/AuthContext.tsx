import { createContext } from "react";
import { UserSetter } from "../types/general";
  

export const AuthContext = createContext<UserSetter>({
    user: null,
    setUser: () => {},
})