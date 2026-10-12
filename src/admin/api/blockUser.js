import axios from 'axios'
const API_URL = "http://localhost:3000/users"

//unblock also
export const blockUser = async ({id, status}) => {
    const res = await axios.patch(`${API_URL}/${id}`, {status});
    return res.data;
} 