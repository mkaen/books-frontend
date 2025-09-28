<template>
  <div class="page">
    <h1>My Books</h1>
  </div>
  <my-book-list></my-book-list>
</template>

<script setup>
import MyBookList from "@/components/book/MyBookList.vue";
import { onMounted } from "vue";
import { useBooksStore, useUserStore } from "@/store";

const bookStore = useBooksStore();
const userStore = useUserStore();

onMounted(async () => {
  if (userStore.userId) {
    await bookStore.fetchMyBooks(userStore.userId);
  }
});

</script>


<style scoped>

</style>