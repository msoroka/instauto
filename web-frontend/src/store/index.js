import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
            authorized: false,
            data: []
        }
    },
    mutations: {},
    actions: {},
    modules: {}
});
