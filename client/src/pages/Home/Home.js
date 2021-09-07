import React, { useEffect } from "react";
import Modal from "../../components/Modal/Modal";
import Navbar from "../../layout/Navbar/Navbar";
import Main from "../../layout/Main/Main";
import { useContext } from "react";
import { AuthContext } from "../../Context/context/authContext";
import { localTheme } from "../../Context/action/theme.action";
import { ThemeContext } from "../../Context/context/themeContext";
import DeletePost from "../../components/DeletePost/DeletePost";

function Home() {
  document.title = "Hecker"
  const { authenticate } = useContext(AuthContext);
  const { dispatchTheme } = useContext(ThemeContext);

  useEffect(() => {
    localTheme(dispatchTheme);
  }, [dispatchTheme]);

  if (!authenticate) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Navbar />
      <Main />
      <Modal />
      <DeletePost />
    </>
  );
}

export default Home;
