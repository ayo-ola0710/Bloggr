import { Outlet, Navigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to={"/"} />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-secondary/20">
          <button className="border border-blue-500 rounded-full p-3 mt-2 ml-3">
            <Link to={"/"}>
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </button>
          <Outlet />
        </div>
      )}
    </>
  );
};

export default AuthLayout;
