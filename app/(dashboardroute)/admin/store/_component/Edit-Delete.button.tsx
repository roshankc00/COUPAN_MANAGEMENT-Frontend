import React, { useState } from "react";
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
import { MoreHorizontal, Pencil } from "lucide-react";
import { deleteCategory } from "@/common/api/categories/category.api";
import { deleteCoupon } from "@/common/api/coupons/coupons.api";
import { deleteStore } from "@/common/api/blogs/blogs.api";
import { UseDeleteStore } from "@/hooks/react-query/stores/delete-store";

const DeleteStoreButton = ({ id }: { id: number }) => {
  const [open, setopen] = useState(false);
  const handleDelete = UseDeleteStore();

  return (
    <div className="relative">
      <Dialog open={open} onOpenChange={setopen}>
        <DialogTrigger className=" my-5 mb-14 ">
          <Button
            className="flex  items-center absolute right-12 w-[150px]"
            variant={"destructive"}
          >
            <MdDelete color="white" className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="my-3 flex flex-col gap-2 items-center justify-center text-xl">
              <CiCircleAlert size={30} color="red" />
              Are You sure ?
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <p className="text-center">
              You Wont be able to recover this Store Again
            </p>
          </DialogDescription>
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
                Delete
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteStoreButton;
