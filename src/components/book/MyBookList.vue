<template>
  <base-card>
    <div class="container duration-range">
      <label for="customRange3" class="form-label">Lending Duration</label>
      <input type="range" class="form-range" min="7" max="92" step="1" id="customRange3" v-model="duration">
      <span>Days: {{duration}}</span>
      <div>
        <button type="submit" class="btn btn-outline-primary mt-1" @click="durationHandler">Set</button>
      </div>
      <hr>
    </div>
    <ul class="list-unstyled">
      <my-book-item v-for="book in myBooksList"
                    :key="book.id"
                    :id="book.id"
                    :title="book.title"
                    :author="book.author"
                    :is-active="book.isActive"
                    :reserved="book.reserved"
                    :img="book.img"
                    :duration="userStore.duration"
                    @remove-book="removeBook"
                    @book-activity="activityToggle">
      </my-book-item>
    </ul>
  </base-card>
</template>

<script setup>
import MyBookItem from "@/components/book/MyBookItem.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import { useUserStore, useBooksStore } from "@/store";
import { computed, ref } from "vue";
const userStore = useUserStore();
const bookStore = useBooksStore();

const duration = ref(userStore.lendingDuration);

const myBooksList = computed(() => {
  return bookStore.allBooks.filter(b => b.ownerId === userStore.userId);
});
async function durationHandler() {
  console.log("Set duration:", duration.value);
  userStore.duration = duration.value;
  const success = await userStore.setLendingDuration(duration.value);
  console.log(success)
}
async function activityToggle(data) {
  await bookStore.bookActivityHandle(data);
}

async function removeBook(bookId) {
  await bookStore.removeBook(bookId);
}

</script>

<style scoped>
.duration-range {
  padding: 1rem 2rem;
  margin: 2rem auto;
}
</style>