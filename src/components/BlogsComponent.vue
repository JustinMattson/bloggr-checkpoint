<template>
  <div class="blog">
    <!-- NOTE Router link takes the name of the route, and an object including any parameters to pass -->
    <div class="card my-2 mx-0">
      <div class="card text-left">
        <div class="card-body">
          <router-link :to="{ name: 'Blog', params: { id: blog.id }}">
            <div>
              <span class="card-title font-weight-bold">{{blog.title}}</span>
              <span class="text-muted">&nbsp;~{{blog.creator.name}}</span>
            </div>
          </router-link>
          <div class="text-muted">updated: {{blog.updatedAt}}"</div>
          <div class="text-muted" :style="{fontSize:fontSize}">id: {{blog.id}}"</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Blog",
  props: ["blog"],
  data() {
    return {
      color: "#808",
      fontSize: "10px"
    };
  },
  computed: {},
  methods: {},
  components: {}
};
</script>


<style scoped>
</style>