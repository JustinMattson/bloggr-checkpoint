import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { api } from "./AxiosStore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profile: {},
    blogs: [],
    activeBlog: {},
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBlogs(state, data) {
      state.blogs = data;
    },
    addBlog(state, data) {
      state.blogs.push(data);
    },
    setActiveBlog(state, blog) {
      state.activeBlog = blog;
    },
  },
  actions: {
    setBearer({}, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getAllBlogs({ commit }) {
      try {
        let res = await api.get("blogs");
        commit("setBlogs", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getBlogComments({ commit }, id) {
      try {
        let res = await api.get("blogs/" + id);
        commit("setActiveBlog", res.data.data);
      } catch (error) {
        console.error(error);
      }
    },
    async newBlog({ commit, dispatch }, blog) {
      let res = await api.post("blogs", blog);
      dispatch("getAllBlogs");
    },
  },
});
