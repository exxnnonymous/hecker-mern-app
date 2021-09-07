import React from "react";

function ProfilePicture({
  handleSubmit,
  setProfileImage,
  profileImage,
  setImageName,
}) {
  function imageHandler(e) {
    const imageReader = new FileReader();
    imageReader.onload = () => {
      if (imageReader.readyState === 2) {
        setProfileImage(imageReader.result);
      }
    };
    if (e.target.files[0]) {
      imageReader.readAsDataURL(e.target.files[0]);
      setImageName(e.target.files[0].name);
    }
  }

  return (
    <div>
      <div className="w-full flex justify-center items-center flex-col pt-2 mb-4">
        <div className="mb-1 font-bold text-xl text-gray-700">
          Profile Picture
        </div>
        <div className="text-gray-300 relative w-36 h-36">
          {profileImage ? (
            <img
              src={profileImage}
              alt="default-profile"
              className="w-full h-full rounded-full object-contain border-2"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-36 w-36"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clipRule="evenodd"
              />
            </svg>
          )}
          <div
            className={
              profileImage
                ? "absolute bottom-1 -right-16 text-blue-600 hover:text-blue-700 transition-all duration-200 p-2 flex gap-2"
                : "absolute bottom-1 -right-4 text-blue-600 hover:text-blue-700 transition-all duration-200 p-2 flex gap-2"
            }
          >
            <input
              type="file"
              id="input-profile"
              accept="image/*"
              className="hidden"
              onChange={imageHandler}
            />
            <label htmlFor="input-profile" className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </label>
            {profileImage && (
              <div
                className="cursor-pointer px-1 hover:text-red-600 transition-all duration-200"
                onClick={() => {
                  setProfileImage(null);
                  document.querySelector("#input-profile").value = null
                  
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white py-1 rounded-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default ProfilePicture;
