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
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ICategory } from "@/interfaces/category.interface";
import moment from "moment";
import { useMutation } from "@tanstack/react-query";
import { deleteSubcategory } from "@/common/api/sub-categories/sub-category.api";
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

const dateFormat = moment();

const handleDelete = () => {
  console.log("delete");
};

export const columns: ColumnDef<ICategory>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className=""
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title: string = row.getValue("id");
      return <span className="">{title}</span>;
    },
  },
  {
    accessorKey: "code",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex justify-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title: string = row.getValue("code");
      return <span className="">{title}</span>;
    },
  },
  {
    accessorKey: "url",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="r"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Url
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title: string = row.getValue("url");
      return <span className="">{title}</span>;
    },
  },
  {
    accessorKey: "tagLine",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="r"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          TagLine
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title: string = row.getValue("tagLine");
      return <span className="">{title}</span>;
    },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="r"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          StartDate
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title: string = row.getValue("startDate");
      return <span className=""> {moment(title).format("YYYY-MM-DD")}</span>;
    },
  },
  {
    accessorKey: "expireDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="r"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          expireDate
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title: string = row.getValue("expireDate");
      return <span className=""> {moment(title).format("YYYY-MM-DD")}</span>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="r"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title: string = row.getValue("status");
      return <span className="">{title}</span>;
    },
  },

  {
    id: "action",
    cell: ({ row }) => {
      const { id } = row.original;
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
    },
  },
];
