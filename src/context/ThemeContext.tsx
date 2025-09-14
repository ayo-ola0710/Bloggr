import { createContext, useReducer, type ReactNode } from "react";

interface ThemeContextValue {
  theme: string;
  themeStyles: ThemeStyles;
  toggleTheme: () => void;
}

interface ThemeStyles {
  light: {
    backgroundColor: string;
    textColor: string;
  };
  dark: {
    backgroundColor: string;
    textColor: string;
  };
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

// Get theme from localStorage or default to light
const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  }
  return 'light';
};

const initialState = {
  theme: getInitialTheme(),
  themeStyles: {
    light: {
      backgroundColor: "#f0f0f0",
      textColor: "#333",
    },
    dark: {
      backgroundColor: "#1a1a1a",
      textColor: "#f0f0f0",
    },
  },
};

const reducer = (
  state: { theme: string; themeStyles: ThemeStyles },
  action: { type: string }
) => {
  switch (action.type) {
    case "TOGGLE_THEME": {
      const newTheme = state.theme === "light" ? "dark" : "light";
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme);
      }
      return {
        ...state,
        theme: newTheme
      };
    }
    default:
      return state;
  }
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleTheme = () => {
    dispatch({ type: "TOGGLE_THEME" });
  };
  return (
    <ThemeContext.Provider
      value={{
        theme: state.theme,
        themeStyles: state.themeStyles,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext };
