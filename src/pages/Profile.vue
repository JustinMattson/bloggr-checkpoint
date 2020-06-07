<template>
  <div class="about text-center container">
    <h1>
      Welcome
      <span :style="{color:color}">{{ profile.name }}</span>
    </h1>
    <img class="rounded-circle shadow" :src="profile.picture" @click="toggleEdit" />
    <p>
      {{ profile.email }}
      <br />
      <span class="text-danger" :style="{fontSize:fontSize}">{{profile.id}}</span>
    </p>
    <p class="text-muted">Click on profile image to edit user profile.</p>

    <form class="form" v-if="edit" style="width:100%;">
      <div class="form-group">
        <label for></label>
        <input
          type="text"
          name="name"
          v-model="newProfile.name"
          id
          class="form-control m-1 shadow border-warning"
          placeholder="Name..."
        />
        <input
          type="text"
          name="picture"
          v-model="newProfile.picture"
          id
          class="form-control m-1 shadow border-warning"
          placeholder="ImgUrl..."
        />
        <button type="submit" class="btn btn-warning my-2 shadow">Submit</button>
      </div>
    </form>

    <div class="row d-flex justify-content-between">
      <div class="col-6">
        <button type="button" class="btn btn-info shadow">View My Blogs</button>
      </div>
      <div class="col-6">
        <button type="button" class="btn btn-secondary shadow">View My Comments</button>
      </div>
      <!-- TODO insert BlogComponents => createdEmail == profile.createdEmail -->
      <blog
        v-for="blog in blogs"
        :key="blog.id"
        :blog="blog"
        v-show="blog.creatorEmail==profile.email"
      />
      <comment v-for="comment in comments" :key="comment.id" :comment="comment" />

      <!-- TODO insert CommentComponents => createdEmail == profile.createdEmail -->
    </div>
  </div>
</template>

<script>
import Profile from "@/components/ProfileComponent.vue";
import Blog from "@/components/BlogsComponent.vue";
import Comment from "@/components/CommentsComponent.vue";
export default {
  name: "Profile",
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
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    blogs() {
      return this.$store.state.blogs;
    },
    comments() {
      return this.$store.state.activeBlog.comments;
    }
  },
  methods: {
    updateProfile() {
      this.$store.dispatch("updateProfile", { ...this.newProfile });
    },
    toggleEdit() {
      this.edit = !this.edit;
    }
  },
  components: {
    Profile,
    Blog,
    Comment
  }
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
