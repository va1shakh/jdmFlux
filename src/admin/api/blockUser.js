import axios from 'axios'
const API_URL = "https://jdmflux-api.onrender.com/users"

//unblock also
export const blockUser = async ({id, status}) => {
    const res = await axios.patch(`${API_URL}/${id}`, {status});
    return res.data;
} 