import Vue from 'vue'
import Vuex from 'vuex'

import firebase from 'firebase/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isOpenSearchModal: false
  },
  mutations: {
    toggleSearchModal(state) {
      state.isOpenSearchModal = !state.isOpenSearchModal;
    }
  },
  actions: {
  	async fetchCategories({dispatch}) {
      const categories = (await firebase.database().ref(`/categories`).once('value')).val();
      
      return await dispatch('convertToArr', categories);
  	},
    async addCategory(ctx, category) {
      await firebase.database().ref(`/categories`).push(category);
    },
    async fetchPosts({dispatch}, categoryName) {
      const postsData = (await firebase.database().ref(`/posts`).once('value')).val();
      const posts = await dispatch('convertToArr', postsData);

      if(categoryName) {
        /* Вывод постов определеноной категории */
        return posts.filter(item => item.categoryName === categoryName);
      } else {
        /* Вывод всех постов(пример: главной) если аргумент не передан */
        return posts;
      }
    },
    async addPost({dispatch}, post) {
      const image = post.image;
      const imageExt = image.name.slice(image.name.lastIndexOf('.'));

      const add = await firebase.database().ref(`/posts`).push(post);

      const fileData = await firebase.storage().ref(`/posts/${add.key}.${imageExt}`).put(image);
      const imageSrc = await firebase.storage().ref().child(fileData.ref.fullPath).getDownloadURL();

      await firebase.database().ref('posts').child(add.key).update({
        imageSrc
      });
    },
    async login({dispatch}, {login, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(login, password);
      } catch(e) {
        throw e;
      }
    },
    async logout() {
      await firebase.auth().signOut();
    },
    getUid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },
    /* Конвертатор объектов из генерируемых самим firebase данными в массив*/
    async convertToArr(ctx, obj) {
      const arr = [];
      for(const key in obj) {
        arr.push({id: key, ...obj[key]});
      }
      return arr;
    }
  },
  getters: {
    isOpenSearchModal: state => state.isOpenSearchModal,
  }
})
