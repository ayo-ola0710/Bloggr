import { Route, Routes } from "react-router-dom";
import Signin from "./_auth/forms/Signin";
import Signup from "./_auth/forms/Signup";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_roots/RootLayout";
import { Explore, Home, Post, Profile, Saved, Users } from "./_roots/pages";

const App = () => {
  return (
    <main>
      <Routes>
        <Route path="*" element={<div>404</div>} />

        <Route element={<AuthLayout />}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/post" element={<Post />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Saved" element={<Saved />} />
          <Route path="/all-users" element={<Users />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
