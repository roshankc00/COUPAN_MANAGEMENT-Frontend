import { deleteStore } from "@/common/api/blogs/blogs.api";
import { client } from "@/components/Provider";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const UseDeleteStore = () => {
  const { mutateAsync } = useMutation({
    mutationFn: deleteStore,
  });

  const handleDelete = async (id: number) => {
    await mutateAsync(id).then(() => {
      toast.success("Deleted successfully");
      client.invalidateQueries({ queryKey: ["store"] });
    });
  };

  return handleDelete;
};
