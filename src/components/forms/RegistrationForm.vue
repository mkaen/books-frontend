<template>
  <base-card>
    <form @submit.prevent="submitForm">
      <div class="form-control" :class="{invalid: !firstName.isValid}">
        <label for="firstname">First Name:</label>
        <input id="firstname" v-model.trim="firstName.value" @blur="clearValidity('firstName')">
      </div>
      <div class="form-control" :class="{invalid: !lastName.isValid}">
        <label for="lastname">Last Name:</label>
        <input id="lastname" v-model.trim="lastName.value" @blur="clearValidity('lastName')">
      </div>
      <div class="form-control" :class="{invalid: !email.isValid}">
        <label for="email">Email:</label>
        <input id="email" v-model.trim="email.value" @blur="clearValidity('email')">
        <p v-if="!email.isValid">Email syntax is incorrect!</p>
      </div>
      <div class="form-control" :class="{invalid: !password.isValid}">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model.trim="password.value" @blur="clearValidity('password')">
        <p v-if="!password.isValid">Password is too short!</p>
      </div>
      <div class="form-control" :class="{invalid: !passwordConfirm.isValid}">
        <label for="password-confirm">Confirm password:</label>
        <input type="password" id="password-confirm" v-model.trim="passwordConfirm.value" @blur="clearValidity('passwordConfirm')">
        <p v-if="!passwordConfirm.isValid">Passwords doesn't match!</p>
      </div>
      <div>
        <button type="submit">Register</button>
      </div>
    </form>
  </base-card>
</template>

<script>
import {EMAIL_VALIDATION_PATTERN} from "@/constants";

export default {
  emits: ['save-data'],
  data() {
    return {
      firstName: {
        value: "",
        isValid: true
      },
      lastName: {
        value: "",
        isValid: true
      },
      email: {
        value: "",
        isValid: true
      },
      password: {
        value: "",
        isValid: true
      },
      passwordConfirm: {
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
      this.formIsValid = true
      const emailValidationPattern = EMAIL_VALIDATION_PATTERN;
      if (this.firstName.value === '') {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }
      if (this.lastName.value === '') {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }
      if (this.email.value === '' || !emailValidationPattern.test(this.email.value)) {
        this.email.isValid = false;
        this.formIsValid = false;
      }
      if (this.password.value.trim() === '' || this.password.value.length < 6) {
        this.password.isValid = false;
        this.formIsValid = false;
      }
      if (this.passwordConfirm.value !== this.password.value) {
        this.passwordConfirm.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }
      const formData = {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        email: this.email.value,
        password: this.password.value
      };
      this.$emit('save-data', formData);
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
  color: forestgreen;
  border: 2px solid forestgreen;
}

p {
  color: red;
}
</style>