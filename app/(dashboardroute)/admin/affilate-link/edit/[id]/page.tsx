import React from "react";
import EditSubCategory from "./_components/EditAffilateLink";

const UpdateSubCategoryPage = ({ params }: { params: { id: number } }) => {
  return (
    <div>
      <EditSubCategory id={params.id} />
    </div>
  );
};

export default UpdateSubCategoryPage;
