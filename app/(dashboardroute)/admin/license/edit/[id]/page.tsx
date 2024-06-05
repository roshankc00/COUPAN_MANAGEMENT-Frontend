import React from "react";
import EditLicense from "./_components/EditLicense";

const EditLicensePage = ({
  params,
}: {
  params: {
    id: number;
  };
}) => {
  return (
    <div>
      <EditLicense id={params.id} />
    </div>
  );
};

export default EditLicensePage;
