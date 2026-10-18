import axios from 'axios'

const API_URL = "https://jdmflux-api.onrender.com/users"

export const getUsers = async () => {
    const res = await axios.get(API_URL);
    return res.data.filter((user) => user.role === 'customer')
}