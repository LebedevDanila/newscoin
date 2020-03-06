<template>
	<main class="home main container">
		<div class="row">
			<div class="col-md-12">
				<h1 class="main-title underline"><span>Последние публикации</span></h1>
			</div>
		</div>
		<div v-if="displayedPosts.length" class="posts row">
			<Post
			v-for="(post, idx) in displayedPosts"
			:key="idx"
			:post="post"
			/>
		</div>
		<div v-else class="not-found row justify-content-center">
			<h1>В этой категории пока что нету записей!</h1>
		</div>
		<div v-if="posts.length > maxDisplayedPosts" class="paginations row justify-content-center">
			<div
			class="paginations__button"
			v-for="idx in countPagination"
			:key="idx"
			:class="activePage == idx ? 'active' : ''"
			@click="pagination(idx)"
			>{{idx}}</div>
		</div>
	</main>
</template>

<script>
import Post from '@/components/Post.vue'

export default {
	name: 'Home',
	components: {
		Post
	},
	data() {
		return {
			posts: [],
			displayedPosts: [],
			maxDisplayedPosts: 6,
			activePage: 1
		}
	},
  async mounted() {
  	this.posts = await this.$store.dispatch('fetchPosts');
  	this.pagination(1);
  	this.countPagination;
  },
  computed: {
  	countPagination() {
  		return Math.ceil(this.posts.length / this.maxDisplayedPosts);
  	}
  },
  methods: {
  	pagination(idx) {
  		this.activePage = idx;

  		this.displayedPosts = [];
  		for (let i = (idx-1)*this.maxDisplayedPosts; i < idx*this.maxDisplayedPosts; i++) {
				if(this.posts[i]) {
					this.displayedPosts.push(this.posts[i]);
				} else {
					break;
				}
			}
  	}
  }
}
</script>
