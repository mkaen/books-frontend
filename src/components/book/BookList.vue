<template>
  <ul>
    <book-item v-for="book in getFilteredBooks"
               :key="book.id"
               :title="book.title"
               :id="book.id"
               :author="book.author"
               :description="book.description"
               :img="book.img"
               :overdue="book.overdue"
               :owner-id="book.ownerId"
               :reserved="book.reservedBooks">
    </book-item>
  </ul>
</template>

<script setup>
import { useBooksStore, useSearchStore } from "@/store";
const bookStore = useBooksStore();
const searchStore = useSearchStore();
import BookItem from "@/components/book/BookItem.vue";
import { computed } from "vue";

const getFilteredBooks = computed(() => {
  const query = searchStore.searchInput.toLowerCase();
  if (!query) {
    return bookStore.allBooks;
  } else {
    return bookStore.allBooks.filter(book => book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query));
  }
});
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>