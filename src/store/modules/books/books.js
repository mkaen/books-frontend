import { defineStore } from "pinia";
import actions from "@/store/modules/books/actions";

export const useBooksStore = defineStore('books', {
    state: () => ({
        bookList: [],
        myBookList: [],
        myReservedBooks: []
    }),
    getters: {
        allBooks: (state) => state.bookList,
        myBooks: (state) => state.myBookList,
        reservedBooks: (state) => state.myReservedBooks
    },
    actions
});
