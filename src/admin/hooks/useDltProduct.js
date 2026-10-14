import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dltProduct } from "../api/dltProduct";
import Swal from "sweetalert2";

export function useDltProduct(){
    const queryClient = useQueryClient();
    const dltProductMutation = useMutation({
        mutationFn: dltProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"]
            })
            Swal.fire({
                title: "Product Deleted",
                text: "Product has been deleted Permanently",
                icon: "success",
                confirmButtonText: "Done",
                confirmButtonColor: "#0057ff"
            })
        },
        onError: () => {
             Swal.fire({
                title: "Unable to Deleted",
                text: "Something went wrong",
                icon: "error",
                confirmButtonText: "Done",
                confirmButtonColor: "#0057ff"
            })
        }
    })

    const handleDltProduct = (id) => {
        dltProductMutation.mutate(id);
    }
    return handleDltProduct;
}