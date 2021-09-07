import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../Context/context/authContext";
import { ModalContext } from "../../Context/context/ModalContext";

function PostForm() {
  const { showModalHandler } = useContext(ModalContext);

  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="pt-3 pb-2 px-5 w-full bg-white shadow-md mx-auto rounded-lg dark:bg-darkPost">
        <div className="mb-3">
          <div className="flex gap-2 items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
              <img
                src={user.profilePicture}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="bg-primary flex-auto text-gray-500 tracking-wide text-lg py-2 px-4 rounded-3xl hover:bg-gray-200  cursor-pointer dark:bg-darkInputBg dark:hover:bg-darkFont dark:hover:bg-opacity-30 dark:text-darkFont"
              onClick={showModalHandler}
            >
              <p>What's on your mind, {user.name.split(" ")[0]}?</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 border-t border-gray-200 pt-2 text-gray-600 dark:border-darkPost dark:text-darkFont">
          <div className=" hover:bg-gray-100 transition-all duration-200 flex justify-center items-center py-1 rounded-lg text-base font-medium gap-1 cursor-pointer dark:hover:bg-darkInputBg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <span>Video</span>
          </div>
          <div className=" hover:bg-gray-100 transition-all duration-200 flex justify-center items-center py-1 rounded-lg text-base font-medium gap-1 cursor-pointer dark:hover:bg-darkInputBg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Photo</span>
          </div>
          <div className=" hover:bg-gray-100 transition-all duration-200 flex justify-center items-center py-1 rounded-lg text-base font-medium gap-1 cursor-pointer dark:hover:bg-darkInputBg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-yellow-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Feeling</span>
          </div>
        </div>
      </div>
    );
  }
}

export default PostForm;
