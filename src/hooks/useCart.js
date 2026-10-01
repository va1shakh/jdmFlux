import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getCart } from "../api/cart/getCart";
import { useNavigate } from "react-router";
import { addToCart } from "../api/cart/addToCart";
import { cartQuanityUpdater } from "../api/cart/cartQuanityUpdater";
import { toast } from "sonner";

function useCart(){
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: carts = [] } = useQuery({
    queryKey: ["carts", user?.id],
    queryFn: () => getCart(user.id),
    enabled: !!user?.id,
  });

   const addToCartMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ["carts"]
        })
      navigate("/cart");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const quanityUpdateMutation = useMutation({
    mutationFn: cartQuanityUpdater,
    onSuccess: () => {
      navigate("/cart");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleCartClick = (product) => {
    if(!user){
      navigate('/login');
      return;
    }
    const cartItem = carts.find((cart) => product.id === cart.productId);
    if (cartItem) {
      quanityUpdateMutation.mutate({
        cartId: cartItem.id,
        quantity: cartItem.quantity + 1,
      });
    } else {
      addToCartMutation.mutate({
        userId: user.id,
        name: product.name,
        brand: product.brand,
        category: product.category,
        price: product.price,
        image: product.image,
        productId: product.id,
        stock: product.stock,
        quantity: 1,
      });
    }
  };

  return { handleCartClick };
}
export default useCart