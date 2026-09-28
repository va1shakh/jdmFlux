import axios from 'axios'

const API_URL = "http://localhost:3000/carts"

export const cartQuanityUpdater = async ({ cartId, quantity }) => {
   const res = await axios.patch(`${API_URL}/${cartId}`, {quantity});
   return res.data;
}