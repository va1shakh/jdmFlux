import { useQuery } from "@tanstack/react-query";
import { getUsersOrders } from "../api/getUsersOrders";

export function useGetUsersOrders(){
    return useQuery({
        queryKey: ["orders", "admin"],
        queryFn: getUsersOrders
    })
}