import axios from 'axios'
const API_URL = "https://jdmflux-api.onrender.com/orders";

export const getOrder = async (userId) => {
    const res = await axios.get(`${API_URL}?userId=${userId}`);
    return res.data;
}