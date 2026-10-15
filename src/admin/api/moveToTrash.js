import axios from 'axios'
const API_URL = "http://localhost:3000/products";

export const moveToTrash = async () => {
    const res = await axios.patch(`${API_URL}/${id}`, {idDeleted: true})
}