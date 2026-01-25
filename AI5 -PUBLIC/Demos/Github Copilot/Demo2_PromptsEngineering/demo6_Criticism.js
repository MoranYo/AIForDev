const axios = require('axios');

// write a function that send a HTTP GET request to a server that retuerns 
 // an array of User objects

async function fetchUsers(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}