import { useContext, createContext, useState } from "react";

const Authcontext = createContext(null);
const useAuth = () => useContext(Authcontext);

const AuthProvider = ({ children }) => {
  const [isLogin, setLogin] = useState(Boolean(localStorage.getItem("token")));
  return (
    <Authcontext.Provider value={{ isLogin, setLogin }}>{children}</Authcontext.Provider>
  );
};

export { useAuth, AuthProvider };
