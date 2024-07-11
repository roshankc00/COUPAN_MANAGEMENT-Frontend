"use client";
import { deleteSingleHomeImage } from "@/common/api/home/home.api";
import { client } from "@/components/Provider";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { Delete } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
type Props = {
  item: any;
};

const HomeImageCard: React.FC<Props> = ({ item }) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteSingleHomeImage,
  });

  const handleDelete = (id: number) => {
    mutateAsync(+id).then(() => {
      toast.success("Image deleted  successfully");
      client.invalidateQueries({ queryKey: ["home-details"] });
    });
  };
  return (
    <Card>
      <CardContent className="relative w-full h-[300px]">
        <img
          src={`${item.imageUrl}`}
          alt=""
          className="w-[200px] h-[150px] sm:w-full sm:h-full"
        />
        <MdDelete
          className="w-10 h-10 p-2 text-white hover:bg-slate-300 transition-all rounded-xl bg-red-700 absolute right-3 top-0"
          onClick={() => handleDelete(item?.id)}
        />
      </CardContent>
    </Card>
  );
};

export default HomeImageCard;
