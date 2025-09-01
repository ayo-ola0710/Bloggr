import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;
  
  return (
    <>
      {isAuthenticated ? (
        <Navigate to={"/"} />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-secondary/20">
          <Outlet />
        </div>
      )}
    </>
  );
};

export default AuthLayout;
