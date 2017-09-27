import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import "vueify/lib/insert-css" // required for .vue file <style> tags
import databaseService from 'services/DatabaseService';

Vue.config.productionTip = false
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    initializing: true,
    session: false,
    user: null,
    preferences: {}
  },
  mutations: {
    sessionStarted (state, user) {
      state.session = true;
      state.user = user;
    },
    sessionEnded (state) {
      state.initializing = false;
      if(state.session) {
        state.session = false;
        state.user = null;
        state.preferences = {};
      }
    },
    preferencesUpdated (state, preferences) {
      state.preferences = preferences;
    },
    initFinished (state) {
      state.initializing = false;
    }
  }
});

window.store = store;

router.beforeEach((to, from, next) => {
  if(store.state.session && to.name == "SignIn") {
    // Already signed in, redirect home
    next('/');
    return;
  } else if(!store.state.session && to.name != 'SignIn') {
    // Not signed in, redirect to sign in
    next('/sign_in');
    return;
  }
  next(); // All good.
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    store.commit('sessionStarted', user);
    firebase.database().ref('preferences/' + user.uid).once('value').then(function(preferences){
      store.commit('preferencesUpdated', preferences.val() || {});
      store.commit('initFinished');
      router.push('/');
    })
  } else {
    store.commit('sessionEnded');
    router.push('/sign_in');
  }
});