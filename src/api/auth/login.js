import axios from 'axios'
const API_URL = "http://localhost:3000/users";

export const login = async ({ email, password }) => {
    const res = await axios.get(`${API_URL}?email=${email}&password=${password}`);
    if(res.data.length === 0){
        throw new Error("Incorrect email or password");
    }
    else return res.data[0];
}