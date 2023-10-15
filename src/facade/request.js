import axios from "axios"

async function getRequest(url) {
    const res = await axios.get(url);    
    return res.data;
}

export {
    getRequest,
}