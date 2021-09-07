import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ProfilePicture from "../../components/ProfilePageSetup/ProfilePicture";
import { signup } from "../../Context/action/auth.action";
import { AuthContext } from "../../Context/context/authContext";

function SignUp() {
   document.title = "Hecker - log in or sign up"
  const [fulname, setFulName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageName, setImageName] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [userCredentials, setUserCredentials] = useState();
  const { authenticate, dispatch, signinErrMsg, registering } =
    useContext(AuthContext);
  const [signupPage, setSignupPage] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    setUserCredentials({
      name: fulname,
      email: email,
      password: password,
      profilePicture: profileImage,
      imageName: imageName,
    });
  }

  useEffect(() => {
    if (userCredentials) {
      signup(dispatch, userCredentials);
      setFulName("");
      setEmail("");
      setPassword("");
      setProfileImage(null);
      setImageName(null);
      document.querySelector("#input-profile").value = null
      setSignupPage(1);
    }
  }, [userCredentials]);

  function handleNext() {
    setSignupPage(2);
  }

  if (authenticate) {
    return <Redirect to="/" />;
  }

  return (
    <div className="bg-gray-400 bg-opacity-30 h-screen flex justify-center items-center flex-col">
      <div className="h-10 min-h-10 w-1/3 mb-6">
        {signinErrMsg && (
          <div className="min-h-10 h-10 w-1/full bg-red-200 text-red-600 font-semibold border border-red-500 rounded-md flex items-center justify-center transition-all duration-200 px-3">
            <p>{signinErrMsg}!</p>
          </div>
        )}
        {registering && (
          <div className=" h-10 w-full bg-green-200 text-green-600 font-semibold border border-green-500 rounded-md flex items-center justify-center transition-all duration-200">
            <p>Signing up...</p>
          </div>
        )}
      </div>
      <div className="bg-white rounded-lg shadow-lg p-4 pt-2 w-1/3">
        {signupPage === 1 ? (
          <SignupPage1
            handleNext={handleNext}
            fulname={fulname}
            email={email}
            password={password}
            setEmail={setEmail}
            setFulName={setFulName}
            setPassword={setPassword}
          />
        ) : (
          <ProfilePicture
            userCredentials={userCredentials}
            handleSubmit={handleSubmit}
            profileImage={profileImage}
            setProfileImage={setProfileImage}
            setImageName={setImageName}
          />
        )}
        <div className="mt-2">
          {signupPage === 1 && (
            <div>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-semibold">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUp;

function SignupPage1({
  handleNext,
  fulName,
  email,
  password,
  setEmail,
  setFulName,
  setPassword,
}) {
  return (
    <div>
      <div className=" text-center text-2xl text-blue-600 font-semibold ">
        Sign Up
      </div>
      <form id="myForm" onSubmit={handleNext}>
        <div>
          <div className="my-4">
            <input
              type="text"
              placeholder="Enter your name"
              value={fulName}
              onChange={(e) => {
                setFulName(e.target.value);
              }}
              className="w-full bg-gray-200 mb-3 py-1 px-3 rounded-md focus:outline-none "
              required
            />
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full bg-gray-200 mb-3 py-1 px-3 rounded-md focus:outline-none "
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-full bg-gray-200 py-1 px-3 rounded-md focus:outline-none "
              required
              autoComplete="current-password"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-1 rounded-lg"
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
