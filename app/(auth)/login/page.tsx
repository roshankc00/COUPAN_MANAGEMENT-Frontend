import React from "react";
import LoginForm from "./_component/LoginForm";

const Login = () => {
  return (
    <div className="flex justify-center mt-[10%] backdrop-blur-3xl  ">
      <div className="w-[500px] bg-white bg-opacity-75 p-6 rounded-lg ">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
