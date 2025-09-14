import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.tsx";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export default useAuth;
