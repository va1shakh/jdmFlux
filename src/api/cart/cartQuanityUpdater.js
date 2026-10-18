import axios from 'axios'

const API_URL = "https://jdmflux-api.onrender.com/carts"

export const cartQuanityUpdater = async ({ cartId, quantity }) => {
   const res = await axios.patch(`${API_URL}/${cartId}`, {quantity});
   return res.data;
}