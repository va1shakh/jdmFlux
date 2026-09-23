import axios from 'axios'
const API_URL = "http://localhost:3000/wishlist";

export const addWishlist = async (wishlistItem) => {
    const res = await axios.post(API_URL, wishlistItem);
    return res.data;
}