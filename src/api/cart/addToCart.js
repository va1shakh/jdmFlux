import axios from 'axios'

const API_URL = "https://jdmflux-api.onrender.com/carts";

export const addToCart = async (cartItem) => {
    const res = await axios.post(API_URL, cartItem);
    return res.data;
}