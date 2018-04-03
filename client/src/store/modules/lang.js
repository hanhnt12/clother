import { app } from '../../main';
import CONST from '@/utils/constants';

const state = {
  lang: 'en'
};

const mutations = {
  [CONST.SET_LANG](state, payload) {
    app.$i18n.locale = payload;
  }
};

const actions = {
  setLang({ commit }, payload) {
    commit(CONST.SET_LANG, payload);
  }
};

export default {
  state,
  mutations,
  actions
};
