<template>
  <div class="BlogComments">
    Individual Blog Details Go Here
    <!-- NOTE Router link takes the name of the route, and an object including any parameters to pass -->
    <!-- <router-link :to="{ name: 'BlogComments', params: { id: blog.id }}"> -->
    <div class="card">
      <div class="card text-left">
        <div class="card-body">
          <span class="card-title font-weight-bold">{{blog.title}}</span>
          <span class="text-muted">~{{blog.creator}}</span>
          <p class="card-text">
            tags: {{blog.tags}}
            <br />
            published: {{blog.published}}
            <br />
            _id {{blog._id}}
            <br />
            title: {{blog.title}}
            <br />
            body: {{blog.body}}
            <br />
            creatorEmail: {{blog.creatorEmail}}
            <br />
            createdAt: {{blog.createdAt}}
            <br />
            updatedAt: {{blog.updatedAt}}
            <br />
            creator: {{blog.creator}}
            <br />
          </p>
        </div>
      </div>
    </div>
    <!-- </router-link> -->
  </div>
</template>


<script>
export default {
  name: "BlogComments",
  mounted() {
    this.$store.dispatch("getBlogComments", this.$route.params.id);
  },
  methods: {
    deleteBlog() {
      this.$store.dispatch("deleteBlog", this.blog._id);
    }
  },
  // NOTE take some action before navigation changes
  beforeRouteLeave(to, from, next) {
    this.$store.commit("setActiveBlog", {});
    next();
  },
  data() {
    return {};
  },
  computed: {
    blog() {
      return this.$store.state.activeBlog;
    }
  },
  components: {}
};
</script>


<style scoped>
</style>