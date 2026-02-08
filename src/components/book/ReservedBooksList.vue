<template>
  <base-card>
    <h5 v-if="!hasBooks">You haven't reserved any book yet</h5>
    <ul v-else class="list-group">
      <reserved-book-item v-for="book in reservedBooks"
                          :key="book.id"
                          :title="book.title"
                          :id="book.id"
                          :img="book.img"
                          :owner-id="book.ownerId"
                          :reserved="book.reserved"
                          :lent-out="book.lentOut"
                          :return-date="book.returnDate"
                          @cancel-reservation-id="cancelReservationHandler"
                          @mark-as-received="receiveHandler"
                          @return-book="returnHandler">
      </reserved-book-item>
    </ul>
  </base-card>
</template>

<script setup>
import ReservedBookItem from "@/components/book/ReservedBookItem.vue";
import { useBooksStore } from "@/store";
import { computed } from "vue";
const bookStore = useBooksStore();

const reservedBooks = computed(() => bookStore.reservedBooks);
const hasBooks = computed(() => reservedBooks.value.length > 0);

async function cancelReservationHandler(bookId) {
  await bookStore.cancelReservation(bookId);
}
async function receiveHandler(bookId) {
  await bookStore.receiveBook(bookId);
}
async function returnHandler(bookId) {
  await bookStore.returnBook(bookId);
}
</script>


<style scoped>
h5 {
  display: flex;
  justify-content: center;
  color: red;
  font-weight: normal;
  margin: 0;
}
</style>