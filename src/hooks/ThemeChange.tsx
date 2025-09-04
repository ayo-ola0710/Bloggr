import useTheme from "../hooks/useTheme";
import { Sun, Moon } from "lucide-react";

export const useThemeChange = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {theme === "light" ? <Sun /> : <Moon className="text-white" />}
    </button>
  );
};
