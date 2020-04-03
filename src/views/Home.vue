<template>
  <div class="home">
    <div id="screen-scroll" class="screen-outer-border">
      <div id="insert-messages"></div>
    </div>
    <div class="typing-holder">
      <div v-if="botTyping" class="typing">
        <span class="circle scaling"></span>
        <span class="circle scaling"></span>
        <span class="circle scaling"></span>
      </div>
    </div>
    <div class="screen-bottom">
      <div id="insert-user-reply" class="user-message"></div>
      <button v-if="!botTyping" @click="updateMessages()" class="send">
        <span class="button-text">Send</span>
      </button>
      <button v-if="botTyping" class="send">
        <span class="button-text">Send</span>
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
    //This method handles user button clicks
    updateMessages() {
      if (this.messageIndex < this.botMessages.length - 1) {
        this.updateUserMessage();
        this.updateScroll();
        this.clearReply();
        this.incrementMessageIndex();
        setTimeout(() => {
          this.flipBotTypingBool();
          this.updateScroll();
          setTimeout(() => {
            this.flipBotTypingBool();
            this.populateReply();
            this.updateBotMessage();
            this.updateScroll();
          }, 2000);
        }, 1000);
      } else if (this.messageIndex == this.botMessages.length - 1) {
        this.updateUserMessage();
        this.clearReply();
        this.updateScroll();
        this.incrementMessageIndex();
      } else {
        this.clearReply();
      }
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
  justify-content: flex-start;
  background-color: grey;
  padding-top: 3%;
  border-radius: 4px;
  border: 4px solid lightgray;
}
.screen-outer-border {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: auto;
  height: 75%;
  width: 95%;
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
  border: 2px solid lightgray;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  justify-content: left;
  color: white;
  overflow: scroll;
}
.send {
  height: 94%;
  width: 12.5%;
  border-radius: 4px;
  margin-left: 2px;
  background-color: grey;
  border: 2px solid lightgray;
  color: white;
}

.bot-frame {
  padding: 4px;
  max-width: 45%;
  border: 1px solid grey;
  border-radius: 10px 10px 10px 0px;
  background-color: white;
  margin: 3px;
  color: black;
}
.user-frame {
  padding: 4px;
  max-width: 45%;
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
  width: 95%;
  margin: auto;
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
