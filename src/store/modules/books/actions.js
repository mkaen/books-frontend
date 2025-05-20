import axios from 'axios';

export default {
    async addNewBook(context, data) {
        const userId = context.rootGetters.userId;
        const bookData = {
            title: data.title,
            author: data.author,
            imageUrl: data.imageUrl
        };
        try {
            const response = await axios.post('http://localhost:5001/add_book', bookData);

            if (response.status === 201) {
                console.log(`Successfully added new book: ${bookData.title}`)
            }
        } catch (error) {
            console.log('Error while adding new book:', error)
        }
        context.commit('addBook', {
            ...bookData,
            id: userId
        });
    },
    async getAllBooks(context) {
        const userId = context.rootGetters.userId;
        try {
            const response = await axios.get('http://localhost:5001/get_books');
            if (response.status === 201) {
                console.log(`Successful response to get all the books, response data: ${response.data}`);
            }
        } catch (error) {
            console.log(`Got error while trying to import all the books: ${error}`)
        }

        context.commit('getBooks', {
            id: userId
        });
    }
};