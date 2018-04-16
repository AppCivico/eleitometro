/* eslint-disable no-param-reassign */

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const api = 'http://159.89.51.41:1667';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cards: [],
  },
  mutations: {
    SET_PROGRAMS(state, { res }) {
      state.cards = res;
    },
  },
  actions: {
    LOAD_CARDS({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get(`${api}/cards`).then(
          (response) => {
            console.log('res', response);
            commit('SET_CARDS', { res: response.data });
            resolve();
          },
          (err) => {
            reject(err.response);
            console.error(err);
          },
        );
      });
    },
  },
});
