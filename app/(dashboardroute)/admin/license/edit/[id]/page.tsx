import React from "react";
import EditFaq from "./_components/EditFaq";

const EditFaqPage = ({
  params,
}: {
  params: {
    id: number;
  };
}) => {
  return (
    <div>
      <EditFaq id={params.id} />
    </div>
  );
};

export default EditFaqPage;
