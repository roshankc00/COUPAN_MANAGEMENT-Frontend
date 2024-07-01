import React from "react";
import EditProduct from "./_components/EditSubProduct";

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
