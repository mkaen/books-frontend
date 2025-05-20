<template>
  <base-card>
    <form @submit.prevent="submitForm">
      <div class="form-control" :class="{invalid: !email.isValid}">
        <label for="email">Email:</label>
        <input id="email" v-model="email.value" @blur="clearValidity('email')">
        <p v-if="!email.isValid">Invalid email format</p>
      </div>
      <div class="form-control" :class="{invalid: !password.isValid}">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model.trim="password.value" @blur="clearValidity('password')">
        <p v-if="!password.isValid">Invalid password format</p>
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  </base-card>
</template>

<script>
export default {
  emits: ['save-login-data'],
  data() {
    return {
      email: {
        value: "",
        isValid: true
      },
      password: {
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
      const emailValidationPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (this.email.value === '' || this.email.value.trim().length === 0 ||!emailValidationPattern.test(this.email.value)) {
        this.email.isValid = false;
        this.formIsValid = false;
      }
      if (this.password.value.trim() === '' || this.password.value.trim().length === 0) {
        this.password.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();
      if (this.formIsValid) {
        const formData = {
          email: this.email.value,
          password: this.password.value
        }
        this.$emit('save-login-data', formData);
      }
    }
  },
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

input {
  display: block;
  width: 100%;
  font: inherit;
}
.invalid label {
  color: red;
}

.invalid input {
  border: 1px solid red;
}
button {
  display: flex;
  margin: auto;
  border-radius: 20px;
  justify-content: center;
  color: dodgerblue;
  border: 2px solid dodgerblue;
}

p {
  color: red;
}
</style>