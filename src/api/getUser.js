import axios from 'axios';

const API_URL = "https://jdmflux-api.onrender.com/users"

export const getUser = async (userId) => {
    const res = await axios.get(`${API_URL}/${userId}`);
    return res.data;
    
}