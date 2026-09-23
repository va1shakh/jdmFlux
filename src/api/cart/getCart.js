import axios from 'axios'

const API_URL = "http://localhost:3000/carts";

export const getCart = async (userId) => {
    const res = await axios.get(`${API_URL}?userId=${userId}`);
    return res.data;
}