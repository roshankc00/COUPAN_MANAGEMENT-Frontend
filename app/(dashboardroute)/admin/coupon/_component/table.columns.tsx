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
import EditDeleteButton from "./Edit-Delete.button";

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

      return <EditDeleteButton id={id} />;
    },
  },
];
