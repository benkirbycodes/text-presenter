<template>
  <div class="home">
    <div id="screen-scroll" class="screen-outer-border">
      <div id="insert-messages"></div>
      <div class="typing-holder">
        <div v-if="botTyping" class="typing">
          <span class="circle scaling"></span>
          <span class="circle scaling"></span>
          <span class="circle scaling"></span>
        </div>
      </div>
    </div>
    <div class="screen-bottom">
      <div id="insert-user-reply" class="user-message"></div>
      <button class="send">
        <span class="button-text" @click="updateMessages()">Send</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  async mounted() {
    await this.$store.dispatch("getConvos");
    this.botMessages = this.$store.state.botMessages;
    this.userMessages = this.$store.state.userMessages;
    this.updateBotMessage();
    this.populateReply();
    this.incrementMessageIndex();
  },
  name: "Home",
  data() {
    return {
      botMessages: [],
      userMessages: [],
      messageIndex: 0,
      botTyping: false
    };
  },
  methods: {
    updateMessages() {
      this.updateUserMessage();
      this.clearReply();
      this.incrementMessageIndex();
      this.flipBotTypingBool();
      setTimeout(() => {
        this.flipBotTypingBool();
        this.populateReply();
        this.updateBotMessage();
        this.updateScroll();
      }, 2000);
    },
    flipBotTypingBool() {
      this.botTyping = !this.botTyping;
    },
    updateUserMessage() {
      document.getElementById(
        "insert-messages"
      ).innerHTML += `<div class="user-frame">${
        this.userMessages[this.messageIndex]
      }</div>`;
    },
    updateBotMessage() {
      document.getElementById(
        "insert-messages"
      ).innerHTML += `<div class="bot-frame">${
        this.botMessages[this.messageIndex]
      }</div>`;
    },
    populateReply() {
      document.getElementById(
        "insert-user-reply"
      ).innerHTML = `<p class="reply">${
        this.userMessages[this.messageIndex]
      }</p>`;
    },
    clearReply() {
      document.getElementById(
        "insert-user-reply"
      ).innerHTML = `<p class="reply"></p>`;
    },
    incrementMessageIndex() {
      this.messageIndex++;
    },
    updateScroll() {
      let element = document.getElementById("screen-scroll");
      element.scrollTop = element.scrollHeight;
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
  display: flex;
  flex-direction: row;
  justify-content: left;
}
.send {
  height: 90%;
  width: 12.5%;
  background-color: aqua;
  border-radius: 4px;
  margin-left: 2px;
}
.bot-frame {
  height: 100%;
  width: 35%;
  border: 1px solid grey;
  border-radius: 10px 10px 10px 0px;
  background-color: white;
  margin: 3px;
  color: black;
  justify-content: end;
}
.user-frame {
  width: 35%;
  border: 1px solid grey;
  border-radius: 10px 10px 0px 10px;
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
.reply {
  margin-left: 2px;
}
.typing-holder {
  height: 8%;
  width: 100%;
  align-self: end;
}
.typing {
  display: block;
  width: 60px;
  height: 40px;
  background-color: #bdbdbd;
  margin-left: 20px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.circle.scaling {
  animation: typing 1000ms ease-in-out infinite;
  animation-delay: 3600ms;
}
.circle {
  display: block;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: #757575;
  margin: 3px;
}
.circle:nth-child(1) {
  animation-delay: 0ms;
}

.circle:nth-child(2) {
  animation-delay: 333ms;
}

.circle:nth-child(3) {
  animation-delay: 666ms;
}
@keyframes typing {
  0% {
    transform: scale(1);
  }
  33% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.4);
  }
  100% {
    transform: scale(1);
  }
}
</style>
