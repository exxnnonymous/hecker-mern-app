import ACTIONS from "../constants";

const initState = {
  post: null,
  posting: false,
  postAdded: false,
  error: false,
  deletingPost:false,
  deletedPost:false,
  postDelErr:false,
  delPostId:null
};

const PostReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTIONS.POST_ADD_REQUEST:
      return {
        ...state,
        postAdded: false,
        posting: true,
      };
    case ACTIONS.POST_ADD_SUCCESS:
      return {
        ...state,
        post: action.payload.post,
        posting: false,
        postAdded: true,
      };
    case ACTIONS.POST_ADD_FAILURE:
      return {
        ...state,
        posting: false,
        error: true,
      };
    case ACTIONS.DEL_POST_REQ:
      return {
        ...state,
        deletingPost: true,
        deletedPost:false
      }
    case ACTIONS.DEL_POST_SUCC:
      return {
        ...state,
        deletingPost: false,
        deletedPost:true,
        delPostId:null
      }
    case ACTIONS.DEL_POST_FAIL:
      return {
        ...state,
        deletingPost: false,
        postDelErr:true,
        delPostId:null
      }
    case ACTIONS.DEL_POST_ID:
      return {
        ...state,
        deletingPost: false,
        delPostId: action.payload
      }
    case ACTIONS.DEL_POST_OFF:
      return {
        ...state,
        deletedPost:false,
      }
    default:
      return state;
  }
};

export default PostReducer;
