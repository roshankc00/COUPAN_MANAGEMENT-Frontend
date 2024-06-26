"use client";
import { UseGetASingleFAQ } from "@/hooks/react-query/faqs/getSingleFaq";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import EditFaqForm from "./EditFaqForm";

const EditFaq: React.FC<{ id: number }> = ({ id }) => {
  const { data, isFetching, isLoading, refetch } = UseGetASingleFAQ(id);
  useEffect(() => {
    refetch();
  }, []);
  return (
    <div>
      {!isFetching && !isLoading && <EditFaqForm data={data} id={id} />}
    </div>
  );
};

export default EditFaq;
