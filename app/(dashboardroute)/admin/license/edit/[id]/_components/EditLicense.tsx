"use client";
import { UseGetASingleFAQ } from "@/hooks/react-query/faqs/getSingleFaq";
import EditFaqForm from "./EditLicenseForm";

const EditLicense: React.FC<{ id: number }> = ({ id }) => {
  const { data, isFetching, isLoading } = UseGetASingleFAQ(id);
  return (
    <div>
      {!isFetching && !isLoading && <EditFaqForm data={data} id={id} />}
    </div>
  );
};

export default EditLicense;
