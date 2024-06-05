import { deleteSubcategory } from "@/common/api/sub-categories/sub-category.api";
import { client } from "@/components/Provider";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const UseDeleteSubCategory = () => {
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
