<template>
  <base-card>
    <li>
      <img :src="img" style="width: 20rem; margin: 20px auto 20px auto" alt="book cover image">
      <h4>{{author}}</h4>
      <div v-if="description">
        <h5>Description:</h5>
        <h6>{{description}}</h6>
      </div>
      <div v-if="user.isLoggedIn">
        <button v-if="canReserve" class="btn btn-outline-primary" @click="reserveBook">Reserve</button>
      </div>
    </li>
  </base-card>
</template>

<script>
import { useUserStore, useBooksStore } from "@/store";
export default {
  data() {
    return {
      user: useUserStore(),
      bookStore: useBooksStore()
    }
  },
  props: ['id', 'title', 'author', 'img', 'description', 'ownerId', 'reserved'],
  methods: {
    isBookOwner() {
      return this.ownerId === this.user.userId;
    },
    async reserveBook() {
      try {
        const success = await this.bookStore.reserveBook(this.id);
        if (success) {
          const book = this.bookStore.bookList.find(b => b.id === this.id);
          book.reserved = true;
        }
      } catch (error) {
        console.error("Reserve failed", error);
      }
    }
  },
  computed: {
    canReserve() {
      return !this.isReserved && !this.isBookOwner();
    },
    isReserved() {
      const book = this.bookStore.bookList.find(b => b.id === this.id);
      return book.reserved;
    }
  }
}
</script>


<style scoped>
img {
  border-radius: 20px;
  justify-content: center;
  display: flex;
}

h4 {
  display: flex;
  justify-content: center;
}
li {
  opacity: 1;
}
button {
  margin: 10px auto;
  display: flex;
  justify-content: space-between;
}
</style>