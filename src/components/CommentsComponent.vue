<template>
  <div class="comment container">
    <div class="row">
      <div class="col-11 offset-1">
        <div class="card m-1 border-secondary shadow">
          <div
            class="d-flex justify-content-between px-2"
            v-show="comment.creatorEmail==profile.email"
          >
            <span class="action" v-show="comment.creatorEmail==profile.email" @click="goToBlog">
              <router-link :to="{ name: 'Blog', params: { id: comment.blogId}}">{{comment.blogId}}</router-link>
            </span>
            <span v-show="comment.creatorEmail==profile.email">
              <i class="fas fa-pencil-alt action" @click="toggleEdit"></i>&nbsp;
              <i
                class="far fa-trash-alt text-danger action"
                @click="deleteComment(comment.id)"
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
        <!-- Update Comments Form -->
        <div v-show="editComment++">testing</div>
        <!-- <div class="row">
          <div class="col-11 offset-1">
            <form v-show="editComment" style="width:100%;" @submit.prevent="updateComment">
              <input
                class="mr-3"
                type="text"
                name="body"
                v-model="updateComment.body"
                placeholder="Update Comment..."
                required
              />
              <button type="Submit" class="btn btn-outline-danger shadow ml-1)">Submit</button>
            </form>
          </div>
        </div>-->
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
    return {
      editComment: 0,
      commentUpdate: {
        body: "",
        commentId: ""
      }
    };
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
    toggleEdit() {
      console.log(editComment);
      this.editComment = !this.editComment;
    },
    deleteBlog() {
      // TODO add delete functionality
      console.log("delete me");
    },
    // goToBlog() {
    //   //console.log({ name: "Blog", params: this.comment.blogId });
    //   this.$store.dispatch("goTo", {
    //     name: "Blog",
    //     params: this.comment.blogId
    //   });
    // },
    updateComment(id, commentUpdate) {
      console.log(id, commentUpdate);
      this.$store.dispatch("updateComment", { id, commentUpdate });
    },
    deleteComment(id) {
      // TODO add refresh functionality
      debugger;
      console.log("delete me");
      this.$store.dispatch("deleteComment", id);
      this.$store.dispatch("getActiveBlog");
    }
  },
  components: {
    Blogs
  }
};
</script>


<style scoped>
</style>