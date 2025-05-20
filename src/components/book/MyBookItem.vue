<template>
<li>
  <div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4">
        <img :src="img" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8 d-flex">
        <div class="card-body">
          <h5 class="card-title">{{title}}</h5>
          <p class="card-text">{{author}}</p>
        </div>
          <button class="btn btn-outline-danger">Remove Book</button>
      </div>
    </div>
  </div>
</li>
</template>

<script>
export default {
  props: ['id', 'img', 'title', 'author', 'available', 'reserved', 'duration']
}
</script>

<style scoped>
button {
  display: flex;
  align-content: flex-end;
  justify-content: flex-end;
}
</style>