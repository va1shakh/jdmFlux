import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dltUser } from "../api/dltUser";
import { toast } from "sonner";

export function useDltUser(){
    const queryClient = useQueryClient();
    const dltUserMutation = useMutation({
        mutationFn: dltUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"]
            })
            toast.success("User account has been deleted");
        },
        onError: () => {
            toast.error("something went wrong");
        }
    });

    const handleDltUser = (id) => {
        dltUserMutation.mutate(id);
    }

    return handleDltUser;
}