import axios from 'axios'

const API_URL = "https://jdmflux-api.onrender.com/carts"

export const dltCart = async (cartId) => {
    const res = await axios.delete(`${API_URL}/${cartId}`);
    return res.data;
}