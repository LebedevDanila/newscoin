<template>
	<div class="search-modal">
		<div @click="toggleSearchModal()" class="search-modal__close">&times;</div>
		<div class="search-modal__container container">
			<div class="row justify-content-center">
				<div class="col-lg-8">
					<form class="search-modal__form flexbox" @submit.prevent="searchPost()">
						<input v-model="searchField" type="text" placeholder="Введите название новости" class="search-modal__field">
						<input type="submit" class="search-modal__submit" value="Начать поиск">
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  name: 'SearchModal',
  data () {
    return {
    	searchField: ''
    }
  },
  methods: {
  	...mapMutations(['toggleSearchModal']),
  	async searchPost() {
  		const foundPost = [...await this.$store.dispatch('fetchPosts')].find(item => item.title.includes(this.searchField));

  		if(foundPost) {
 				this.toggleSearchModal();
  			this.$router.push(`/category/${foundPost.categoryName}/${foundPost.title}`);
  		} else {
  			alert('Такой новости нету!');
  		}
  	}
  }
}
</script>