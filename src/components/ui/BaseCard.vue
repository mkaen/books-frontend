<template>
  <div class="base-card" :style="{ maxWidth: width }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: "40rem"
    }
  }
}
</script>


<style>
.base-card {
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 2rem auto;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>