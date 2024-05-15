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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { Input } from "./ui/input";
import { File } from "lucide-react";

const Couponcard: React.FC = () => {
  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied");
    } catch (err) {
      toast.success("Failed to copy");
    }
  };

  interface Props {
    title: string;
    status: string;
    description: string;
    expireDate: string;
    imageName: string;
  }

  return (
    <div>
      <div className="shadow-sm rounded-lg p-4 flex justify-between items-center border border-slate-200">
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
        <div className="relative">
          <Dialog>
            <DialogTrigger>
              <Button>Get Code</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="my-3 text-center text-xl">
                  Up to 15% Off All Orders
                </DialogTitle>
                <DialogDescription>
                  <Input className="text-xl" value={"hahahahahah"} />
                  <File
                    className="absolute right-8 top-[90px] cursor-pointer"
                    onClick={() => handleCopyToClipboard("hahahahahah")}
                  />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Couponcard;
