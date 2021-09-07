import React, { useContext } from "react";
import { deletePost } from "../../Context/action/post.action";
import { AuthContext } from "../../Context/context/authContext";
import { ModalContext } from "../../Context/context/ModalContext";
import { PostAddContext } from "../../Context/context/postContext";

function DeletePost() {
  const { showDelete, hideDeleteHandler } = useContext(ModalContext);
  const {dispatchPost, delPostId} = useContext(PostAddContext)
  const {token} = useContext(AuthContext)

  function delPostHandler(){
    deletePost(dispatchPost, delPostId, token)
    hideDeleteHandler()
  }
  return (
    <div
      className={
        showDelete
          ? "modalParent bg-white min-h-screen h-full w-screen bg-opacity-60  pt-14 pb-10 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center overflow-y-auto flex-wrap dark:bg-black dark:bg-opacity-60 z-50"
          : "hidden"
      }
      onClick={(e) => {
        if (e.target.parentNode.id === "app") {
          hideDeleteHandler();
        }
      }}
    >
      <div className="bg-white rounded-xl modal w-3/5  max-w-lg dark:bg-darkModal pb-4">
        <div className="pt-4 mb-8 text-center text-xl font-bold relative dark:text-white dark:border-darkPost">
          Confirm Delete
        </div>
        
        <div className="flex justify-center items-center w-full">
            <div className="w-1/2 flex justify-center items-center">
            <div className="cursor-pointer rounded-lg text-red-600  hover:bg-red-100 transition-all duration-200 py-1 flex items-center justify-center gap-2 dark:text-red-600 font-semibold dark:hover:bg-red-300 dark:hover:bg-opacity-10 w-1/2" onClick={delPostHandler}>
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>{" "}
                <span>Delete</span>{" "}
              </div>
            </div>
            <div className="w-1/2 flex justify-center items-center">
                <p  onClick={hideDeleteHandler} className="cursor-pointer rounded-lg text-gray-600  bg-gray-100 hover:bg-gray-200 dark:hover:bg-black dark:hover:bg-opacity-10 dark:bg-darkInputBg transition-all duration-200 py-1 flex items-center justify-center gap-2 dark:text-white font-semibold  w-1/2">Cancel</p>
                </div>
        </div>
      </div>
    </div>
  );
}

export default DeletePost;
