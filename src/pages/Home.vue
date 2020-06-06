<template>
  <div class="home">
    <h1>
      Welcome
      <span v-if="$auth.isAuthenticated">{{profile.name}}</span>
    </h1>
    <i class="fas fa-plus action">&nbsp;Add Blog</i>
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
      newBlog: {
        title: "",
        creatorEmail: "",
        createdAt: ""
      }
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
  methods: {},
  components: {
    Blog,
    Profile
  }
};
</script>
