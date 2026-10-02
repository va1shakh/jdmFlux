import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getWishlist } from "../api/wishlist/getWishlist";
import { addWishlist } from "../api/wishlist/addWishlist";
import { toast } from "sonner";
import { dltWishlist } from "../api/wishlist/dltWishlist";
import { useNavigate } from "react-router";

function useWishlist(){
    const user = useSelector((state) => state.auth.user);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: wishlist = [] } = useQuery({
    queryKey: ["wishlist", user?.id],
    queryFn: () => getWishlist(user.id),
    enabled: !!user?.id,
  });

  const wishlistMutation = useMutation({
    mutationFn: addWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist", user?.id]
      })
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const dltWishlistMutation = useMutation({
    mutationFn: dltWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist", user?.id]
      })
    },
    onError: () => {
      toast.error("Something went wrong");
    }
  });
  const handleWishlist = (product) => {
    if(!user){
      navigate('/login');
      return;
    }
    const wishlistItem = wishlist.find((item) => item.productId === product.id);
    if (wishlistItem) {
      dltWishlistMutation.mutate(wishlistItem.id);
    } else {
      wishlistMutation.mutate({
        userId: user?.id,
        productId: product.id,
      });
    }
  };

  return {handleWishlist, wishlist};
}
export default useWishlist