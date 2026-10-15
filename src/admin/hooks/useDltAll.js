import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dltAll } from "../api/dltAll";
import Swal from "sweetalert2";

export function useDltAll() {
  const queryClient = useQueryClient();
  const dltAllMutation = useMutation({
    mutationFn: dltAll,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      Swal.fire({
        title: "Products Deleted",
        text: "All products have been deleted permanently.",
        icon: "success",
        confirmButtonText: "Done",
        confirmButtonColor: "#0057ff",
      });
    },
    onError: () => {
      Swal.fire({
        title: "Unable to delete",
        text: "Something went wrong.",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#b50e02",
      });
    },
  });

  const handleDltAll = (products) => {
    dltAllMutation.mutate(products);
  }

  return handleDltAll;
}
