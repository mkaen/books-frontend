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
               :reserved="book.reserved"
               @update-reserved="updateReserved">
    </book-item>
  </ul>
</template>

<script setup>
import { useSearchStore,useBooksStore } from "@/store";
import BookItem from "@/components/book/BookItem.vue";
const searchStore = useSearchStore();
const bookStore = useBooksStore();

async function updateReserved(id) {
  try {
    await bookStore.reserveBook(id);
  } catch (error) {
    console.error(`Reservation for book id: ${this.id} FAILED`, error);
  }
}
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