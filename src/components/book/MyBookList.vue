<template>
  <base-card>
    <ul class="list-unstyled">
      <my-book-item v-for="book in myBooksList"
                    :key="book.id"
                    :id="book.id"
                    :title="book.title"
                    :author="book.author"
                    :available="book.available"
                    :reserved="book.reserved"
                    :img="book.img"
                    :duration="userStore.duration">
      </my-book-item>
    </ul>
  </base-card>
</template>

<script setup>
import MyBookItem from "@/components/book/MyBookItem.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import { useUserStore, useBooksStore } from "@/store";
import { computed } from "vue";
const userStore = useUserStore();
const bookStore = useBooksStore();

const myBooksList = computed(() => {
  return bookStore.allBooks.filter(b => b.ownerId === userStore.userId);
});

</script>

<style scoped>

</style>