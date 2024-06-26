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
import { MoreHorizontal, Pencil } from "lucide-react";
import { deleteCategory } from "@/common/api/categories/category.api";
import { deleteCoupon } from "@/common/api/coupons/coupons.api";

const UseDeleteCategory = () => {
  const { mutateAsync } = useMutation({
    mutationFn: deleteSubcategory,
  });

  const handleDelete = async (id: number) => {
    await mutateAsync(id).then(() => {
      toast.success("Deleted successfully");
      client.invalidateQueries({ queryKey: ["sub-categories"] });
      client.invalidateQueries({
        queryKey: ["sub-categories-by-category"],
      });
    });
  };

  return handleDelete;
};

const EditDeleteButton = ({ id }: { id: number }) => {
  const handleDelete = UseDeleteCategory();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="h-4 w-8 p-0">
          <span className="sr-only">Open menu </span>
          <MoreHorizontal h-4 w-4 />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href={`/sub-category/${id}`}>
          <DropdownMenuItem>
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
        </Link>
        <Dialog>
          <DialogTrigger className="flex">
            <MdDelete color="red" className="h-4 w-4 mr-2" />
            Delete
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
                You Wont be able to recover this Sub-Category Again
              </p>
            </DialogDescription>
            <DialogFooter>
              <div className="flex flex-row-reverse mt-4 ">
                <Button
                  variant={"destructive"}
                  className="w-[200px]"
                  onClick={() => handleDelete(id)}
                >
                  Delete
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EditDeleteButton;
