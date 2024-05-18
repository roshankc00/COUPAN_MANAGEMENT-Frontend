import React from "react";
import EditStrore from "./_components/EditStore";

const EditStorePage = ({ params }: { params: { id: number } }) => {
  return (
    <div>
      <EditStrore id={params.id} />
    </div>
  );
};

export default EditStorePage;
