<template>
	<div class="post col-lg-4 col-md-6">
		<div class="post__inner">
			<router-link :to="`/category/${post.categoryName}/${post.title}`" class="post__img">
				<img :src="post.imageSrc">
			</router-link>
			<div class="post__content">
				<router-link :to="`/category/${post.categoryName}`" class="post__category underline">
					<span>{{post.categoryName}}</span>
				</router-link>
				<router-link :to="`/category/${post.categoryName}/${post.title}`" class="post__title">
					{{post.title}}
				</router-link>
				<div class="post__desc">
					{{post.text | trim}}
				</div>
				<router-link :to="`/category/${post.categoryName}/${post.title}`" class="post__link flexbox">
					<span>Перейти к записи</span>
					<img src="../assets/images/icons/arrow-right.svg" alt="">
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'Post',
  props: {
	  post: Object
	}
}
</script>