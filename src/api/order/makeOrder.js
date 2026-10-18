import axios from 'axios'
const API_URL = "https://jdmflux-api.onrender.com/orders"

export const makeOrder = async (orderItem) => {
    const res = await axios.post(API_URL, orderItem);
    return res.data;
} 