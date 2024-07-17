import React from "react";
import SignupForm from "./_component/Signupform";

export const metadata = {
  title: "Signup | NepQue ",
  description: "NepQue: Your Coupon Partner",
};
function SignupPage() {
  return (
    <div className="flex justify-center mt-2 backdrop-blur-3xl  ">
      <div className="w-[500px]  ">
        <SignupForm />
      </div>
    </div>
  );
}

export default SignupPage;
