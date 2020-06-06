<template>
  <div class="Blogs container">
    <!-- NOTE this is for an individual Blog. -->
    <div class="card mt-3">
      <div class="card text-left">
        <div class="card-body">
          <p class="card-title font-weight-bold">
            {{blog.title}}
            <span class="text-muted">&nbsp;~{{blog.creator.name}}</span>
          </p>
          <p class="card-text">{{blog.body}}</p>
          <span class="text-muted">id: {{blog._id}}</span>
        </div>
      </div>
    </div>
    <!-- </router-link> -->
    <comment v-for="comment in comments" :key="comment.id" :comment="comment" />

    <div>comments: {{blog.comments}}</div>

    <form
      class="form"
      v-if="$auth.isAuthenticated"
      @submit.prevent="newComment"
      style="width:100%;"
    >
      <div class="form-group">
        <label for></label>
        <input
          type="text"
          name="body"
          v-model="newComment.body"
          id
          class="form-control"
          placeholder="Comment..."
          required
        />
        <button type="submit" class="btn btn-outline-primary">Submit</button>
      </div>
    </form>
  </div>
</template>


<script>
import Comment from "../components/CommentsComponent.vue";
export default {
  name: "Blogs",
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
    return {
      newComment: {
        blogId: this.$route.params.id,
        body: ""
      }
    };
  },
  computed: {
    comments() {
      return this.$store.state.activeBlog.comments;
    },
    comments() {
      return this.$store.state.activeBlog.comments;
    }
  },
  methods: {
    newComment() {
      this.$store.dispatch("newComment", { ...this.newComment });
      this.newComment = {};
      //careful about removing the blogid
    }
  },
  components: {
    Comment
  }
};
</script>


<style scoped>
</style>