<template>
	<header class="header">
		<div class="container">
			<div class="row align-items-center justify-content-between">
				<router-link to="/" class="header__logo col-lg-3 col-md-4 col-9">
					<img src="../assets/images/logo.svg" alt="">
				</router-link>
				<div class="header__burger-menu col-3">
					<img src="../assets/images/icons/burger-menu.svg" alt="">
				</div>
				<div class="header__nav col-md-7">
					<ul class="header__nav-list flexbox">
						<li class="active underline"
						v-for="(category, idx) in categories"
						:key="idx"
						>
							<router-link :to="`/category/${category.name}`">{{category.name}}</router-link>
						</li>
					</ul>
				</div>
				<div class="header__options col-md-1">
					<img @click="toggleSearchModal()" src="../assets/images/icons/search.svg" alt="">
				</div>
			</div>
		</div>
	</header>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  name: 'Header',
  data() {
		return {
			categories: []
	  }
	},
  async mounted() {
  	this.categories = await this.$store.dispatch('fetchCategories');
  },
  methods: {
  	...mapMutations(['toggleSearchModal'])
  }
}
</script>