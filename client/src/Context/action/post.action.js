import axiosInstance from "../../Api/axios";
import ACTIONS from "../constants";

export const addPost = async (
  dispatch,
  post,
  postImg,
  imageName,
  { user, token }
) => {
  dispatch({ type: ACTIONS.POST_ADD_REQUEST });
  const id = user._id;
  let config = {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: token ? `Bearer ${token}` : "",
    },
  };
  try {
    let formdata = new FormData();
    formdata.append("post", post);
    if(postImg){
      const blob = await fetch(postImg).then((res) => res.blob());
      formdata.append("postPic", blob, imageName);
    }
    const request = await axiosInstance.post(
      `/post/create/${id}`,
      formdata,
      config
    );
    if (request.status === 200) {
      dispatch({ type: ACTIONS.POST_ADD_SUCCESS, payload: post });
    }
  } catch (err) {
    dispatch({ type: ACTIONS.POST_ADD_FAILURE });
  }
};

export const likePostAction = async (id, type, token) => {
  let config = {
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  };

  try {
    await axiosInstance.post(`/post/like/${id}`, type, config);
  } catch (err) {
    console.log();
  }
};



export const deletePost = async(dispatchPost, delPostId, token) =>{
  dispatchPost({ type: ACTIONS.DEL_POST_REQ });
  let config = {
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  };
  try {
    await axiosInstance.delete(`/post/delete/${delPostId}`, config);
    dispatchPost({ type: ACTIONS.DEL_POST_SUCC });
  } catch (err) {
    dispatchPost({ type: ACTIONS.DEL_POST_FAIL });
    console.log();
  }
}

