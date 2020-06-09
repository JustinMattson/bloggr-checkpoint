<template>
  <div class="home container">
    <h1>
      Welcome
      <span v-if="$auth.isAuthenticated" :style="{color:color}">{{myProfile.name}}</span>
    </h1>

    <!-- If not logged in, new blogs do not post. So Dont show the + Add Blog option. -->
    <div v-show="myProfile.name">
      <i class="fas fa-plus action" @click="toggleForm" :style="{color:color}">&nbsp;New Blog</i>
      <form class="form" v-if="showForm" @submit.prevent="addBlog" style="width:100%;">
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
          <textarea
            name="body"
            v-model="newBlog.body"
            id
            class="form-control"
            placeholder="Blog..."
            style="height:15em;"
          />

          <input class="m-2" type="checkbox" name="published" v-model="newBlog.published" />
          <span class="mr-4">Published</span>
          <button type="submit" class="btn btn-outline-info my-2">Submit</button>
        </div>
      </form>
    </div>
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
      newBlog: {
        published: false
      },
      showForm: false,
      color: "#808",
      fontSize: "10px"
    };
  },
  computed: {
    blogs() {
      return this.$store.state.blogs;
    },
    myProfile() {
      return this.$store.state.profile;
    }
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
    },
    addBlog() {
      this.$store.dispatch("addBlog", { ...this.newBlog });
      this.newBlog = {};
      this.showForm = false;
    }
  },
  components: {
    Blog,
    Profile
  }
};
</script>
