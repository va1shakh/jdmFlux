import axios from 'axios'
const API_URL = "https://jdmflux-api.onrender.com/orders";

export const changeStatus = async ({id, value}) => {
    const res = await axios.patch(`${API_URL}/${id}`, {status: value})
    return res.data;
}