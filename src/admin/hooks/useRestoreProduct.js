import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDeleteStatus } from "../api/updateDeleteStatus";
import Swal from "sweetalert2";

export function useRestoreProduct() {
  const queryClient = useQueryClient();
  const restoreProductMutation = useMutation({
    mutationFn: updateDeleteStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      Swal.fire({
        title: "Product Restored",
        text: "Product has been successfully restored",
        icon: "success",
        confirmButtonText: "Done",
        confirmButtonColor: "#0057ff",
      });
    },
    onError: () => {
      Swal.fire({
        title: "Unable to Restore",
        text: "Something went wrong",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#b50e02",
      });
    },
  });

  const handleRestoreProduct = (id) => {
    restoreProductMutation.mutate({ id, isDeleted: false });
  };

  return handleRestoreProduct;
}
