<template>
  <div class="comment container">
    <div class="row">
      <div class="col-11 offset-1">
        <div class="card m-1 border-secondary shadow">
          <div
            class="d-flex justify-content-between px-2"
            v-show="comment.creatorEmail==profile.email"
          >
            <span class="action" v-show="comment.creatorEmail==profile.email">
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
          <!-- Update Comments Form -->
          <!-- <div v-show="editComment">edit comment = {{editComment}}</div> -->
          <div class="row">
            <div class="col-11 offset-1">
              <form v-show="editComment" style="width:100%;" @submit.prevent="updateComment">
                <input
                  class="mr-3"
                  type="text"
                  name="body"
                  v-model="newComment.body"
                  placeholder="Update Comment...  does not work at this time."
                  style="width:50%;"
                  required
                />
                <br />
                <input
                  class="m-2"
                  type="text"
                  name="blogId"
                  v-model="newComment.blogId"
                  placeholder="blogId"
                />
                {{comment.blogId}}
                <input
                  class="m-2"
                  type="text"
                  name="commentId"
                  v-model="newComment.commentId"
                  placeholder="commentId"
                />
                {{comment.id}}
                <input
                  class="m-2"
                  type="text"
                  name="creatorEmail"
                  v-model="newComment.creatorEmail"
                  placeholder="creatorEmail"
                />
                {{comment.creatorEmail}}
                <button
                  type="Submit"
                  class="btn btn-outline-secondary shadow ml-1)"
                >Submit</button>
              </form>
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
  props: ["comment", "blog", "profile", "activeBlog"],
  mounted() {
    this.$store.dispatch("getProfile");
    this.$store.dispatch("getActiveBlog", this.$route.params.id);
  },
  data() {
    return {
      editComment: false,
      newComment: {
        body: "",
        blogId: "",
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
    toggleEdit() {
      this.editComment = !this.editComment;
      this.activeComment = comment.id;
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
    updateComment(newComment) {
      debugger;
      console.log(newComment);
      this.$store.dispatch("updateComment", newComment);
    },
    deleteComment(id, blogId) {
      // TODO add refresh functionality
      this.$store.dispatch("deleteComment", id);
      this.$store.dispatch("getBlogComments", blogId);
      this.$store.dispatch("getActiveBlog", this.$route.params.id);
    }
  },
  components: {
    Blogs,
    Profile
  }
};
</script>


<style scoped>
</style>