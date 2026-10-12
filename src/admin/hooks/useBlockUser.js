import { useMutation, useQueryClient } from "@tanstack/react-query";
import { blockUser } from "../api/blockUser";
import { toast } from "sonner";

export function useBlockUser(){
    const queryClient = useQueryClient();
    const blockMutation = useMutation({
        mutationFn: blockUser,
        onSuccess: (user) => {
            queryClient.invalidateQueries({
                queryKey: ["users"]
            })

            if(user.status === "blocked"){
                toast.success(`${user.username} has been blocked`);
            }
            else{
                toast.success(`${user.username} has been unblocked`);
            }
        },
        onError: () => {
            toast.error("something went wrong");
        }
    })

    const handleBlock = ({id, status}) => {
        blockMutation.mutate({id, status});
    }

    return handleBlock;
}