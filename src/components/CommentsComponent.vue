<template>
  <div class="comment">
    <div class="card">
      <div class="card text-left">
        <div class="card-body">
          <p class="card-text">{{comment.body}}</p>
          <p class="card-title font-weight-bold">
            <span class="text-muted">&nbsp;~{{comment.creator.name}}</span>
          </p>
          <div class="text-muted" style="font-size:10pt;">id: {{comment.updatedAt}}</div>
          <div class="text-muted" style="font-size:10pt;">id: {{comment.id}}</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Comment",
  props: ["comment"],
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