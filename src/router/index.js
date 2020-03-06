import Vue from 'vue'
import VueRouter from 'vue-router'

import firebase from 'firebase/app'

import Home from '../pages/Home.vue'
import Category from '../pages/Category.vue'
import Single from '../pages/Single.vue'
import Login from '../pages/Login.vue'
import Admin from '../pages/Admin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/category/:category',
    name: 'category',
    component: Category
  },
  {
    path: '/category/:category/:post',
    name: 'Single',
    component: Single
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      auth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requireAuth = to.matched.some(record => record.meta.auth);

  if(requireAuth && !currentUser) {
    next('/login');
  } else {
    next();
  }
})

export default router
