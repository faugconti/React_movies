import * as actionTypes from "./actionTypes";
import { getMovies } from "./movies";
import { BACKEND_URL } from "../../index";

export const authReset = () => {
  return {
    type: actionTypes.AUTH_RESET,
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  console.log("LOGGIN OUT");
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeOut = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (authData, isSignup) => {
  return async (dispatch) => {
    // if (!email && !password) {
    //     const error = 'LOGIN FAIL'
    //     return dispatch(authFail(error));
    // }
    // console.log(authData);
    dispatch(authStart());
    let url = isSignup
      ? BACKEND_URL + "/users/signup"
      : BACKEND_URL + "/users/login";

    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(authData),
        headers: { "Content-Type": "application/json" },
      });
    //   console.log(res);
      if (res.ok) {
        const data = await res.json();
        const expirationDate = new Date(new Date().getTime() + 3600000);
        localStorage.setItem("token", data.token);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", data.userId);
        dispatch(authSuccess(data.token, data.userId));
        dispatch(checkAuthTimeOut(3600));
        dispatch(getMovies());
      } else {
        // console.log(res);
        let errorMsj = "Server ERROR"
        if (res.status === 403 || res.status === 500) {
          errorMsj = "Wrong Credentials!";
        }
        if (res.status === 422) {
          errorMsj = "User already exists. Please try another";
        }
        dispatch(authFail(errorMsj));
      }
    } catch (err) {
      console.log("ERROR");
      // dispatch(authFail(data.error));
    }
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate < new Date()) {
        // dispatch(authSuccess(token));
        dispatch(logout());
      } else {
        // console.log(expirationDate.getTime());
        // console.log(new Date().getTime())
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeOut(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
        dispatch(getMovies());
      }
    }
  };
};
