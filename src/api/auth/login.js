import axios from 'axios'
const API_URL = "http://localhost:3000/users";

export const login = async ({ email, password }) => {
    const res = await axios.get(`${API_URL}?email=${email}&password=${password}`);
    if(res.data.length === 0){
        throw new Error("Incorrect email or password");
    }
    if(res.data[0].status === 'blocked'){
        throw new Error("You are blocked :(");
    }
    return res.data[0];
}