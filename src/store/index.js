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
    messages: []
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
        commit("setResource", {
          resource: "messages",
          data: res.data[0].messages
        });
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
    }
  },
  modules: {}
});
