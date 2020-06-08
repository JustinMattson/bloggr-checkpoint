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

    <form class="form" v-if="edit" style="width:100%;" @submit.prevent="updateProfile">
      <div class="form-group">
        <label for></label>
        <input
          type="text"
          name="name"
          v-model="newProfile.name"
          id
          class="form-control m-1 shadow border-warning"
          placeholder="Name..."
          required
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
        <button type="button" class="btn btn-info shadow" @click="toggleMyBlogs">View My Blogs</button>
      </div>
      <div class="col-6">
        <button
          type="button"
          class="btn btn-secondary shadow"
          @click="toggleMyComments"
        >View My Comments</button>
      </div>
      <!-- REVIEW I utilized the same blog view, but filtered on if it was tied to the user profile. -->
      <!-- TODO add link to blog -->
      <blog
        v-for="blog in blogs"
        :key="blog.id"
        :blog="blog"
        v-show="blog.creatorEmail==profile.email && myBlogs"
      />
      <!-- REVIEW this is more difficult than this because there is no activeBlog, have to search all blogs for creatorEmail? It was given in the API description in the readme. -->
      <!-- TODO add link to blog -->
      <comment
        v-for="comment in profileComments"
        :key="comment.id"
        :comment="comment"
        v-show="myComments"
      />
    </div>
  </div>
</template>

<script>
import Profile from "@/components/ProfileComponent.vue";
import Blog from "@/components/BlogsComponent.vue";
import Comment from "@/components/CommentsComponent.vue";
export default {
  name: "Profile",
  props: ["comments"],
  mounted() {
    //this.$store.dispatch("getBlogComments", this.$route.params.id);
    this.$store.dispatch("getAllBlogs");
    this.$store.dispatch("getProfileComments");
  },
  data() {
    return {
      newProfile: {
        name: "",
        picture: ""
      },
      edit: false,
      myBlogs: false,
      myComments: false,
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
    profileComments() {
      return this.$store.state.profileComments;
    }
  },
  methods: {
    updateProfile() {
      this.$store.dispatch("updateProfile", { ...this.newProfile });
      this.newProfile = {};
    },
    toggleEdit() {
      this.edit = !this.edit;
    },
    toggleMyBlogs() {
      this.myBlogs = !this.myBlogs;
    },
    toggleMyComments() {
      // NOTE may need to enable debugger here to get the button to function again.
      // debugger
      this.myComments = !this.myComments;
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
