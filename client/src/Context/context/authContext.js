import { useReducer, createContext } from "react";
import AuthReducer from "../reducer/auth.Reducer";

const initState = {
  token: null,
  user: null,
  authenticating: false,
  authenticate: false,
  error: false,
  loading: false,
  registering: false,
  registered: false,
  loginErrMessage: null,
  signinErrMessage: null,
  networkErr: null,
};

export const AuthContext = createContext(initState);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initState);

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        user: state.user,
        authenticate: state.authenticate,
        authenticating: state.authenticating,
        errMsg: state.loginErrMessage,
        signinErrMsg: state.signinErrMessage,
        loading: state.loading,
        registering: state.registering,
        registered: state.registered,
        networkErr: state.networkErr,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
