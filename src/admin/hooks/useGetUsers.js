import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/getUsers";

export function useGetUsers(){
    return useQuery({
        queryKey: ["users"],
        queryFn: getUsers
    })
}