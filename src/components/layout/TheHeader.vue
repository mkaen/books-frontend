<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">Home</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
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
        <div class="d-flex align-items-center ms-auto gap-2">
          <input v-if="canSearch" class="form-control form-control-sm w-auto" type="search" placeholder="Search Books/Author ..."
              aria-label="Search" style="width: 200px;" v-model="searchStore.searchInput">
          <button type="button" class="btn btn-outline-primary btn-sm" v-if="userStore.isLoggedIn" @click="logout">
            Logout, {{ userStore.userName }}
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useUserStore, useSearchStore } from "@/store";
import { useRouter } from "vue-router";
import { computed } from "vue";

const userStore = useUserStore();
const searchStore = useSearchStore();
const router = useRouter();

const canSearch = computed(() => { return router.currentRoute.value.fullPath === '/'; })

async function logout() {
  await userStore.logout();
}

</script>

<style scoped>
.nav-item :hover {
  border-left: 5px groove;
  border-right: 5px solid;
  border-radius: 15px;
}
</style>
