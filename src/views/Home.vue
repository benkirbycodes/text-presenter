<template>
  <div class="home">
    <div class="" v-for="message in messages" :key="message._id">
      <h1>{{ message.text }}</h1>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  mounted() {
    this.$store.dispatch("getConvos");
  },
  name: "Home",
  methods: {},
  computed: {
    messages() {
      return this.$store.state.messages;
    }
  },
  components: {}
};
</script>
