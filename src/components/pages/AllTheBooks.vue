<template>
  <h1>All the Books</h1>
    <book-list></book-list>
</template>

<script setup>
import { onMounted } from "vue";
import { useBooksStore } from "@/store";
import BookList from "@/components/book/BookList.vue";

const bookStore = useBooksStore();

onMounted(() => {
  bookStore.fetchBooks();
})
</script>

<style scoped>

</style>
