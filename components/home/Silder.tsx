"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { UseGetAllHomeDetails } from "@/hooks/react-query/home/get-all-home-details";
import SliderSkeletion from "./SliderSkeletion";

const Silder = () => {
  const { data, isFetching, isLoading } = UseGetAllHomeDetails();
  return (
    <div className="shadow-sm rounded-2xl">
      <Carousel>
        <CarouselContent>
          {isLoading && isFetching && (
            <CarouselItem>
              <SliderSkeletion />
            </CarouselItem>
          )}
          {!isLoading &&
            !isFetching &&
            data &&
            data[0]?.homeItem?.map((item: any) => (
              <CarouselItem key={item}>
                <img
                  src={`${item.imageUrl}`}
                  alt=""
                  className="w-[100%] h-[150px] sm:w-full sm:h-full"
                />
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Silder;
