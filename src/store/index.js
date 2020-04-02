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
    botMessages: [],
    userMessages: []
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
        commit("setResource", { resource: "convo", data: res.data });
        dispatch("parseMessages");
      } catch (error) {
        console.error(error.message);
      }
    },
    // Parses received convo into bot and user arrays
    parseMessages({ commit, dispatch }) {
      let messages = this.state.convo[0].messages;
      let botMessages = [];
      let userMessages = [];

      for (let i = 0; i < messages.length; i++) {
        let m = messages[i];
        m.role == "Bot" ? botMessages.push(m.text) : userMessages.push(m.text);
        console.log(botMessages, userMessages);
      }
      commit("setResource", { resource: "botMessages", data: botMessages });
      commit("setResource", { resource: "userMessages", data: userMessages });
    },
    //this method not currently used, but will be useful if future versions have multiple convo options
    async getConvoById({ commit, dispatch }, id) {
      try {
        let res = await api.get("convos/" + id);
        commit("setResource", { resource: "convo", data: res.data });
        dispatch("parseMessages");
      } catch (error) {
        console.error(error.message);
      }
    }
  }
});
