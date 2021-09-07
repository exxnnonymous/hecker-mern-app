import { useState } from "react";
import { createContext } from "react";

export const ModalContext = createContext({
  modalHandler: () => {},
});

export const ModalContextProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const showModalHandler = () => {
    if (!showModal) setShowModal(true);
    document.body.style.overflowY = "hidden";
  };
  const hideModalHandler = () => {
    if (showModal) setShowModal(false);
    document.body.style.overflowY = "scroll";
  };
  const showDeleteHandler = () => {
    if (!showDelete) setShowDelete(true);
    document.body.style.overflowY = "hidden";
  };
  const hideDeleteHandler = () => {
    if (showDelete) setShowDelete(false);
    document.body.style.overflowY = "scroll";
  };

  return (
    <ModalContext.Provider
      value={{ showModalHandler, showModal, hideModalHandler, showDelete,showDeleteHandler,hideDeleteHandler  }}
    >
      {children}
    </ModalContext.Provider>
  );
};
