<template>
  <ul>
    <book-item v-for="book in searchStore.getFilteredBooks"
               :key="book.id"
               :title="book.title"
               :id="book.id"
               :author="book.author"
               :description="book.description"
               :img="book.img"
               :overdue="book.isOverdue"
               :owner-id="book.ownerId"
               :reserved="book.reservedBooks">
    </book-item>
  </ul>
</template>

<script setup>
import { useSearchStore } from "@/store";
import BookItem from "@/components/book/BookItem.vue";
const searchStore = useSearchStore();
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 3rem;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>