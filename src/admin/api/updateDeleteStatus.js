import axios from 'axios'
const API_URL = "https://jdmflux-api.onrender.com/products";

export const updateDeleteStatus = async ({id, isDeleted}) => {
    const res = await axios.patch(`${API_URL}/${id}`, {isDeleted});
    return res.data;
}