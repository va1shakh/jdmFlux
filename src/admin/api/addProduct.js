import axios from 'axios'
const API_URL = "https://jdmflux-api.onrender.com/products"

export const addProduct = async (product) => {
    const res = await axios.post(API_URL, product);
    return res.data;
}