<template>
	<main class="admin main container">
		<div class="row">
			<div class="col-lg-12">
				<h1>Админ панель</h1>
			</div>
		</div>
		<div class="admin__forms row justify-content-between">
			<div class="col-lg-6">
				<div class="form">
					<div class="row">
						<div class="col-12">
							<h2>Добавить новую новость:</h2>
						</div>
					</div>
					<div class="row">
						<div class="col-12"><input v-model="postTitle" type="text" placeholder="Введите название"></div>
					</div>
					<div class="row">
						<div class="col-md-6 col-12">
							<select v-model="postCategory">
							  <option v-for="(category, idx) in categories" :key="idx">{{category.name}}</option>
							</select>
						</div>
						<div class="col-md-6 col-12">
							<button @click="triggerUpload()" class="admin__forms-upload-files">Загрузить файл</button>
							<input
							ref="fileInput"
							type="file"
							accept="image/*"
							style="display: none;"
							@change="onFileChange"
							>
						</div>
					</div>
					<div class="row">
						<div class="upload-image col-12">
							<img :src="postImageSrc" v-if="postImageSrc">
						</div>
					</div>
					<div class="row">
						<div class="col-12">
							<textarea v-model="postText" placeholder="Введите текст..."></textarea>
						</div>
					</div>
					<div class="row">
						<div class="col-12">
							<input @click="submitPost()" type="submit" value="Добавить новость">
						</div>
					</div>
				</div>
			</div>
			<div class="col-lg-6">
				<div class="form">
					<div class="row">
						<div class="col-lg-12">
							<h2>Добавить новую категорию:</h2>
						</div>
					</div>
					<div class="row">
						<div class="col-12"><input v-model="categoryName" type="text" placeholder="Введите название"></div>
					</div>
					<div class="row">
						<div class="col-12">
							<input @click="submitCategory()" type="submit" value="Добавить категорию">
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
export default {
  name: 'Admin',
  data () {
    return {
    	categories: [],
    	postTitle: '',
    	postText: '',
    	postCategory: '',
    	postImage: '',
    	postImageSrc: null,
    	categoryName: ''
    }
  },
  async mounted() {
  	this.categories = await this.$store.dispatch('fetchCategories');
  	this.postCategory = this.categories[0].name;
  },
  methods: {
  	async submitPost() {
  		if(!this.postTitle || !this.postText || !this.postImageSrc) {
  			alert('Введите значения!');
  			return false;
  		}

  		const postData = {
  			title: this.postTitle.replace(/[/.,!?;]*/g, ''),
  			text: this.postText,
  			image: this.postImage,
  			categoryName: this.postCategory
  		}
			await this.$store.dispatch('addPost', postData);

			alert('Категория успешно добавлена!');

  		this.postTitle = '';
  		this.postText = '';
  		this.postImage = '';
  		this.postImageSrc = '';
  	},
  	async submitCategory() {
  		if(!this.categoryName) {
  			alert('Введите значение!');
  			return false;
  		}

  		const categoryData = {
  			name: this.categoryName
  		}
  		await this.$store.dispatch('addCategory', categoryData);

  		alert('Категория успешно добавлена!');

  		this.categoryName = '';
  	},
  	triggerUpload() {
  		this.$refs.fileInput.click();
  	},
  	onFileChange(event) {
  		const file = event.target.files[0];
  		
  		const reader = new FileReader();
  		reader.onload = e => {
  			this.postImageSrc = reader.result;
  		};
  		reader.readAsDataURL(file);
  		this.postImage = file;
  	}
  }
}
</script>