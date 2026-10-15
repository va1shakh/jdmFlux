import { useMutation, useQueryClient } from "@tanstack/react-query";
import { restoreAll } from "../api/restoreAll";
import Swal from "sweetalert2";

export function useRestoreAll(){
    const queryClient = useQueryClient();
    const restoreAllMutation = useMutation({
        mutationFn: restoreAll,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"]
            })
            Swal.fire({
                title: "All Products Restored",
                text: "All products have been successfully restored",
                icon: "success",
                confirmButtonText: "Done",
                confirmButtonColor: "#0057ff"
            })
        },
        onError: () => {
            Swal.fire({
                title: "All Products Restored",
                text: "All products have been successfully restored",
                icon: "error",
                confirmButtonText: "Done",
                confirmButtonColor: "#b50e02"
            })
        }
    })

    const handleRestoreAll = (products) => {
        restoreAllMutation.mutate(products)
    }

    return handleRestoreAll;
}