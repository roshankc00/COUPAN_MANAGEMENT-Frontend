import React from "react";
import { SlCalender } from "react-icons/sl";
import { PiBuildingOfficeLight } from "react-icons/pi";
const CouponCard2 = () => {
  return (
    <div className="group relative p-3 shadow-md rounded-md">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 ">
        <img
          src="https://images.unsplash.com/photo-1617992477211-dfab5866182b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Product image"
          className=" w-full h-[200px] object-cover object-center rounded-md"
        />
      </div>
      <p className="text-xl mt-2 font-medium text-gray-900">
        15% Off Your Order
      </p>
      <div className="flex gap-3 mt-2 items-center">
        <div className="flex gap-1 items-center">
          <SlCalender />
          <h3 className="text-sm text-gray-700">KFC</h3>
        </div>
        <div className="flex gap-2 items-center">
          <PiBuildingOfficeLight />
          <h3 className="text-sm text-gray-700">8 Days Left</h3>
        </div>
      </div>
      <button className="bg-[#2563EB] p-2 w-full rounded-md text-white text-[16px] font-medium my-2">
        Scratch
      </button>
    </div>
  );
};

export default CouponCard2;
