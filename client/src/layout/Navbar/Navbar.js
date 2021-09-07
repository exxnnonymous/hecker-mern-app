import React, { useState, useContext , useEffect} from "react";
import { Redirect, Link } from "react-router-dom";
import DropSetting from "../../components/DropSetting/DropSetting";
import { signout } from "../../Context/action/auth.action";
import ACTIONS from "../../Context/constants";
import { AuthContext } from "../../Context/context/authContext";
import { PostAddContext } from "../../Context/context/postContext";

function Navbar() {
  const { authenticate, dispatch, loading } = useContext(AuthContext);
  const { posting,deletedPost,dispatchPost } = useContext(PostAddContext);
  const [delNotice, setDelNotice]= useState(false)
  const [setting, setSetting] = useState(false);
  const [themeOpt, setThemeOpt] = useState(false);

  function handleTheme() {
    if (!themeOpt) {
      setThemeOpt(true);
    } else {
      setThemeOpt(false);
    }
  }

  function logout() {
    signout(dispatch);
  }

  useEffect(()=>{
    if(deletedPost){
      setDelNotice(true)
      setTimeout(() => {
        dispatchPost({type:ACTIONS.DEL_POST_OFF})
        setDelNotice(false)
      }, 1000);
    }
  },[deletedPost])

  if (!authenticate) {
    return <Redirect to="/login" />;
  }

  function htmlAndSetting(e) {
    const id = e.target.id;
    if (!setting && id === "dropsetting") {
      setSetting(false);
      document.onclick = null;
      document.onscroll = null;
    }
  }

  function toggleSetting() {
    if (setting) {
      document.onclick = null;
      document.onscroll = null;
      setSetting(false);
      setThemeOpt(false);
    } else if (!setting) {
      document.onclick = htmlAndSetting;
      document.onscroll = () => {
        if (!setting) {
          setSetting(false);
          document.onclick = null;
          document.onscroll = null;
        }
      };
      setSetting(true);
    }
  }

  return (
    <div className="navbar text-gray-800 bg-white py-3 border-b shadow-sm fixed w-full dark:bg-darkNav dark:border-darkNav z-40">
      {loading && (
        <div className="absolute top-2/4 left-2/4 dark:bg-white dark:bg-opacity-20 py-2 px-4 rounded-lg  dark:text-white transform -translate-y-1/2 -translate-x-1/2 transition-all duration-75">
          <p>Logging out ...</p>
        </div>
      )}
      {posting && (
        <div className="absolute top-2/4 left-2/4 dark:bg-white dark:bg-opacity-20 py-2 px-4 rounded-lg  dark:text-white transform -translate-y-1/2 -translate-x-1/2 transition-all duration-75 posting">
          <p>Posting ...</p>
        </div>
      )}
      {delNotice && (
        <div className="absolute top-2/4 left-2/4 dark:bg-white dark:bg-opacity-20 py-2 px-4 rounded-lg  dark:text-white transform -translate-y-1/2 -translate-x-1/2 transition-all duration-75 posting">
          <p>Successfully deleted post !</p>
        </div>
      )}
      <div className="container flex justify-between items-center dark:text-darkFont">
        <div className="text-4xl font-semibold font-raleway tracking-wide text-blue-600">
          <Link to="/">Hecker</Link>
        </div>
        <ul className="flex justify-between items-center gap-5">
          <li>
            <Link to="/" className="nav-item">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav-item">
              About
            </Link>
          </li>
          <li>
            <Link to="/friends" className="nav-item">
              Friends
            </Link>
          </li>
          <li className="flex items-center justify-center setting">
            <button
              className={
                setting
                  ? "dark:bg-blue-400  dark:hover:bg-opacity-20 bg-blue-200 hover:bg-opacity-80 dark:bg-opacity-10 p-2 rounded-full text-blue-600"
                  : "dark:bg-darkInputBg dark:hover:bg-darkFont dark:hover:bg-opacity-30 bg-gray-200 hover:bg-gray-300 p-2 rounded-full dark:text-white"
              }
              onClick={toggleSetting}
            >
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
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>

      <div className="overflow-y-auto">
        <DropSetting
          setting={setting}
          logout={logout}
          handleTheme={handleTheme}
          themeOpt={themeOpt}
        />
      </div>
    </div>
  );
}

export default Navbar;
