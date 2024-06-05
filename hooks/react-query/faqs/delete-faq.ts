import { deleteAFaq } from "@/common/api/faqs/faqs.api";
import { client } from "@/components/Provider";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteFaq = () => {
  const { mutateAsync } = useMutation({
    mutationFn: deleteAFaq,
  });

  const handleDelete = async (id: number) => {
    await mutateAsync(id).then(() => {
      toast.success("Deleted successfully");
      client.invalidateQueries({ queryKey: ["sub-categories"] });
      client.invalidateQueries({ queryKey: ["faqs"] });
    });
  };

  return handleDelete;
};
