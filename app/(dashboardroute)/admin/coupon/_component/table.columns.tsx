"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Delete,
  DeleteIcon,
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
import { MdDelete } from "react-icons/md";
import { CiCircleAlert } from "react-icons/ci";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteCoupon } from "@/common/api/coupons/coupons.api";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/components/Provider";

const dateFormat = moment();

export const columns: ColumnDef<ICategory>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-center flex justify-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title: string = row.getValue("id");
      return <span className="text-center flex justify-center">{title}</span>;
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex justify-center"
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
    accessorKey: "tagLine",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className=""
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
    accessorKey: "code",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-center flex justify-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title: string = row.getValue("code");
      return <span className="text-center flex justify-center">{title}</span>;
    },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-center flex justify-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          startDate
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title: string = row.getValue("expireDate");
      return (
        <span className="text-center flex justify-center">
          {moment(title).format("YYYY-MM-DD")}
        </span>
      );
    },
  },
  {
    accessorKey: "expireDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-center flex justify-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ExpireDate
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title: string = row.getValue("expireDate");
      return (
        <span className="text-center flex justify-center">
          {moment(title).format("YYYY-MM-DD")}
        </span>
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
      const isShowinMenu = row.getValue("status");
      return (
        <div className="flex justify-center">
          <Badge className={cn("bg-slate-500 text-center")}>
            {isShowinMenu ? "YES" : "NO"}
          </Badge>
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
          className="flex justify-center"
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
        <div className="text-center flex justify-center">
          <Badge className={cn("bg-slate-500 text-center")}>
            {isFeatured ? "YES" : "NO"}
          </Badge>
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
          className="flex justify-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Verified
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isVerified = parseFloat(row.getValue("verified"));

      return (
        <div className="text-center flex justify-center">
          <Badge className={cn("bg-slate-500 text-center")}>
            {isVerified ? "YES" : "NO"}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "action",
    cell: ({ row }) => {
      const { id } = row.original;
      const { mutateAsync } = useMutation({
        mutationFn: deleteCoupon,
      });

      const handleDeleteCoupon = async (id: number) => {
        await mutateAsync(id).then(() => {
          toast.success("Deleted successfully");
          client.invalidateQueries({ queryKey: ["coupons"] });
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
            <Link href={`/coupon/${id}`}>
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
                    You Wont be able to recover the Coupon Again
                  </p>
                </DialogDescription>
                <DialogFooter>
                  <div className="flex flex-row-reverse mt-4 ">
                    <Button
                      variant={"destructive"}
                      className="w-[200px]"
                      onClick={() => handleDeleteCoupon(id)}
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
