<template>
  <div class="blog">
    <!-- NOTE Router link takes the name of the route, and an object including any parameters to pass -->
    <router-link :to="{ name: 'BlogComments', params: { id: blog.id }}">
      <div class="card m-3">
        <div class="card text-left">
          <div class="card-body">
            <div>
              <span class="card-title font-weight-bold">{{blog.title}}</span>
              <span class="text-muted">&nbsp;~{{blog.creator.name}}</span>
            </div>
            <!-- <p
              class="card-text text-muted"
              v-if="{{blog.createdAt}} < {{blog.updatedAt}}"
            >createdAt: {{blog.createdAt}}</p>-->
            <p class="card-text text-muted">updated: {{blog.updatedAt}}"</p>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>


<script>
export default {
  name: "Blog",
  props: ["blog"],
  data() {
    return {};
  },
  computed: {
    isCreator() {
      return this.$store.state.profile.email == this.blog.createorEmail;
    }
  },
  methods: {},
  components: {}
};
</script>


<style scoped>
</style>