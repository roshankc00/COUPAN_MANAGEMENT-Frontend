"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Check,
  Delete,
  Ellipsis,
  GitPullRequestClosed,
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
import { pendingOrder, rejectOrder } from "@/common/api/orders/orders.api";
import { client } from "@/components/Provider";
import toast from "react-hot-toast";

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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex justify-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title: string = row.getValue("name");
      return <span className="">{title}</span>;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="r"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title: string = row.getValue("email");
      return <span className="">{title}</span>;
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
      const title: string = row.getValue("status");
      return <span className="">{title}</span>;
    },
  },

  {
    accessorKey: "product",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="r"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const product: any = row.getValue("product");
      return <span className="">{product.title}</span>;
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="r"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const product: any = row.getValue("product");
      return <span className="">{product?.price}</span>;
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
          Order Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const product: any = row.getValue("status");
      return (
        <span className="">
          <Badge> {product}</Badge>
        </span>
      );
    },
  },

  {
    id: "action",
    cell: ({ row }) => {
      const { id } = row.original;
      const { mutateAsync } = useMutation({
        mutationFn: rejectOrder,
      });

      const { mutateAsync: handlePendingApi } = useMutation({
        mutationFn: pendingOrder,
      });

      const handleDelete = async (id: number) => {
        mutateAsync(id).then(() => {
          toast.success("Rejected the Status");
          client.invalidateQueries({ queryKey: ["get-all-orders"] });
          client.invalidateQueries({ queryKey: ["all-order-with-Status"] });
        });
      };
      const handlePendingState = async (id: number) => {
        handlePendingApi(id).then(() => {
          client.invalidateQueries({ queryKey: ["get-all-orders"] });
          client.invalidateQueries({ queryKey: ["all-order-with-Status"] });
          toast.success("Change status to Pending");
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
                  <p className="text-center">
                    to Change status back to Pending
                  </p>
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
    },
  },
];
