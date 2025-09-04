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

const initialState = {
  theme: "light",
  themeStyles: {
    light: {
      backgroundColor: "#f0f0f0",
      textColor: "#333",
    },
    dark: {
      backgroundColor: "#333",
      textColor: "#f0f0f0",
    },
  },
};

const reducer = (
  state: { theme: string; themeStyles: ThemeStyles },
  action: { type: string }
) => {
  switch (action.type) {
    case "TOGGLE_THEME":
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
        themeStyles: {
          ...state.themeStyles,
          light:
            state.theme === "light"
              ? state.themeStyles.dark
              : state.themeStyles.light,
          dark:
            state.theme === "light"
              ? state.themeStyles.light
              : state.themeStyles.dark,
        },
      };
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
