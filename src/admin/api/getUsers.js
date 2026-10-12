import axios from 'axios'

const API_URL = "http://localhost:3000/users"

export const getUsers = async ({debSearch, filter, sort}) => {
    const res = await axios.get(API_URL);

    let users = res.data.filter((user) => user.role === 'customer');

    if(debSearch.trim() !== ''){
        users = users.filter((user) => user.username.includes(debSearch.toLowerCase()))
    }

    if(filter !== 'all'){
        users = users.filter((user) => user.status === filter)
    }

    if(sort === 'newest'){
        users = users.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    else if(sort === 'oldest'){
        users = users.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    return users;
}