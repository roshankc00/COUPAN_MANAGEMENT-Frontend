import React from "react";
import EditSubCategory from "./_components/EditSubCategory";

const UpdateSubCategpryPage = ({ params }: { params: { id: number } }) => {
  return (
    <div>
      <EditSubCategory id={params.id} />
    </div>
  );
};

export default UpdateSubCategpryPage;
