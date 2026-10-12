import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/getUsers";

export function useGetUsers({debSearch, filter, sort}){
    return useQuery({
        queryKey: ["users", debSearch, filter, sort],
        queryFn: () => getUsers({debSearch, filter, sort})
    })
}