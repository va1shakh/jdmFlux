import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getWishlist } from "../api/wishlist/getWishlist";

export function useGetWishlist(){
    const user = useSelector((state) => state.auth.user);

    return useQuery({
    queryKey: ["wishlist", user?.id],
    queryFn: () => getWishlist(user.id),
    enabled: !!user,
  });
}