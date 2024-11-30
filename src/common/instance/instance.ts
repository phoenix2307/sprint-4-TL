import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        Authorization: 'Bearer 134f0918-8765-4389-99d5-e97a27c472d5',
        'API-KEY': '8d201fb1-33ed-4ec9-a013-6de2e03bc35f',
    }
})