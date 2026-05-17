import { book_api } from "@/configuration/axios";
import { Book } from "@/models/Book";
import {
    bookActivation,
    cancelReservationHelper,
    receiveBookHelper,
    reserveBookHandler,
    returnBookHandler
} from "@/utils/api-utils"

export default {
    async fetchBooks() {
        try {
            const response = await book_api.get('/fetch_books');
            const data = await response.data
            this.bookList = data.map(bookData => new Book(bookData));
        } catch (error) {
            console.log('Failed to fetch books', error)
        }
    },
    async fetchCurrentUserBooks(userId) {
      try {
          const response = await book_api.get(`/user_books/${userId}`);
          if (response.status === 200) {
              const data = response.data;
              this.myBookList = data.map(bookData => new Book(bookData));
          } else {
              console.log(`Unable to fetch user id: ${userId} books`, 400)
          }
      } catch (error) {
          console.log('Failed to fetch current user books', error)
      }
    },
    async fetchReservedBooksById(userId) {
        try {
            const response = await book_api.get(`/reserved_books/${userId}`);
            if (response.status === 200) {
                this.myReservedBooks = response.data.map(bookData => new Book(bookData));
            }
        } catch (error) {
            console.log(`Failed to fetch current user reserved books. Error: ${error}`)
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
                this.myBookList = this.myBookList.filter(book => book.id !== bookId);
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
                await reserveBookHandler(id, this);
            }
        } catch (error) {
            console.log('Failed to reserve book', error)
        }
    },
    async cancelReservation(bookId) {
        try {
            const response = await book_api.patch(`/cancel_reservation/${bookId}`);
            if (response.status === 200) {
                cancelReservationHelper(bookId, this);
            }
        } catch (error) {
            console.log(`Failed to cancel reservation book id: ${bookId}`, error)
        }
    },
    async receiveBook(bookId) {
        try {
            const response = await book_api.patch(`/receive_book/${bookId}`);
            if (response.status === 200) {
                const returnDateStr = response.data.returnDate;
                receiveBookHelper(returnDateStr, bookId, this);
            }
        } catch (error) {
            console.error(`Failed to mark as received book id ${bookId}`, error);
        }
    },
    async returnBook(bookId) {
        try {
            const response = await book_api.patch(`/return_book/${bookId}`);
            if (response.status === 200) {
                returnBookHandler(bookId, this);
            }
        } catch (error) {
            console.error(`Failed to return book id ${bookId}`, error);
        }
    },
    async bookActivityHandle(bookId) {
        try {
            const response = await book_api.patch(`/activity/${bookId}`);
            if (response.status === 200) {
                const responseData = response.data.data;
                bookActivation(responseData,bookId,this.bookList);
            }
        } catch (error) {
            console.error('Failed to activate book', error);
        }
    },
};