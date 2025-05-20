<template>
  <h1>My Reserved Books</h1>
  <reserved-books-list></reserved-books-list>
</template>

<script setup>
import ReservedBooksList from "@/components/book/ReservedBooksList.vue";
import {onMounted} from "vue";
import {useBooksStore} from "@/store";
const bookStore = useBooksStore();

onMounted(() => {
  bookStore.fetchBooks();
})
</script>


<style scoped>

</style>