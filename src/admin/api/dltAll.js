import { dltProduct } from "./dltProduct";

export function dltAll(products){
    return Promise.all(
        products.map((product) => dltProduct(product.id))
    )
}