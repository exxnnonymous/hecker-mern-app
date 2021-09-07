import React, { useEffect } from "react";
import { useState } from "react";
import Post from "../../components/Post/Post";
import axios from "../../Api/axios";
import { useContext } from "react";
import { AuthContext } from "../../Context/context/authContext";
import { PostAddContext } from "../../Context/context/postContext";

function PostContainer() {
  const [posts, setPosts] = useState(null);
  const [fetchingPost, setFetchingPost] = useState(true);
  const [postErr, setPostErr] = useState(null);
  const { token, authenticate } = useContext(AuthContext);
  const { postAdded,deletedPost } = useContext(PostAddContext);

  useEffect(() => {
    async function fetchPost() {
      setFetchingPost(true);
      let config = {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      };

      try {
        const request = await axios.get("/post/find", config);
        setFetchingPost(false);
        setPosts(request.data.reverse());
      } catch (err) {
        setFetchingPost(false);
        if (err.response) {
          setPostErr(err.response.data.message);
        } else if (err.message) {
          setPostErr(err.message);
        }
      }
    }
    if (authenticate) {
      fetchPost();
    }
  }, [authenticate, token, postAdded,deletedPost]);

  if (fetchingPost) {
    return (
      <div className="w-full flex justify-center items-center text-2xl">
        <i className="fas fa-spinner text-blue-600 animate-spin"></i>
      </div>
    );
  }

  if (postErr) {
    return (
      <div className="w-full flex justify-center items-center text-2xl">
        <p className="text-red-600">
          {postErr}{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline-block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </p>
      </div>
    );
  }

  return (
    posts && (
      <div>
        <div className="w-full">
          {posts.map((post) => (
            <Post key={post._id} post={post} userInfo={post.user} />
          ))}
        </div>
      </div>
    )
  );
}

export default PostContainer;
