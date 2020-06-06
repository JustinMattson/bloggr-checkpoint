<template>
  <div class="blogs-component container">
    <div class="row">
      <div class="col">
        <button
          type="button"
          class="btn btn-success"
          v-if="!blogForm"
          @click="blogForm = !blogForm"
        >Add Blog</button>
        <form class="form-inline" v-if="blogForm" @submit.prevent="createBlog">
          <div class="form-group ml-2">
            <label for="title">Title</label>
            <input
              type="text"
              class="form-control"
              name="title"
              id="title"
              aria-describedby="title"
              placeholder="Title..."
              v-model="newBlog.title"
              required
            />
          </div>
          <div class="form-group ml-2">
            <label for="description">Description</label>
            <input
              type="text"
              class="form-control"
              name="description"
              id="description"
              aria-describedby="description"
              placeholder="Description..."
              v-model="newBlog.description"
            />
          </div>
          <div class="form-group ml-2">
            <label for="imgUrl">Image Url</label>
            <input
              type="url"
              class="form-control"
              name="imgUrl"
              id="imgUrl"
              aria-describedby="imgUrl"
              placeholder="Image Url..."
              v-model="newBlog.imgUrl"
              required
            />
          </div>
          <button type="submit" class="btn btn-outline-success">Submit</button>
          <button
            type="button"
            class="btn btn-danger"
            @click="blogForm = !blogForm; newBlog={}"
          >Cancel</button>
        </form>
      </div>
    </div>
    <div class="row">
      <blog v-for="blog in blogs" :key="blog._id" :blogProp="blog" />
    </div>
  </div>
</template>

<script>
import Blog from "./BlogComponent.vue";

export default {
  name: "Blogs",
  // NOTE mounted fires at the first startup of the template being added to the page
  mounted() {
    this.$store.dispatch("getAllBlogs");
  },
  data() {
    return {
      newBlog: {},
      blogForm: false
    };
  },
  computed: {
    blogs() {
      return this.$store.state.blogs;
    }
  },
  methods: {
    createBlog() {
      this.$store.dispatch("createBlog", { ...this.newBlog });
      this.newBlog = {};
    }
  },
  components: {
    Blog
  }
};
</script>

<style>
</style>