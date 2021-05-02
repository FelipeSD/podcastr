import axios from 'axios';
export const api = axios.create({
    baseURL: process.env.SERVER_URL // config at next.config.js
})