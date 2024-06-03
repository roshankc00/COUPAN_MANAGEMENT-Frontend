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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteCategory } from "@/common/api/categories/category.api";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/components/Provider";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { CiCircleAlert } from "react-icons/ci";

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
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className=""
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title: string = row.getValue("title");
      return <span className="">{title}</span>;
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className=""
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title: string = row.getValue("description");
      return <span className="">{title}</span>;
    },
  },

  {
    accessorKey: "showInMenu",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Show in Menu
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isShowinMenu = row.getValue("showInMenu");
      return (
        <div className="">
          <Badge className={cn("bg-slate-500 text-center")}>
            {isShowinMenu ? "YES" : "NO"}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex justify-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status: any = row.getValue("status");
      return (
        <div className="flex justify-center">
          <Badge className={cn("bg-slate-500 text-center")}>{status}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "featured",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className=""
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Featured
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isFeatured = parseFloat(row.getValue("featured"));

      return (
        <div className="">
          <Badge className={cn("bg-slate-500 text-center")}>
            {isFeatured ? "YES" : "NO"}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CreatedAt
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date: string = row.getValue("createdAt");
      return (
        <div className="text-center"> {moment(date).format("YYYY-MM-DD")}</div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          UpdatedAt
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title: string = row.getValue("updatedAt");
      return (
        <div className="text-center"> {moment(title).format("YYYY-MM-DD")}</div>
      );
    },
  },

  {
    id: "action",
    cell: ({ row }) => {
      const { id } = row.original;

      const { mutateAsync } = useMutation({
        mutationFn: deleteCategory,
      });

      const handleDeleteCategory = async (id: number) => {
        await mutateAsync(id).then(() => {
          toast.success("Deleted successfully");
          client.invalidateQueries({ queryKey: ["category"] });
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
            <Link href={`/admin/category/edit/${id}`}>
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
                    You Wont be able to recover this Category Again
                  </p>
                </DialogDescription>
                <DialogFooter>
                  <div className="flex flex-row-reverse mt-4 ">
                    <Button
                      variant={"destructive"}
                      className="w-[200px]"
                      onClick={() => handleDeleteCategory(id)}
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
