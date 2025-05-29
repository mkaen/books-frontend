import { defineStore } from "pinia";
import actions from "@/store/modules/books/actions";

export const useBooksStore = defineStore('books', {
    state: () => ({
        bookList: [],
    }),
    getters: {
        allBooks: (state) => state.bookList
    },
    actions
})
