import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "../api/services/customers";
import type { Client } from "../api/types/customers";
import toast from "react-hot-toast";

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  const { control, handleSubmit, reset } = useForm<Client>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      toast.success("Cliente criado com sucesso!");
      setIsModalOpen(false);
      reset();
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: () => {
      toast.error("Ocorreu um erro ao criar o cliente.");
    },
  });

  const onSubmit = (data: Client) => {
    const payload = {
      name: data.name,
      salary: Number(data.salary),
      companyValuation: Number(data.companyValuation),
    };
    mutation.mutate(payload);
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
