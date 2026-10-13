import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProduct } from "../api/editProduct";
import { toast } from "sonner";
import Swal from "sweetalert2";

export function useEditProduct(onClose) {
  const queryClient = useQueryClient();
  const editProductMutation = useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      (queryClient.invalidateQueries({
        queryKey: ["products"],
      }),
        Swal.fire({
          title: "Product Updated",
          text: "Your product has been successfully updated",
          icon: "success",
          confirmButtonText: "Done",
          confirmButtonColor: "#0057ff",
        }));
        onClose();
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleEditProduct = ({ e, id, stock, price }) => {
    e.preventDefault();
    editProductMutation.mutate({
      id,
      stock,
      price,
    });
  };

  return handleEditProduct;
}
