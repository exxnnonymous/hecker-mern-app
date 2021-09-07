import React, { useState, useRef, useContext } from "react";
import { ModalContext } from "../../Context/context/ModalContext";
import { AuthContext } from "../../Context/context/authContext";
import { addPost } from "../../Context/action/post.action";
import { PostAddContext } from "../../Context/context/postContext";

function Modal() {
  
  const { showModal, hideModalHandler } = useContext(ModalContext);

  const [postDisable, setPostDisable] = useState(true);
  const { user, token } = useContext(AuthContext);
  const { dispatchPost } = useContext(PostAddContext);
  const [smallTextArea, setSmallTextArea] = useState(false);
  const [imageName, setImageName] = useState(null);
  const [postImg, setPostImg] = useState(null);
  const postRef = useRef();

  

  function handleSubmit() {
    let post = postRef.current.value;
    addPost(dispatchPost, post, postImg, imageName, { user, token });
    postRef.current.value = "";
    setPostImg(null);
    setImageName(null);
    document.querySelector("#post-image").value = null
    hideModalHandler();
  }
  function handlePost() {
    if (postRef.current.value || postImg) {
      if (postRef.current.value.length > 0 || postImg) {
        setPostDisable(false);
      } else {
        setPostDisable(true);
      }

      if (postRef.current.value.length > 80) {
        setSmallTextArea(true);
      } else {
        setSmallTextArea(false);
      }
    } else {
      setPostDisable(true);
    }
  }

  function imageHandler(e) {
    const imageReader = new FileReader();
    imageReader.onload = () => {
      if (imageReader.readyState === 2) {
        setPostImg(imageReader.result);
        setPostDisable(false);
      }
    };
    if (e.target.files[0]) {
      imageReader.readAsDataURL(e.target.files[0]);
      setImageName(e.target.files[0].name);
    }

  }

  function auto_grow(e) {
    e.target.style.height = "5px";
    e.target.style.height = e.target.scrollHeight + "px";
  }

  const imageAreaStyle =
    "focus:outline-none image-text-area-style text-base  dark:text-white  dark:bg-darkModal mb-2";
  const defaultTextArea =
    "focus:outline-none text-area-style text-2xl  dark:text-white  dark:bg-darkModal ";
  const smallerTextArea =
    " focus:outline-none text-area-style text-base dark:text-white dark:bg-darkModal";

  if (!user) {
    return <div>Loading...</div>;
  } else {
    return (
      <div
        className={
          showModal
            ? "modalParent bg-white min-h-screen w-full bg-opacity-60  pt-14 pb-10 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center overflow-y-auto flex-wrap dark:bg-black dark:bg-opacity-60 z-50"
            : "hidden"
        }
        onClick={(e) => {
          if (e.target.parentNode.id === "app") {
            hideModalHandler();
          }
        }}
      >
        <div className="bg-white rounded-xl modal w-3/5  max-w-lg dark:bg-darkModal">
          <div className="">
            <div className="border-b border-gray-200 py-4 text-center text-xl font-bold relative dark:text-white dark:border-darkPost">
              Create Post
              <div
                className="absolute right-4 bg-gray-200 hover:bg-gray-300 text-gray-500 text-3xl top-2/4 transform -translate-y-1/2 px-1 rounded-full h-9 w-9 cursor-pointer leading-8 dark:bg-darkInputBg dark:hover:bg-white dark:hover:bg-opacity-20 dark:text-darkModalFont"
                onClick={hideModalHandler}
              >
                <span>&times;</span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center mb-2 gap-3 dark:text-darkModalFont">
                <div className="w-10 h-10 rounded-full overflow-hidden ">
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="font-medium">{user.name}</div>
              </div>

              <div className="overflow-y-auto my-4 pb-2 pr-2 max-h-72">
                <div className={smallerTextArea ? "" : "pb-4 mb-2"}>
                  <textarea
                    className={
                      postImg
                        ? imageAreaStyle
                        : smallTextArea
                        ? smallerTextArea
                        : defaultTextArea
                    }
                    ref={postRef}
                    onChange={handlePost}
                    placeholder={
                      "What's on your mind, " + user.name.split(" ")[0] + "?"
                    }
                    onInput={auto_grow}
                  ></textarea>
                </div>

                {postImg && (
                  <div className=" h-40 w-full  relative select-none">
                    <div className="w-full h-auto">
                      <img
                        src={postImg}
                        alt="imagepreview"
                        className="w-full h-full post-prev-img rounded-lg border border-gray-200"
                      />
                    </div>
                    <div
                      className="absolute right-3 border border-gray-200 hover:bg-gray-100 dark:hover:b text-gray-500 text-3xl top-3  px-1 rounded-full h-9 w-9 cursor-pointer leading-7 dark:bg-darkInputBg text-center dark:hover:bg-opacity-90 dark:text-darkModalFont"
                      onClick={() => {
                        setPostImg(null);
                        document.querySelector("#post-image").value = null
                        if (postRef.current.value.length > 0) {
                          setPostDisable(false);
                        } else {
                          setPostDisable(true);
                        }
                      }}
                    >
                      <span>&times;</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="border border-gray-300 rounded-lg mb-3 flex align-center py-2 px-5 dark:text-darkModalFont dark:border-darkPost">
                <div className="w-full flex items-center justify-between">
                  <div className="">
                    <p className="font-semibold">Add to your post</p>
                  </div>
                  <div>
                    <div className="cursor-pointer hover:bg-gray-100 transition-all duration-200 p-1 rounded-full dark:hover:bg-opacity-10">
                      <input
                        type="file"
                        id="post-image"
                        // value={imageVal}
                        accept="image/*"
                        className="hidden"
                        onChange={imageHandler}
                      />
                      <label htmlFor="post-image" className="cursor-pointer">
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
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <button
                  className="w-full border-0 bg-blue-600 hover:bg-blue-700 focus:border focus:outline-white transition-all duration-100 text-white font-semibold text-md text-center py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed "
                  onClick={handleSubmit}
                  disabled={postDisable}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
