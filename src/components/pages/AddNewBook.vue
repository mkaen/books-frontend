<template>
  <div class="page">
    <h1>Add New Book</h1>
  </div>
    <base-card>
      <AddNewBookForm @save-data="saveBookData"></AddNewBookForm>
    </base-card>
</template>

<script>
import AddNewBookForm from "@/components/forms/AddNewBookForm.vue";
import { useBooksStore } from "@/store";

export default {
  components: {AddNewBookForm},
  methods: {
    async saveBookData(data) {
      console.log(data)
      const bookStore = useBooksStore();
      const success = await bookStore.addNewBook(data);
      if (success) {
        this.$router.replace('/');
      }
    }
  }
}
</script>


<style scoped>

</style>