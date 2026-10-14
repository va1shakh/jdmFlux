import axios from 'axios'
const API_URL = "http://localhost:3000/products";

export const updateDeleteStatus = async ({id, isDeleted}) => {
    const res = await axios.patch(`${API_URL}/${id}`, {isDeleted});
    return res.data;
}