import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useBooksStore } from '@/store'

export const useSearchStore = defineStore('search', () => {
    const searchInput = ref('');
    const bookStore = useBooksStore();

    const getFilteredBooks = computed(() => {
        const query = searchInput.value.toLowerCase()
        if (!query || query.length < 2) {
            return bookStore.allBooks
        }
        return bookStore.allBooks.filter(
            (book) =>
                book.title.toLowerCase().includes(query) ||
                book.author.toLowerCase().includes(query)
        )
    });
    const hasSearchResults = computed(() => bookStore.bookList && getFilteredBooks.value.length > 0)
    return { searchInput, getFilteredBooks, hasSearchResults }
});