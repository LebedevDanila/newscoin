<template>
	<main class="main container">
		<div class="row justify-content-between">
			<div class="single col-md-8">
				<img :src="currentPost.imageSrc" alt="" class="single__img">
				<div class="single__content">
					<h1 class="single__title">
						{{currentPost.title}}
					</h1>
					<div class="single__info">
						{{currentPost.text}}
					</div>
				</div>
			</div>
			<div class="sidebar col-md-4">
				<div class="sidebar__inner">
					<h1 class="sidebar__title">Похожие новости</h1>
					<div class="sidebar__content">
						<router-link
						class="sidebar__item"
						v-for="(post, idx) in relatedPosts"
						:key="idx"
						:to="`/category/${post.categoryName}/${post.title}`"
						>
							{{post.title}}
						</router-link>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
export default {
  name: 'Single',
  data () {
    return {
    	currentPost: [],
    	relatedPosts: []
    }
  },
  async mounted() {
  	await this.renderComponent();
  },
  watch: {
    async $route(to, from) {
      await this.renderComponent();
    }
  },
  methods: {
  	async renderComponent() {
  		const posts = await this.$store.dispatch('fetchPosts', this.$route.params.category);
  		
  		this.relatedPosts = [];
	  	posts.forEach(item => {
	  		if(item.title === this.$route.params.post) {
	  			this.currentPost = item;
	  		} else {
	  			this.relatedPosts.push(item);
	  		}
	  	});
  	}
  }
}
</script>