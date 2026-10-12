import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getCart } from "../api/cart/getCart";

export function useGetCart(){
    const user = useSelector((state) => state.auth.user);

    return useQuery({
    queryKey: ["carts", user?.id],
    queryFn: () => getCart(user.id),
    enabled: !!user,
  });
}