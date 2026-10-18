import axios from 'axios';
const API_URL = "https://jdmflux-api.onrender.com/wishlist";

export const getWishlist = async (userId) => {
    const res = await axios.get(`${API_URL}?userId=${userId}`);
    return res.data;
}