import axios from 'axios';

const API_URL = "http://localhost:3000/users"

export const getUser = async (userId) => {
    const res = await axios.get(`${API_URL}/${userId}`);
    return res.data;
    
}