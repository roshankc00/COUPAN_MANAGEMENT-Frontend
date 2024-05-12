import React from "react";
import { Button } from "./ui/button";

type Props = {
  image: string;
  status: string;
  id: number;
  description: string;
  code: string;
  deadline: string;
  title: string;
};

const Couponcard: React.FC = () => {
  return (
    <div>
      <div className="shadow-sm rounded-md p-4 flex justify-between items-center">
        <div className="flex items-center gap-5">
          <img
            src="https://cdn0.dontpayfull.com/media/logos/size/160x160/brighton.com..jpg?v=20220628144652202906"
            alt=""
            className="h-28 w-28"
          />
          <div>
            <h5 className="font-medium">Verified</h5>
            <p className="description font-mono text-xl mt-1">
              60% Off Any Order
            </p>
            <p className="deadline  text-gray-500 mt-2">Ends tomorrow</p>
          </div>
        </div>
        <div>
          <Button>Get Code</Button>
        </div>
      </div>
    </div>
  );
};

export default Couponcard;
