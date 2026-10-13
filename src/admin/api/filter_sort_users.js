export function filter_sort_users({users, debSearch, filter, sort}){
    let filteredSortedUsers = users;

    if(debSearch.trim() !== ''){
        const search = debSearch.trim().toLowerCase();
        filteredSortedUsers = filteredSortedUsers.filter((user) => user.username.includes(search))
    }

    if(filter !== 'all'){
        filteredSortedUsers = filteredSortedUsers.filter((user) => user.status === filter)
    }

    if(sort === 'newest'){
        filteredSortedUsers = filteredSortedUsers.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    else if(sort === 'oldest'){
        filteredSortedUsers = filteredSortedUsers.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    return filteredSortedUsers;
}