import ACTIONS from "../constants";

const initState = {
  token: null,
  user: null,
  authenticating: false,
  authenticate: false,
  registered: false,
  error: false,
  loading: false,
  registering: false,
  loginErrMessage: null,
  signinErrMessage: null,
  networkErr: null,
};

const AuthReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN_REQUEST:
      return {
        ...initState,
        authenticating: true,
      };

    case ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        authenticating: false,
        authenticate: true,
        networkErr: null,
      };
    case ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        authenticating: false,
        error: true,
        loginErrMessage: action.payload,
        networkErr: null,
      };
    case ACTIONS.LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        networkErr: null,
      };
    case ACTIONS.LOGOUT_SUCCESS:
      return {
        ...initState,
      };
    case ACTIONS.SIGNIN_REQUEST:
      return {
        ...initState,
        registering: true,
      };
    case ACTIONS.SIGNIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        registered: true,
        authenticate: true,
        networkErr: null,
        registering: false,
      };
    case ACTIONS.SIGNIN_FAILURE:
      return {
        ...state,
        registering: false,
        error: true,
        networkErr: null,
        signinErrMessage: action.payload,
      };
    case ACTIONS.NETWORK_ERR:
      return {
        ...state,
        networkErr: action.payload,
      };
    default:
      return state;
  }
};

export default AuthReducer;
