<template>
  <div class="home">
    <div class="screen-outer-border">
      <div class v-for="message in messages" :key="message._id">
        <h1>{{ message.text }}</h1>
      </div>
    </div>
    <div class="screen-bottom">
      <div class="user-message"></div>
      <button class="send">
        <span class="button-text">Send</span>
      </button>
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

<style>
html {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: black;
}
body {
  display: flex;
  flex-direction: column;
}
.home {
  height: 667px;
  width: 375px;
  margin: auto;
  justify-content: space-between;
  background-color: grey;
  padding-top: 3%;
}
.screen-outer-border {
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
  margin: auto;
  height: 85%;
  width: 95%;
  background-color: antiquewhite;
  border-radius: 4px;
}
.screen-bottom {
  width: 95%;
  height: 12%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: auto;
}
.user-message {
  width: 87%;
  height: 90%;
  background-color: antiquewhite;
  border-radius: 4px;
}
.send {
  height: 90%;
  width: 12.5%;
  background-color: aqua;
  border-radius: 4px;
}
</style>
