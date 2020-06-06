<template>
  <div class="about text-center container">
    <h1>
      Welcome
      <span :style="{color:color}">{{ profile.name }}</span>
    </h1>
    <img class="rounded-circle" :src="profile.picture" @click="toggleEdit" />
    <p>
      {{ profile.email }}
      <br />
      <span class="text-danger" :style="{fontSize:fontSize}">{{profile.id}}</span>
    </p>
    <p class="text-muted">Click on profile image to edit user profile.</p>

    <div class="row d-flex justify-content-between">
      <div class="col-6">
        <button type="button" class="btn btn-outline-primary">View My Blogs</button>
      </div>
      <div class="col-6">
        <button type="button" class="btn btn-outline-primary">View My Comments</button>
      </div>
    </div>

    <form class="form" v-if="edit" style="width:100%;">
      <div class="form-group">
        <label for></label>
        <input
          type="text"
          name="name"
          v-model="newProfile.name"
          id
          class="form-control"
          placeholder="Name..."
        />
        <input
          type="text"
          name="picture"
          v-model="newProfile.picture"
          id
          class="form-control"
          placeholder="ImgUrl..."
        />
        <button type="submit" class="btn btn-outline-primary">Submit</button>
      </div>
    </form>
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
  data() {
    return {
      newProfile: {
        name: "",
        picture: ""
      },
      edit: false,
      fontSize: "10px",
      color: "#808"
    };
  },
  components: {
    Profile
  },
  methods: {
    updateProfile() {
      this.$store.dispatch("updateProfile", { ...this.newProfile });
    },
    toggleEdit() {
      this.edit = !this.edit;
    }
  }
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
