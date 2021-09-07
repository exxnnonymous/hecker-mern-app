import React from "react";
import PostForm from "../../components/Form/PostForm";
import PostContainer from "../PostContainer/PostContainer";

function Home() {
  return (
    <div className="app py-8 pt-20  shadow-md dark:bg-darkBody">
      <div className="container h-full bg-transparent grid grid-cols-4 justify-center">
        <div></div>
        <div className="col-span-2 px-10">
          <div className="add-post mb-8">
            <PostForm />
          </div>
          <div className="main my-8">
            <PostContainer />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Home;
