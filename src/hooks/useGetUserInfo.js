import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getUser } from "../api/getUser";

export function useGetUserInfo(){
    const user = useSelector((state) => state.auth.user);
    
    return useQuery({
        queryKey: ["user", user?.id],
        queryFn: () => getUser(user.id),
        enabled: !!user
    })
}