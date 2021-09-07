import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { likePostAction } from "../../Context/action/post.action";
import ACTIONS from "../../Context/constants";
import { AuthContext } from "../../Context/context/authContext";
import { ModalContext } from "../../Context/context/ModalContext";
import { PostAddContext } from "../../Context/context/postContext";

function Post({ post, userInfo }) {
  const [likePost, setLike] = useState(false);
  const { token, user } = useContext(AuthContext);
  const { showDeleteHandler } = useContext(ModalContext);
  const {dispatchPost} = useContext(PostAddContext)

  function handleLike(id) {
    if (likePost) {
      likePostAction(id, { type: -1 }, token);
      setLike(false);
    } else {
      likePostAction(id, { type: 1 }, token);
      setLike(true);
    }
  }

  function likePostComponent() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
      </svg>
    );
  }

  return (
    <div className="flex items-start mb-4">
      <div className="pt-3 pb-1  border border-gray-200 rounded-lg bg-white w-full dark:bg-darkPost dark:text-white dark:border-transparent shadow-md">
        <div className="mb-2">
          <div className="flex px-5 gap-2 items-center mb-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img
                src={userInfo.profilePicture}
                alt={userInfo.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-md font-medium mb-2">{userInfo.name}</div>
          </div>
          {post.post && <div className="px-5">{post.post}</div>}
          {post.postPic && (
            <div className="mt-2">
              <div className="w-full">
                <img
                  src={post.postPic}
                  alt={post._id}
                  className="w-full h-full post-image-class object-cover"
                />
              </div>
            </div>
          )}
        </div>
        <div className="px-5">
          <div className="border-t select-none border-gray-200 flex justify-between items-center pt-1 px-10 w-full dark:border-darkPost">
            <div
              className={
                likePost
                  ? "text-blue-600 font-medium cursor-pointer w-3/5 rounded-sm  hover:bg-blue-100 transition-all duration-200 py-1 flex items-center justify-center gap-2 dark:hover:bg-blue-300 dark:hover:bg-opacity-10"
                  : "text-gray-600 cursor-pointer w-3/5 rounded-sm  hover:bg-blue-100 transition-all duration-200 py-1 flex items-center justify-center gap-2 dark:text-darkFont dark:hover:bg-blue-300 dark:hover:bg-opacity-10"
              }
              onClick={() => {
                handleLike(post._id);
              }}
            >
              {likePost ? (
                likePostComponent()
              ) : (
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
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
              )}
              <span>Like</span>
            </div>
            <div className="cursor-pointer w-3/5 rounded-sm text-gray-600  hover:bg-gray-100 transition-all duration-200 py-1 flex items-center justify-center gap-2 dark:text-darkFont dark:hover:bg-darkInputBg">
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
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <span>Comment</span>
            </div>
            {userInfo._id === user._id && (
              <div className="cursor-pointer w-3/5 rounded-sm text-red-600  hover:bg-red-100 transition-all duration-200 py-1 flex items-center justify-center gap-2 dark:text-red-600 font-semibold dark:hover:bg-red-300 dark:hover:bg-opacity-10"
              onClick={()=>{showDeleteHandler()
                dispatchPost({type: ACTIONS.DEL_POST_ID, payload:post._id})
              }}>
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
