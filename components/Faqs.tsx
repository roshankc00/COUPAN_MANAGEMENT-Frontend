"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { UseGetAllFAQS } from "@/hooks/react-query/faqs/get-all-faqs";

const FaqsCom = () => {
  const { data, isLoading, isFetching } = UseGetAllFAQS();
  return (
    <div className="">
      {!isLoading && !isFetching && (
        <Accordion
          type="single"
          collapsible
          className="grid grid-cols-1 gap-5 lg:grid-cols-2"
        >
          {data?.map((item: any) => (
            <>
              <AccordionItem
                value={item.id}
                className="border border-slate-200 px-3"
              >
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            </>
          ))}
        </Accordion>
      )}
    </div>
  );
};

export default FaqsCom;
