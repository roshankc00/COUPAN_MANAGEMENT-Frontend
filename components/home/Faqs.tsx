"use client";
import React, { useEffect } from "react";
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
    <div className="my-16">
      {!isLoading && !isFetching && (
        <Accordion type="single" collapsible>
          {data?.map((item: any) => (
            <>
              <AccordionItem
                value={item.id}
                className="border border-slate-200 px-3 my-5 rounded-lg"
              >
                <AccordionTrigger className="text-[14px] sm:text-[16px] lg:text-[18px]">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-[14px]  text-center sm:text-[18px]">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </>
          ))}
        </Accordion>
      )}
    </div>
  );
};

export default FaqsCom;
