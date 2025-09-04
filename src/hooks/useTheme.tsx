import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.tsx";

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return { theme: context.theme, toggleTheme: context.toggleTheme };
};

export default useTheme;
