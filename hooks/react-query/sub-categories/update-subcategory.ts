import { useMutation } from "@tanstack/react-query";
import { updateSubCategory } from "@/common/api/sub-categories/sub-category.api";
import { ISubcategoryBody } from "@/interfaces/Subcategory.interface";
import { client } from "@/components/Provider";

export const UseUpdateSubCategory = (details: Partial<ISubcategoryBody>) => {
  const { mutate, isPending } = useMutation({
    mutationFn: updateSubCategory,
  });
  client.invalidateQueries({ queryKey: ["sub-categories"] });
  client.invalidateQueries({ queryKey: ["sub-categories-by-category"] });
  mutate(details as any);
  return { isPending };
};
