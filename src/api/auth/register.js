import axios from 'axios'

const API_URL = "http://localhost:3000/users";

export const register = async (formData) => {
    const res = await axios.get(API_URL);
    // check username taken
    if(res.data.some((user) => user.username === formData.username)){
        throw new Error("Username already taken");
    }

    // check account already exist
    if(res.data.some((user) => user.email === formData.email)){
        throw new Error("Your already have an account");
    }

    await axios.post(API_URL, formData);
}