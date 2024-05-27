"use client";
import { UseGetASingleFAQ } from "@/hooks/react-query/faqs/getSingleFaq";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import EditFaqForm from "./EditFaqForm";

const EditFaq: React.FC<{ id: number }> = ({ id }) => {
  const formSchema = z.object({
    question: z.string().min(5, {
      message: " must be of 5 charecter ",
    }),
    answer: z.string().min(5, {
      message: "must be of 5 charecter ",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      answer: "",
    },
  });
  const { data, isFetching, isLoading } = UseGetASingleFAQ(id);
  return (
    <div>
      {!isFetching && !isLoading && <EditFaqForm data={data} id={id} />}
    </div>
  );
};

export default EditFaq;
