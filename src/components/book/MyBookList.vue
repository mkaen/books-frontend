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
    <h5 v-if="bookStore.myBooks.length === 0">No books added</h5>
    <ul v-else class="list-unstyled">
      <my-book-item v-for="book in bookStore.myBooks"
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
import { ref} from "vue";
const userStore = useUserStore();
const bookStore = useBooksStore();

const duration = ref(userStore.lendingDuration);

async function durationHandler() {
  if (duration.value !== userStore.duration) {
    console.log("Set duration:", duration.value);
    alert(`Lending duration set to: ${duration.value}`);
    await userStore.setLendingDuration(duration.value);
  }
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
h5 {
  display: flex;
  justify-content: center;
  color: red;
  font-weight: normal;
}
</style>