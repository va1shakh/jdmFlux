import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct } from "../api/addProduct";
import Swal from "sweetalert2";
import { toast } from "sonner";

export function useAddProduct(onClose) {
  const queryClient = useQueryClient();
  const addProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      Swal.fire({
        title: "Product Added",
        text: "Your product has been added successfully.",
        icon: "success",
        confirmButtonText: "Done",
        confirmButtonColor: "#0057ff",
      });
      onClose();
    },
    onError: () => {
      toast.error("something went wrong");
    },
  });

  const handleAddProduct = (e, product) => {
    e.preventDefault();
    addProductMutation.mutate(product);
  };

  return handleAddProduct;
}
