import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

Vue.config.productionTip = false

Vue.filter('trim', str => str.substr(0, 290) + '...');

firebase.initializeApp({
	apiKey: "AIzaSyCkHo8c9muH-OG3VbO8TFSj-snK11uSBqU",
	authDomain: "newscoin-c9e41.firebaseapp.com",
	databaseURL: "https://newscoin-c9e41.firebaseio.com",
	projectId: "newscoin-c9e41",
	storageBucket: "newscoin-c9e41.appspot.com",
	messagingSenderId: "325868559762",
	appId: "1:325868559762:web:4a15ddddf4ec86b573354b",
	measurementId: "G-0FJT1634YF"
});

let app;

firebase.auth().onAuthStateChanged(() => {
	if(!app) {
		app = new Vue({
		  router,
		  store,
		  render: h => h(App)
		}).$mount('#app')
	}
})
