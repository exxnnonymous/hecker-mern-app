import { useReducer } from "react";
import { createContext } from "react";
import PostReducer from "../reducer/post.reducer";

const initState = {
  post: null,
  posting: false,
  addingPost: false,
  error: false,
  deletingPost:false,
  deletedPost:false,
  postDelErr:false,
  delPostId:null
};

export const PostAddContext = createContext(initState);

export const PostAddProvider = ({ children }) => {
  const [postState, dispatchPost] = useReducer(PostReducer, initState);

  return (
    <PostAddContext.Provider
      value={{
        post: postState.post,
        postAdded: postState.postAdded,
        posting: postState.posting,
        deletingPost:postState.deletingPost,
        deletedPost:postState.deletedPost,
        delPostId:postState.delPostId,
        dispatchPost,
      }}
    >
      {children}
    </PostAddContext.Provider>
  );
};
