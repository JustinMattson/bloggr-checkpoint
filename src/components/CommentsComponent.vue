<template>
  <div class="comment">
    <router-link :to="{ name: 'Comment', params: { id: blog.id }}">
      <div class="card">
        <div class="card text-left">
          <div class="card-body">
            <p class="card-text">{{blog.body}}</p>
            <p class="card-title font-weight-bold">
              <span class="text-muted">&nbsp;~{{comment.creator.name}}</span>
            </p>
            <div class="text-muted" style="font-size:10pt;">id: {{comment.updatedAt}}</div>
            <div class="text-muted" style="font-size:10pt;">id: {{comment.id}}</div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>


<script>
export default {
  name: "Comment",
  prop: ["comment"],
  mounted() {
    this.$store.dispatch("getBlogComments", this.$route.params.id);
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {}
};
</script>


<style scoped>
</style>