import axios from 'axios'

const API_URL = "http://localhost:3000/carts";

export const addToCart = async (cartItem) => {
    const res = await axios.post(API_URL, cartItem);
    return res.data;
}