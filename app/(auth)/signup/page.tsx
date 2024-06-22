import React from "react";
import SignupForm from "./_component/Signupform";

export const metadata = {
  title: "Signup | NepQue ",
  description: "NepQue: Your CouponPartner",
};
function SignupPage() {
  return (
    <div className="flex justify-center mt-2 backdrop-blur-3xl  ">
      <div className="w-[500px] bg-white bg-opacity-75 p-6 rounded-lg ">
        <SignupForm />
      </div>
    </div>
  );
}

export default SignupPage;
