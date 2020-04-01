<template>
  <div class="home">
    <div class="screen-outer-border">
      <div id="insert-messages"></div>
    </div>
    <div class="screen-bottom">
      <div id="insert-user-reply" class="user-message"></div>
      <button class="send">
        <span class="button-text" @click="addMessage()">Send</span>
      </button>
      <!-- <button class="send">
        <span class="button-text" @click="addMessage('bot')">Bot</span>
      </button>-->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import message from "@/components/Message";

export default {
  async mounted() {
    await this.$store.dispatch("getConvos");

    this.botMessages = this.$store.state.botMessages;
    this.userMessages = this.$store.state.userMessages;

    document.getElementById(
      "insert-messages"
    ).innerHTML = `<div class="bot-frame">${
      this.botMessages[this.messageIndex]
    }</div>`;
    document.getElementById("insert-user-reply").innerHTML = `<p>${
      this.userMessages[this.messageIndex]
    }</p>`;
  },
  name: "Home",
  data() {
    return {
      botMessages: [],
      userMessages: [],
      messageIndex: 0
    };
  },
  methods: {
    addMessage() {
      document.getElementById(
        "insert-messages"
      ).innerHTML += `<div class="user-frame">${
        this.userMessages[this.messageIndex]
      }</div>`;

      this.messageIndex++;

      document.getElementById("insert-user-reply").innerHTML = `<p>${
        this.userMessages[this.messageIndex]
      }</p>`;

      document.getElementById(
        "insert-messages"
      ).innerHTML += `<div class="bot-frame">${
        this.botMessages[this.messageIndex]
      }</div>`;
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
  overflow: scroll;
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
  background-color: white;
  margin: 3px;
  color: black;
  justify-content: end;
}
.user-frame {
  height: 100%;
  width: 35%;
  border: 1px solid grey;
  border-radius: 4px;
  background-color: black;
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
