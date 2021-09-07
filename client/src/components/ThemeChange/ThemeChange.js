import React, { useContext, useEffect, useState } from "react";
import { changeTheme } from "../../Context/action/theme.action";
import { ThemeContext } from "../../Context/context/themeContext";

function ThemeChange({ handleTheme }) {
  const { themePref, dispatchTheme } = useContext(ThemeContext);
  const [lightChecked, setLightChecked] = useState(false);
  const [darkChecked, setDarkChecked] = useState(false);

  useEffect(() => {
    if (themePref === "light") {
      setLightChecked(true);
    } else {
      setDarkChecked(true);
    }
  }, []);

  function handleDarkRadio() {
    if (!darkChecked) {
      setLightChecked(false);
      setDarkChecked(true);
      changeTheme(dispatchTheme, "dark");
    }
  }

  function handleLightRadio() {
    if (!lightChecked) {
      setDarkChecked(false);
      setLightChecked(true);
      changeTheme(dispatchTheme, "light");
    }
  }

  return (
    <div className="px-3 pb-2 text-black dark:text-white">
      <div>
        <div className="flex items-center gap-2">
          <div
            className="dark:hover:bg-iconBg p-2  hover:bg-gray-200 cursor-pointer rounded-full"
            onClick={handleTheme}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </div>
          <div className="text-2xl font-semibold">Display & accessibility</div>
        </div>
        <div className="flex mt-4 items-start gap-2">
          <div className="rounded-full p-1 dark:bg-iconBg bg-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </div>
          <div>
            <div className="font-medium">Dark Mode</div>
            <div>
              <p className="tracking-tight text-base leading-5 dark:text-darkFont text-gray-500">
                Adjust the appearance of book to reduce glare and give your eyes
                a break.
              </p>
            </div>
            <div className="mt-2">
              <div className="radio-container">
                <div
                  className="mb-2 relative dark:hover:bg-darkListBg hover:bg-primary cursor-pointer py-2 px-5 rounded-md"
                  onClick={() => {
                    handleLightRadio();
                  }}
                >
                  <label
                    htmlFor="light"
                    className={lightChecked ? "active" : ""}
                  >
                    Off
                  </label>
                </div>
                <div
                  className=" relative dark:hover:bg-darkListBg hover:bg-primary cursor-pointer py-2 px-5 rounded-md"
                  onClick={() => {
                    handleDarkRadio();
                  }}
                >
                  <label htmlFor="dark" className={darkChecked ? "active" : ""}>
                    On
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThemeChange;
