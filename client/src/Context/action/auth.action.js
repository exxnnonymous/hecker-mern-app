import axiosInstance from "../../Api/axios";
import ACTIONS from "../constants";

export const login = async (dispatch, userCredentials) => {
  dispatch({ type: ACTIONS.LOGIN_REQUEST });

  try {
    const request = await axiosInstance.post("/user/signin", {
      ...userCredentials,
    });
    if (request.status === 200) {
      const { token, user } = request.data;
      localStorage.setItem(
        "NiM2IiLCJpYXQiOjE2Mjk4MDc4ODcsImV4cCI6MTYyOTgxMTQ4N30FR4ODu7lSfsyfMEZ50sP8CBeVLCxo3Q2b0jBn5abuzk",
        token
      );
      localStorage.setItem(
        "Mjk4MDc4ODcsImV4cCI6MTYyOTgxMTQ4N30",
        JSON.stringify(user)
      );
      dispatch({
        type: ACTIONS.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    }
  } catch (error) {
    if (error.response) {
      let errMsg = error.response.data.message;
      dispatch({ type: ACTIONS.LOGIN_FAILURE, payload: errMsg });
    }
  }
};

export const signup = async (dispatch, userCredentials) => {
  dispatch({ type: ACTIONS.SIGNIN_REQUEST });
  try {
    
    let formdata = new FormData();
    formdata.append("name", userCredentials.name);
    formdata.append("email", userCredentials.email);
    formdata.append("password", userCredentials.password);
    if(userCredentials.profilePicture){
      const blob = await fetch(userCredentials.profilePicture).then((res) =>
        res.blob()
        );
        formdata.append("profilePicture", blob, userCredentials.imageName);
    }
    const request = await axiosInstance.post("/user/signup", formdata, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (request.status === 200) {
      const { token, user } = request.data;
      localStorage.setItem(
        "NiM2IiLCJpYXQiOjE2Mjk4MDc4ODcsImV4cCI6MTYyOTgxMTQ4N30FR4ODu7lSfsyfMEZ50sP8CBeVLCxo3Q2b0jBn5abuzk",
        token
      );
      localStorage.setItem(
        "Mjk4MDc4ODcsImV4cCI6MTYyOTgxMTQ4N30",
        JSON.stringify(user)
      );
      dispatch({
        type: ACTIONS.SIGNIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    }
  } catch (error) {
    if (error.response) {
      let errMsg = error.response.data.message;
      dispatch({ type: ACTIONS.SIGNIN_FAILURE, payload: errMsg });
    }
  }
};

export const signout = (dispatch) => {
  dispatch({
    type: ACTIONS.LOGOUT_REQUEST,
  });

  localStorage.removeItem(
    "NiM2IiLCJpYXQiOjE2Mjk4MDc4ODcsImV4cCI6MTYyOTgxMTQ4N30FR4ODu7lSfsyfMEZ50sP8CBeVLCxo3Q2b0jBn5abuzk"
  );
  localStorage.removeItem("Mjk4MDc4ODcsImV4cCI6MTYyOTgxMTQ4N30");
  dispatch({
    type: ACTIONS.LOGOUT_SUCCESS,
  });
};

export const isUserLogged = async (dispatch) => {
  const token = localStorage.getItem(
    "NiM2IiLCJpYXQiOjE2Mjk4MDc4ODcsImV4cCI6MTYyOTgxMTQ4N30FR4ODu7lSfsyfMEZ50sP8CBeVLCxo3Q2b0jBn5abuzk"
  );

  if (token) {
    const user = JSON.parse(
      localStorage.getItem("Mjk4MDc4ODcsImV4cCI6MTYyOTgxMTQ4N30")
    );
    dispatch({
      type: ACTIONS.LOGIN_SUCCESS,
      payload: {
        token,
        user,
      },
    });
  } else {
    dispatch({ type: ACTIONS.LOGIN_FAILURE });
  }
};
