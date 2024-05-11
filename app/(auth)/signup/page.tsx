import React from "react";
import SignupForm from "./_component/Signupform";

function SignupPage() {
  return (
    <div className="flex justify-center mt-[10%] backdrop-blur-3xl  ">
      <div className="w-[500px] bg-white bg-opacity-75 p-6 rounded-lg ">
        <SignupForm />
      </div>
    </div>
  );
}

export default SignupPage;
