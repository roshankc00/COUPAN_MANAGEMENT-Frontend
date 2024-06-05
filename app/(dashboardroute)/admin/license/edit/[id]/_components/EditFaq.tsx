"use client";
import { UseGetASingleFAQ } from "@/hooks/react-query/faqs/getSingleFaq";
import EditFaqForm from "./EditFaqForm";

const EditFaq: React.FC<{ id: number }> = ({ id }) => {
  const { data, isFetching, isLoading } = UseGetASingleFAQ(id);
  return (
    <div>
      {!isFetching && !isLoading && <EditFaqForm data={data} id={id} />}
    </div>
  );
};

export default EditFaq;
