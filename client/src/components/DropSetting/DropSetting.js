import React, { useContext } from "react";
import { AuthContext } from "../../Context/context/authContext";
import ThemeChange from "../ThemeChange/ThemeChange";

function DropSetting({ setting, logout, handleTheme, themeOpt }) {
  const { user } = useContext(AuthContext);

  return (
    <div
      className={
        setting
          ? "absolute right-0 z-50 w-full flex justify-end items-start pr-4"
          : "hidden"
      }
      id="dropsetting"
    >
      <div style={{ width: "400px" }}>
        <div className="dark:bg-darkPost dark:text-white bg-white w-full h-full p-2 border rounded-lg dark:border-darkPost shadow-lg  ">
          {themeOpt ? (
            <ThemeChange handleTheme={handleTheme} />
          ) : (
            <ul>
              <li className="mb-2 pb-2 border-b dark:border-darkPost">
                <div className="flex items-center gap-3 dark:hover:bg-darkListBg hover:bg-primary  cursor-pointer p-2 rounded-md ">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-200">
                    <img
                      src={user.profilePicture}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">{user.name}</div>
                    <div className="dark:text-darkFont tracking-tight">
                      See your profile
                    </div>
                  </div>
                </div>
              </li>
              <li className="mb-1 pb-2 border-b dark:border-darkPost">
                <div className="flex items-center gap-4 dark:hover:bg-darkListBg hover:bg-primary   cursor-pointer py-1 px-2 rounded-md">
                  <div className="dark:bg-iconBg bg-icon  p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="">
                    <div className="text-base font-medium"> Give Feedback</div>
                    <div className="dark:text-darkFont text-sm">
                      Help us improve the new app
                    </div>
                  </div>
                </div>
              </li>
              <li className="mb-1">
                <div className="drop-setting-list">
                  <div className="dark:bg-iconBg bg-icon   p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="font-medium">Setting and Privacy</div>
                </div>
              </li>
              <li className="mb-1">
                <div className="drop-setting-list">
                  <div className="dark:bg-iconBg bg-icon  p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="font-medium">Help and Support</div>
                </div>
              </li>
              <li className="mb-1">
                <div className="drop-setting-list" onClick={handleTheme}>
                  <div className="dark:bg-iconBg bg-icon  p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  </div>
                  <div className="font-medium">Display</div>
                </div>
              </li>
              <li className="">
                <div className="drop-setting-list" onClick={logout}>
                  <div className="dark:bg-iconBg bg-icon   p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </div>
                  <div className="font-medium">Log Out</div>
                </div>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default DropSetting;
