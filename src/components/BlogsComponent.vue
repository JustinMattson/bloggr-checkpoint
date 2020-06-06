<template>
  <div class="blog">
    <!-- NOTE Router link takes the name of the route, and an object including any parameters to pass -->
    <router-link :to="{ name: 'Blogs', params: { id: blog.id }}">
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
            <div class="text-muted">updated: {{blog.updatedAt}}"</div>
            <div class="text-muted">id: {{blog.id}}"</div>
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
  computed: {},
  methods: {},
  components: {}
};
</script>


<style scoped>
</style>