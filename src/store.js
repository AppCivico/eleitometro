/* eslint-disable no-param-reassign */

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const api = 'https://159.89.51.41:1667';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cards: [],
  },
  mutations: {
    SET_CARDS(state, { res }) {
      // remove after admin in ready
      const resColor = res;
      resColor[0].backgroundColor = '#3ea0fb';
      resColor[1].backgroundColor = '#33cc66';
      resColor[2].backgroundColor = '#f4900c';
      resColor[3].backgroundColor = '#f94e63';
      resColor[4].backgroundColor = '#3ea0fb';

      state.cards = res;
    },
  },
  actions: {
    LOAD_CARDS({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get(`${api}/cards`).then(
          (response) => {
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
