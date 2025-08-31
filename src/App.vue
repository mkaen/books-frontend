<template>
  <the-header></the-header>
    <div class="container">
      <router-view></router-view>
    </div>
</template>

<script setup>
import TheHeader from "@/components/layout/TheHeader.vue";
import { useInactivityTimer } from "@/composables/useInactivityTimer";
import { useUserStore } from "@/store";
import { watch } from "vue";

const { inactive } = useInactivityTimer();
const user = useUserStore();

watch(inactive, (val) => {
  if (val && user.isLoggedIn) {
    alert("Your session has expired")
    user.logout();
  }
});
</script>

<style>
html, body {
  height: 100%;
  background-image: url('https://images.unsplash.com/photo-1603484477859-abe6a73f9366?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-attachment: fixed;
}
body {
  min-height: 100%;
  padding-bottom: 4rem;
}
h1 {
  padding: 40px;
  text-align: center;
  text-decoration: underline;
  color: royalblue;
  font-family: sans-serif;
  font-style: italic;
}
base-card {
  background-color: rgba(255, 255, 255, 0.3);
}

</style>
