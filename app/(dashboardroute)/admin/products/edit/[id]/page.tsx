import React from "react";
import EditProduct from "./_components/EditProduct";

const EditProductPage = ({
  params,
}: {
  params: {
    id: number;
  };
}) => {
  return (
    <div>
      <EditProduct id={params.id} />
    </div>
  );
};

export default EditProductPage;
