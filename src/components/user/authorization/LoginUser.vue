<template>
  <h1>Login</h1>
  <base-card width="22rem">
    <Login-form @save-login-data="loginData"></Login-form>
  </base-card>
</template>

<script>
import LoginForm from '@/components/forms/LoginForm.vue'
import useUserStore from "@/store/modules/user/user";
export default {
  name: 'LoginUser',
  components: { LoginForm },
  methods: {
    async loginData(data) {
      const userStore = useUserStore();
      const success = await userStore.login(data);
      if (success) {
        this.$router.replace('/');
      }
    }
  }
}
</script>


<style scoped>
login-form {
  display: flex;
  max-width: 300px;
}
</style>