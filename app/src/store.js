import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

<<<<<<< Updated upstream
const state = {
  skip: false,
  pres: false,
  choice: false,
  webglHome: true,
  share: false,
  writing: false,
  telling: false,
  type: { statut:false, from:"home"},
  sharechoice: false,
  secretMessage: false,
}

=======
>>>>>>> Stashed changes
// const state = {
//   skip: false,
//   pres: false,
//   choice: false,
//   webglHome: true,
//   share: false,
//   writing: false,
//   telling: false,
//   type: { statut:false, from:"home"},
//   sharechoice: false,
//   secretMessage: false,
//   lockControls: false,
//   data: Array(),
//   objectsMoved: Array(),
//   ressources: Object()
// }

const state = {
  skip: true,
  pres: false,
  choice: false,
  webglHome: false,
  share: false,
  writing: false,
  telling: false,
  type: { statut:false, from:"home"},
  sharechoice: false,
  secretMessage: false,
    lockControls: false,
    data: Array(),
    objectsMoved: Array(),
    ressources: Object()
}

const mutations = {
  SKIP (state){
    state.skip = state.skip ? false : state.skip ? false : true;
  },
  PRES (state)
  {
    state.pres = state.pres ? false : state.pres ? false : true;
  },
  CHOICE (state)
  {
    state.choice = state.choice ? false : state.choice ? false : true;
  },
  WEBGLHOME (state)
  {
    state.webglHome = state.webglHome ? false : state.webglHome ? false : true;
  },
  SHARE (state)
  {
    state.share = state.share ? false : state.share ? false : true;
  },
  WRITING (state)
  {
    state.writing = state.writing ? false : state.writing ? false : true;
  },
  TELLING (state)
  {
    state.telling = state.telling ? false : state.telling ? false : true;
  },
  SHARECHOICE (state)
  {
    state.sharechoice = state.sharechoice ? false : state.sharechoice ? false : true;
  },
  TYPE (state, from)
  {
    state.type.statut = state.type.statut ? false : state.type.statut ? false : true;
    state.type.from = from;
  },
  RESETSHARE (state, from)
  {
    state.type.statut = false;
    state.telling = false;
    state.writing = false;
  },
  MESSAGE (state)
  {
    state.secretMessage = state.secretMessage ? false : state.secretMessage ? false : true;
  },
}

export default new Vuex.Store({
  state,
  mutations
})
