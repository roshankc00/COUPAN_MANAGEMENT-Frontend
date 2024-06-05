import React from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteSubcategory } from "@/common/api/sub-categories/sub-category.api";
import toast from "react-hot-toast";
import { client } from "@/components/Provider";
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
import {
  Check,
  Ellipsis,
  GitPullRequestClosed,
  MoreHorizontal,
  Pencil,
} from "lucide-react";
import { deleteCategory } from "@/common/api/categories/category.api";
import { deleteCoupon } from "@/common/api/coupons/coupons.api";
import { pendingOrder, rejectOrder } from "@/common/api/orders/orders.api";
import { UseHandleRejectOrder } from "@/hooks/react-query/orders/reject-order-state";
import { UseHandlePendingOrder } from "@/hooks/react-query/orders/pending-order-state";

const ChangeOrderStatusBtns = ({ id }: { id: number }) => {
  const handlePendingState = UseHandlePendingOrder();
  const handleDelete = UseHandleRejectOrder();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="h-4 w-8 p-0">
          <span className="sr-only">Open menu </span>
          <MoreHorizontal h-4 w-4 />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href={`/admin/license/new`}>
          <DropdownMenuItem>
            <Check className="h-4 w-4 mr-2" />
            Accept Order
          </DropdownMenuItem>
        </Link>
        <Dialog>
          <DialogTrigger className="flex">
            <GitPullRequestClosed color="red" className="h-4 w-4 mr-2" />
            Reject Order
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="my-3 flex flex-col gap-2 items-center justify-center text-xl">
                <CiCircleAlert size={30} color="red" />
                Are You sure ?
              </DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <p className="text-center">to Reject this request</p>
            </DialogDescription>
            <DialogFooter>
              <div className="flex flex-row-reverse mt-4 ">
                <Button
                  variant={"destructive"}
                  className="w-[200px]"
                  onClick={() => handleDelete(id)}
                >
                  Reject Order
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger className="flex">
            <Ellipsis color="red" className="h-4 w-4 mr-2" />
            Pending status
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="my-3 flex flex-col gap-2 items-center justify-center text-xl">
                <CiCircleAlert size={30} color="red" />
                Are You sure ?
              </DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <p className="text-center">to Change status back to Pending</p>
            </DialogDescription>
            <DialogFooter>
              <div className="flex flex-row-reverse mt-4 ">
                <Button
                  variant={"destructive"}
                  className="w-[200px]"
                  onClick={() => handlePendingState(id)}
                >
                  Change
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChangeOrderStatusBtns;
