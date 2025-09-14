import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const useRequireAuth = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
};

export default useRequireAuth;
