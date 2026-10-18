import axios from 'axios'
const API_URL = "https://jdmflux-api.onrender.com/wishlist";

export const addWishlist = async (wishlistItem) => {
    const res = await axios.post(API_URL, wishlistItem);
    return res.data;
}