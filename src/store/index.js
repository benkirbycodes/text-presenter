import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

let api = axios.create({
  baseURL: "//localhost:3000/api",
  timeout: 3000
});

export default new Vuex.Store({
  state: {
    convo: {},
    messages: [],
    printedBotMessages: [],
    printedUserMessages: []
  },
  mutations: {
    setResource(state, payload) {
      state[payload.resource] = payload.data;
    }
  },
  actions: {
    async getConvos({ commit, dispatch }) {
      try {
        let res = await api.get("convos");
        // console.log(res);
        // let initialBotMessage = [];
        // initialBotMessage.push(res.data[0].messages.text);
        // let initialUserMessage = [];
        // initialUserMessage.push(res.data[1].messages.text);
        commit("setResource", { resource: "convo", data: res.data });
        commit("setResource", {
          resource: "messages",
          data: res.data[0].messages
        });
        // commit("setResource", {
        //   resource: "printedBotMessages",
        //   data: initialBotMessage
        // });
        // commit("setResource", {
        //   resource: "printedUserMessages",
        //   data: initialUserMessage
        // });
      } catch (error) {
        console.warn(error.message);
      }
    },
    async getConvoById({ commit, dispatch }, id) {
      try {
        let res = await api.get("convos/" + id);
        commit("setResource", { resource: "convo", data: res.data });
      } catch (error) {
        console.warn(error.message);
      }
    },
    printMessage({ commit, dispatch }, { messageId, role }) {
      if ((role = "user")) {
        let messages = this.state.printedUserMessages;
        let message = this.state.messages.find(m => (m._id = messageId));
        messages.push(message);
        commit("setResource", {
          resource: "printedUserMessages",
          data: messages
        });
      } else {
        let messages = this.state.printedBotMessages;
        let message = this.state.messages.find(m => (m._id = messageId));
        messages.push(message);
        commit("setResource", {
          resource: "printedBotMessages",
          data: messages
        });
      }
    }
  },
  modules: {}
});
