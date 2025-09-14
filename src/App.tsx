import { Route, Routes } from "react-router-dom";
import Signin from "./_auth/forms/Signin";
import Signup from "./_auth/forms/Signup";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_roots/RootLayout";
import ErrorPage from "./components/shared/ErrorPage";
import Landing from "./components/shared/Landing";
import { Explore, Home, Post, Profile, Saved, Users } from "./_roots/pages";
import { useThemeChange } from "./hooks/ThemeChange";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import { Toaster } from "./components/ui/sonner";
import { SavedPostsProvider } from "./context/SavedPostsContext";

const App = () => {
  const themeChanger = useThemeChange();

  return (
    <main>
      <SavedPostsProvider>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/" element={<Landing />} />

          <Route element={<AuthLayout />}>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route
            element={
              <ProtectedRoute>
                <RootLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="explore" element={<Explore />} />
            <Route path="post/:id" element={<Post />} />
            <Route path="profile" element={<Profile />} />
            <Route path="saved" element={<Saved />} />
            <Route path="all-users" element={<Users />} />
          </Route>
        </Routes>
      </SavedPostsProvider>
      <div className="right-10 bottom-3 fixed">{themeChanger}</div>
      <Toaster />
    </main>
  );
};

export default App;
