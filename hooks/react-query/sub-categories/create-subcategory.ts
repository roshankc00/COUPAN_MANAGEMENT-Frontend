import { useMutation } from "@tanstack/react-query";
import { postSubCategory } from "@/common/api/sub-categories/sub-category.api";
import { ISubcategoryBody } from "@/interfaces/Subcategory.interface";
import { client } from "@/components/Provider";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export const UseCreateSubCategory = (details: ISubcategoryBody) => {
  const router = useRouter();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: postSubCategory,
  });

  const handleCreateSubCategory = () => {
    mutateAsync(details)
      .then(() => {
        toast.success("sub-categories created successfully");
        router.push("/sub-category");
        client.invalidateQueries({ queryKey: ["sub-categories"] });
        client.invalidateQueries({ queryKey: ["sub-categories-by-category"] });
      })
      .catch(() => {
        toast.error("Unable to create sub-categories");
      });
  };
  return { isPending, handleCreateSubCategory };
};
