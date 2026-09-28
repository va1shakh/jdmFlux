import axios from 'axios'
const API_URL = "http://localhost:3000/orders"

export const makeOrder = async (orderItem) => {
    const res = await axios.post(API_URL, orderItem);
    return res.data;
} 