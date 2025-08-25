import axios from 'axios'

import { API_BASE, API_ENDPOINTS } from "@/constants";

const userRoute = API_BASE + API_ENDPOINTS.user
const booksRoute = API_BASE + API_ENDPOINTS.books


const user_api = axios.create({
    baseURL: userRoute,
    withCredentials: true
});

const book_api = axios.create({
    baseURL: booksRoute,
    withCredentials: true
})

export {user_api};
export {book_api};