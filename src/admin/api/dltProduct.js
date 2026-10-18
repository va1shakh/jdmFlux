import axios from 'axios'
const API_URL = "https://jdmflux-api.onrender.com/products"

export const dltProduct = async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
}