<template>
  <div class="blog container">
    <div class="row">
      <div class="col">
        <div class="card m-1 border-info shadow">
          <div class="d-flex justify-content-between px-2">
            <span v-show="blog.creatorEmail==profile.email">{{blog.id}}</span>
            <span>
              <i
                class="far fa-trash-alt text-danger action"
                v-show="blog.creatorEmail==profile.email"
                @click="deleteBlog(blog.id)"
              ></i>
            </span>
          </div>
          <router-link :to="{ name: 'Blog', params: { id: blog.id }}" style="text-decoration:none;">
            <div class="card text-left">
              <div class="card-body">
                <div>
                  <span class="card-title font-weight-bold">{{blog.title}}</span>
                  <span class="text-muted">&nbsp;~{{blog.creator.name}}</span>
                </div>
                <div class="text-muted">updated: {{blog.updatedAt}}"</div>
                <div class="text-muted" :style="{fontSize:fontSize}">id: {{blog.id}}"</div>
              </div>
            </div>
          </router-link>
        </div>
        <!-- put v-show form here. -->
      </div>
    </div>
  </div>
</template>


<script>
//import Profile from "@/components/ProfileComponent.vue";
export default {
  name: "Blog",
  props: ["blog"],
  mounted() {
    this.$store.dispatch("getAllBlogs", this.$route.params.id);
    this.$store.dispatch("getProfile");
  },
  data() {
    return {
      color: "#808",
      fontSize: "10px"
    };
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    }
  },
  methods: {
    isVerified() {
      blog.creatorEmail === profile.email ? author++ : author;
    },
    deleteBlog(id) {
      // TODO add refresh functionality
      console.log("delete me");
      this.$store.dispatch("deleteBlog", id);
    }
  },
  components: {
    //Profile
  }
};
</script>


<style scoped>
.action {
  cursor: pointer;
}
</style>