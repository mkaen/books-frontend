<template>
  <li class="list-group-item d-flex align-items-center my-2">
    <img :src="img" alt="book cover" style="max-width:70px; max-height:100px;">
    <h6 class="ms-3 mb-0">{{title}}</h6>
    <div class="button-group ms-auto" v-if="!lentOut">
      <button class="btn text-bg-danger" @click="cancelReservation()">Cancel Reservation</button>
      <button class="btn text-bg-primary mt-2" @click="markAsReceived()">Mark as Received</button>
    </div>
    <div v-else class="button-group ms-auto">
      <button class="btn text-bg-success mt-2" @click="returnBook()">Return Book</button>
    </div>
  </li>
</template>

<script>
export default {
  props: ['id', 'title', 'img', 'ownerId', 'reserved', 'lentOut'],
  emits: ['cancel-reservation-id', 'mark-as-received', 'return-book'],
  methods: {
    cancelReservation() {
      this.$emit('cancel-reservation-id', this.id)
    },
    markAsReceived() {
      this.$emit('mark-as-received', this.id)
    },
    returnBook() {
      this.$emit('return-book', this.id)
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
</style>