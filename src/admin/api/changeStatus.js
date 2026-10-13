import axios from 'axios'
const API_URL = "http://localhost:3000/orders";

export const changeStatus = async ({id, value}) => {
    const res = await axios.patch(`${API_URL}/${id}`, {status: value})
    return res.data;
}