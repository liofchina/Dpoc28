import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    user
  },
  //使 Vuex store 进入严格模式，在严格模式下，任何 mutation 处理函数以外修改 Vuex state 都会抛出错误。
  strict: process.env.NODE_ENV !== 'production'
})
