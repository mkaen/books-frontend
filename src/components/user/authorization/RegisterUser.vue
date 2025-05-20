<template>
  <h1>Register New User</h1>
  <base-card width="30rem">
    <registration-form @save-data="saveData"></registration-form>
  </base-card>
</template>

<script>
import RegistrationForm from "@/components/forms/RegistrationForm.vue";
import useUserStore from "@/store/modules/user/user";

export default {
  components: { RegistrationForm },
  name: 'RegisterUser',
  methods: {
    async saveData(data) {
      const userStore = useUserStore();
      const success = await userStore.registerUser(data);
      if (success) {
        this.$router.replace('/');
      }
    }
  }
}
</script>


<style scoped>

</style>