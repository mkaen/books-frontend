<template>
  <div class="page">
    <h1>All the Books</h1>
  </div>
    <book-list></book-list>
</template>

<script setup>
import { onMounted } from "vue";
import { useBooksStore, useSearchStore } from "@/store";
import BookList from "@/components/book/BookList.vue";
import {onBeforeRouteLeave} from "vue-router";

const bookStore = useBooksStore();
const searchStore = useSearchStore();

onMounted(() => {
  bookStore.fetchBooks();
});
onBeforeRouteLeave(() => {
  searchStore.searchInput = "";
})
</script>

<style scoped>

</style>
