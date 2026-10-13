import axios from 'axios'

const API_URL = "http://localhost:3000/users"

export const getUsers = async () => {
    const res = await axios.get(API_URL);
    return res.data.filter((user) => user.role === 'customer')
}