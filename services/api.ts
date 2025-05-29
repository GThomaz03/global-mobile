import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://IpAddress:3000/api'
})