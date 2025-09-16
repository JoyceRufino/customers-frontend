import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "../api/services/customers";
import type { Client } from "../api/types/customers";
import toast from "react-hot-toast";

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  const { control, handleSubmit, reset, setError } = useForm<Client>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      toast.success("Cliente criado com sucesso!");
      setIsModalOpen(false);
      reset();
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (error: unknown) => {
      toast.error("Ocorreu um erro ao criar o cliente.");

      try {
        const err = error as {
          response?: { data?: { message?: string[] | string } };
        };
        const messages = err.response?.data?.message;
        const arr = Array.isArray(messages)
          ? messages
          : messages
          ? [messages]
          : [];
        arr.forEach((msg) => {
          const lower = String(msg).toLowerCase();
          if (lower.includes("salary")) {
            setError("salary", { type: "server", message: msg });
          }
          if (lower.includes("companyvaluation")) {
            setError("companyValuation", { type: "server", message: msg });
          }
          if (lower.includes("name")) {
            setError("name", { type: "server", message: msg });
          }
        });
      } catch {}
    },
  });

  const onSubmit = async (data: Client) => {
    const payload = {
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
