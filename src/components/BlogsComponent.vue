<template>
  <div class="blog container">
    <div class="row">
      <div class="col">
        <div class="card m-1 border-info shadow">
          <div class="d-flex justify-content-between px-2">
            <span v-show="blog.creatorEmail==profile.email">
              <router-link :to="{ name: 'Blog', params: { id: blog.id }}">{{blog.id}}</router-link>
            </span>
            <span v-show="blog.creatorEmail==profile.email">
              <i class="fas fa-pencil-alt action" @click="toggleEdit"></i>&nbsp;
              <i class="far fa-trash-alt text-danger action" @click="deleteBlog(blog.id)"></i>
            </span>
          </div>
          <router-link :to="{ name: 'Blog', params: { id: blog.id }}" style="text-decoration:none;">
            <div class="card text-left">
              <div class="card-body">
                <div>
                  <span class="card-title font-weight-bold">{{blog.title}}</span>
                  <span v-if="blog.creator" class="text-muted">&nbsp;~{{blog.creator.name}}</span>
                </div>
                <!-- <div class="text-muted">updated: {{blog.updatedAt}}</div> -->
                <div class="text-muted">updated: {{prettyDate}}</div>
                <span
                  class="text-muted"
                  :style="{fontSize:fontSize}"
                >Published: {{blog.published}} "</span>
                <span class="text-muted" :style="{fontSize:fontSize}">id: {{blog.id}}"</span>
              </div>
            </div>
          </router-link>
          <!-- put v-show form here. -->
          <!-- <span v-show="editBlog">true</span> -->
          <form class="form ml-5" v-show="editBlog" @submit.prevent="updateBlog" style="width:80%;">
            <div class="form-group">
              <label for></label>
              <input
                type="text"
                name="title"
                v-model="blog.title"
                id
                class="form-control"
                placeholder="Title..."
              />
              <textarea
                name="body"
                v-model="blog.body"
                id
                class="form-control"
                placeholder="Blog..."
                style="height:15em;"
              />
              <input class="m-2" type="checkbox" name="published" v-model="blog.published" />
              <span class="mr-4">Published</span>
              <button type="submit" class="btn btn-outline-info my-2">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
//import Profile from "@/components/ProfileComponent.vue";
export default {
  name: "Blog",
  props: ["blog"],
  async mounted() {
    await this.$store.dispatch("getAllBlogs", this.$route.params.id);
    //this.$store.dispatch("getProfile");
  },
  data() {
    return {
      color: "#808",
      fontSize: "10px",
      editBlog: false,
      selectedBlog: "",
      prettyDate: new Date(this.blog.createdAt).toLocaleDateString("eu-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      // prettyTime: new Date(this.blog.createdAt).toLocalTimeString("eu-US", {
      //   hour: "2-digit",
      //   minute: "2-digit"
      // })
      // blogUpdate: {
      //   body: "",
      //   blogId: "",
      //   checked: false
      // }
    };
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
  },
  methods: {
    // isVerified() {
    //   blog.creatorEmail === profile.email ? author++ : author;
    // },
    toggleEdit() {
      this.editBlog = !this.editBlog;
    },
    updateBlog() {
      //let blogId = selectedBlog;
      this.$store.dispatch("updateBlog", this.blog);
      this.editBlog = false;
    },
    deleteBlog(id) {
      // REVIEW refreshes from Home vue
      this.$store.dispatch("deleteBlog", id);
    },
  },
  components: {
    //Profile
  },
};
</script>


<style scoped>
.action {
  cursor: pointer;
}
</style>