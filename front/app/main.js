import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import "vueify/lib/insert-css" // required for .vue file <style> tags
import databaseService from 'services/DatabaseService';
import Moment from 'moment';
import JQuery from 'jquery';

window.moment = Moment;
window.$ = JQuery;

Vue.config.productionTip = false
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    initializing: true,
    session: false,
    user: null,
    preferences: {},
    messages: []
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
    },
    appendMessage (state, message) {
      state.messages.push(message);

      // Sort by created_at
      state.messages = state.messages.sort((a,b) => { return moment(b.created_at) - moment(a.created_at) });

      // Indicate if a message is the last of a day
      state.messages.forEach((message) => { message.lastOfDay = false; });
      let lastDatestamp = null;      
      state.messages.forEach((message) => {
        const createdAt = moment(message.created_at);
        const datestamp = `${createdAt.dayOfYear()}_${createdAt.year()}`
        if(lastDatestamp == null || lastDatestamp != datestamp) {
          message.lastOfDay = true;
        }        
        lastDatestamp = datestamp;
      });
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

      // Firebase: Load messages for user
      // TODO: DB Protection
      // TOOD: Modularize this
      var messagesRef = firebase.database().ref('messages');
      messagesRef.orderByChild("uid").equalTo(user.uid).on('child_added', function(data) {
        store.commit('appendMessage', data.val());
      });
      messagesRef.orderByChild("uid").equalTo(user.uid).on('child_removed', function(data) {
        console.log("CHILD DELETED")
      });

    })
  } else {
    store.commit('sessionEnded');
    router.push('/sign_in');
  }
});