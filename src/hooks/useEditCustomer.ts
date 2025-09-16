import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUser, getUserById } from "../api/services/customers";
import type { Client, ClientID } from "../api/types/customers";
import toast from "react-hot-toast";

type UseEditCustomerParams = {
  userId: number | null;
};

export const useEditCustomer = ({ userId }: UseEditCustomerParams) => {
  const queryClient = useQueryClient();
  const { control, handleSubmit, reset, setError, setValue } = useForm<Client>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!userId || !isModalOpen) return;
      try {
        const user: ClientID = await getUserById(String(userId));
        setValue("name", user.name);
        setValue("salary", Number(user.salary));
        setValue("companyValuation", Number(user.companyValuation));
      } catch {
        toast.error("Falha ao carregar cliente para edição");
      }
    };
    void load();
  }, [userId, isModalOpen, setValue]);

  const mutation = useMutation({
    mutationFn: async (payload: Client) => {
      if (!userId) throw new Error("Missing userId");
      return await editUser(String(userId), payload as unknown as ClientID);
    },
    onSuccess: () => {
      toast.success("Cliente atualizado com sucesso!");
      setIsModalOpen(false);
      reset();
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (error: unknown) => {
      toast.error("Ocorreu um erro ao atualizar o cliente.");
      try {
        const err = error as { response?: { data?: { message?: string[] | string } } };
        const messages = err.response?.data?.message;
        const arr = Array.isArray(messages) ? messages : messages ? [messages] : [];
        arr.forEach((msg) => {
          const lower = String(msg).toLowerCase();
          if (lower.includes("salary")) setError("salary", { type: "server", message: msg });
          if (lower.includes("companyvaluation")) setError("companyValuation", { type: "server", message: msg });
          if (lower.includes("name")) setError("name", { type: "server", message: msg });
        });
      } catch {}
    },
  });

  const onSubmit = async (data: Client) => {
    const payload: Client = {
      name: data.name,
      salary: Number(data.salary),
      companyValuation: Number(data.companyValuation),
    };
    await mutation.mutateAsync(payload);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return {
    control,
    isModalOpen,
    onSubmit: handleSubmit(onSubmit),
    openModal,
    closeModal,
    isLoading: mutation.isPending,
  };
};


