import ACTIONS from "../constants";

export const changeTheme = (dispatchTheme, mode) => {
  if (mode === "dark") {
    dispatchTheme({ type: ACTIONS.THEME_DARK });
    document.getElementsByTagName("html")[0].classList.add("dark");
    localStorage.setItem("theme-mode", "dark");
  } else if (mode === "light") {
    dispatchTheme({ type: ACTIONS.THEME_LIGHT });
    document.getElementsByTagName("html")[0].classList.remove("dark");
    localStorage.setItem("theme-mode", "light");
  }
};

export const localTheme = (dispatchTheme) => {
  let localTheme = localStorage.getItem("theme-mode");
  if (localTheme) {
    changeTheme(dispatchTheme, localTheme);
  } else {
    localStorage.setItem("theme-mode", "dark");
    changeTheme(dispatchTheme, "dark");
  }
};
