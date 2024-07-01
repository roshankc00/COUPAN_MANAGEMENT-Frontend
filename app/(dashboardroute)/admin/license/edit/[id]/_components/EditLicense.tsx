"use client";
import { UseGetSingleLicense } from "@/hooks/react-query/license/get-single-license";
import EditLicenseForm from "./EditLicenseForm";

const EditLicense: React.FC<{ id: number }> = ({ id }) => {
  const { data, isFetching, isLoading } = UseGetSingleLicense(id);
  console.log(data);
  return (
    <div>
      {!isFetching && !isLoading && (
        <EditLicenseForm singleData={data} id={id} />
      )}
    </div>
  );
};

export default EditLicense;
