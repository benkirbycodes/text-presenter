<template>
  <div class="home">
    <div class="screen-outer-border">
      <div id="insert-messages"></div>
    </div>
    <div class="screen-bottom">
      <div class="user-message"></div>
      <button class="send">
        <span class="button-text" @click="addMessage('user')">Send</span>
      </button>
      <button class="send">
        <span class="button-text" @click="addMessage('bot')">Bot</span>
      </button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import message from "@/components/Message";

export default {
  mounted() {
    this.$store.dispatch("getConvos");
  },
  name: "Home",
  data() {
    return {
      messages: []
      // botTemplate: `<div class="bot-frame">Bot</div>`,
      // userTemplate: `<div class="user-frame">User</div>`
    };
  },
  methods: {
    addMessage(role) {
      let botTemplate;
      let userTemplate = `<div class="user-frame">User</div>`;

      if (role == "user") {
        document.getElementById(
          "insert-messages"
        ).innerHTML += `<div class="user-frame">User</div>`;
      } else if (role == "bot") {
        document.getElementById(
          "insert-messages"
        ).innerHTML += `<div class="bot-frame">Bot</div>`;
      }
    }
  },
  components: {
    message
  }
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
  justify-content: flex-start;
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
.bot-frame {
  height: 100%;
  width: 35%;
  border: 1px solid grey;
  border-radius: 4px;
  background-color: green;
  margin: 3px;
  color: white;
  justify-content: end;
}
.user-frame {
  height: 100%;
  width: 35%;
  border: 1px solid grey;
  border-radius: 4px;
  background-color: blue;
  margin: 3px;
  color: white;
  align-self: flex-end;
}
#insert-messages {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>
