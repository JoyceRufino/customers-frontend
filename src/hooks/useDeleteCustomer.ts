import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCustomer } from "../api/services/customers";
import toast from "react-hot-toast";

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: number) => {
      await deleteCustomer(String(id));
    },
    onSuccess: () => {
      toast.success("Cliente excluído com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: () => {
      toast.error("Ocorreu um erro ao excluir o cliente.");
    },
  });

  return {
    deleteCustomer: async (id: number) => await mutation.mutateAsync(id),
    isLoading: mutation.isPending,
  };
};
