import { createStore } from "vuex";
import router from './router';

export default createStore({
  state: { // toy
    // !!localStorage.getItem('token'), jika ada value nya maka true, jika tidak ada value nya maka false
    isLoggedIn: !!localStorage.getItem('token')
  },

  mutations: { // button (instructions)
    LOGIN(state) {
      state.isLoggedIn = true; // on
    },

    LOGOUT(state) {
      state.isLoggedIn= false; // off
    }
  },

  actions: { // kids
    login({ commit }) {
      commit('LOGIN');
    },

    logout({ commit, dispatch }) {
      commit('LOGOUT');
      dispatch('navigateToLogin');
    },

    navigateToLogin() {
      router.push({ name: 'Login' });
    }
  }

});