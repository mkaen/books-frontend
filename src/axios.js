import axios from 'axios'

const user_api = axios.create({
    baseURL: 'http://127.0.0.1:5001/user_api',
    withCredentials: true
});
const book_api = axios.create({
    baseURL: 'http://127.0.0.1:5001/book_api',
    withCredentials: true
})

export {user_api};
export {book_api};