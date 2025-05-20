<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">Home</router-link>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" v-if="userStore.isLoggedIn">
            <router-link to="/my_books" class="nav-link active" aria-current="page">My Books</router-link>
          </li>
          <li class="nav-item" v-if="userStore.isLoggedIn">
            <router-link to="/reserved_books" class="nav-link">My Reserved Books</router-link>
          </li>
          <li class="nav-item" v-if="userStore.isLoggedIn">
            <router-link to="/add_new_book" class="nav-link text-success">+Add New Book</router-link>
          </li>
          <li class="nav-item" v-if="!userStore.isLoggedIn">
              <router-link to="/login" class="nav-link text-primary">Login</router-link>
          </li>
          <li class="nav-item" v-if="!userStore.isLoggedIn">
              <router-link to="/register" class="nav-link text-success">Sign Up</router-link>
          </li>
        </ul>
        <div class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search Books ..." aria-label="Search">
        </div>
        <button type="button" class="btn btn-outline-primary" v-if="userStore.isLoggedIn" @click="logout">Logout, {{ userStore.userName }}</button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import useUserStore from "@/store/modules/user/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

async function logout() {
  const success = await userStore.logout();
  if (success) {
    router.replace('/');
  }
}
</script>

<style scoped>
.nav-item :hover {
  border-left: 5px solid;
  border-right: 5px solid;
  border-radius: 15px;
}
</style>
