import {book_api} from "@/axios";

export default {
    async fetchBooks() {
        try {
            const response = await book_api.get('/fetch_books');
            this.bookList = response.data;
        } catch (error) {
            console.log(error)
        }
    },
    async addNewBook(payload) {
        try {
            const response = await book_api.post('/add_new_book', payload);
            if (response.status === 201) {
                this.bookList.push(response.data.data)
                return true;
            }
        } catch (error) {
            console.log(`Failed to send book data. Book data: ${JSON.stringify(payload)}`, error);
        }
    },
    async removeBook(bookId) {
        try {
            const response = await book_api.delete(`/remove_book/${bookId}`);
            if (response.status === 200) {
                this.bookList = this.bookList.filter(book => book.id !== bookId);
                return true;
            }
        } catch (error) {
            console.log("Failed to remove book", error)
        }
    },
    async reserveBook(id) {
        try {
            const response = await book_api.patch(`/reserve_book/${id}`)
            if (response.status === 200) {
                const responseData = response.data.data;
                for (const book in this.bookList) {
                    if (book.id === responseData.id) {
                        book["reserved"] = true;
                        book["lenderId"] = responseData.lenderId;
                    }
                }
                return true;
            }
        } catch (error) {
            console.log(error)
        }
    },
    async cancelReservation(bookId) {
        try {
            const response = await book_api.patch(`/cancel_reservation/${bookId}`);
            if (response.status === 200) {
                for (const key in this.bookList) {
                    const book = this.bookList[key];
                    if (book.id === bookId) {
                        book["reserved"] = false;
                        book["lenderId"] = null;
                    }
                }
                return true;
            }
        } catch (error) {
            console.log(`Failed to cancel reservation book id: ${bookId}`, error)
        }
    },
    async receiveBook(bookId) {
        try {
            const response = await book_api.patch(`/receive_book/${bookId}`);
            if (response.status === 200) {
                for (const key in this.bookList) {
                    const book = this.bookList[key];
                    if (book.id === bookId) {
                        book["lentOut"] = true;
                    }
                }
                return true;
            }
        } catch (error) {
            console.error(`Cannot 'mark as received' book id ${bookId}`);
        }
    },
    async returnBook(bookId) {
        try {
            console.log(bookId)
            const response = await book_api.patch(`/return_book/${bookId}`);
            console.log(response.status)
            if (response.status === 200) {
                for (const key in this.bookList) {
                    const book = this.bookList[key];
                    if (book.id === bookId) {
                        book["lentOut"] = false;
                        book["reserved"] = false;
                        book["lenderId"] = null;
                    }
                }
                return true;
            }
        } catch (error) {
            console.error(`Cannot return book id ${bookId}`);
        }
    },
    async bookActivityHandle(bookId) {
        try {
            const response = await book_api.patch(`/activity/${bookId}`);
            if (response.status === 200) {
                const responseData = response.data.data;
                console.log(`Successfully changed book activity to ${responseData}`);
                // const book = this.bookList.find(b => b.id === this.id);
                // console.log(book.id)
                for (const key in this.bookList) {
                    const book = this.bookList[key];
                    if (book.id === bookId) {
                        book["isActive"] = responseData;
                        return true;
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
};