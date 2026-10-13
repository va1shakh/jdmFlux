import axios from 'axios'
const API_URL = "http://localhost:3000/products"

export const editProduct = async ({id, stock, price}) => {
    const res = await axios.patch(`${API_URL}/${id}`, {stock, price})
    return res.data;
}