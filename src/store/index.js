import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { api } from "./AxiosStore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profile: {},
    blogs: [],
    profileComments: [],
    activeBlog: {},
    goHere: {},
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBlogs(state, data) {
      state.blogs = data;
    },
    // newBlog(state, data) {
    //   state.blogs.push(data);
    // },
    setActiveBlog(state, blog) {
      state.activeBlog = blog;
    },
    addBlogComment(state, comment) {
      state.activeBlog.comments.push(comment);
    },
    setCommentUpdate(state, updatedComment) {
      state.activeBlog.comment = updatedComment;
    },
    // TODO Learn more about mutations?
    setProfileComments(state, data) {
      state.profileComments = data;
    },
    // setGoHere(state, goHere) {
    //   state.goHere = goHere;
    // },
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
    async getProfileComments({ commit }) {
      try {
        let res = await api.get("profile/comments");
        commit("setProfileComments", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async updateProfile({ commit, dispatch }, newProfileInfo) {
      try {
        let res = await api.put("profile", newProfileInfo);
        commit("setProfile", newProfileInfo);
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
        commit("setActiveBlog", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    // TODO this is not fuctional
    async addBlog({ commit, dispatch }, blog) {
      try {
        let res = await api.post("blogs", blog);
        dispatch("getAllBlogs");
      } catch (error) {
        console.error(error);
      }
    },
    // TODO this also is not functional
    async addComment({ commit, dispatch }, comment) {
      try {
        let res = await api.post("comments", comment);
        commit("addBlogComment", comment);
      } catch (error) {
        console.error(error);
      }
    },
    async updateComment({ commit, dispatch }, updatedComment) {
      try {
        //console.log(updatedComment);
        // let id = updatedComment.commentId;
        // let updatedBody = updatedComment.body;
        let res = await api.put(
          "comments/" + updatedComment.id,
          updatedComment
        );
        //commit("setCommentUpdate", updatedComment);
        dispatch("getBlogComments", updatedComment.blogId);
      } catch (error) {
        console.error(error);
      }
      //  example from another project...
      //  async bid({ commit }, item) {
      //  await api.put("items/" + item.id + "/bid", { bid: item.value });
      // }
    },
    async deleteBlog({ commit, dispatch }, id) {
      try {
        let response = confirm(
          "Delete may orphan comments. Click 'Ok' to confirm you wish to delete Blog"
        );
        if (response) {
          let res = await api.delete("blogs/" + id);
          dispatch("getAllBlogs");
        } else {
          alert("Delete cancelled");
        }
      } catch (error) {
        console.error(error);
      }
    },
    async deleteComment({ commit, dispatch }, id, blogId) {
      try {
        let response = confirm(
          "Click 'Ok' to confirm you wish to delete comment"
        );
        if (response) {
          let res = await api.delete("comments/" + id);
          dispatch("getProfileComments");
          commit("setActiveBlog");
        } else {
          alert("Delete cancelled");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
