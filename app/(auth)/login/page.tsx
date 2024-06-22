import React from "react";
import LoginForm from "./_component/LoginForm";

export const metadata = {
  title: "Login | NepQue ",
  description: "NepQue: Your CouponPartner",
};
const Login = () => {
  return (
    <div className="flex justify-center mt-2 backdrop-blur-3xl  ">
      <div className="w-[500px] bg-white bg-opacity-75 p-6 rounded-lg ">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
