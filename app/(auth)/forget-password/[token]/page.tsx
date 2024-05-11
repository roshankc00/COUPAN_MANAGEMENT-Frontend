import React from "react";
import ResetPasswordForm from "./_component/ResetPasswordForm";

const ResetPasswordPage = ({ params }: { params: { token: string } }) => {
  return (
    <div>
      <ResetPasswordForm token={params.token} />
    </div>
  );
};

export default ResetPasswordPage;
