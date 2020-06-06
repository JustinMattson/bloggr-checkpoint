<template>
  <div class="home">
    <h1>
      Welcome
      <span v-if="$auth.isAuthenticated">{{profile.name}}</span>
    </h1>
    <nav class="nav nav-tabs nav-stacked">
      <a class="nav-link" :class="{active: activeTab=='blogs'}" @click="activeTab = 'blogs'">Blogs</a>
      <a class="nav-link" :class="{active: activeTab=='add'}" @click="activeTab = 'add'">Add</a>
    </nav>
    <blogs v-if="activeTab == 'blogs'" />
    <add v-else-if="activeTab == 'add'" />

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
  methods: {
    createBlog() {
      this.$store.dispatch("newBlog", this.newBlog);
    }
  },
  components: {
    Blog,
    Profile
  }
};
</script>
