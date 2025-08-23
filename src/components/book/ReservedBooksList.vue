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
                          @cancel-reservation-id="cancelHandle"
                          @mark-as-received="receiveHandle"
                          @return-book="returnHandle">
      </reserved-book-item>
    </ul>
  </base-card>
</template>

<script setup>
import ReservedBookItem from "@/components/book/ReservedBookItem.vue";
import { useUserStore, useBooksStore } from "@/store";
import {computed} from "vue";
const userStore =useUserStore();
const bookStore = useBooksStore();

const hasBooks = computed(() => reservedBooks.value.length > 0);

const reservedBooks = computed(() =>
    bookStore.bookList.filter(book => book.lenderId === userStore.userId)
);

async function cancelHandle(bookId) {
  const success = await bookStore.cancelReservation(bookId);
  if (success) {
    const book = bookStore.bookList.find(b => b.id === bookId);
    if (book) {
      book.reserved = false;
      book.lenderId = null;
    }
  }
}
async function receiveHandle(bookId) {
  const responseData = await bookStore.receiveBook(bookId);
  if (responseData) {
    const book = bookStore.bookList.find(b => b.id === bookId);
    if (book) {
      console.log(responseData);
    }
  }
}
async function returnHandle(bookId) {
  const responseData = await bookStore.returnBook(bookId);
  if (responseData) {
    const book = bookStore.bookList.find(b => b.id === bookId);
    if (book) {
      console.log(responseData);
      book.lentOut = false;
    }
  }
}
</script>


<style scoped>
h5 {
  display: flex;
  justify-content: center;
  color: red;
  font-weight: normal;
}
</style>