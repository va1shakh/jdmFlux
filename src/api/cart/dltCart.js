import axios from 'axios'

const API_URL = "http://localhost:3000/carts"

export const dltCart = async (cartId) => {
    const res = await axios.delete(`${API_URL}/${cartId}`);
    return res.data;
}