<template>
  <div class="about text-center">
    <h1>Welcome {{ profile.name }}</h1>
    <img class="rounded-circle" :src="profile.picture" alt />
    <p>{{ profile.email }}</p>
    <p>Insert form or button here to edit user profile.</p>
  </div>
</template>

<script>
import Profile from "@/components/ProfileComponent.vue";
export default {
  name: "Profile",
  computed: {
    profile() {
      return this.$store.state.profile;
    }
  },
  components: {
    Profile
  }
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
