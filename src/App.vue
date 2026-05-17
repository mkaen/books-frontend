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
  min-height: 100%;
  background-color: #e8f0ec;
  background-image:
    radial-gradient(ellipse 80% 60% at 15% 10%, rgba(186, 220, 210, 0.7), transparent),
    radial-gradient(ellipse 70% 50% at 90% 85%, rgba(200, 210, 235, 0.65), transparent),
    radial-gradient(ellipse 50% 40% at 50% 50%, rgba(240, 232, 220, 0.5), transparent),
    linear-gradient(165deg, #dfece6 0%, #d4e6ef 38%, #e4e0f0 68%, #f2ebe4 100%);
  background-attachment: fixed;
  background-size: 100% 100%;
}
body {
  min-height: 100%;
  padding-bottom: 4rem;
}
h1 {
  display: grid;
  justify-items: center;
  gap: 0.9rem;
  margin: 0.25rem auto 2rem;
  padding: 1.35rem 2.25rem 1.15rem;
  max-width: 46rem;
  text-align: center;
  font-family: "Fraunces", Georgia, "Times New Roman", serif;
  font-size: clamp(1.9rem, 4.2vw, 2.55rem);
  font-weight: 650;
  font-optical-sizing: auto;
  font-variation-settings: "SOFT" 45, "WONK" 0.8;
  letter-spacing: -0.015em;
  line-height: 1.15;
  color: transparent;
  text-decoration: none;
  background-image:
    linear-gradient(118deg, #122a24 0%, #2a5246 48%, #3a5c6e 100%),
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.55) 0%,
      rgba(255, 255, 255, 0.28) 100%
    );
  background-clip: text, border-box;
  -webkit-background-clip: text, border-box;
  backdrop-filter: blur(14px) saturate(1.2);
  -webkit-backdrop-filter: blur(14px) saturate(1.2);
  border: 1px solid rgba(255, 255, 255, 0.65);
  border-radius: 18px;
  box-shadow:
    0 10px 40px rgba(26, 58, 50, 0.09),
    inset 0 1px 0 rgba(255, 255, 255, 0.85);
  animation: title-enter 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
}

h1::before {
  content: "";
  width: min(11rem, 55vw);
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(90, 154, 130, 0.55) 50%,
    transparent
  );
}

h1::after {
  content: "";
  width: min(7rem, 38vw);
  height: 3px;
  border-radius: 3px;
  background: linear-gradient(90deg, #4d8f78, #5a8fad, #7a9ec4);
  box-shadow: 0 1px 8px rgba(74, 143, 120, 0.35);
}

@keyframes title-enter {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
base-card {
  background-color: rgba(255, 255, 255, 0.3);
}
.page {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem 0;
}

.page h1 {
  margin-bottom: 1.5rem;
}
</style>
