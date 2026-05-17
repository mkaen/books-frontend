<template>
  <base-card :class="{'isOverdue': overdue}">
    <li>
      <img :src="img" style="width: 20rem; margin: 20px auto 20px auto" alt="book cover">
      <h4>{{author}}</h4>
      <hr>
      <div v-if="description">
        <h5>Description:</h5>
        <span>&nbsp;&nbsp;{{ description }}</span>
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
  props: ['id', 'title', 'author', 'img', 'description', 'ownerId', 'reserved', 'overdue'],
  emits: ['update-reserved'],
  methods: {
    isBookOwner() {
      return this.ownerId === this.user.userId;
    },
    async reserveBook() {
      this.$emit('update-reserved', this.id);
    },
  },
  computed: {
    canReserve() {
      const book = this.bookStore.bookList.find(b => b.id === this.id);
      return book && !book.reserved && !this.isBookOwner();
    },
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
.isOverdue {
  border: 2px solid red;
  background-color: lightcoral;
  position: relative;
  overflow: hidden;
}
.isOverdue::after {
  content: "Overdue";
  position: absolute;
  top: 20px;
  right: -30px;
  background-color: red;
  color: white;
  font-weight: bold;
  transform: rotate(45deg);
  padding: 5px 40px;
  font-size: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
</style>