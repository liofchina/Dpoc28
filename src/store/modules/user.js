export default {
  namespaced: true,
  state: {
    id: 0,
    name: '',
    userInfo: {}
  },
  mutations: {
    updateId(state, id) {
      state.id = id
    },
    updateName(state, name) {
      state.name = name
    },
    updateUser(state, userInfo) {
      state.userInfo = userInfo
    }
  }
}
