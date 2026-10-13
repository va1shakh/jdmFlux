import axios from 'axios'
const API_URL = "http://localhost:3000/products"

export const addProduct = async (product) => {
    const res = await axios.post(API_URL, product);
    return res.data;
}