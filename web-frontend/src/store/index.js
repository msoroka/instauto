import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

const URL = "http://api.instauto.local/api/v1";

let userToken = localStorage.getItem('token');

axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["Content-Type"] = "application/json";
// axios.defaults.withCredentials = true;

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
            authorized: false,
            data: []
        },
        instagram: []
    },
    mutations: {
        USER_AUTH(state, data) {
            state.user.authorized = true;
            state.user.data = data;
        },
        USER_LOGIN_ERROR(state) {
            state.user.authorized = false;
            state.user.data = [];
            localStorage.setItem('token', '');
        },
        USER(state, data) {
            state.user.data = data;
        },
        USER_LOGIN(state, data) {
            localStorage.setItem('token', data.token);
            userToken = data.token;
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            state.user.authorized = true;
            state.user.data = data.user;
        },
        INSTAGRAM(state, data) {
            state.instagram = data.profile;
        }
    },
    actions: {
        checkAuth({commit}) {
            return checkAuth().then(data => {
                commit('USER_AUTH', data.data);
                return data;
            }).catch(() => {
                commit('USER_LOGIN_ERROR');
            });
        },
        login({commit}, data) {
            return login(data).then(data => {
                commit('USER_LOGIN', data.data);
                return data;
            }).catch(error => {
                commit('USER_LOGIN_ERROR');
                return error;
            });
        },
        register({commit}, data) {
            return register(data).then(data => {
                commit('USER_LOGIN', data.data);
                return data;
            }).catch(error => {
                commit('USER_LOGIN_ERROR');
                return error;
            });
        },
        update({commit}, data) {
            return update(data).then(data => {
                commit('USER', data.data);
                return data;
            }).catch(error => {
                return error;
            });
        },
        saveProfile({commit}, data) {
            return saveProfile(data).then(data => {
                commit('INSTAGRAM', data.data);
                return data;
            }).catch(error => {
                commit('INSTAGRAM', []);
                return error;
            });
        },
        getProfile({commit}, data) {
            return getProfile(data).then(data => {
                commit('INSTAGRAM', data.data);
                return data;
            }).catch(error => {
                commit('INSTAGRAM', []);
                return error;
            });
        },
        logout({commit}) {
            return logout().then(() => {
                commit('USER_LOGIN_ERROR');
            }).catch(() => {
                return;
            });
        }
    },
    modules: {}
});

function register(params) {
    return new Promise((resolve, reject) => {
        axios.post(`${URL}/register`, params).then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error.response.data);
        });
    });
}

function update(params) {
    console.log(params);
    return new Promise((resolve, reject) => {
        axios.put(`${URL}/update`, params).then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error.response.data);
        });
    });
}

function login(params) {
    return new Promise((resolve, reject) => {
        axios.post(`${URL}/login`, params).then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error.response.data);
        });
    });
}

function saveProfile(params) {
    return new Promise((resolve, reject) => {
        axios.post(`${URL}/instagram-profile`, params).then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error.response.data);
        });
    });
}

function getProfile() {
    return new Promise((resolve, reject) => {
        axios.get(`${URL}/instagram-profile`).then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error.response.data);
        });
    });
}

function checkAuth() {
    return new Promise((resolve, reject) => {
        axios.post(`${URL}/check-auth`).then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error.response.data);
        });
    });
}

function logout() {
    return new Promise((resolve, reject) => {
        axios.post(`${URL}/logout`).then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error.response.data);
        });
    });
}
