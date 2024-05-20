import React from "react";
import EditCategory from "./_components/EditCategory";

const EditCategoryPage = ({ params }: { params: { id: number } }) => {
  return (
    <div>
      <EditCategory id={params.id} />
    </div>
  );
};

export default EditCategoryPage;
