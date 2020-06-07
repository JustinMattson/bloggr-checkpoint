<template>
  <div class="home container">
    <h1>
      Welcome
      <span v-if="$auth.isAuthenticated" :style="{color:color}">{{profile.name}}</span>
    </h1>

    <i class="fas fa-plus action" @click="toggleForm" :style="{color:color}">&nbsp;New Blog</i>
    <form class="form" v-if="showForm" @submit.prevent="newBlog" style="width:100%;">
      <div class="form-group">
        <label for></label>
        <input
          type="text"
          name="title"
          v-model="newBlog.title"
          id
          class="form-control"
          placeholder="Title..."
        />
        <input
          type="text"
          name="body"
          v-model="newBlog.body"
          id
          class="form-control"
          placeholder="Blog..."
          style="height:15em;"
        />
        <button type="submit" class="btn btn-outline-primary my-2">Submit</button>
      </div>
    </form>
    <!--  -->
    <blog v-for="blog in blogs" :key="blog.id" :blog="blog" />
  </div>
</template>

<script>
import Blog from "@/components/BlogsComponent.vue";
import Profile from "@/components/ProfileComponent.vue";
export default {
  name: "home",
  mounted() {
    this.$store.dispatch("getAllBlogs");
  },
  data() {
    return {
      newBlog: {},
      showForm: false,
      color: "#808",
      fontSize: "10px"
    };
  },
  computed: {
    blogs() {
      return this.$store.state.blogs;
    },
    profile() {
      return this.$store.state.profile;
    }
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
    },
    newBlog() {
      this.$store.dispatch("newBlog", { ...this.newBlog });
      this.newBlog = {};
    }
  },
  components: {
    Blog,
    Profile
  }
};
</script>
