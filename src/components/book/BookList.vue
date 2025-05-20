<template>
  <ul>
    <book-item v-for="book in bookStore.bookList"
               :key="book.id"
               :title="book.title"
               :id="book.id"
               :author="book.author"
               :description="book.description"
               :img="book.img"
               :owner-id="book.ownerId"
               :reserved="book.reservedBooks">
    </book-item>
  </ul>
</template>

<script setup>
import { useBooksStore } from "@/store";
const bookStore = useBooksStore();
import BookItem from "@/components/book/BookItem.vue";
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