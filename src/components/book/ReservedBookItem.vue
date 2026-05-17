<template>
  <li class="list-group-item d-flex align-items-center my-2">
    <img :src="img" alt="book cover" style="max-width:70px; max-height:100px;">
    <h5 class="ms-3 mb-0">{{title}}</h5>
    <div class="button-group ms-auto" v-if="!lentOut">
      <button class="btn btn-sm text-bg-danger btn-shadow" @click="cancelReservation">Cancel Reservation</button>
      <button class="btn btn-sm text-bg-primary mt-2 btn-shadow" @click="markAsReceived">Mark as Received</button>
    </div>
    <div v-else class="button-group ms-auto">
      <span>Due date: {{ formattedDate }}</span>
      <button class="btn text-bg-success mt-2" @click="returnBook">Return Book</button>
    </div>
  </li>
</template>

<script>

export default {
  props: ['id', 'title', 'img', 'ownerId', 'reserved', 'lentOut', 'returnDate'],
  emits: ['cancel-reservation-id', 'mark-as-received', 'return-book'],
  methods: {
    cancelReservation() {
      this.$emit('cancel-reservation-id', this.id);
    },
    markAsReceived() {
      this.$emit('mark-as-received', this.id);
    },
    returnBook() {
      this.$emit('return-book', this.id);
    }
  },
  computed: {
    formattedDate() {
      return new Date(this.returnDate).toLocaleDateString('et-EE')
    }
  }
}
</script>

<style scoped>
h6 {
  display: flex;
  justify-content: flex-start;
}
.button-group {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
button {
  border-radius: 10px;
  width: 140px;
}
.btn-shadow {
  width: 118px;
  font-size: 0.8rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.15s ease;
}
.btn-shadow:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
}
.btn-shadow:active {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}
</style>