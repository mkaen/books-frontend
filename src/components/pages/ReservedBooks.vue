<template>
  <div class="page">
    <h1>My Reserved Books</h1>
  </div>
  <reserved-books-list></reserved-books-list>
</template>

<script setup>
import ReservedBooksList from "@/components/book/ReservedBooksList.vue";
import {onMounted} from "vue";
import { useBooksStore, useUserStore } from "@/store";

const bookStore = useBooksStore();
const userStore = useUserStore();


onMounted(() => {
  bookStore.fetchReservedBooksById(userStore.userId);
});
</script>


<style scoped>

</style>