import axios from 'axios'
const API_URL = "http://localhost:3000/users";

export const dltUser = async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data
}