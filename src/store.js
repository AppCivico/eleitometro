/* eslint-disable no-param-reassign, prefer-destructuring */

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import config from './config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    analyze: [],
    cards: [],
    card: {},
    candidates: [],
    panorams: [],
    themes: [],
  },
  mutations: {
    SET_CARDS(state, { res }) {
      // remove after admin in ready
      const resColor = res;
      resColor[0].backgroundColor = config.colors.blue;
      resColor[1].backgroundColor = config.colors.green;
      resColor[2].backgroundColor = config.colors.orange;
      resColor[3].backgroundColor = config.colors.red;
      resColor[4].backgroundColor = config.colors.blue;

      state.cards = res;
    },
    SET_CARD(state, { res }) {
      state.card = res[0];
      // remove after admin in ready
      state.card.backgroundColor = config.colors.blue;
    },
    SET_CANDIDATES(state, { res }) {
      state.candidates = res;
    },
    SET_THEMES(state, { res }) {
      state.themes = res;
    },
    SET_PANORAMS(state, { res }) {
      state.panorams = res;
    },
    SET_ANALYZE(state, { res }) {
      state.analyze = res;
    },
  },
  actions: {
    LOAD_CARDS({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get(`${config.api}/cards`).then(
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
        axios.get(`${config.api}/cards/${id}`).then(
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
    LOAD_ANALYSIS({ commit }) {
      function getCandidates() {
        return axios.get(`${config.api}/candidates`);
      }
      function getThemes() {
        return axios.get(`${config.api}/themes`);
      }
      function getPanorams() {
        return axios.get(`${config.api}/panoramas`);
      }

      axios.all([getCandidates(), getThemes(), getPanorams()]).then(axios.spread((candidates, themes, panorams) => {
        commit('SET_CANDIDATES', { res: candidates.data });
        commit('SET_THEMES', { res: themes.data });
        commit('SET_PANORAMS', { res: panorams.data });
      }));
    },
    LOAD_ANALYZE({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`${config.api}/analyse/${payload.type}/${payload.id}`).then(
          (response) => {
            commit('SET_ANALYZE', { res: response.data });
            resolve();
          },
          (err) => {
            reject(err.response);
            console.error(err);
          },
        );
      });
    },
    // eslint-disable-next-line
    SUBSCRIBE({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          url: `${config.api}/subscribe`,
          data,
        })
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            console.error(err.response);
            reject(err.response);
          });
      });
    },
  },
});
