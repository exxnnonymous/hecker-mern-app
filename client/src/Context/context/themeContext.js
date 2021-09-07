import { createContext, useReducer } from "react";
import ThemeReducer from "../reducer/theme.Reducer";

const initState = {
  themePref: "dark",
};

export const ThemeContext = createContext(initState);

export const ThemeProvider = ({ children }) => {
  const [state, dispatchTheme] = useReducer(ThemeReducer, initState);

  return (
    <ThemeContext.Provider
      value={{ themePref: state.themePref, dispatchTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
