import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://world-bank-1dc90.firebaseio.com/'
})

export default instance;