import axios from 'axios'
const API_URL = "https://jdmflux-api.onrender.com/users";

export const dltUser = async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data
}