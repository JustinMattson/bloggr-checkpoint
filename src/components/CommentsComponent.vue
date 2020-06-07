<template>
  <div class="comment container">
    <div class="row">
      <div class="col-11 offset-1">
        <div class="card m-1 border-secondary shadow">
          <div
            class="d-flex justify-content-between px-2"
            v-show="comment.creatorEmail==profile.email"
          >
            <span class="action" v-show="comment.creatorEmail==profile.email">{{comment.blogId}}</span>
            <span>
              <i
                class="far fa-trash-alt text-danger action"
                @click="deleteBlog"
                v-show="comment.creatorEmail==profile.email"
              ></i>
            </span>
          </div>
          <div class="card text-left">
            <div class="card-body">
              <p class="card-text">{{comment.body}}</p>
              <div class="text-muted" font-weight-bold>&nbsp;~{{comment.creator.name}}</div>
              <div class="text-muted" style="font-size:10pt;">Posted: {{comment.updatedAt}}</div>
              <div class="text-muted" style="font-size:10pt;">id: {{comment.id}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Profile from "@/components/ProfileComponent.vue";
import Blogs from "@/components/BlogsComponent.vue";
export default {
  name: "Comment",
  props: ["comment", "blog"],
  mounted() {
    this.$store.dispatch("getProfile");
    this.$store.dispatch("getActiveBlog");
  },
  data() {
    return {};
  },
  computed: {
    profile() {
      return this.$store.state.profile;
      return this.$store.state.blogs;
    }
  },
  methods: {
    isVerified() {
      blog.creatorEmail === profile.email ? author++ : author;
    },
    deleteBlog() {
      // TODO add delete functionality
      console.log("delete me");
    }
  },
  components: {
    Blogs
  }
};
</script>


<style scoped>
</style>