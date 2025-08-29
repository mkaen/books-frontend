<template>
  <li>
    <div class="base-card mb-3" style="max-width: 540px;">
      <div class="row g-0 h-100">
        <div class="col-md-4">
          <img :src="img" class="img-fluid rounded-start h-100" alt="book cover" />
        </div>
        <div class="col-md-8 d-flex flex-column justify-content-between align-items-center p-3">
          <div class="w-100 text-center mb-3">
            <h5 class="card-title">{{ title }}</h5>
            <p class="card-text">{{ author }}</p>
          </div>
          <button class="btn btn-outline-danger mt-auto" @click="removeBook">
            Remove Book
          </button>
          <div class="form-check form-switch mt-2">
            <input class="form-check-input" type="checkbox" :id="'switch-' + id" v-model="isActivated">
            <label class="form-check-label" :for="'switch-' + id">
              Book {{ isActivated ? 'activated' : 'deactivated' }}
            </label>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>

export default {

  props: ['id', 'img', 'title', 'author', 'isActive', 'reserved', 'duration'],
  emits: ['book-activity', 'remove-book'],
  data() {
    return {
      isActivated: this.isActive,
      confirm: null
    }
  },
  watch: {
    isActivated(value) {
      console.log("Toggle status:", value);
      this.$emit('book-activity', this.id);
    }
  },
  methods: {
    removeBook() {
      this.$emit('remove-book', this.id);
    },
  }
}
</script>

<style scoped>
.custom-card-body button {
  margin-top: auto;
}
</style>