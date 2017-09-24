import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import "vueify/lib/insert-css" // required for .vue file <style> tags

Vue.config.productionTip = false
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    initializing: true,
    session: false,
    user: null
  },
  mutations: {
    sessionStarted (state, user) {
      console.log('ss');
      state.initializing = false;
      state.session = true;
      state.user = user;
      router.replace('/');
    },
    sessionEnded (state) {
      console.log('se');
      state.initializing = false;
      if(state.session) {
        state.session = false;
        state.user = null;
      }
      router.push('/sign_in');  
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
  } else {
    store.commit('sessionEnded')
  }
});