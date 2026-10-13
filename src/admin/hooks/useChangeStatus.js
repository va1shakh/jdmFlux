import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeStatus } from "../api/changeStatus";
import { toast } from "sonner";

export function useChangeStatus(){
    const queryClient = useQueryClient();
    const changeStatusMutation = useMutation({
        mutationFn: changeStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["orders", "admin"]
            })
        },
        onError: () => {
            toast.error("Something went wrong");
        }
    })

    const handleStatusChange = ({id, value}) => {
        changeStatusMutation.mutate({id, value})
    }
    
    return handleStatusChange;
}