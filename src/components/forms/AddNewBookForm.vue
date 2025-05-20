<template>
  <div>
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="title">Title:</label>
        <input type="text" id="title" :class="{ invalid: !title.isValid }" v-model.trim="title.value" @blur="clearValidity('title')">
      </div>
      <div class="form-control">
        <label for="author">Author:</label>
        <input type="text" id="author" :class="{ invalid: !author.isValid }" v-model.trim="author.value" @blur="clearValidity('author')">
      </div>
      <div class="form-control">
        <label for="book-cover-url">Image URL:</label>
        <input type="url" id="book-cover-url" :class="{ invalid: !imageUrl.isValid }" v-model.trim="imageUrl.value" @blur="clearValidity('imageUrl')">
      </div>
      <div class="form-control">
        <label for="description"><span>*</span>Description:</label>
        <textarea id="description"
                  rows="5"
                  :class="{ invalid: !description.isValid }"
                  v-model.trim="description.value"
                  @blur="clearValidity('description')">
        </textarea>
      </div>
      <span>* Optional field</span>
      <button type="submit" class="btn btn-success">Add New Book</button>
    </form>
  </div>
</template>

<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      title: {
        value: "",
        isValid: true
      },
      author: {
        value: "",
        isValid: true
      },
      imageUrl: {
        value: "",
        isValid: true
      },
      description: {
        value: "",
        isValid: true
      },
      formIsValid: true
    }
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.title.value === "") {
        this.title.isValid = false;
        this.formIsValid = false;
      }
      if (this.author.value === "") {
        this.author.isValid = false;
        this.formIsValid = false;
      }
      if (this.imageUrl.value === "") {
        this.imageUrl.isValid = false;
        this.formIsValid = false;
      }
      if (this.description.value.length > 0 && this.description.value.length < 10) {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      console.log(this.description.isValid)
    },
    submitForm() {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }
      const bookData = {
        title: this.title.value,
        author: this.author.value,
        imageUrl: this.imageUrl.value,
        description: this.description.value
      }
      this.$emit('save-data', bookData);
    }
  }
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input, textarea {
  display: block;
  width: 100%;
  font: inherit;
}
.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
button {
  display: flex;
  margin: auto;
  border-radius: 20px;
  justify-content: center;
}

p, span {
  color: red;
}
</style>