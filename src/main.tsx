import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { PostProvider } from "./context/PostContext.tsx";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <AuthProvider>
      <PostProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PostProvider>
    </AuthProvider>
  </ThemeProvider>
);
