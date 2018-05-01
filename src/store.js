/* eslint-disable no-param-reassign */

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const api = 'https://dapi-eleitometro.appcivico.com';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cards: [],
    card: {},
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
    SET_CARD(state, { res }) {
      // eslint-disable-next-line prefer-destructuring
      state.card = res[0];
      // remove after admin in ready
      state.card.backgroundColor = '#3ea0fb';
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
    LOAD_CARD({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios.get(`${api}/cards/${id}`).then(
          (response) => {
            commit('SET_CARD', { res: response.data });
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
