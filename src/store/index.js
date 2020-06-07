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
    newBlog(state, data) {
      state.blogs.push(data);
    },
    setActiveBlog(state, blog) {
      state.activeBlog = blog;
    },
    // TODO Learn more about mutations?
    // setUserComments(state, data) {
    //   state.userComments = data
    // }
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
    //TODO  not yet working
    // async getProfileComments({ commit }) {
    //   try {
    //     let res = await api.get("profile/comments");
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    // TODO Postman isn't updating my profile
    // {
    //   "name": JM,
    //   "picture": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
    // }
    // async updateProfile({ commit }) {
    //   try {

    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
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
        commit("setActiveBlog", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    // TODO this is not fuctional
    async newBlog({ commit, dispatch }, blog) {
      let res = await api.post("blogs", blog);
      dispatch("getAllBlogs");
    },
    // TODO this also is not functional
    async newComment({ commit, dispatch }, comment) {
      let res = await api.post("comments", comment);
      dispatch("getBlogComments");
    },
  },
});
