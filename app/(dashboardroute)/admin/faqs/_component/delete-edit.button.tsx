"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Delete,
  MoreHorizontal,
  PenBox,
  Pencil,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { client } from "@/components/Provider";
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
import { deleteAFaq } from "@/common/api/faqs/faqs.api";
import { useDeleteFaq } from "@/hooks/react-query/faqs/delete-faq";

const DeleteFaqButton = ({ id }: { id: number }) => {
  const handleDelete = useDeleteFaq();

  return (
    <div className="relative">
      <Dialog>
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
    </div>
  );
};

export default DeleteFaqButton;
