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

const Silder = () => {
  const { data, isFetching, isLoading } = UseGetAllHomeDetails();
  return (
    <div>
      <Carousel>
        <CarouselContent>
          {!isLoading &&
            !isFetching &&
            data &&
            data[0]?.sliderImages?.map((item: any) => (
              <CarouselItem key={item}>
                <img
                  src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/${item}`}
                  alt=""
                  className="w-full h-[292px]"
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
