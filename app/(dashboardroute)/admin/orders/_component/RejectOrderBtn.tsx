import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CiCircleAlert } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil } from "lucide-react";
import { UseHandleRejectOrder } from "@/hooks/react-query/orders/reject-order-state";

const RejectOrderButton = ({ id }: { id: number }) => {
  const handleDelete = UseHandleRejectOrder();
  const [open, setopen] = useState(false);

  return (
    <div className="relative">
      <Dialog open={open} onOpenChange={setopen}>
        <DialogTrigger className=" my-5 mb-14 ">
          <Button
            className="flex  items-center absolute right-12 w-[150px]"
            variant={"destructive"}
          >
            <MdDelete color="white" className="h-4 w-4 mr-2" />
            Reject
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="my-3 flex flex-col gap-2 items-center justify-center text-xl">
              <CiCircleAlert size={30} color="red" />
              Are You sure ?
            </DialogTitle>
          </DialogHeader>
          <DialogDescription></DialogDescription>
          <DialogFooter>
            <div className="flex flex-row-reverse mt-4 ">
              <Button
                variant={"destructive"}
                className="w-[200px]"
                onClick={() => {
                  handleDelete(id);
                  setopen(false);
                }}
              >
                Reject
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RejectOrderButton;
