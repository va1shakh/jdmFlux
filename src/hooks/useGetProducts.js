import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/getProducts";

export function useGetProducts(){
    return useQuery({
    queryKey: ["products"],
    queryFn: getProducts
  });
}