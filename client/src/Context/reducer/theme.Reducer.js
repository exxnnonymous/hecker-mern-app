import ACTIONS from "../constants";

const initState = {
  themePref: "dark",
};

const ThemeReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTIONS.THEME_DARK:
      return {
        ...state,
        themePref: "dark",
      };
    case ACTIONS.THEME_LIGHT:
      return {
        ...state,
        themePref: "light",
      };
    default:
      return state;
  }
};

export default ThemeReducer;
