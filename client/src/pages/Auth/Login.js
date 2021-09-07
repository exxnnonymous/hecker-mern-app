import React, { useContext, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../Context/action/auth.action";
import { AuthContext } from "../../Context/context/authContext";

function Login() {
  document.title = "Hecker - log in or sign up"
  const userRef = useRef();
  const passwordRef = useRef();

  const { authenticate, dispatch, errMsg, authenticating } =
    useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();

    const userCredentials = {
      email: userRef.current.value,
      password: passwordRef.current.value,
    };
    await login(dispatch, userCredentials);
  }

  if (authenticate) {
    return <Redirect to="/" />;
  }

  return (
    <div className="bg-gray-400 bg-opacity-30 min-h-screen flex justify-center items-center flex-col py-6 relative">
      <div className="h-10 w-1/3 mb-6">
        {errMsg && (
          <div className="  h-10 w-1/full bg-red-200 text-red-600 font-semibold border border-red-500 rounded-md flex items-center justify-center transition-all duration-200">
            <p>{errMsg}!</p>
          </div>
        )}
        {authenticating && (
          <div className=" h-10 w-full bg-green-200 text-green-600 font-semibold border border-green-500 rounded-md flex items-center justify-center transition-all duration-200">
            <p>Authenticating...</p>
          </div>
        )}
      </div>
      <div className="bg-white rounded-lg shadow-lg p-4 pt-2 w-1/3">
        <div className=" text-center text-2xl text-blue-600 font-semibold">
          Login
        </div>
        <form id="myForm" onSubmit={handleSubmit}>
          <div className="my-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full bg-gray-200 mb-3 py-1 px-3 rounded-md focus:outline-none "
              ref={userRef}
              required
              autoComplete="true"
            />
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full bg-gray-200 py-1 px-3 rounded-md focus:outline-none "
              ref={passwordRef}
              required
              autoComplete="current-password"
            />
          </div>
          <div>
            <button
              className="w-full bg-blue-600 text-white py-1 rounded-lg hover:bg-blue-700 transition-all duration-150"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-2">
          <div>
            <Link
              to="/signup"
              className="text-blue-600 text-bold font-semibold"
            >
              Create new account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
