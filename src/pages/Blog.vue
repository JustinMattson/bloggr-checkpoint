<template>
  <div class="Blogs container">
    <!-- NOTE this is for an individual Blog. -->
    <div class="card mt-3 mb-2 bg-info shadow">
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

    <form
      class="form"
      v-if="$auth.isAuthenticated"
      @submit.prevent="addComment"
      style="width:100%;"
    >
      <div class="form-group">
        <label for></label>
        <input
          type="text"
          name="body"
          v-model="newComment.body"
          id
          class="form-control m-1 border-dark shadow"
          placeholder="Add Comment..."
          required
        />&nbsp;
        <button type="submit" class="btn btn-outline-primary shadow ml-1">Submit</button>
      </div>
    </form>
  </div>
</template>


<script>
import Comment from "@/components/CommentsComponent.vue";
export default {
  name: "Blogs",
  mounted() {
    this.$store.dispatch("getBlogComments", this.$route.params.id);
  },
  data() {
    return {
      newComment: {
        blogId: this.$route.params.id
      }
    };
  },
  computed: {
    comments() {
      return this.$store.state.activeBlog.comments;
    },
    // TODO why is this blog and not blogs like the home vue?
    blog() {
      return this.$store.state.activeBlog.blog;
    }
  },
  methods: {
    deleteBlog() {
      this.$store.dispatch("deleteBlog", this.blog._id);
    },
    // NOTE take some action before navigation changes
    // beforeRouteLeave(to, from, next) {
    //   this.$store.commit("setActiveBlog", {});
    //   next();
    // },
    addComment() {
      this.$store.dispatch("addComment", { ...this.newComment });
      // TODO troubleshoot why this isn't refreshing the screen.
      this.$store.dispatch("getBlogComments", this.$route.params.id);
      this.newComment = { blogId: this.$route.params.id };
    }
  },
  components: {
    Comment
  }
};
</script>


<style scoped>
</style>